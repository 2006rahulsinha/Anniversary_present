'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Heart, Sparkles, ZoomIn } from 'lucide-react';
import Image from 'next/image';

// Import collage images statically
import CollageImage1 from '@/app/collage/Image_1.jpg';
import CollageImage2 from '@/app/collage/Image_2.jpg';
import CollageImage3 from '@/app/collage/Image_3.jpg';
import CollageImage4 from '@/app/collage/Image_4.jpg';
import CollageImage5 from '@/app/collage/Image_5.jpg';
import CollageImage6 from '@/app/collage/Image_6.jpg';
import CollageImage7 from '@/app/collage/Image_7.jpg';
import CollageImage8 from '@/app/collage/Image_8.jpg';
import CollageImage9 from '@/app/collage/Image_9.jpg';
import CollageImage10 from '@/app/collage/Image_10.jpg';

interface CollageImage {
  src: any;
  alt: string;
  span: string;
}

const COLLAGE_IMAGES: CollageImage[] = [
  { src: CollageImage1, alt: 'Memory 1', span: 'md:col-span-2 md:row-span-2' },
  { src: CollageImage2, alt: 'Memory 2', span: '' },
  { src: CollageImage3, alt: 'Memory 3', span: '' },
  { src: CollageImage4, alt: 'Memory 4', span: 'md:row-span-2' },
  { src: CollageImage10, alt: 'Memory 10', span: '' },
  { src: CollageImage5, alt: 'Memory 5', span: 'md:col-span-2' },
  { src: CollageImage6, alt: 'Memory 6', span: '' },
  { src: CollageImage7, alt: 'Memory 7', span: '' },
  { src: CollageImage8, alt: 'Memory 8', span: 'md:col-span-2' },
  { src: CollageImage9, alt: 'Memory 9', span: '' },
];

const LETTER_TEXT = `My jaanu,

It's been one whole year since I told you that you're the one for me.
An amazing year too, insane cute dates, 
so much food, so much fun city, so much oinkyboinky.

There isn't anybody I'd rather want to do this with 
and I just love you so much.

Thank you for choosing me because you've taught me 
to choose myself as well.

You're my best friend, my hot girlfriend, 
and my favorite person ever.

I love you cuteness. ✨💕`;

export default function CollagePage() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') handleCloseFullscreen();
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
      }
      if (isLetterOpen && e.key === 'Escape') setIsLetterOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, isLetterOpen]);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseFullscreen = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < COLLAGE_IMAGES.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  return (
    <>
      {/* Google Fonts Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Dancing+Script:wght@400;600;700&family=Satisfy&family=Sacramento&family=Great+Vibes&family=Caveat:wght@400;600;700&family=Patrick+Hand&family=Indie+Flower&display=swap');

        .font-pacifico { font-family: 'Pacifico', cursive; }
        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-satisfy { font-family: 'Satisfy', cursive; }
        .font-sacramento { font-family: 'Sacramento', cursive; }
        .font-great-vibes { font-family: 'Great Vibes', cursive; }
        .font-caveat { font-family: 'Caveat', cursive; }
        .font-patrick { font-family: 'Patrick Hand', cursive; }
        .font-indie { font-family: 'Indie Flower', cursive; }

        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #ffe6f0, #ffd6e8);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ffb6d9, #ff9ec7);
          border-radius: 10px;
          border: 2px solid #ffe6f0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ff9ec7, #ff85b5);
        }

        /* Pinterest-style card shadows */
        .pinterest-card {
          box-shadow: 
            0 1px 3px rgba(255, 105, 180, 0.12),
            0 1px 2px rgba(255, 105, 180, 0.24);
          transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
        .pinterest-card:hover {
          box-shadow: 
            0 14px 28px rgba(255, 105, 180, 0.25),
            0 10px 10px rgba(255, 105, 180, 0.22);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#fff0f6] via-[#ffe6f0] to-[#ffd6e8] relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                y: -20,
                x: Math.random() * 1200,
                opacity: 0,
              }}
              animate={{
                y: '110vh',
                opacity: [0, 0.2, 0],
                rotate: Math.random() * 360,
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'linear',
              }}
            >
              {Math.random() > 0.6 ? (
                <Heart className="w-3 h-3 text-pink-300 fill-pink-300 opacity-40" />
              ) : Math.random() > 0.3 ? (
                <Sparkles className="w-3 h-3 text-pink-200 opacity-40" />
              ) : (
                <span className="text-2xl opacity-30">✨</span>
              )}
            </motion.div>
          ))}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,215,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,192,203,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 p-4 md:p-8 pb-16">
          {/* Header with cute fonts */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 md:mb-16"
          >
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <h1 className="text-5xl md:text-7xl font-dancing font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 mb-3 drop-shadow-sm">
                Our Beautiful Memories
              </h1>
            </motion.div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl">💕</span>
              <p className="text-xl md:text-2xl text-gray-700 font-caveat font-semibold">
                A collection of moments that made us smile
              </p>
              <span className="text-2xl">✨</span>
            </div>
            <div className="flex justify-center gap-2">
              {['🌸', '💖', '🦋', '💕', '🌺'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Pinterest-style Masonry Photo Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-7xl mx-auto mb-16 md:mb-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4 md:gap-5">
              {COLLAGE_IMAGES.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5 + index * 0.1, 
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.03, y: -5, zIndex: 50 }}
                  className={`relative group cursor-pointer ${image.span}`}
                  onClick={() => handleImageClick(index)}
                >
                  {/* Pinterest-style card */}
                  <div className="pinterest-card relative w-full h-full bg-white rounded-2xl p-3 md:p-4 overflow-hidden transform transition-all duration-300">
                    {/* Image container */}
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100">
                      {/* Loading state */}
                      {!imageLoaded[index] && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Heart className="w-10 h-10 text-pink-400" />
                          </motion.div>
                        </div>
                      )}

                      {/* Actual image */}
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-600/90 via-pink-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ZoomIn className="w-10 h-10 text-white drop-shadow-lg" />
                        </motion.div>
                        <p className="text-white font-caveat text-xl md:text-2xl font-bold drop-shadow-lg">
                          {image.alt}
                        </p>
                      </div>
                    </div>

                    {/* Corner fold effect */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-pink-200/50 rounded-tr-2xl" />
                  </div>

                  {/* Floating heart */}
                  <motion.div
                    className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-1.5 shadow-lg"
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-500 fill-pink-500" />
                  </motion.div>

                  {/* Washi tape decoration */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-7 -translate-y-3 opacity-70"
                    style={{
                      background: 'repeating-linear-gradient(45deg, #ffc0cb, #ffc0cb 10px, #ffb6c1 10px, #ffb6c1 20px)',
                      clipPath: 'polygon(5% 0%, 95% 0%, 90% 100%, 10% 100%)',
                      filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cute envelope button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8, type: 'spring' }}
            className="flex flex-col items-center gap-5"
          >
            <motion.button
              onClick={() => setIsLetterOpen(true)}
              className="relative group"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full blur-3xl opacity-50"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-white rounded-full p-8 md:p-10 border-4 border-pink-200 shadow-2xl">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                >
                  <Mail className="w-14 h-14 md:w-20 md:h-20 text-pink-500" />
                </motion.div>
              </div>
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{
                  scale: [1, 1.4, 1],
                  rotate: [0, 20, -20, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
              >
                <span className="text-4xl md:text-5xl drop-shadow-2xl filter brightness-110">💌</span>
              </motion.div>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-center text-gray-600 text-base md:text-lg font-indie font-semibold px-4"
            >
              <span className="text-2xl">✨</span> Click the envelope to read my letter <span className="text-2xl">✨</span>
            </motion.p>
          </motion.div>
        </div>

        {/* Fullscreen Image Viewer */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center"
              onClick={handleCloseFullscreen}
            >
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={handleCloseFullscreen}
                className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 md:p-4 transition-all duration-300 z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 md:px-7 md:py-3"
              >
                <p className="text-white font-caveat font-bold text-lg md:text-xl">
                  {selectedImage + 1} / {COLLAGE_IMAGES.length}
                </p>
              </motion.div>

              {selectedImage > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 md:left-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 md:p-5 transition-all duration-300"
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white text-3xl md:text-4xl">←</span>
                </motion.button>
              )}

              {selectedImage < COLLAGE_IMAGES.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 md:right-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 md:p-5 transition-all duration-300"
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white text-3xl md:text-4xl">→</span>
                </motion.button>
              )}

              <motion.div
                key={selectedImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-[90vw] h-[80vh] md:w-[85vw] md:h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={COLLAGE_IMAGES[selectedImage].src}
                  alt={COLLAGE_IMAGES[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  quality={100}
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 md:bottom-8 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 md:px-10 md:py-4"
              >
                <p className="text-white font-satisfy text-xl md:text-2xl flex items-center gap-3">
                  <Heart className="w-5 h-5 md:w-6 md:h-6 fill-white animate-pulse" />
                  {COLLAGE_IMAGES[selectedImage].alt}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-20 md:bottom-24 text-white/50 text-xs md:text-sm font-caveat"
              >
                <p>Press ESC to close • Use arrow keys to navigate</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

          {/* Letter Modal with cute fonts - SIZED DOWN */}
          <AnimatePresence>
            {isLetterOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
                onClick={() => setIsLetterOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: 90 }}
                  animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 90 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="relative max-w-2xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="bg-gradient-to-br from-white via-pink-50 to-rose-50 backdrop-blur-lg rounded-3xl p-6 md:p-10 border-4 border-pink-200 relative overflow-hidden shadow-2xl"
                    style={{ boxShadow: '0 30px 80px rgba(255, 105, 180, 0.4)' }}
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-pink-100/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-rose-100/60 to-transparent" />

                    {/* Floating hearts */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          initial={{ y: '100%', x: `${Math.random() * 100}%`, opacity: 0 }}
                          animate={{
                            y: '-20%',
                            opacity: [0, 0.4, 0],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: Math.random() * 6 + 4,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                          }}
                        >
                          <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => setIsLetterOpen(false)}
                      className="absolute top-4 md:top-5 right-4 md:right-5 bg-white/90 hover:bg-white rounded-full p-2 md:p-3 transition-all duration-300 shadow-lg z-10 border-2 border-pink-200"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative z-10"
                    >
                      <div className="flex justify-center mb-5">
                        <motion.div
                          animate={{
                            rotate: [0, 8, -8, 0],
                            scale: [1, 1.08, 1],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                          }}
                        >
                          <div className="bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 rounded-full p-4 shadow-xl">
                            <Heart className="w-10 h-10 md:w-14 md:h-14 text-white fill-white" />
                          </div>
                        </motion.div>
                      </div>

                      <h2 className="text-3xl md:text-5xl font-dancing font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-center mb-8">
                        A Letter For You
                      </h2>

                      <div className="max-h-[55vh] overflow-y-auto px-4 custom-scrollbar">
                        <pre className="whitespace-pre-wrap font-caveat text-gray-800 leading-relaxed text-lg md:text-xl font-semibold text-center">
                          {LETTER_TEXT}
                        </pre>
                      </div>

                      <div className="flex justify-center gap-4 mt-8">
                        {['💕', '✨', '🌸', '💖', '🦋'].map((emoji, i) => (
                          <motion.span
                            key={i}
                            className="text-2xl"
                            animate={{
                              y: [0, -15, 0],
                              scale: [1, 1.3, 1],
                              rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          >
                            {emoji}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

      </div>
    </>
  );
}
