import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Utensils, ChevronRight, ConciergeBell, Clock, MessageCircle, MapPin, Sparkles, Share2, QrCode, Banknote, CreditCard, Flame, Wine } from 'lucide-react';
import { useStoreStatus } from '../../hooks/useStoreStatus';
import { HERO_SLIDES, MENU_ITEMS } from '../../data';
import { InfoCard, MobileActionButton, MenuItemCard, MenuItemModal } from '../Shared';
import { QRModal } from '../Modals';

export function HomeView({ setActiveTab, onOpenSchedule, onOpenPaymentQR, onOpenCash, onOpenBankTransfer, addToCart }: { 
  setActiveTab: (tab: 'inicio'|'carta')=>void, 
  onOpenSchedule: () => void, 
  onOpenPaymentQR: () => void,
  onOpenCash: () => void,
  onOpenBankTransfer: () => void,
  addToCart: (i:any, q:number, c:string)=>void 
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const isOpen = useStoreStatus();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleWhatsapp = () => {
    window.open('https://wa.me/51924725611?text=Hola,%20quisiera%20reservar%20una%20mesa%20en%20Mambo%20Club', '_blank');
  };

  const handleMap = () => {
    window.open('https://maps.google.com/?q=Av.+Bolognesi+111+Talara', '_blank');
  };

  return (
    <>
      <div className="w-full rounded-none md:rounded-3xl overflow-visible md:overflow-hidden md:shadow-2xl relative z-20 mb-8 md:mb-12">
        {/* DESKTOP HERO SLIDER */}
        <div className="hidden md:block relative h-[600px] w-full overflow-hidden bg-brand-black">
           <AnimatePresence mode="popLayout">
             <motion.img 
               key={`desktop-img-${slide.id}`}
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1.2 }}
               src={slide.image} 
               alt="Hero" 
               className="w-full h-full object-cover absolute inset-0"
             />
           </AnimatePresence>
           <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/60 to-transparent z-10" />
           <div className="absolute inset-0 flex flex-col justify-center px-16 max-w-3xl z-20">
              <AnimatePresence mode="popLayout">
                 <motion.h1 
                    key={`desktop-title-${slide.id}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="text-8xl font-sans font-black uppercase mb-6 tracking-tighter drop-shadow-lg text-white italic"
                 >
                   {slide.desktopTitle.split(' ')[0]} <br/> <span className="text-brand-orange">{slide.desktopTitle.split(' ')[1]}</span>
                 </motion.h1>
                 <motion.p 
                    key={`desktop-desc-${slide.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-xl mb-10 leading-relaxed text-white/80 font-medium"
                 >
                    <Flame className="inline text-brand-orange w-6 h-6 mr-3 -mt-1 animate-pulse"/>
                    {slide.desktopText}
                 </motion.p>
              </AnimatePresence>
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab('carta')}
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white px-10 py-5 rounded-full uppercase tracking-widest font-black text-sm transition-all flex items-center shadow-xl shadow-brand-orange/40 active:scale-95"
                >
                  EXPLORAR CARTA <ChevronRight className="ml-2 w-5 h-5"/>
                </button>
                <button 
                  onClick={handleWhatsapp}
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-10 py-5 rounded-full uppercase tracking-widest font-black text-sm transition-all flex items-center shadow-xl active:scale-95"
                >
                  RESERVAR MESA
                </button>
              </div>
           </div>
           
           {/* Slider Dots */}
           <div className="absolute bottom-10 left-16 flex gap-3 z-20">
             {HERO_SLIDES.map((s, i) => (
                <button 
                  key={s.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-12 bg-brand-orange' : 'w-4 bg-white/30 hover:bg-white/50'}`} 
                />
             ))}
           </div>
        </div>

        {/* MOBILE HERO SLIDER */}
        <div className="md:hidden relative w-full h-[280px] bg-brand-black">
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={`mobile-img-${slide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              src={slide.image} 
              alt="Mobile Hero" 
              className="w-full h-full object-cover absolute inset-0"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-brand-black/50 z-10"/>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-6 z-20">
             <AnimatePresence mode="popLayout">
               <motion.div
                 key={`mobile-text-${slide.id}`}
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -15 }}
                 className="text-center px-4"
               >
                 <h2 className="text-[48px] font-black text-white drop-shadow-2xl tracking-tighter leading-none uppercase italic">{slide.mobileTitle}</h2>
                 <p className="text-base font-black mt-3 text-brand-orange drop-shadow-lg uppercase tracking-[0.3em]">{slide.mobileSubtitle}</p>
               </motion.div>
             </AnimatePresence>
          </div>
          
          <button 
            onClick={() => setActiveTab('carta')}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-brand-orange text-white font-black text-sm tracking-[0.15em] px-10 py-5 rounded-full shadow-[0_12px_24px_rgba(255,107,0,0.4)] flex items-center justify-center active:scale-95 transition-transform z-30 whitespace-nowrap min-w-[220px] uppercase"
          >
             <ConciergeBell className="w-5 h-5 mr-3"/> VER CARTA
          </button>
        </div>
      </div>

      {/* MOBILE INFO SECTION */}
      <div className="md:hidden flex flex-col items-center px-6 text-center mb-12 w-full mx-auto mt-16 relative z-10">
        <div className="w-36 h-36 mb-6 p-1 bg-brand-cream-light rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-4 border-brand-orange">
           <img src="/logo.webp" alt="Logo Mambo Club Restobar" className="w-full h-full object-cover rounded-full" />
        </div>
        
        {isOpen ? (
          <div className="bg-orange-50 text-brand-orange font-black tracking-widest text-[10px] px-5 py-2 rounded-full mb-5 flex items-center gap-2 border border-brand-orange/20 z-10 relative">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"/> ABIERTO PARA TI
          </div>
        ) : (
          <div className="bg-zinc-100 text-zinc-500 font-black tracking-widest text-[10px] px-5 py-2 rounded-full mb-5 border border-zinc-200 z-10 relative">
            DISTRAÍDOS POR AHORA
          </div>
        )}
        
        <h1 className="text-5xl font-black tracking-tighter mb-4 text-brand-black uppercase italic">MAMBO CLUB <span className="text-brand-orange">RESTOBAR</span></h1>
        
        <div className="flex items-center w-full justify-center gap-4 mb-10 opacity-60 px-4">
           <div className="h-px bg-brand-black/20 flex-1"/>
           <span className="text-[10px] font-black tracking-[0.3em] text-brand-black uppercase">Brasas • Mar • Copas</span>
           <div className="h-px bg-brand-black/20 flex-1"/>
        </div>

        <div className="flex justify-center gap-6 w-full mb-10 px-2">
          <MobileActionButton icon={<Clock className="w-6 h-6"/>} label="HORARIOS" onClick={onOpenSchedule} />
          <MobileActionButton icon={<Wine className="w-6 h-6"/>} label="RESERVAS" active onClick={handleWhatsapp} />
          <MobileActionButton icon={<MapPin className="w-6 h-6"/>} label="UBICACIÓN" onClick={handleMap} />
        </div>

        <div className="flex items-center justify-center gap-3 mb-10 text-brand-black font-black text-sm shadow-sm bg-brand-cream-light py-4 px-8 rounded-3xl border border-brand-black/5">
           <MapPin className="w-5 h-5 text-brand-orange" />
           <span className="uppercase tracking-tight">Av. Bolognesi • Talara</span>
        </div>

        <div className="text-center px-4 text-brand-black/70 text-[15px] leading-relaxed mb-12">
           <p className="italic font-medium mb-10">
              "Vive una explosión de sabores. Desde lo más fresco del mar hasta el calor de nuestra parrilla, en Mambo celebramos la vida con cada bocado."
           </p>

           <div className="pt-10 border-t border-brand-black/5">
              <h3 className="text-[10px] font-black tracking-[0.3em] text-brand-black/40 uppercase mb-6">Medios de Pago</h3>
              <div className="grid grid-cols-3 gap-3">
                 <button 
                  onClick={onOpenPaymentQR}
                  className="bg-brand-cream-light p-5 rounded-3xl flex flex-col items-center gap-3 transition-all active:scale-95 border border-brand-black/5 shadow-sm"
                 >
                    <QrCode className="w-6 h-6 text-brand-orange" />
                    <span className="text-[9px] font-black text-brand-black tracking-widest">DIGITAL</span>
                 </button>
                 <button 
                  onClick={onOpenCash}
                  className="bg-brand-cream-light p-5 rounded-3xl flex flex-col items-center gap-3 transition-all active:scale-95 border border-brand-black/5 shadow-sm"
                 >
                    <Banknote className="w-6 h-6 text-brand-orange" />
                    <span className="text-[9px] font-black text-brand-black tracking-widest">EFECTIVO</span>
                 </button>
                 <button 
                    onClick={onOpenBankTransfer}
                    className="bg-brand-cream-light p-5 rounded-3xl flex flex-col items-center gap-3 transition-all active:scale-95 border border-brand-black/5 shadow-sm"
                 >
                    <CreditCard className="w-6 h-6 text-brand-orange" />
                    <span className="text-[9px] font-black text-brand-black tracking-widest">BANCOS</span>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* DESTACADOS SECTION */}
      <div className="pl-4 md:px-0 mb-20 mt-4 md:mt-0 overflow-hidden md:overflow-visible relative z-10 w-full">
        <div className="flex items-center justify-between mb-8 pr-6 md:pr-0">
          <h2 className="text-4xl font-black flex items-center tracking-tighter text-brand-black uppercase italic">
            <Sparkles className="text-brand-orange w-10 h-10 mr-4 animate-bounce"/> Recomendados del Chef
          </h2>
          <button onClick={() => setActiveTab('carta')} className="hidden md:flex text-sm font-black text-brand-orange hover:text-brand-orange-dark transition-colors items-center uppercase tracking-[0.2em] border-b-2 border-brand-orange/20 pb-1">
            VER CARTA COMPLETA <ChevronRight className="w-4 h-4 ml-2"/>
          </button>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-10 pr-6 md:pr-0 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-3 md:gap-10 md:pb-0">
          {MENU_ITEMS.filter(item => item.isTop).map((item) => (
             <div key={item.id} className="snap-center shrink-0 w-[300px] md:w-auto">
               <MenuItemCard item={item} onClick={() => setSelectedItem(item)} />
             </div>
          ))}
        </div>
      </div>

      {/* DESKTOP INFO CARDS */}
      <div className="hidden md:grid grid-cols-3 gap-10 mb-24 px-0">
         <InfoCard icon={<Clock className="text-brand-orange w-8 h-8"/>} title="Tu Momento Mambo" subtitle={isOpen ? "ABIERTO AHORA" : "CONSULTA HORARIOS"} onClick={onOpenSchedule} />
         <InfoCard icon={<MessageCircle className="text-brand-orange w-8 h-8"/>} title="Contacto Directo" subtitle="RESERVAS WHATSAPP" onClick={handleWhatsapp} />
         <InfoCard icon={<MapPin className="text-brand-orange w-8 h-8"/>} title="Encuéntranos" subtitle="AV. BOLOGNESI • TALARA" onClick={handleMap} />
      </div>

      {/* DESKTOP PAYMENT METHODS */}
      <div className="hidden md:flex flex-col items-center mb-24 px-0">
          <h3 className="text-[11px] font-black tracking-[0.5em] text-brand-black/30 uppercase mb-10">Experiencia de Pago Digital & Física</h3>
          <div className="flex gap-10">
            <button 
              onClick={onOpenPaymentQR}
              className="bg-brand-cream p-10 rounded-[40px] flex items-center gap-6 hover:border-brand-orange transition-all border border-brand-black/5 shadow-xl group hover:-translate-y-2 w-[300px]"
            >
              <div className="p-5 bg-brand-orange/10 rounded-3xl text-brand-orange group-hover:scale-110 transition-transform">
                <QrCode className="w-8 h-8" />
              </div>
              <div className="text-left">
                <p className="font-black text-xl text-brand-black tracking-tight">Cero Contacto</p>
                <p className="text-[11px] text-brand-black/40 font-black uppercase tracking-widest mt-1">Yape / Plin</p>
              </div>
            </button>
            <button 
              onClick={onOpenCash}
              className="bg-brand-cream p-10 rounded-[40px] flex items-center gap-6 hover:border-brand-orange transition-all border border-brand-black/5 shadow-xl group hover:-translate-y-2 w-[300px]"
            >
              <div className="p-5 bg-brand-orange/10 rounded-3xl text-brand-orange group-hover:scale-110 transition-transform">
                <Banknote className="w-8 h-8" />
              </div>
              <div className="text-left">
                <p className="font-black text-xl text-brand-black tracking-tight">Efectivo</p>
                <p className="text-[11px] text-brand-black/40 font-black uppercase tracking-widest mt-1">Moneda Local</p>
              </div>
            </button>
            <button 
              onClick={onOpenBankTransfer}
              className="bg-brand-cream p-10 rounded-[40px] flex items-center gap-6 hover:border-brand-orange transition-all border border-brand-black/5 shadow-xl group hover:-translate-y-2 w-[300px]"
            >
              <div className="p-5 bg-brand-orange/10 rounded-3xl text-brand-orange group-hover:scale-110 transition-transform">
                <CreditCard className="w-8 h-8" />
              </div>
              <div className="text-left">
                <p className="font-black text-xl text-brand-black tracking-tight">Bancario</p>
                <p className="text-[11px] text-brand-black/40 font-black uppercase tracking-widest mt-1">Transferencias</p>
              </div>
            </button>
          </div>
      </div>

      {/* SHARE SECTION */}
      <div className="px-4 md:px-0 mb-16 md:mb-24">
        <div className="bg-brand-black p-10 md:p-20 rounded-[60px] max-w-4xl mx-auto flex flex-col items-center text-center shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none text-white overflow-hidden">
             <Wine className="w-64 h-64 rotate-12"/>
          </div>
          <h3 className="text-3xl md:text-5xl font-black mb-5 relative z-10 text-white uppercase tracking-tighter italic">¿Brindamos en <span className="text-brand-orange">Mambo</span>?</h3>
          <p className="text-white/60 mb-10 relative z-10 max-w-lg mx-auto text-lg">Comparte la experiencia restobar más vibrante de Piura con tus amigos.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full relative z-10 max-w-md mx-auto">
            <button 
               onClick={() => {
                  if (navigator.share) {
                     navigator.share({ title: "Mambo Club Restobar", url: window.location.href });
                  } else {
                     handleWhatsapp();
                  }
               }}
               className="w-full sm:flex-1 bg-brand-orange hover:bg-white hover:text-brand-orange transition-all text-white font-black py-5 px-8 rounded-full flex items-center justify-center gap-3 shadow-2xl shadow-brand-orange/20 uppercase tracking-[0.2em] text-sm active:scale-95"
            >
              <Share2 className="w-5 h-5"/> COMPARTIR
            </button>
            <button 
              onClick={() => setShowQRModal(true)}
              className="w-full sm:flex-1 bg-white/5 hover:bg-white/10 border border-white/20 transition-all text-white font-black py-5 px-8 rounded-full flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm active:scale-95"
            >
              <QrCode className="w-5 h-5"/> QR APP
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FOOTER */}
      <footer className="md:hidden flex flex-col items-center justify-center py-12 pb-16 text-[10px] font-black text-brand-black/20 tracking-[0.5em] uppercase text-center px-4">
        <p className="mb-3">© 2026 MAMBO CLUB RESTOBAR | TALARA</p>
        <p className="opacity-50 tracking-[0.2em]">Crafted by Manguito Labs</p>
      </footer>

      <AnimatePresence>
        {selectedItem && (
          <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} onAdd={(q, c) => addToCart(selectedItem, q, c)} />
        )}
        {showQRModal && (
          <QRModal onClose={() => setShowQRModal(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
