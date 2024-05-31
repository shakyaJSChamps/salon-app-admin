import React, { useState, useEffect } from 'react';
import Profile from '../../assets/image/coupon-dummy.webp';

const CommonImage = ({ imageUrl, alt, classes }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (!imageUrl) {
      setIsValid(false);
      return;
    }

    const img = new Image();
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
    img.src = imageUrl;
  }, [imageUrl]);

  if (isValid === null) {
    return <div>Loading...</div>; 
  }

  return (
    <img
      src={isValid ? imageUrl : Profile}
      alt={alt || 'Image'}
      className={classes}
    />
  );
};

export default CommonImage;
