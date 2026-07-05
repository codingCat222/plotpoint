import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Badge } from '@/src/components/ui/Badge';

interface PropertyCarouselProps {
  images: string[];
  videos?: string[];
  type: string;
  status: string;
  title: string;
}

export function PropertyCarousel({ images, videos = [], type, status, title }: PropertyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const media = [
    ...images.map(src => ({ type: 'image', src })),
    ...videos.map(src => ({ type: 'video', src }))
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + media.length) % media.length);
  };

  const currentMedia = media[currentIndex];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden aspect-video bg-slate-900 relative shadow-sm border border-slate-200 group flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute h-full w-full cursor-grab active:cursor-grabbing flex items-center justify-center bg-black"
          >
            {currentMedia?.type === 'image' ? (
              <img
                src={currentMedia.src}
                alt={`${title} - view ${currentIndex + 1}`}
                className="h-full w-full object-cover"
                draggable={false}
              />
            ) : (
              <video
                src={currentMedia?.src}
                controls
                className="h-full w-full object-contain"
                draggable={false}
                controlsList="nodownload"
                playsInline
              />
            )}
          </motion.div>
        </AnimatePresence>

        {media.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <Badge variant="default" className="bg-slate-900/90 text-white backdrop-blur-sm border-none shadow-sm">
            {type.toUpperCase()}
          </Badge>
          {status === 'available' ? (
            <Badge variant="success" className="shadow-sm">AVAILABLE</Badge>
          ) : status === 'reserved' ? (
            <Badge variant="warning" className="shadow-sm bg-amber-500">RESERVED</Badge>
          ) : (
            <Badge variant="secondary" className="shadow-sm">SOLD</Badge>
          )}
        </div>
        
        {/* Indicators */}
        {media.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
            {media.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 w-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {media.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`relative h-20 w-32 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === idx ? 'border-emerald-500' : 'border-transparent hover:border-slate-300 bg-slate-100'
              }`}
            >
              {item.type === 'image' ? (
                <img src={item.src} alt={`View ${idx + 1}`} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-slate-900 text-white">
                  <Play className="h-8 w-8 opacity-50" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
