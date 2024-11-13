import React from 'react';
import { X } from 'lucide-react';
const ImageList = ({ images, setImages }) => {
  const imageRemove = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  return (
      <div className="max-w-4xl mx-auto">    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <div key={image} className="relative group">
                <img
                  src={image}
                  alt="homestay Images"
                  className="w-full h-[200px] object-fit rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                />
                    <button
                        type='button'
                  onClick={() => imageRemove(index)}
                  className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-opacity duration-200 backdrop-blur-sm"
                  aria-label="Remove image"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
      </div>
  );
}

export default ImageList;
