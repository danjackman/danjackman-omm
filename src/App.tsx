import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Music, ChevronRight, ChevronLeft } from 'lucide-react';

const cities = [
  { name: 'Los Angeles', image: '/src/assets/images/map_la_1779206307407.png' },
  { name: 'Seattle', image: '/src/assets/images/map_seattle_1779206321891.png' },
  { name: 'San Francisco', image: '/src/assets/images/map_sf_1779206336978.png' },
  { name: 'Dallas', image: '/src/assets/images/map_dallas_1779206350617.png' },
  { name: 'Chicago', image: '/src/assets/images/map_chicago_1779206365221.png' },
  { name: 'Nashville', image: '/src/assets/images/map_nashville_1779206381106.png' },
  { name: 'New York City', image: '/src/assets/images/map_nyc_1779206398350.png' },
];

export default function App() {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCityIndex((prev) => (prev + 1) % cities.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextCity = () => setCurrentCityIndex((prev) => (prev + 1) % cities.length);
  const prevCity = () => setCurrentCityIndex((prev) => (prev - 1 + cities.length) % cities.length);

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      {/* Header */}
      <header className="p-6 flex justify-center md:justify-start items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <img 
            src="/logo.png" 
            alt="Open Mic Mapper Logo" 
            className="h-12 md:h-16 object-contain"
            onError={(e) => {
              // Fallback for demo if logo is missing
              (e.target as HTMLImageElement).src = 'https://placehold.co/200x80/0B0B3B/FFFFFF?text=Open+Mic+Mapper';
            }}
          />
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center max-w-7xl mx-auto w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center w-full">
          
          {/* Left: Content */}
          <div className="text-center lg:text-left mb-12 lg:mb-0">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl md:text-7xl font-bold text-brand-blue leading-tight mb-6"
            >
              The Stage is <br/>
              <span className="text-brand-purple">Calling You.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-on-surface opacity-80 mb-10 max-w-xl mx-auto lg:mx-0"
            >
              Find every open mic night in your city. From dive bars, coffee shops to legendary stages, 
              we're mapping the live music, comedy, poetry, rap scene and more so you never miss a beat.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button 
                onClick={() => {
                   window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
                className="bg-primary hover:bg-primary/90 text-on-primary px-8 py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <Mail size={20} />
                Notify Me When We Launch
              </button>
            </motion.div>
          </div>

          {/* Right: Carousel */}
          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative aspect-square md:aspect-video lg:aspect-square bg-surface-variant rounded-[40px] overflow-hidden shadow-2xl border-4 border-white"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={cities[currentCityIndex].name}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={cities[currentCityIndex].image} 
                    alt={`Map of ${cities[currentCityIndex].name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white text-left">
                    <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest opacity-80 mb-1">
                      <MapPin size={14} />
                      Live in
                    </p>
                    <h3 className="text-3xl font-bold font-display">{cities[currentCityIndex].name}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <button 
                onClick={prevCity}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextCity}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>

              {/* Progress Dots */}
              <div className="absolute bottom-4 right-8 flex gap-2">
                {cities.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentCityIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floaties */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
                  <Music size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm">42 New Venues</p>
                  <p className="text-xs opacity-60">Added today</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Dark Footer */}
      <footer className="bg-brand-blue text-white p-12 mt-12 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm opacity-40">
            &copy; {new Date().getFullYear()} Open Mic Mapper. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

