import React, { useState, useEffect } from 'react';
import { User, LogOut, Award, Calendar, Ticket, Star, QrCode, CheckCircle2, Gift, Flame, MapPin, Clock, X, Utensils } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function ClienteView({ 
  onLogout, 
  initialTab = 'perfil',
  isVipPassPurchased,
  setIsVipPassPurchased
}: { 
  onLogout: () => void, 
  initialTab?: 'perfil' | 'vip' | 'eventos' | 'promociones',
  isVipPassPurchased: boolean,
  setIsVipPassPurchased: (v: boolean) => void
}) {
  const [clientTab, setClientTab] = useState<'perfil' | 'vip' | 'eventos' | 'promociones'>(initialTab);
  
  // Use a second effect or just update if initialTab changes in the parent
  useEffect(() => {
    setClientTab(initialTab);
  }, [initialTab]);
  
  // Demo State for Loyalty
  const [stamps, setStamps] = useState(4);
  const totalStampsRequired = 10;
  const [points, setPoints] = useState(1250);
  const [level, setLevel] = useState<'BRONCE' | 'PLATA' | 'ORO'>('BRONCE');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [showPurchaseSimulation, setShowPurchaseSimulation] = useState(false);

  // Profile Sub-tabs logic
  const [profileTab, setProfileTab] = useState<'resumen' | 'logros'>('resumen');

  const addStamp = () => {
    if (stamps < totalStampsRequired) {
      setStamps(prev => prev + 1);
      setPoints(prev => prev + 100);
      
      // Level check demo
      if (points + 100 >= 2000) setLevel('PLATA');
    }
  };

  const handlePurchaseVip = () => {
    setShowPurchaseSimulation(true);
    setTimeout(() => {
      setIsVipPassPurchased(true);
      setShowPurchaseSimulation(false);
    }, 2000);
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
          {initialTab !== 'perfil' && (
            <button 
              onClick={onLogout}
              className="bg-brand-cream-light hover:bg-brand-black/5 text-brand-black/40 hover:text-brand-black p-4 rounded-2xl transition-all border border-brand-black/5 flex items-center gap-3 group"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-black md:hidden uppercase tracking-widest">SALIR</span>
            </button>
          )}
        </div>
      </div>

      {/* Navegación Interna - Se oculta si estamos solo en perfil */}
      {initialTab !== 'perfil' && (
        <nav className="flex gap-1 md:gap-4 font-black text-xs md:text-sm tracking-widest mb-12 overflow-x-auto whitespace-nowrap px-4 py-2 w-full max-w-4xl justify-start md:justify-center no-scrollbar">
          {[
            { id: 'vip', label: 'FIDELIDAD', icon: Award },
            { id: 'eventos', label: 'EVENTOS', icon: Calendar },
            { id: 'promociones', label: 'CARTILLA VIP', icon: Ticket },
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
      )}

      {/* Título y Cerrar Sesión solo para la vista Perfil */}
      {initialTab === 'perfil' && (
        <div className="w-full max-w-4xl mb-6 flex justify-between items-center px-4">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Tu Perfil</h2>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-[10px] font-black text-red-500 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl border border-red-100 transition-colors uppercase tracking-widest"
          >
            <LogOut className="w-3 h-3" /> CERRAR SESIÓN
          </button>
        </div>
      )}

      {/* Contenido Dinámico */}
      <div className="w-full max-w-4xl">
        {clientTab === 'perfil' && (
          <div 
            key="perfil" 
            className="space-y-8 text-left"
          >
            {/* Profile Tabs */}
            <div className="flex gap-8 border-b border-brand-black/5 mb-8">
              <button 
                onClick={() => setProfileTab('resumen')}
                className={`pb-4 text-xs font-black tracking-widest uppercase transition-all border-b-2 ${profileTab === 'resumen' ? 'border-brand-orange text-brand-black' : 'border-transparent text-brand-black/30'}`}
              >
                Resumen de Actividad
              </button>
              <button 
                onClick={() => setProfileTab('logros')}
                className={`pb-4 text-xs font-black tracking-widest uppercase transition-all border-b-2 ${profileTab === 'logros' ? 'border-brand-orange text-brand-black' : 'border-transparent text-brand-black/30'}`}
              >
                Mis Logros
              </button>
            </div>

            {profileTab === 'resumen' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-brand-black/5 p-8 rounded-[32px] shadow-sm">
                  <p className="text-[10px] font-black text-brand-orange tracking-widest uppercase mb-4">Total Gastado</p>
                  <p className="text-4xl font-black italic tracking-tighter">S/ 480.00</p>
                  <p className="text-[10px] text-brand-black/30 mt-2 font-bold">EN LAS ÚLTIMAS 4 VISITAS</p>
                </div>
                <div className="bg-white border border-brand-black/5 p-8 rounded-[32px] shadow-sm">
                  <p className="text-[10px] font-black text-brand-orange tracking-widest uppercase mb-4">Visitas Mensuales</p>
                  <p className="text-4xl font-black italic tracking-tighter">12</p>
                  <p className="text-[10px] text-brand-black/30 mt-2 font-bold">PROMEDIO DE 3 POR SEMANA</p>
                </div>
                <div className="bg-white border border-brand-black/5 p-8 rounded-[32px] shadow-sm">
                  <p className="text-[10px] font-black text-brand-orange tracking-widest uppercase mb-4">Ahorro Total VIP</p>
                  <p className="text-4xl font-black italic tracking-tighter text-green-600">S/ 125.50</p>
                  <p className="text-[10px] text-brand-black/30 mt-2 font-bold">GRACIAS A TU CARTILLA</p>
                </div>

                <div className="md:col-span-3 bg-brand-black text-white p-10 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h4 className="text-2xl font-black italic uppercase tracking-tight mb-2">Estado de Fidelidad</h4>
                    <p className="text-white/50 text-sm font-bold uppercase tracking-wide">Estás a solo <span className="text-brand-orange">6 sellos</span> de tu próximo plato de cortesía.</p>
                  </div>
                  <div className="flex gap-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i < stamps ? 'bg-brand-orange shadow-lg shadow-brand-orange/40' : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <button onClick={() => setClientTab('vip')} className="bg-white text-brand-black font-black px-8 py-4 rounded-2xl text-[10px] tracking-widest uppercase italic hover:bg-brand-orange hover:text-white transition-all">
                    VER DETALLE
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { icon: Flame, title: "Fuego Inicial", desc: "Primera visita realizada", earned: true },
                  { icon: Star, title: "Cliente Fiel", desc: "Has venido 5 veces", earned: true },
                  { icon: Award, title: "Crítico Junior", desc: "Dejaste tu primera reseña", earned: true },
                  { icon: Utensils, title: "Chef's Fan", desc: "Probaste 3 platos recomendados", earned: false },
                ].map((logro, i) => (
                  <div key={i} className={`p-8 rounded-[32px] border flex flex-col items-center gap-4 transition-all ${logro.earned ? 'bg-white border-brand-black/5 shadow-sm' : 'bg-brand-black/5 border-transparent opacity-40 grayscale'}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${logro.earned ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-black/10 text-brand-black'}`}>
                      <logro.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black uppercase tracking-tight mb-1">{logro.title}</h5>
                      <p className="text-[9px] font-bold text-brand-black/40 uppercase leading-tight">{logro.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {clientTab === 'vip' && (
          <div 
            key="vip" 
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
          </div>
        )}

        {clientTab === 'eventos' && (
          <div 
            key="eventos" 
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
          </div>
        )}

        {clientTab === 'promociones' && (
          <div 
            key="promociones" 
            className="space-y-8 text-left"
          >
            {!isVipPassPurchased ? (
              <div className="bg-brand-black rounded-[48px] p-12 text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none text-white">
                    <Ticket className="w-64 h-64" />
                 </div>
                 <div className="relative z-10 max-w-xl mx-auto">
                    <div className="w-20 h-20 bg-brand-orange rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-orange/40">
                       <Award className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Cartilla VIP Golden Pass</h3>
                    <p className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-8 text-sm">Desbloquea ahorros de más de S/ 200 hoy mismo</p>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-10 border border-white/10 text-left">
                      <ul className="space-y-4">
                        {[
                          "Acceso a platos secretos fuera de carta",
                          "Descuentos de hasta 40% en platos seleccionados",
                          "2x1 en cocktails clásicos permanentes",
                          "Pre-venta exclusiva para eventos especiales"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-4 text-white/80 text-xs font-bold uppercase tracking-wide">
                            <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                      <div className="flex items-baseline gap-3">
                        <span className="text-white/40 line-through text-lg font-black italic lowercase">S/ 99</span>
                        <span className="text-white text-5xl font-black italic tracking-tighter uppercase">S/ 49.90</span>
                      </div>
                      <button 
                        onClick={handlePurchaseVip}
                        disabled={showPurchaseSimulation}
                        className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-black py-6 rounded-[24px] shadow-2xl shadow-brand-orange/30 transition-all active:scale-95 uppercase text-sm tracking-widest italic disabled:opacity-50"
                      >
                        {showPurchaseSimulation ? "PROCESANDO PAGO..." : "ADQUIRIR MI GOLDEN PASS"}
                      </button>
                      <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Pago único mensual • Renovación opcional</p>
                    </div>
                 </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div className="bg-green-100 text-green-600 px-6 py-3 rounded-2xl flex items-center gap-3 border border-green-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">GOLDEN PASS ACTIVO</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-brand-black/30 uppercase tracking-widest mb-1">Ahorro proyectado</p>
                    <p className="text-2xl font-black text-brand-black italic">S/ 245.00</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Sashimi de Cortesía", desc: "Plato exclusivo para socios GOLDEN PASS en cada visita.", code: "GOLDVIP1", savings: "S/ 35.00" },
                    { title: "Brasas Mambo al 40%", desc: "Descuento VIP en todos los cortes de carne de la casa.", code: "GOLDVIP2", savings: "S/ 48.00" },
                    { title: "Barra Libre Cocktails", desc: "Acceso a la barra libre los sábados de 8pm a 10pm.", code: "GOLDVIP3", savings: "S/ 85.00" },
                    { title: "Evento: Cena Maridaje", desc: "Entrada gratuita para ti y un acompañante.", code: "GOLDVIP4", savings: "S/ 120.00" }
                  ].map((promo, i) => (
                    <div key={i} className="group relative">
                      <div className="bg-brand-black p-8 rounded-[40px] border border-white/5 flex flex-col justify-between min-h-[250px] relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-brand-orange">
                          <Award className="w-32 h-32" />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-6">
                            <div className="bg-brand-orange/20 text-brand-orange text-[10px] font-black px-3 py-1.5 rounded-lg border border-brand-orange/20 tracking-[0.2em] uppercase italic">
                              EXCLUSIVO SOCIO
                            </div>
                            <span className="text-[10px] text-brand-orange font-black uppercase tracking-widest">Ahorras {promo.savings}</span>
                          </div>
                          <h4 className="text-2xl font-black mb-3 leading-tight text-white uppercase italic">{promo.title}</h4>
                          <p className="text-xs text-white/50 font-bold leading-relaxed mb-8 uppercase tracking-wide">{promo.desc}</p>
                        </div>

                        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10">
                          <div className="text-[11px] font-mono font-black text-white/10 tracking-widest uppercase">ID: {promo.code}</div>
                          <button 
                            onClick={() => setSelectedCoupon(promo)}
                            className="bg-brand-orange hover:bg-white hover:text-brand-black text-white px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-orange/20 uppercase italic"
                          >
                            USAR BENEFICIO
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
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
