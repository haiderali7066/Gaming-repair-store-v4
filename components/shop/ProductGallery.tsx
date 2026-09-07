
"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export function ProductGallery({
  images,
  name,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const currentImage = images[activeImage] || "/placeholder.svg";

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  return (
    <div className="w-full">

      {/* Main Image */}
      <div
        className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 sm:rounded-3xl"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={currentImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-200 ease-out"
          style={{
            transform: isZooming ? "scale(2)" : "scale(1)",
            transformOrigin: `${position.x}% ${position.y}%`,
          }}
        />

        {/* Zoom Indicator */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-4
            right-4
            rounded-full
            bg-black/60
            px-3
            py-1.5
            text-[10px]
            font-semibold
            text-white
            opacity-0
            backdrop-blur-md
            transition-opacity
            duration-200
            group-hover:opacity-100
          "
        >
          Move cursor to zoom
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none sm:mt-4 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`View ${name} image ${index + 1}`}
              className={`
                relative
                size-16
                shrink-0
                overflow-hidden
                rounded-xl
                border-2
                bg-slate-50
                transition-all
                sm:size-20
                ${
                  activeImage === index
                    ? "border-violet-500 shadow-sm"
                    : "border-transparent hover:border-slate-300"
                }
              `}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
