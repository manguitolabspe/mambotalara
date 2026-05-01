import React, { useState } from 'react';
import { User, LogOut, Award, Calendar, Ticket, Star, QrCode, CheckCircle2, Gift, Flame, MapPin, Clock, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function ClienteView({ onLogout }: { onLogout: () => void }) {
  const [clientTab, setClientTab] = useState<'vip' | 'eventos' | 'promociones'>('vip');
  
  // Demo State for Loyalty
  const [stamps, setStamps] = useState(4);
  const totalStampsRequired = 10;
  const [points, setPoints] = useState(1250);
  const [level, setLevel] = useState<'BRONCE' | 'PLATA' | 'ORO'>('BRONCE');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  const addStamp = () => {
    if (stamps < totalStampsRequired) {
      setStamps(prev => prev + 1);
      setPoints(prev => prev + 100);
      
      // Level check demo
      if (points + 100 >= 2000) setLevel('PLATA');
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 text-brand-black">
      
      {/* Header Perfil */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl mb-12 border-b border-brand-black/10 pb-8 gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-brand-orange rounded-3xl flex items-center justify-center shadow-lg shadow-brand-orange/20 relative overflow-hidden group">
             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
             <User className="w-10 h-10 text-white relative z-10" />
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-black tracking-tighter text-brand-black uppercase italic">Hola, Juan</h2>
            <div className="flex items-center gap-3">
              <p className={`text-[10px] font-black tracking-[0.2em] px-3 py-1 rounded-lg shadow-sm ${
                level === 'BRONCE' ? 'bg-orange-800 text-white' : 
                level === 'PLATA' ? 'bg-zinc-400 text-white' : 'bg-brand-orange text-white shadow-brand-orange/40 shadow-lg'
              }`}>
                NIVEL {level}
              </p>
              <span className="text-brand-black/40 text-[10px] font-black tracking-widest uppercase">MAMBO FAN DESDE 2024</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-black text-brand-orange tracking-[0.2em] uppercase opacity-70 mb-1">MamboPoints</p>
            <p className="text-3xl font-black text-brand-black italic tracking-tighter">{points.toLocaleString()}</p>
          </div>
          <button 
            onClick={onLogout}
            className="bg-brand-cream-light hover:bg-brand-black/5 text-brand-black/40 hover:text-brand-black p-4 rounded-2xl transition-all border border-brand-black/5 flex items-center gap-3 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black md:hidden uppercase tracking-widest">SALIR</span>
          </button>
        </div>
      </div>

      {/* Navegación Interna */}
      <nav className="flex gap-1 md:gap-4 font-black text-xs md:text-sm tracking-widest mb-12 overflow-x-auto whitespace-nowrap px-4 py-2 w-full max-w-4xl justify-start md:justify-center no-scrollbar">
        {[
          { id: 'vip', label: 'ZONA VIP', icon: Award },
          { id: 'eventos', label: 'PRÓXIMOS EVENTOS', icon: Calendar },
          { id: 'promociones', label: 'CUPONES', icon: Ticket },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setClientTab(tab.id as any)} 
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all uppercase text-[10px] tracking-[0.2em] ${clientTab === tab.id ? 'bg-brand-black text-white shadow-xl shadow-brand-black/20' : 'text-brand-black/40 hover:text-brand-black hover:bg-brand-black/5'}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </nav>

      {/* Contenido Dinámico */}
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {clientTab === 'vip' && (
            <motion.div 
              key="vip" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-10 text-left"
            >
              {/* Tarjeta de Fidelidad */}
              <div className="bg-brand-black rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-[2000ms] text-white">
                  <Flame className="w-64 h-64" />
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-orange opacity-10 blur-3xl rounded-full" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-2 text-white italic uppercase tracking-tight">Pasaporte Mambo</h3>
                    <p className="text-brand-orange/60 text-sm font-bold uppercase tracking-widest">Vive la experiencia y colecciona sellos para premios únicos.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-8 py-5 rounded-[24px] border border-white/10 flex flex-col items-center relative z-10 min-w-[150px] shadow-inner">
                    <span className="text-[10px] font-black text-brand-orange tracking-[0.3em] uppercase opacity-70 mb-2">Tu Perfil</span>
                    <span className="text-3xl font-black text-white italic">{stamps}/{totalStampsRequired}</span>
                  </div>
                </div>

                {/* Grilla de Sellos */}
                <div className="grid grid-cols-5 md:grid-cols-10 gap-3 md:gap-5 mb-10 relative z-10">
                  {Array.from({ length: totalStampsRequired }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-[20px] border-2 flex items-center justify-center transition-all duration-700 shadow-sm ${
                        i < stamps 
                          ? 'bg-brand-orange border-brand-orange text-white shadow-brand-orange/30 shadow-lg scale-105' 
                          : 'bg-white/5 border-white/5 text-white/5'
                      }`}
                    >
                      {i < stamps ? <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" /> : <Star className="w-5 h-5 opacity-20" />}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
                  <button 
                    onClick={addStamp}
                    className="w-full md:w-auto bg-brand-orange hover:bg-brand-black text-white font-black px-10 py-5 rounded-[24px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-brand-orange/20 uppercase text-xs tracking-widest italic"
                  >
                    <QrCode className="w-6 h-6" /> REGISTRAR SELLO
                  </button>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] text-center md:text-left leading-relaxed max-w-sm">
                    * Muestra tu código al llegar al restaurante y suma beneficios exclusivos
                  </p>
                </div>
              </div>

              {/* MamboPoints Detail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-brand-cream border border-brand-black/5 rounded-[40px] p-10 flex flex-col items-center text-center group hover:border-brand-orange/30 transition-all shadow-sm">
                    <div className="w-20 h-20 bg-brand-orange/10 rounded-3xl flex items-center justify-center mb-6 border border-brand-orange/5">
                       <Star className="text-brand-orange w-10 h-10 fill-current shadow-lg" />
                    </div>
                    <h4 className="text-xl font-black mb-2 tracking-tight text-brand-black uppercase italic">Balance Actual</h4>
                    <p className="text-6xl font-black text-brand-black mb-3 tracking-tighter">{points}</p>
                    <p className="text-[10px] text-brand-black/30 uppercase font-black tracking-[0.3em]">MamboPoints Canjeables</p>
                 </div>
                 <div className="bg-brand-cream border border-brand-black/5 rounded-[40px] p-10 flex flex-col justify-center shadow-sm">
                    <h4 className="text-xl font-black mb-4 tracking-tight text-brand-black uppercase italic">Siguiente Rango</h4>
                    <div className="flex justify-between items-end mb-3">
                       <span className="text-[10px] font-black text-brand-black/30 tracking-widest uppercase">Actual: Bronce</span>
                       <span className="text-[10px] font-black text-brand-orange tracking-widest uppercase italic">Meta: Plata (2000)</span>
                    </div>
                    <div className="w-full bg-brand-cream-light h-4 rounded-full overflow-hidden mb-6 border border-brand-black/5 relative">
                       <div className="bg-brand-orange h-full transition-all duration-1000 shadow-md" style={{ width: `${(points/2000)*100}%` }} />
                    </div>
                    <p className="text-[11px] text-brand-black/40 font-bold uppercase tracking-wide leading-relaxed">Te faltan <span className="text-brand-orange font-black italic">{2000 - points}</span> puntos para desbloquear privilegios Plata.</p>
                 </div>
              </div>
            </motion.div>
          )}

          {clientTab === 'eventos' && (
            <motion.div 
              key="eventos" 
              initial={{ opacity: 0, x: 10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:text-left"
            >
              {[
                {
                  title: "Noche de Grill & Cocktails",
                  date: "Viernes 28 de Mayo",
                  time: "07:30 PM",
                  image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&h=500&q=80",
                  tag: "Mambo Night"
                },
                {
                  title: "Festival Parrillero Mambo",
                  date: "Domingo 30 de Mayo",
                  time: "12:00 PM",
                  image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&h=500&q=80",
                  tag: "Brasas & Sabor"
                }
              ].map((ev, i) => (
                <div key={i} className="bg-brand-cream rounded-[40px] overflow-hidden shadow-sm group hover:shadow-xl hover:border-brand-orange/20 border border-brand-black/5 transition-all duration-700">
                  <div className="h-56 overflow-hidden relative">
                    <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 bg-brand-black text-white text-[10px] font-black px-4 py-2 rounded-2xl uppercase tracking-widest shadow-xl italic">
                      {ev.tag}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-black mb-6 tracking-tight group-hover:text-brand-orange transition-colors uppercase italic leading-tight">{ev.title}</h4>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-xs text-brand-black/60 font-black uppercase tracking-widest">
                        <Calendar className="w-5 h-5 mr-3 text-brand-orange" /> {ev.date}
                      </div>
                      <div className="flex items-center text-xs text-brand-black/60 font-black uppercase tracking-widest">
                        <Clock className="w-5 h-5 mr-3 text-brand-orange" /> {ev.time}
                      </div>
                      <div className="flex items-center text-xs text-brand-black/60 font-black uppercase tracking-widest">
                        <MapPin className="w-5 h-5 mr-3 text-brand-orange" /> Calle Las Brasas 456
                      </div>
                    </div>
                    <button className="w-full py-5 bg-brand-cream-light hover:bg-brand-orange hover:text-white rounded-[24px] font-black text-[10px] uppercase tracking-[0.3em] transition-all border border-brand-black/5 active:scale-95 italic">
                      RESERVAR LUGAR
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {clientTab === 'promociones' && (
            <motion.div 
              key="promociones" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
            >
              {[
                { title: "2x1 en Chilcanos Clásicos", desc: "Válido de Lunes a Miércoles de 5pm a 9pm.", code: "CHILCANO2X1", expires: "Vence en 3 días" },
                { title: "Parrilla Mambo -30%", desc: "Descuento directo en nuestra parrillada personal durante toda la semana.", code: "MAMBO30", expires: "Vence hoy" },
                { title: "Cerveza Helada x Sello", desc: "Canjea una rubia bien helada por cada 2 sellos registrados.", code: "BREWFREE", expires: "Vence mañana" },
                { title: "Postre de Cortesía", desc: "Suspiro a la limeña gratis por consumos mayores a S/ 100.", code: "MAMBOSWEET", expires: "Vence en 5 días" }
              ].map((promo, i) => (
                <div key={i} className="group relative">
                  {/* Coupon Design */}
                  <div className="bg-brand-cream p-8 rounded-[40px] border-2 border-brand-black/5 flex flex-col justify-between min-h-[250px] relative overflow-hidden shadow-sm hover:border-brand-orange/20 transition-all">
                    {/* Punch holes effect */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-cream-light rounded-full border-r-2 border-brand-black/5" />
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-cream-light rounded-full border-l-2 border-brand-black/5" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-brand-orange/10 text-brand-orange text-[10px] font-black px-3 py-1.5 rounded-lg border border-brand-orange/10 tracking-[0.2em] uppercase italic">
                          OFERTA VIP
                        </div>
                        <span className="text-[10px] text-brand-black/30 font-black uppercase tracking-widest">{promo.expires}</span>
                      </div>
                      <h4 className="text-2xl font-black mb-3 leading-tight text-brand-black uppercase italic">{promo.title}</h4>
                      <p className="text-xs text-brand-black/50 font-bold leading-relaxed mb-8 uppercase tracking-wide">{promo.desc}</p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between pt-6 border-t-2 border-dashed border-brand-black/5">
                      <div className="text-[11px] font-mono font-black text-brand-black/20 tracking-widest uppercase">COD: {promo.code}</div>
                      <button 
                        onClick={() => setSelectedCoupon(promo)}
                        className="bg-brand-black hover:bg-brand-black/90 text-white px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-black/20 uppercase italic"
                      >
                        RECLAMAR HOY
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Coupon QR Modal */}
      <AnimatePresence>
        {selectedCoupon && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCoupon(null)}
              className="absolute inset-0 bg-brand-black/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-brand-cream-light rounded-[48px] p-10 border border-white/10 text-center shadow-2xl"
            >
              <button 
                onClick={() => setSelectedCoupon(null)} 
                className="absolute top-6 right-6 text-brand-black/20 hover:text-brand-black transition-colors"
              >
                <div className="flex items-center gap-2 font-black text-[10px] tracking-[0.2em] uppercase">
                   CERRAR <X className="w-5 h-5" />
                </div>
              </button>

              <div className="mb-8 mt-4">
                <div className="w-20 h-20 bg-brand-orange rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-orange/20">
                  <Ticket className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-3 text-brand-black uppercase italic tracking-tight">{selectedCoupon.title}</h3>
                <p className="text-sm text-brand-black/50 font-bold uppercase tracking-wide px-4">Muestra este código al llegar a tu mesa para validar el beneficio.</p>
              </div>

              <div className="bg-brand-cream p-8 rounded-[40px] mb-8 shadow-inner border border-brand-black/5">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=COUPON_${selectedCoupon.code}`} 
                  alt="QR Promo"
                  className="w-full aspect-square object-contain"
                />
                <div className="mt-6 flex flex-col items-center">
                  <span className="text-[11px] font-black text-brand-black/10 tracking-[0.4em] uppercase mb-1">ID ÚNICO DE CANJE</span>
                  <span className="text-base font-mono font-black text-brand-orange uppercase">#{Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
              </div>

              <div className="bg-brand-black/5 p-6 rounded-3xl border border-brand-black/5">
                <p className="text-[10px] text-brand-black/40 font-black uppercase leading-relaxed italic tracking-widest">
                   Cupón personal e intransferible. Válido solo por este período promocional.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
