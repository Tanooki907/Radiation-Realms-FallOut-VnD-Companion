import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ResponsiveImage = ({ imageUrl, altText }) => {
  const [dimensions, setDimensions] = useState({ width: 576, height: 288 });

  useEffect(() => {

    if (window.innerWidth < 576) {
      setDimensions({
        width: window.innerWidth - 125, // Update width based on window width
        height: calculateHeight(window.innerWidth - 125), // Calculate height based on width
      });
    }
  }, []);

  const calculateHeight = (width) => {
    // Calculate height based on the width and aspect ratio
    // Replace this with your own logic for calculating the height
    return (width * 0.5); // Example: Maintain a 2:1 aspect ratio
  };

  return (
    <Image src={imageUrl} alt={altText} width={dimensions.width} height={dimensions.height} className="responsive-image" />
  );
};

export default ResponsiveImage;