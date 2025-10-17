// Alternative high-quality property image URLs that work well

const propertyImageUrls = [
  // Luxury Hotels & Properties
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop",
  
  // Beautiful Rooms
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1540518614846-7eded1884d9e?w=1200&h=800&fit=crop",
  
  // Modern Properties
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop",
  
  // Cozy Interiors
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e1a3ecb09e45?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop"
];

// Usage: Copy any of these URLs into your property photos field
console.log("Use any of these URLs for your property images:");
propertyImageUrls.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});
