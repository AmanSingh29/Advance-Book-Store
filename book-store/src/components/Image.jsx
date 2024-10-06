import React, { useState } from "react";

const Image = ({ src, srcLazy, alt, lazyLoad = false, className = "" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative">
      {lazyLoad && srcLazy && (
        <img
          src={srcLazy}
          alt={alt}
          className={`w-full h-auto max-h-[75vh] object-cover transition-opacity duration-500 ease-in-out ${
            imageLoaded ? "opacity-0" : "opacity-100"
          } ${className}`}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto max-h-[75vh] object-cover transition-opacity duration-500 ease-in-out ${
          lazyLoad && "absolute top-0 left-0"
        } ${imageLoaded ? "opacity-100" : "opacity-0"} ${className}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default Image;
