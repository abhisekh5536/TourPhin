import React, { useState, useEffect, useRef } from 'react';
import './Destinations.css';

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
    avgPrice: 15000,
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
    avgPrice: 12000,
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
    avgPrice: 20000,
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
    avgPrice: 30000,
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
    avgPrice: 35000,
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

const Destinations = () => {
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [favorites, setFavorites] = useState([]);
  const [visibleDestinations, setVisibleDestinations] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  // Removed compareList state
  
  // Ref for filter sidebar
  const filterSidebarRef = useRef(null);

  // Sample destination data
const destinations = [
    {
      id: 1,
      name: 'Agra',
      image: 'https://skift.com/wp-content/uploads/2022/06/GettyImages-1208049833-scaled-e1654782364566-1536x1024.jpg',
      description: 'Visit to Tajmahal, Agra fort, Fatehpur Sikri, Itmad-ud-daulah\'s tomb, Mehtab Bagh by BAJRANG TOUR TRAVELS.',
      region: 'North India',
      bestSeason: 'October - March',
      difficulty: 'Easy',
      avgPrice: 15000,
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
      avgPrice: 12000,
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
      avgPrice: 20000,
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
      avgPrice: 30000,
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
      avgPrice: 35000,
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

  

  // Load favorites from local storage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('tourphin-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Save favorites to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('tourphin-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter destinations based on search, region, interest, and price
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || destination.region === selectedRegion;
    const matchesInterest = selectedInterest === 'all' || destination.interests.includes(selectedInterest);
    const matchesPrice = destination.avgPrice >= priceRange[0] && destination.avgPrice <= priceRange[1];
    
    return matchesSearch && matchesRegion && matchesInterest && matchesPrice;
  });

  // Sort destinations based on selected sort option
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch(sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.avgPrice - b.avgPrice;
      case 'price-high':
        return b.avgPrice - a.avgPrice;
      case 'rating':
        return b.rating - a.rating;
      default: // popularity (featured first, then by rating)
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
    }
  });

  // Get destinations to display based on pagination
  const displayedDestinations = sortedDestinations.slice(0, visibleDestinations);

  // Handle load more button click
  const handleLoadMore = () => {
    setVisibleDestinations(prev => prev + 3);
  };

  // Toggle destination in favorite
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Removed toggleCompare function

  // Share destination on social media
  const shareDestination = (name) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${name} on TourPhin!`,
        text: `I found this amazing destination ${name} on TourPhin. Check it out!`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      alert(`Share feature not supported on your browser. Check out ${name} on TourPhin!`);
    }
  };

  // Toggle filter sidebar on mobile
  const toggleFilterSidebar = () => {
    if (filterSidebarRef.current) {
      filterSidebarRef.current.classList.toggle('active');
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    
    return stars;
  };

  // Render skeleton loading cards
  const renderSkeletonCards = () => {
    return Array(6).fill().map((_, index) => (
      <div key={`skeleton-${index}`} className="destination-card skeleton">
        <div className="skeleton-img"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-details"></div>
        <div className="skeleton-details"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-button"></div>
      </div>
    ));
  };

  return (
    <div className="destinations-page">
      
      
      {/* Hero Section with Search */}
      <div className="destinations-hero">
        <h1>Explore Amazing Destinations</h1>
        <p>Discover the most beautiful places in India with our curated selection of top destinations</p>
      </div>
      
      {/* Search Container */}
      <div className="container">
        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search destinations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button><i className="fas fa-search"></i> Search</button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="destinations-content">
        {/* Filter Sidebar */}
        <div className="filter-sidebar" ref={filterSidebarRef}>
          <button className="filter-close" onClick={toggleFilterSidebar}>
            <i className="fas fa-times"></i>
          </button>
          
          <div className="filter-section">
            <h3>Region <i className="fas fa-chevron-down"></i></h3>
            <div className="filter-options">
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="region-all" 
                  name="region" 
                  value="all" 
                  checked={selectedRegion === 'all'}
                  onChange={() => setSelectedRegion('all')}
                />
                <label htmlFor="region-all">All Regions</label>
              </div>
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="region-north" 
                  name="region" 
                  value="North India" 
                  checked={selectedRegion === 'North India'}
                  onChange={() => setSelectedRegion('North India')}
                />
                <label htmlFor="region-north">North India</label>
              </div>
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="region-west" 
                  name="region" 
                  value="West India" 
                  checked={selectedRegion === 'West India'}
                  onChange={() => setSelectedRegion('West India')}
                />
                <label htmlFor="region-west">West India</label>
              </div>
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="region-islands" 
                  name="region" 
                  value="Islands" 
                  checked={selectedRegion === 'Islands'}
                  onChange={() => setSelectedRegion('Islands')}
                />
                <label htmlFor="region-islands">Islands</label>
              </div>
            </div>
          </div>
          
          <div className="filter-section">
            <h3>Interests <i className="fas fa-chevron-down"></i></h3>
            <div className="filter-options">
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="interest-all" 
                  name="interest" 
                  value="all" 
                  checked={selectedInterest === 'all'}
                  onChange={() => setSelectedInterest('all')}
                />
                <label htmlFor="interest-all">All Interests</label>
              </div>
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="interest-historical" 
                  name="interest" 
                  value="historical" 
                  checked={selectedInterest === 'historical'}
                  onChange={() => setSelectedInterest('historical')}
                />
                <label htmlFor="interest-historical">Historical</label>
              </div>
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="interest-cultural" 
                  name="interest" 
                  value="cultural" 
                  checked={selectedInterest === 'cultural'}
                  onChange={() => setSelectedInterest('cultural')}
                />
                <label htmlFor="interest-cultural">Cultural</label>
              </div>
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="interest-adventure" 
                  name="interest" 
                  value="adventure" 
                  checked={selectedInterest === 'adventure'}
                  onChange={() => setSelectedInterest('adventure')}
                />
                <label htmlFor="interest-adventure">Adventure</label>
              </div>
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="interest-beach" 
                  name="interest" 
                  value="beach" 
                  checked={selectedInterest === 'beach'}
                  onChange={() => setSelectedInterest('beach')}
                />
                <label htmlFor="interest-beach">Beach</label>
              </div>
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="interest-nature" 
                  name="interest" 
                  value="nature" 
                  checked={selectedInterest === 'nature'}
                  onChange={() => setSelectedInterest('nature')}
                />
                <label htmlFor="interest-nature">Nature</label>
              </div>
              <div className="filter-option">
                <input 
                  type="radio" 
                  id="interest-spiritual" 
                  name="interest" 
                  value="spiritual" 
                  checked={selectedInterest === 'spiritual'}
                  onChange={() => setSelectedInterest('spiritual')}
                />
                <label htmlFor="interest-spiritual">Spiritual</label>
              </div>
            </div>
          </div>
          
          <div className="filter-section">
            <h3>Price Range <i className="fas fa-chevron-down"></i></h3>
            <div className="filter-options">
              <div className="price-range">
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  step="1000" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
                <div className="price-values">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Destinations Grid */}
        <div className="destinations-grid">
          <div className="grid-header">
            <div className="results-count">
              {filteredDestinations.length} destinations found
            </div>
            <div className="sort-dropdown">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popularity">Sort by: Popularity</option>
                <option value="alphabetical">Sort by: A-Z</option>
                <option value="price-low">Sort by: Price (Low to High)</option>
                <option value="price-high">Sort by: Price (High to Low)</option>
                <option value="rating">Sort by: Rating</option>
              </select>
            </div>
          </div>
          
          <div className="destinations-cards">
            {isLoading ? (
              renderSkeletonCards()
            ) : (
              displayedDestinations.map(destination => (
                <div key={destination.id} className="destination-card">
                  <div className="card-image">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                      }}
                    />
                    {destination.featured && (
                      <div className="card-badges">
                        <span className="featured-badge">Featured</span>
                      </div>
                    )}
                    <div className="card-actions">
                      <button 
                        className={`card-action-btn ${favorites.includes(destination.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(destination.id)}
                        title="Favorite"
                        aria-label="Add to favorites"
                      >
                        <i className={`${favorites.includes(destination.id) ? 'fas' : 'far'} fa-heart`}></i>
                      </button>
                      <button 
                        className="card-action-btn"
                        onClick={() => shareDestination(destination.name)}
                        title="Share"
                        aria-label="Share destination"
                      >
                        <i className="fas fa-share-alt"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{destination.name}</h3>
                    <div className="card-highlights">
                      <span className="highlight">
                        <i className="fas fa-calendar-alt"></i> {destination.bestSeason}
                      </span>
                      <span className="highlight">
                        <i className="fas fa-mountain"></i> {destination.difficulty}
                      </span>
                      <span className="highlight">
                        <i className="fas fa-rupee-sign"></i> {destination.avgPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="card-rating">
                      {renderStars(destination.rating)}
                      <span className="rating-value">{destination.rating}</span>
                    </div>
                    <p className="card-description">{destination.description}</p>
                    <button className="card-button">
                      View Details <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {!isLoading && visibleDestinations < filteredDestinations.length && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Removed Compare Bar */}
      
      {/* Filter Toggle Button for Mobile */}
      <button className="filter-toggle" onClick={toggleFilterSidebar}>
        <i className="fas fa-filter"></i>
      </button>
    </div>
  );
}

export default Destinations;