
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  Star, 
  ArrowRight, 
  Play, 
  Heart, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CakeSlice, 
  Sparkles, 
  User, 
  ChefHat,
  Info,
  ChevronRight,
  ShoppingCart,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { CAKES, STEPS, TESTIMONIALS, PERSONAS } from './constants';
import FloatingConfetti from './components/FloatingConfetti';
import CakeAssistant from './components/CakeAssistant';
import CreativeStudio from './components/CreativeStudio';
import Candle from './components/Candle';
import { Cake as CakeType } from './types';

type Page = 'home' | 'sur-mesure' | 'collection' | 'engagement';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const scaleX = useSpring(useTransform(scrollY, [0, 2000], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [animatingCart, setAnimatingCart] = useState(false);
  const [cartCake, setCartCake] = useState<CakeType | null>(null);
  const cakeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (animatingCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [animatingCart]);

  const handleOrder = (cake: CakeType) => {
    setCartCake(cake);
    setAnimatingCart(true);
    setTimeout(() => {
      setAnimatingCart(false);
      setCartCake(null);
      alert(`Le chef prépare déjà votre ${cake.name}. Une expérience inoubliable commence !`);
    }, 3500);
  };

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'sur-mesure', label: 'Sur Mesure' },
    { id: 'collection', label: 'Collection' },
    { id: 'engagement', label: 'Engagement' }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'sur-mesure':
        return (
          <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 text-center mb-16">
              <h1 className="italic text-chocolate">L'Art du Sur-Mesure</h1>
              <p className="text-chocolate/60 uppercase tracking-[0.5em] small-text font-black">Co-créez avec notre intelligence créative</p>
            </div>
            <CreativeStudio />
            <div className="mt-24">
              <CakeAssistant />
            </div>
          </div>
        );
      case 'collection':
        return (
          <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 text-center mb-16">
              <h1 className="italic text-chocolate">Le Catalogue des Sens</h1>
              <p className="text-chocolate/60 uppercase tracking-[0.5em] small-text font-black">Découvrez nos créations iconiques</p>
            </div>
            <section className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                {CAKES.map((cake, i) => (
                  <motion.div
                    key={cake.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative bg-white/40 p-10 md:p-12 lg:p-16 rounded-[4rem] hover:bg-white/80 transition-all border border-white/40 shadow-premium flex flex-col items-center text-center"
                  >
                    <div className="w-full max-w-[16rem] photo-frame-round overflow-hidden hover-lift -mt-20">
                      <img src={cake.image} alt={cake.name} />
                    </div>
                    <div className="mt-12 space-y-6">
                      <h3 className="italic text-chocolate text-2xl md:text-3xl">{cake.name}</h3>
                      <p className="text-chocolate/65 italic font-light leading-relaxed">{cake.description}</p>
                      <button 
                        onClick={() => handleOrder(cake)}
                        className="w-full bg-chocolate text-vanilla px-8 py-4 rounded-full flex items-center justify-center gap-4 hover:bg-strawberry transition-all uppercase tracking-widest cta-text"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Commander • {cake.price}€
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        );
      case 'engagement':
        return (
          <div className="pt-32 pb-24">
             <div className="container mx-auto px-4 text-center mb-16">
              <h1 className="italic text-chocolate">Nos Engagements</h1>
              <p className="text-chocolate/60 uppercase tracking-[0.5em] small-text font-black">Éthique, Passion et Bien-être</p>
            </div>
            <section className="container mx-auto px-4 max-w-4xl space-y-24">
              <div className="glass-panel p-12 md:p-20 rounded-[4rem] space-y-8">
                <div className="flex items-center gap-6">
                  <ChefHat className="w-12 h-12 text-gold" />
                  <h2 className="italic text-chocolate">Maîtrise Artisanale</h2>
                </div>
                <p className="text-chocolate/80 italic text-lg leading-loose">
                  Chaque pièce est confectionnée à la main dans notre atelier parisien. Nous marions les techniques ancestrales de la pâtisserie française avec les innovations nutritionnelles les plus avancées.
                </p>
              </div>
              <div className="glass-panel p-12 md:p-20 rounded-[4rem] space-y-8 bg-strawberry/5 border-strawberry/10">
                <div className="flex items-center gap-6">
                  <ShieldCheck className="w-12 h-12 text-strawberry" />
                  <h2 className="italic text-chocolate">Ingrédients d'Exception</h2>
                </div>
                <p className="text-chocolate/80 italic text-lg leading-loose">
                  Nous privilégions le circuit ultra-court. Nos fraises viennent d'un producteur local à moins de 50km, et notre chocolat est issu d'une filière éthique garantissant un revenu juste aux planteurs.
                </p>
              </div>
            </section>
          </div>
        );
      default:
        return (
          <>
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              <motion.div className="absolute inset-0 z-0 workshop-bg" />
              <div className="absolute inset-0 bg-gradient-to-b from-chocolate/50 via-chocolate/10 to-vanilla z-0" />
              <div className="container mx-auto px-4 z-10 pt-32 md:pt-40 lg:pt-0">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="glass-panel p-8 md:p-12 lg:p-24 rounded-[3rem] md:rounded-[6rem] text-chocolate backdrop-blur-3xl shadow-3xl text-center lg:text-left"
                  >
                    <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 mb-6 md:mb-10">
                      <ChefHat className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                      <span className="text-gold tracking-[0.3em] md:tracking-[0.5em] uppercase small-text font-black">
                        Manufacture d'Excellence
                      </span>
                    </div>
                    <h1 className="italic text-chocolate">
                      Transformez chaque <span className="text-gold underline decoration-gold/30">souvenir</span>.
                    </h1>
                    <p className="mb-10 md:mb-14 max-w-xl mx-auto lg:mx-0 italic font-light opacity-95 leading-relaxed text-chocolate">
                      L'excellence n'est pas un acte, c'est une promesse. Nous sculptons vos émotions dans la plus haute pâtisserie française, pour des instants de grâce absolue.
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8">
                      <button onClick={() => setCurrentPage('collection')} className="bg-chocolate text-vanilla px-10 py-5 md:px-12 md:py-6 rounded-full shadow-3xl hover:scale-105 transition-all group cta-text flex items-center gap-3 md:gap-4">
                        🎂 Commander mon gâteau
                      </button>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.6, delay: 0.4 }}
                    className="relative hidden lg:flex justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, -25, 0], rotate: [0, 2, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 w-full max-w-lg aspect-square photo-frame-round"
                    >
                      <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000" alt="Pièce maîtresse" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* QUICK PREVIEW */}
            <section className="py-24 bg-vanilla text-center">
              <div className="container mx-auto px-4">
                <h2 className="text-chocolate mb-16 italic">Nos Expériences Signature</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {PERSONAS.slice(0, 4).map(p => (
                    <div key={p.id} className="flex flex-col items-center p-8 glass-panel rounded-[3rem] hover:bg-white transition-all cursor-pointer" onClick={() => setCurrentPage('collection')}>
                      <div className="w-16 h-16 rounded-full bg-strawberry/5 flex items-center justify-center mb-6">
                        {p.icon}
                      </div>
                      <span className="small-text font-black uppercase tracking-widest text-chocolate">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-vanilla">
      {/* CINEMATIC ANIMATION OVERLAY */}
      <AnimatePresence>
        {animatingCart && cartCake && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-chocolate/95 backdrop-blur-3xl overflow-hidden"
          >
            <motion.div 
              initial={{ scale: 0.3, y: 150, opacity: 0 }}
              animate={{ scale: [0.3, 1.1, 1], y: 0, opacity: 1 }}
              transition={{ duration: 1.8, ease: "circOut" }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-64 h-64 md:w-[28rem] md:h-[28rem] photo-frame-round mb-8 shadow-[0_0_150px_rgba(245,193,108,0.35)]">
                <img src={cartCake.image} className="w-full h-full object-cover" alt={cartCake.name} />
              </div>
              <h2 className="text-vanilla italic mb-4 leading-tight">Une part d'éternité...</h2>
              <CheckCircle2 className="w-12 h-12 text-gold mt-8" />
            </motion.div>
            <FloatingConfetti />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-strawberry z-50 origin-left" style={{ scaleX }} />

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-40 px-4 py-4 md:px-6 md:py-6 flex justify-between items-center glass-panel-light shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 rounded-full bg-strawberry/10 flex items-center justify-center">
            <CakeSlice className="w-6 h-6 text-strawberry" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-chocolate tracking-widest uppercase text-[10px] font-black">L'Atelier</span>
            <span className="text-gold font-serif italic text-lg md:text-2xl">des Célébrations</span>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-10 text-chocolate font-bold tracking-[0.2em] uppercase small-text">
          {navLinks.map(link => (
            <button 
              key={link.id}
              onClick={() => setCurrentPage(link.id as Page)}
              className={`hover:text-strawberry transition-all relative group ${currentPage === link.id ? 'text-strawberry' : ''}`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-strawberry transition-all ${currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="bg-chocolate text-vanilla px-6 py-3 rounded-full shadow-lg hover:bg-strawberry transition-all flex items-center gap-2 cta-text uppercase tracking-widest">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Mon Salon</span>
          </button>
          <button className="lg:hidden text-chocolate" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[35] bg-vanilla pt-32 px-6 flex flex-col gap-8 text-center"
          >
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => { setCurrentPage(link.id as Page); setIsMenuOpen(false); }}
                className="text-2xl font-serif italic text-chocolate hover:text-strawberry"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {renderContent()}
      </main>

      {/* FOOTER SECTION WITH MORE VIVID PINK BACKGROUND */}
      <footer className="py-20 md:py-32 bg-[#F8BBD0] text-chocolate text-center border-t border-chocolate/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center gap-8 mb-16">
            <div className="w-16 h-16 rounded-full border border-chocolate/10 flex items-center justify-center shadow-inner bg-white/50 backdrop-blur-sm">
              <CakeSlice className="w-6 h-6 text-strawberry" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="uppercase tracking-[0.5em] font-black opacity-30 mb-2 small-text">L'Atelier</span>
              <span className="italic text-3xl md:text-4xl font-serif">des Célébrations</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-16 text-[10px] md:small-text uppercase tracking-widest font-bold">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => setCurrentPage(link.id as Page)} className="hover:text-strawberry transition-colors">
                {link.label}
              </button>
            ))}
          </div>

          <p className="tracking-[0.4em] font-light opacity-60 uppercase italic small-text">Maison d'Artisanat de Luxe — Fondée sur l'Émotion Pure.</p>
          <div className="mt-12 text-[10px] uppercase tracking-widest opacity-30">© 2025 Manufacture des Sens — Tous droits réservés</div>
        </div>
      </footer>

      {/* CREDITS SECTION - ALL BLACK AT THE VERY BOTTOM */}
      <div className="bg-black py-6 text-center">
        <p className="text-white text-[12px] uppercase tracking-[0.8em] font-bold">Powered by Brunel</p>
      </div>
    </div>
  );
};

export default App;
