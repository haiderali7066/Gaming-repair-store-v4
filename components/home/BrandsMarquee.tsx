"use client";


const brands = [
  { name: "Apple", slug: "apple" },
  { name: "Dell", slug: "dell" },
  { name: "HP", slug: "hp" },
  { name: "Lenovo", slug: "lenovo" },
  { name: "ASUS", slug: "asus" },
  { name: "Acer", slug: "acer" },
  { name: "MSI", slug: "msi" },
  { name: "Razer", slug: "razer" },
  { name: "Corsair", slug: "corsair" },
  { name: "NVIDIA", slug: "nvidia" },
  { name: "AMD", slug: "amd" },
]

export default function BrandsMarquee() {


  return (
  <section>
    <div className="py-4 border-y border-slate-200 bg-violet-400 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee items-center gap-12 sm:gap-16 px-8">
          {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center shrink-0 opacity-100 hover:opacity-50 transition-opacity duration-300 cursor-default"
              title={brand.name}
            >
              <img 
                src={`https://cdn.simpleicons.org/${brand.slug}/64748b`} 
                alt={brand.name} 
                className="h-6 sm:h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Global marquee animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      </section>
  );
}