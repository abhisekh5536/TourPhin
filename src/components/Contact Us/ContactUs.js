import React, { useState } from 'react';
import './ContactUs.css';
import {Link} from 'react-router-dom';

// Update the component to accept the handleTouristGuideClick prop
const ContactUs = ({ handleTouristGuideClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    // Show success message
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-us-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We're here to help plan your perfect Indian adventure</p>
        </div>
      </div>

      {/* Contact Information Section */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <div className="header-line"></div>
          </div>
          
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Our Location</h3>
              <p>123 Travel Street, New Delhi, 110001, India</p>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3>Phone Number</h3>
              <p>+91 98765 43210</p>
              <p>+91 12345 67890</p>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email Address</h3>
              <p>info@tourphin.com</p>
              <p>support@tourphin.com</p>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Working Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="contact-section form-map-section">
        <div className="contact-container">
          <div className="contact-form-map">
            <div className="contact-form-container">
              <h3>Send Us a Message</h3>
              {formSubmitted && (
                <div className="form-success-message">
                  <i className="fas fa-check-circle"></i>
                  <p>Thank you for your message! We'll get back to you soon.</p>
                </div>
              )}
              <form action="https://formsubmit.co/abhisekhy5536@gmail.co0m" method="POST" className="contact-form">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Your Email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="Your Phone" 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="Subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    name="message" 
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
            <div className="contact-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.9912308344665!2d77.10975907536238!3d28.736648175607964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d013045aab491%3A0xb6a504893549c54f!2sBhagwan%20Parshuram%20Institute%20of%20Technology!5e1!3m2!1sen!2sin!4v1742405135054!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                title="TourPhin Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-section faq-section">
        <div className="contact-container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <div className="header-line"></div>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I book a tour?</h3>
              <p>You can book a tour by browsing our packages online, selecting your preferred tour, and following the booking process. Alternatively, you can contact our team directly via phone or email for assistance.</p>
            </div>
            
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept various payment methods including credit/debit cards, net banking, UPI, and international wire transfers for overseas customers.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I customize a tour package?</h3>
              <p>Yes, we offer customized tour packages tailored to your preferences, budget, and schedule. Contact our team to discuss your requirements.</p>
            </div>
            
            <div className="faq-item">
              <h3>What is your cancellation policy?</h3>
              <p>Our cancellation policy varies depending on the tour package and timing of cancellation. Generally, cancellations made 30 days before the tour date receive a full refund, while those made closer to the departure date may incur charges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="contact-cta">
        <div className="contact-container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Let us help you create memories that will last a lifetime</p>
          <div className="cta-buttons">
            <Link to="/packages" className="cta-button primary">View Our Packages</Link>
            {/* Now this will work because handleTouristGuideClick is passed as a prop */}
            <button onClick={handleTouristGuideClick} className="cta-button secondary">Become a Guide</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;