import React from 'react';

const images = [
  '/images/gym1.jpg',
  '/images/gym2.jpg',
  '/images/gym3.jpg',
];

function Gallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Gym ${index + 1}`}
          className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-lg shadow-lg transform hover:scale-105 transition duration-300 border-4 border-blue-600"
        />
      ))}
    </div>
  );
}

export default Gallery;
