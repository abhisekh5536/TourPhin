import React, { useState, useEffect, useRef } from 'react';
// import './Destinations.css';
import { Link } from 'react-router-dom'; // Add this import

// Move destinations array outside the component and export it
export const destinations = [
  {
    id: 1,
    name: 'Agra',
    image: 'https://skift.com/wp-content/uploads/2022/06/GettyImages-1208049833-scaled-e1654782364566-1536x1024.jpg',
    description: 'Visit to Tajmahal, Agra fort, Fatehpur Sikri...',
    region: 'North India',
    bestSeason: 'October - March',
    difficulty: 'Easy',
    avgPrice: 6500,  // Updated from 15000
    rating: 4.8,
    featured: true,
    interests: ['historical', 'cultural']
  },
  {
    id: 2,
    name: 'Delhi',
    image: 'https://1.bp.blogspot.com/-az09PefXMpQ/UdRMg81w8QI/AAAAAAAAATg/tEFq4Pp9LRY/s575/lotus+temple.jpg',
    description: 'Explore the vibrant streets of Delhi with its iconic Red Fort, tranquil Humayun\'s Tomb, and the modern Lotus Temple. Experience the perfect blend of history and modernity.',
    region: 'North India',
    bestSeason: 'October - March',
    difficulty: 'Easy',
    avgPrice: 5000,  // Updated from 12000
    rating: 4.5,
    featured: true,
    interests: ['historical', 'cultural', 'food']
  },
  {
    id: 3,
    name: 'Goa',
    image: 'https://www.sharpholidays.in/blog/wp-content/uploads/2018/02/goa-night-time-beach.jpg',
    description: 'Relax on golden beaches with azure waters and vibrant culture. Enjoy fresh seafood, explore colonial architecture, and experience the lively nightlife in this tropical paradise.',
    region: 'West India',
    bestSeason: 'November - February',
    difficulty: 'Easy',
    avgPrice: 8000,  // Updated from 20000
    rating: 4.7,
    featured: true,
    interests: ['beach', 'nightlife', 'adventure']
  },
  {
    id: 4,
    name: 'Ladakh',
    image: 'https://img.freepik.com/free-photo/magnetic-hill-mountain-blue-sky-road-way-leh-ladakh-india_1150-11111.jpg',
    description: 'Experience the breathtaking beauty of rugged Himalayas meeting arid highlands. Known for high altitude, snow-capped mountains, and pristine natural landscapes.',
    region: 'North India',
    bestSeason: 'June - September',
    difficulty: 'Challenging',
    avgPrice: 12000,  // Updated from 30000
    rating: 4.9,
    featured: false,
    interests: ['adventure', 'nature', 'spiritual']
  },
  {
    id: 5,
    name: 'Andaman',
    image: 'https://maharajatravels.in/wp-content/uploads/2023/08/Andaman-Honeymoon1-1.jpg',
    description: 'Discover pristine beaches, crystal-clear waters, and vibrant coral reefs. Perfect for water sports, honeymoons, and relaxing getaways in a tropical paradise.',
    region: 'Islands',
    bestSeason: 'October - May',
    difficulty: 'Moderate',
    avgPrice: 14000,  // Updated from 35000
    rating: 4.6,
    featured: true,
    interests: ['beach', 'adventure', 'nature']
  },
  {
    id: 6,
    name: 'Nicobar',
    image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/09/23113313/andaman-nicobar.jpg',
    description: 'Explore pristine beaches, lush green forests, and rich biodiversity in these remote islands of the Bay of Bengal.',
    region: 'Islands',
    bestSeason: 'October - May',
    difficulty: 'Challenging',
    avgPrice: 40000,
    rating: 4.3,
    featured: false,
    interests: ['nature', 'beach', 'wildlife']
  },
  {
    id: 7,
    name: 'Kashmir',
    image: 'https://cdn.pixabay.com/photo/2018/08/15/20/29/srinagar-3609032_1280.jpg',
    description: 'Experience the paradise on earth with snow-capped mountains, lush green valleys, and serene lakes. Known for traditional handicrafts and vibrant culture.',
    region: 'North India',
    bestSeason: 'March - October',
    difficulty: 'Moderate',
    avgPrice: 25000,
    rating: 4.8,
    featured: true,
    interests: ['nature', 'adventure', 'cultural']
  },
  {
    id: 8,
    name: 'Jaipur',
    image: 'https://static.toiimg.com/photo/msid-47665615,width-96,height-65.cms',
    description: 'Explore the Pink City with its magnificent palaces, forts, and vibrant markets. Experience the rich Rajasthani culture and cuisine.',
    region: 'North India',
    bestSeason: 'October - March',
    difficulty: 'Easy',
    avgPrice: 18000,
    rating: 4.5,
    featured: false,
    interests: ['historical', 'cultural', 'food']
  },
  {
    id: 9,
    name: 'Varanasi',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg',
    description: 'Experience the spiritual heart of India with ancient ghats, temples, and rituals along the sacred Ganges River.',
    region: 'North India',
    bestSeason: 'October - March',
    difficulty: 'Moderate',
    avgPrice: 15000,
    rating: 4.4,
    featured: false,
    interests: ['spiritual', 'cultural', 'historical']
  },
    {
      "id": 10,
      "name": "Udaipur",
      "image": "https://i.ytimg.com/vi/kP4410bRqIw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLASAUvuxFy-Qf4H9FpzN8FflQf4YQ",
      "description": "Explore the City of Lakes with its magnificent palaces, serene lakes, and vibrant Rajasthani culture.",
      "region": "North India",
      "bestSeason": "October - March",
      "difficulty": "Easy",
      "avgPrice": 20000,
      "rating": 4.7,
      "featured": true,
      "interests": ["cultural", "historical", "food"]
    },
    {
      "id": 11,
      "name": "Rishikesh",
      "image": "https://cdn.pixabay.com/photo/2022/10/05/07/11/temple-7499927_1280.jpg",
      "description": "Experience the thrill of river rafting, bungee jumping, and yoga retreats in the foothills of the Himalayas.",
      "region": "North India",
      "bestSeason": "September - November, February - May",
      "difficulty": "Moderate",
      "avgPrice": 17000,
      "rating": 4.4,
      "featured": false,
      "interests": ["adventure", "spiritual", "nature"]
    },
    {
      "id": 12,
      "name": "Jodhpur",
      "image": "https://cdn.pixabay.com/photo/2022/10/05/07/11/temple-7499927_1280.jpg",
      "description": "Discover the Blue City with its majestic Mehrangarh Fort, vibrant markets, and traditional Rajasthani hospitality.",
      "region": "North India",
      "bestSeason": "October - March",
      "difficulty": "Easy",
      "avgPrice": 18000,
      "rating": 4.6,
      "featured": false,
      "interests": ["historical", "cultural", "food"]
    },
    {
      "id": 13,
      "name": "Mumbai",
      "image": "https://i.ytimg.com/vi/tWD_-Rzrn8o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCKhJ0jzHHsjkkzRf8Dz6Lvuz5a5w",
      "description": "Explore the bustling metropolis with its iconic landmarks, vibrant street food, and thriving nightlife.",
      "region": "West India",
      "bestSeason": "November - February",
      "difficulty": "Easy",
      "avgPrice": 22000,
      "rating": 4.6,
      "featured": true,
      "interests": ["nightlife", "food", "cultural"]
    },
    {
      "id": 14,
      "name": "Hampi",
      "image": "https://s7ap1.scene7.com/is/image/incredibleindia/vitthala-temple-complex-hampi-tri-hero?qlt=82&ts=1727164508836",
      "description": "Step back in time at this UNESCO World Heritage site, exploring the ruins of the Vijayanagara Empire.",
      "region": "South India",
      "bestSeason": "October - February",
      "difficulty": "Moderate",
      "avgPrice": 15000,
      "rating": 4.6,
      "featured": false,
      "interests": ["historical", "cultural", "adventure"]
    },
    {
      "id": 15,
      "name": "Bangalore",
      "image": "https://www.realtynmore.com/wp-content/uploads/2024/11/real-estate-market-in-bangalore-2024.jpg",
      "description": "Experience the Silicon Valley of India with its vibrant pub culture, lush parks, and tech hubs.",
      "region": "South India",
      "bestSeason": "Year-round",
      "difficulty": "Easy",
      "avgPrice": 20000,
      "rating": 4.5,
      "featured": true,
      "interests": ["nightlife", "food", "cultural"]
    },
    {
      "id": 16,
      "name": "Khajuraho",
      "image": "https://indiatravel.com/wp-content/uploads/2022/03/khajuraho-slider-imggg-3.jpg",
      "description": "Marvel at the intricate erotic sculptures and architectural brilliance of the Khajuraho temples.",
      "region": "Central India",
      "bestSeason": "October - March",
      "difficulty": "Easy",
      "avgPrice": 18000,
      "rating": 4.5,
      "featured": false,
      "interests": ["historical", "cultural", "spiritual"]
    },
    {
      "id": 17,
      "name": "Pondicherry",
      "image": "https://blog.quickride.in/wp-content/uploads/cropped-Places-to-Visit-in-Pondicherry-850x478.jpg",
      "description": "Relax in this coastal town with its French colonial charm, serene beaches, and vibrant cafes.",
      "region": "South India",
      "bestSeason": "October - March",
      "difficulty": "Easy",
      "avgPrice": 19000,
      "rating": 4.3,
      "featured": false,
      "interests": ["beach", "nightlife", "cultural"]
    },
    {
      "id": 18,
      "name": "Amritsar",
      "image": "https://i.pinimg.com/originals/e3/14/dc/e314dc526f0558163b93f88221a547d0.jpg",
      "description": "Experience the spiritual and cultural heart of Punjab at the Golden Temple and Jallianwala Bagh.",
      "region": "North India",
      "bestSeason": "October - March",
      "difficulty": "Easy",
      "avgPrice": 16000,
      "rating": 4.7,
      "featured": true,
      "interests": ["spiritual", "cultural", "food"]
    },
    {
      "id": 19,
      "name": "Manali",
      "image": "https://i.ytimg.com/vi/HVkLM6__5qk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBZKIfOthm3rLY4HYlF1MTjTeQCGQ",
      "description": "Enjoy adventure sports, scenic beauty, and vibrant nightlife in this Himalayan paradise.",
      "region": "North India",
      "bestSeason": "March - June, September - November",
      "difficulty": "Moderate",
      "avgPrice": 18000,
      "rating": 4.5,
      "featured": false,
      "interests": ["adventure", "nature", "nightlife"]
    }
  
];

export default destinations;