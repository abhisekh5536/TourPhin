import React, { useState, useRef } from 'react';
import OpenAI from "openai";
import './AiHelp.css';
import { destinations } from '../Destinations/Destinations';  // Add this import

const AiHelp = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const responseRef = useRef(null);

  // Remove the destinationsData array and use the imported one directly
  const client = new OpenAI({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    apiKey: process.env.REACT_APP_API_KEY,
    dangerouslyAllowBrowser: true
  });

  // Existing functions can now use the imported destinations directly
  const getDestinationImage = (destinationName) => {
    const destination = destinations.find(dest => 
      dest.name.toLowerCase() === destinationName.toLowerCase()
    );
    return destination?.image || 'https://st4.depositphotos.com/4640111/41072/i/1600/depositphotos_410721236-stock-photo-planning-vacation-travel-plan-trip.jpg';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter your travel requirements');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setResponse('');
    
    try {
      const systemMessage = `You are a travel assistant for TourPhin. Recommend destinations from:
      ${JSON.stringify(destinations, null, 2)}.
      Consider budget: ${prompt.match(/₹(\d+)/)?.[1] || prompt.match(/(\d+)\s*rs/i)?.[1] || 'not specified'}, 
      duration: ${prompt.match(/\b(\d+)\s*days?\b/i)?.[1] || 'unspecified'}, 
      and interests: ${prompt.match(/interests?.*?(cultural|adventure|nature)/i)?.[1] || 'general'}.
      
      IMPORTANT: If a budget is specified, ONLY recommend destinations that fit within that budget and below the budget.
      
      Format your response as a JSON object with the following structure:
      {
        "destinations": [
          {
            "name": "Destination Name",
            "description": "Brief description of why this destination matches the query",
            "highlights": ["Key Point 1", "Key Point 2", "Key Point 3"],
            "recommendation": "A personalized recommendation for this destination"
          }
        ],
        "summary": "A brief summary of the recommendations"
        1) summarize the destination response provided by you try to make it short
        2) Always make the summary in the desired language as the user prompt (always match the language of user).
        3) Give summaries like a close friend would say in a friendly manner.
        4) if the budget is low give user recommandation to raise the budget and tell them the minimum destination price is 12000 and show him the single destination with least price.
        5) if the budget is high give user recommandation to reduce the budget and tell him the maximum destination price is 12000 and show him the single destination with highest price.
      }
      
      Return multiple destination cards that match the criteria, not just one.
      `;

      const completion = await client.chat.completions.create({
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: prompt }
        ],
        model: process.env.REACT_APP_MODEL_NAME || "gpt-4o",
        temperature: 1.0,
        max_tokens: 4000,
      });

      try {
        const responseData = JSON.parse(completion.choices[0].message.content);
        setResponse(responseData);
      } catch (parseError) {
        // If parsing fails, try to extract JSON from the text response
        console.error('Failed to parse JSON response:', parseError);
        try {
          // Try to find JSON in the response text
          const jsonMatch = completion.choices[0].message.content.match(/\{[\s\S]*\}/m);
          if (jsonMatch) {
            const extractedJson = jsonMatch[0];
            const parsedData = JSON.parse(extractedJson);
            setResponse(parsedData);
          } else {
            throw new Error('No JSON found in response');
          }
        } catch (extractError) {
          // If extraction fails too, use the raw response
          console.error('Failed to extract JSON from response:', extractError);
          setResponse({
            destinations: [{
              name: 'AI Recommendation',
              description: completion.choices[0].message.content,
              highlights: [],
              recommendation: ''
            }],
            summary: 'Hi! I\'m TourPhin\'s AI Travel Assistant. Tell me your travel requirements and I will recommend the best destinations for you!'
          });
        }
      }
      
      if (responseRef.current) {
        responseRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('API Error:', error);
      setError(error.message || 'Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get a image for a destination
  // This function is already defined above, so removing this duplicate version

  // Function to get destination data
  const getDestinationData = (destinationName) => {
    return destinations.find(dest => dest.name.toLowerCase() === destinationName.toLowerCase()) || {
      region: 'Unknown',
      bestSeason: 'Year-round',
      avgPrice: 'Varies',
      interests: []
    };
  };

  return (
    <div className="ai-help-container">
      <div className="ai-help-header">
        <h1>AI Travel Assistant</h1>
        <div className="header-line"></div>
        <p>Describe your dream trip and get personalized recommendations!</p>
      </div>
      
      <div className="ai-help-content">
        <form onSubmit={handleSubmit}>
          <div className="prompt-input-container">
            <textarea
              className="prompt-input"
              placeholder="Example: I want a 5-day cultural trip in North India with a budget of ₹25,000"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <span><i className="fas fa-spinner fa-spin"></i> Analyzing...</span>
            ) : (
              <span><i className="fas fa-compass"></i> Plan My Trip</span>
            )}
          </button>
        </form>

        {response && (
          <div className="response-container" ref={responseRef}>
            <h2>Your Personalized Travel Plan</h2>
            
            {response.summary && (
              <div className="response-summary">
                <p>{response.summary}</p>
              </div>
            )}
            
            <div className="destinations-cards">
              {response.destinations && response.destinations.length > 0 ? (
                response.destinations.map((destination, index) => {
                  const destData = getDestinationData(destination.name);
                  return (
                    <div className="destination-card" key={index}>
                      <div className="card-image">
                        <img src={getDestinationImage(destination.name)} alt={destination.name} />
                      </div>
                      <div className="card-content">
                        <h3 className="card-title">{destination.name}</h3>
                        
                        <div className="card-highlights">
                          {destData.region && (
                            <span className="highlight">
                              <i className="fas fa-map-marker-alt"></i> {destData.region}
                            </span>
                          )}
                          {destData.bestSeason && (
                            <span className="highlight">
                              <i className="fas fa-calendar-alt"></i> {destData.bestSeason}
                            </span>
                          )}
                          {destData.avgPrice && (
                            <span className="highlight">
                              <i className="fas fa-rupee-sign"></i> {typeof destData.avgPrice === 'number' ? `₹${destData.avgPrice}` : destData.avgPrice}
                            </span>
                          )}
                        </div>
                        
                        <p className="card-description">{destination.description}</p>
                        
                        {destination.highlights && destination.highlights.length > 0 && (
                          <div className="destination-highlights">
                            <h4>Highlights:</h4>
                            <ul>
                              {destination.highlights.map((highlight, i) => (
                                <li key={i}><i className="fas fa-check-circle"></i> {highlight}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {destination.recommendation && (
                          <div className="destination-recommendation">
                            <h4>Recommendation:</h4>
                            <p>{destination.recommendation}</p>
                          </div>
                        )}
                        
                        <button className="card-button">
                          <i className="fas fa-info-circle"></i> View Details
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-results">
                  <p>No destinations match your criteria. Try adjusting your budget or preferences.</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="ai-help-tips">
          <h3>For Best Results:</h3>
          <ul>
            <li>Mention preferred travel dates</li>
            <li>Specify number of travelers</li>
            <li>Highlight must-see attractions</li>
            <li>Note any special requirements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AiHelp;