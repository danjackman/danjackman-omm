import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Music, ChevronRight, ChevronLeft, X, CheckCircle2, Loader2 } from 'lucide-react';

import logo from './assets/logo.png';
import mapLa from './assets/images/map_la_1779206307407.png';
import mapSeattle from './assets/images/map_seattle_1779206321891.png';
import mapSf from './assets/images/map_sf_1779206336978.png';
import mapDallas from './assets/images/map_dallas_1779206350617.png';
import mapChicago from './assets/images/map_chicago_1779206365221.png';
import mapNashville from './assets/images/map_nashville_1779206381106.png';
import mapNyc from './assets/images/map_nyc_1779206398350.png';

// Import performance images
import perf1 from './assets/images/performance_comedian_1779221506719.png';
import perf2 from './assets/images/performance_singer_piano_1779221521191.png';
import perf3 from './assets/images/performance_rapper_1779221540079.png';
import perf4 from './assets/images/performance_guitarist_close_1779221554366.png';
import perf5 from './assets/images/performance_poet_1779221570203.png';
import perf6 from './assets/images/performance_clown_sign_1779221584582.png';
import perf7 from './assets/images/performance_jazz_trio_1779221600307.png';
import perf8 from './assets/images/performance_ballad_singer_1779221618285.png';

const performanceImages = [perf1, perf2, perf3, perf4, perf5, perf6, perf7, perf8];

const cities = [
  { name: 'Los Angeles', image: mapLa },
  { name: 'Seattle', image: mapSeattle },
  { name: 'San Francisco', image: mapSf },
  { name: 'Dallas', image: mapDallas },
  { name: 'Chicago', image: mapChicago },
  { name: 'Nashville', image: mapNashville },
  { name: 'New York City', image: mapNyc },
];

export default function App() {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [shuffledGallery, setShuffledGallery] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCityIndex((prev) => (prev + 1) % cities.length);
    }, 5000);

    // Shuffle performance images
    const shuffled = [...performanceImages].sort(() => Math.random() - 0.5);
    setShuffledGallery(shuffled);

    return () => clearInterval(timer);
  }, []);

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d04e622b-d99b-4a3b-9a11-7ba654897e6d",
          name: formData.name,
          email: formData.email,
          message: formData.message || "New signup for waiting list",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            src={logo} 
            alt="Open Mic Mapper Logo" 
            className="h-12 md:h-16 object-contain"
            onError={(e) => {
              // Fallback for demo if logo is missing
              (e.target as HTMLImageElement).src = 'https://placehold.co/200x80/01041b/FFFFFF?text=Open+Mic+Mapper';
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
                onClick={() => setIsModalOpen(true)}
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

        {/* Randomized Performance Gallery */}
        <section className="w-full mt-24 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {shuffledGallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="aspect-video rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-white group"
              >
                <img 
                  src={img} 
                  alt={`Performance ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-sm mt-8 font-medium tracking-widest uppercase italic"
          >
            Capturing the spirit of the stage
          </motion.p>
        </section>
      </main>

      {/* Dark Footer */}
      <footer className="bg-brand-blue text-white p-12 mt-12 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm opacity-40">
            &copy; {new Date().getFullYear()} Open Mic Mapper. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modal Backdrop and Content */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setTimeout(() => setIsSubmitted(false), 300);
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] transition-all cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[32px] shadow-2xl p-8 z-[60] overflow-hidden"
            >
              <button 
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setTimeout(() => setIsSubmitted(false), 300);
                }}
                className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900 z-[70] cursor-pointer"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-6">
                        <CheckCircle2 size={32} />
                      </div>
                      <h2 className="text-3xl font-bold text-brand-blue font-display mb-2">You're on the list!</h2>
                      <p className="text-gray-600 text-lg">We'll let you know the second the curtains rise in your city.</p>
                      <button 
                         onClick={() => {
                           setIsModalOpen(false);
                           setTimeout(() => setIsSubmitted(false), 300);
                         }}
                        className="mt-8 bg-brand-blue text-white w-full py-4 rounded-2xl font-bold hover:bg-brand-purple transition-all"
                      >
                        Great!
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="mb-8">
                        <h2 className="text-3xl font-bold text-brand-blue font-display mb-2">Join the Watch</h2>
                        <p className="text-gray-600">Be the first to see the map when we launch. Enter your details below.</p>
                      </div>

                      <form onSubmit={handleNotifyMe} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1" htmlFor="name">Full Name</label>
                          <input 
                            required
                            type="text" 
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1" htmlFor="email">Email Address</label>
                          <input 
                            required
                            type="email" 
                            id="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1" htmlFor="message">Note (Optional)</label>
                          <textarea 
                            id="message"
                            rows={3}
                            placeholder="Tell us your city..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all resize-none"
                          />
                        </div>
                        <button 
                          disabled={isSubmitting}
                          type="submit"
                          className="w-full bg-brand-blue text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-purple transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg hover:shadow-xl active:scale-95"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin" size={20} />
                              Sending...
                            </>
                          ) : (
                            'Sign Me Up'
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

