
import React, { useState } from 'react';
import { ImageItem } from '../types';

interface GalleryProps {
  images: ImageItem[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const openPreview = (image: ImageItem) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((image) => (
          <div 
            key={image.id} 
            onClick={() => openPreview(image)}
            className="relative group overflow-hidden rounded-3xl cursor-pointer bg-neutral-900 break-inside-avoid"
          >
            <img 
              src={image.url} 
              alt={image.alt}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium text-lg block">Exclusive View</span>
                    <span className="text-white/50 text-xs">Click to enlarge</span>
                  </div>
                  <div className="flex space-x-3">
                    <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-pink-600 transition-colors">
                      <i className="fa-solid fa-expand text-white text-sm"></i>
                    </button>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <i className="fa-solid fa-heart text-pink-500"></i>
                  <i className="fa-solid fa-comment text-white/50"></i>
                  <i className="fa-solid fa-share text-white/50"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={closePreview}
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl"></div>
          
          <button 
            onClick={closePreview}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl z-10 transition-all"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div 
            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group w-full h-full flex items-center justify-center">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.alt} 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-500"
              />
              
              {/* Bottom bar in preview */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center space-x-8 text-white/70">
                <button className="hover:text-pink-500 transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-heart"></i>
                  <span className="text-sm font-medium">Like</span>
                </button>
                <button className="hover:text-pink-500 transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-share-nodes"></i>
                  <span className="text-sm font-medium">Share</span>
                </button>
                <a 
                  href={selectedImage.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  <span className="text-sm font-medium">Original</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
