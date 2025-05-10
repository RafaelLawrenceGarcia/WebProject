// Product Categories
const CATEGORIES = [
    'Smartphones',
    'Laptops',
    'Tablets',
    'Smartwatches',
    'Headphones',
    'Cameras',
    'Accessories',
    'Gaming'
  ];
  
  // Products Data
  const products = [
    // Smartphones
    {
      id: 1,
      name: "Premium Pro Smartphone",
      price: 999.99,
      description: "Our flagship smartphone with cutting-edge technology. Features a high-resolution display, powerful processor, and professional-grade camera system.",
      category: "Smartphones",
      imageUrl: "images/apple-1867461_960_720.jpg",
      rating: 4.8,
      inStock: true,
      features: [
        "6.7-inch Super Retina XDR display",
        "A15 Bionic chip",
        "Pro camera system with 12MP telephoto, wide, and ultra wide",
        "Up to 28 hours of video playback",
        "Face ID for secure authentication"
      ],
      specs: {
        "Display": "6.7-inch Super Retina XDR",
        "Processor": "A15 Bionic chip",
        "Storage": "128GB, 256GB, 512GB, 1TB",
        "Battery": "4,352 mAh",
        "OS": "Latest iOS",
        "Water Resistance": "IP68"
      }
    },
    {
      id: 2,
      name: "Ultra Light Smartphone",
      price: 799.99,
      description: "Sleek and lightweight smartphone with impressive performance and long battery life. Perfect for everyday use and mobile photography.",
      category: "Smartphones",
      imageUrl: "images/smartphone-1894723_960_720.jpg",
      rating: 4.5,
      inStock: true,
      features: [
        "6.1-inch OLED display",
        "Latest generation processor",
        "Dual camera system",
        "All-day battery life",
        "Fast charging capability"
      ],
      specs: {
        "Display": "6.1-inch OLED",
        "Processor": "Octa-core",
        "Storage": "128GB, 256GB",
        "Battery": "3,240 mAh",
        "OS": "Android 13",
        "Water Resistance": "IP67"
      }
    },
    
    // Laptops
    {
      id: 3,
      name: "UltraBook Pro",
      price: 1299.99,
      description: "Ultra-thin professional laptop with exceptional performance and battery life. Designed for professionals who need power on the go.",
      category: "Laptops",
      imageUrl: "images/apple-1282241_960_720.jpg",
      rating: 4.7,
      inStock: true,
      features: [
        "14-inch Retina display",
        "Latest generation processor",
        "16GB RAM",
        "512GB SSD",
        "Up to 20 hours battery life"
      ],
      specs: {
        "Display": "14-inch Retina",
        "Processor": "Latest generation quad-core",
        "Memory": "16GB unified memory",
        "Storage": "512GB SSD",
        "Battery": "Up to 20 hours",
        "Weight": "3.0 lbs (1.4 kg)"
      }
    },
    {
      id: 4,
      name: "Gaming Powerhouse Laptop",
      price: 1999.99,
      description: "High-performance gaming laptop with dedicated graphics and advanced cooling system. Experience stunning visuals and smooth gameplay.",
      category: "Laptops",
      imageUrl: "images/dell-2619501_960_720.jpg",
      rating: 4.6,
      inStock: true,
      features: [
        "15.6-inch 144Hz display",
        "Latest generation processor",
        "32GB RAM",
        "1TB SSD",
        "Dedicated RTX graphics"
      ],
      specs: {
        "Display": "15.6-inch 144Hz",
        "Processor": "Latest generation octa-core",
        "Memory": "32GB DDR4",
        "Storage": "1TB NVMe SSD",
        "Graphics": "RTX Series dedicated",
        "Weight": "4.8 lbs (2.2 kg)"
      }
    },
    
    // Tablets
    {
      id: 5,
      name: "Pro Tablet",
      price: 799.99,
      description: "Professional-grade tablet with stunning display and powerful performance. Perfect for creative work and productivity on the go.",
      category: "Tablets",
      imageUrl: "images/Amazon-Fire-Max-11-Review--Stand-Gear.webp",
      rating: 4.8,
      inStock: true,
      features: [
        "11-inch Liquid Retina display",
        "High-performance chip",
        "12MP wide camera",
        "All-day battery life",
        "Support for Apple Pencil"
      ],
      specs: {
        "Display": "11-inch Liquid Retina",
        "Processor": "M1 chip",
        "Storage": "128GB, 256GB, 512GB, 1TB",
        "Battery": "Up to 10 hours",
        "Connectivity": "Wi-Fi 6, optional 5G"
      }
    },
    
    // Smartwatches
    {
      id: 6,
      name: "Health Monitor Smartwatch",
      price: 349.99,
      description: "Advanced smartwatch with comprehensive health monitoring features. Track your fitness, sleep, and vitals throughout the day.",
      category: "Smartwatches",
      imageUrl: "images/smart-watch-821557_960_720.jpg",
      rating: 4.6,
      inStock: true,
      features: [
        "Always-on Retina display",
        "ECG app capability",
        "Blood oxygen sensor",
        "Water resistant to 50 meters",
        "Up to 18 hours of battery life"
      ],
      specs: {
        "Display": "Always-on Retina LTPO OLED",
        "Case Size": "41mm or 45mm",
        "Connectivity": "Wi-Fi, Bluetooth, optional cellular",
        "Sensors": "ECG, blood oxygen, heart rate, accelerometer, gyroscope, altimeter",
        "Battery": "Up to 18 hours"
      }
    },
    
    // Headphones
    {
      id: 7,
      name: "Noise Cancelling Headphones",
      price: 299.99,
      description: "Premium wireless headphones with industry-leading noise cancellation. Immerse yourself in rich, detailed sound without distractions.",
      category: "Headphones",
      imageUrl: "images/headphones-3683983_960_720.jpg",
      rating: 4.7,
      inStock: true,
      features: [
        "Industry-leading noise cancellation",
        "30-hour battery life",
        "Hi-res audio certified",
        "Comfortable over-ear design",
        "Touch controls"
      ],
      specs: {
        "Type": "Over-ear, wireless",
        "Noise Cancellation": "Active, adaptive",
        "Battery Life": "30 hours with ANC on",
        "Charging": "USB-C, quick charge",
        "Connectivity": "Bluetooth 5.0, 3.5mm wired option"
      }
    },
    {
      id: 8,
      name: "Wireless Earbuds Pro",
      price: 199.99,
      description: "True wireless earbuds with active noise cancellation and immersive sound. Perfect for workouts and everyday listening.",
      category: "Headphones",
      imageUrl: "images/headphone-3085681_960_720.jpg",
      rating: 4.5,
      inStock: true,
      features: [
        "Active noise cancellation",
        "Transparency mode",
        "Custom acoustic design",
        "Sweat and water resistant",
        "Up to 6 hours of listening time"
      ],
      specs: {
        "Type": "True wireless in-ear",
        "Noise Cancellation": "Active",
        "Battery Life": "6 hours, 24 hours with case",
        "Charging": "Wireless and USB-C",
        "Water Resistance": "IPX4"
      }
    },
    
    // Cameras
    {
      id: 9,
      name: "Professional DSLR Camera",
      price: 1499.99,
      description: "Professional-grade DSLR camera with exceptional image quality and versatile shooting capabilities. Capture stunning photos and videos.",
      category: "Cameras",
      imageUrl: "images/professional-dslr-camera-with-zoom-lens.jpg",
      rating: 4.8,
      inStock: true,
      features: [
        "24.2-megapixel full-frame sensor",
        "4K video recording",
        "Advanced autofocus system",
        "Weather-sealed body",
        "Dual card slots"
      ],
      specs: {
        "Sensor": "24.2-megapixel full-frame CMOS",
        "Processor": "Latest generation image processor",
        "ISO Range": "100-51,200 (expandable)",
        "Autofocus": "61-point, 41 cross-type",
        "Video": "4K at 30fps, 1080p at 120fps"
      }
    },
    
    // Accessories
    {
      id: 10,
      name: "Wireless Charging Pad",
      price: 39.99,
      description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design and convenient indicator lights.",
      category: "Accessories",
      imageUrl: "images/iphone-410324_960_720.jpg",
      rating: 4.4,
      inStock: true,
      features: [
        "15W fast charging",
        "Universal compatibility with Qi devices",
        "Slim, compact design",
        "LED charging indicator",
        "Foreign object detection"
      ],
      specs: {
        "Output": "15W max",
        "Input": "USB-C, QC 3.0 compatible",
        "Compatibility": "All Qi-enabled devices",
        "Size": "4 inches diameter",
        "Included": "1.5m USB-C cable"
      }
    },
    
    // Gaming
    {
      id: 11,
      name: "VR Gaming Headset",
      price: 399.99,
      description: "Immersive virtual reality headset with high-resolution displays and precise motion tracking. Step into a new world of gaming and entertainment.",
      category: "Gaming",
      imageUrl: "images/images.jpg",
      rating: 4.7,
      inStock: true,
      features: [
        "High-resolution OLED displays",
        "Inside-out tracking",
        "Ergonomic controllers",
        "Built-in audio",
        "Adjustable head strap"
      ],
      specs: {
        "Display": "Dual OLED 1440 x 1600 per eye",
        "Refresh Rate": "90Hz",
        "Field of View": "110 degrees",
        "Tracking": "6DOF inside-out",
        "Audio": "Built-in directional speakers"
      }
    },
    {
      id: 12,
      name: "Gaming Console Pro",
      price: 499.99,
      description: "Next-generation gaming console with stunning graphics and lightning-fast performance. Experience games like never before.",
      category: "Gaming",
      imageUrl: "images/gaming_consle.jpg",
      rating: 4.9,
      inStock: true,
      features: [
        "4K gaming at 60fps, up to 120fps",
        "Ray tracing technology",
        "SSD for fast loading",
        "Backwards compatibility",
        "Digital and disc edition available"
      ],
      specs: {
        "CPU": "8-core custom Zen 2",
        "GPU": "RDNA 2 with ray tracing",
        "Memory": "16GB GDDR6",
        "Storage": "1TB custom SSD",
        "Video Output": "8K, 4K UHD at 120Hz"
      }
    }
  ];
  
  // Filter functions
  function getProductsByCategory(category) {
    if (!category) return products;
    return products.filter(product => product.category === category);
  }
  
  function searchProducts(query) {
    if (!query) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }
  
  function getFeaturedProducts() {
    // Get products with highest ratings
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }
  
  function getNewArrivals() {
    // For demo, just get a different 4 products
    return [...products]
      .sort((a, b) => a.id - b.id)
      .slice(4, 8);
  }
  
  function getRelatedProducts(category, currentProductId) {
    return products
      .filter(product => product.category === category && product.id !== currentProductId)
      .slice(0, 4);
  }
  
  function getProductById(id) {
    const productId = parseInt(id);
    return products.find(product => product.id === productId);
  }
  
  // Price formatter
  function formatPrice(price) {
    return price.toFixed(2);
  }