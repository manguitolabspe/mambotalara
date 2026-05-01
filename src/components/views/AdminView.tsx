import React, { useState } from 'react';
import { 
  User, LogOut, LayoutDashboard, Utensils, Settings, Sparkles, 
  Plus, Pencil, Trash2, Save, X, Phone, Globe, Image as ImageIcon, 
  ChevronRight, ArrowLeft, CheckCircle2, AlertCircle, TrendingUp,
  ShoppingBag, Users, DollarSign, Power, Award, Gift, Star, Instagram, Facebook
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS, CATEGORIES, HERO_SLIDES } from '../../data';
import { AddDishModal } from '../Modals';
import { MenuItem } from '../../types';

export function AdminView({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'loyalty' | 'cms' | 'config'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  
  // Local states for management (Demo)
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [slides, setSlides] = useState(HERO_SLIDES);
  const [whatsapp, setWhatsapp] = useState('+51 924 725 611');
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  // Loyalty Config State
  const [loyaltyConfig, setLoyaltyConfig] = useState({
    stampsToReward: 10,
    rewardName: "Ceviche Familiar Especial",
    minPurchaseForStamp: 50,
    pointsPerSol: 10,
    silverThreshold: 2000,
    goldThreshold: 5000
  });

  const getCategoryLabel = (id: string) => {
    return CATEGORIES.find(c => c.id === id)?.label || id;
  };

  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'menu', label: 'CARTA/MENÚ', icon: Utensils },
    { id: 'loyalty', label: 'FIDELIDAD', icon: Award },
    { id: 'cms', label: 'GESTIÓN WEB', icon: Sparkles },
    { id: 'config', label: 'AJUSTES', icon: Settings },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-cream-light text-brand-black overflow-hidden">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-[100] bg-brand-black/95 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 bg-white/10 rounded-xl"
        >
          <LayoutDashboard className="w-6 h-6 text-brand-orange" />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-black tracking-tighter text-white">MAMBO ADMIN</h2>
          <div className={`w-1.5 h-1.5 rounded-full ${isStoreOpen ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-red-400'}`} />
        </div>
        <button onClick={onLogout} className="p-2 text-white/40">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-brand-black/80 backdrop-blur-sm z-[200] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.aside 
        className={`fixed md:sticky top-0 left-0 bottom-0 z-[300] w-[280px] md:w-72 bg-brand-black/95 md:bg-brand-black backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center shadow-lg shadow-brand-orange/20 shrink-0">
               <User className="text-white w-7 h-7" />
            </div>
            <div>
               <h2 className="text-lg font-black tracking-tighter truncate leading-none mb-1 text-white uppercase italic">MAMBO</h2>
               <p className="text-[10px] font-black text-brand-orange tracking-widest uppercase opacity-80">Panel de Control</p>
            </div>
          </div>

          <nav className="space-y-3">
            {menuItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-4 px-6 py-5 rounded-[24px] w-full font-black text-[10px] tracking-widest transition-all uppercase ${
                  activeTab === tab.id 
                    ? 'bg-brand-orange text-white shadow-xl shadow-brand-orange/20 scale-[1.03]' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" /> {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <div className="bg-white/5 rounded-[2rem] p-5 mb-8">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Soporte Mambo</p>
            <div className="flex items-center gap-2 text-xs font-bold text-white/60 italic">
              <Phone className="w-3 h-3 text-brand-orange" /> +51 924 725 611
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-4 px-6 py-5 rounded-[24px] w-full font-black text-[10px] tracking-widest text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all uppercase"
          >
            <LogOut className="w-5 h-5" /> CERRAR SESIÓN
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto no-scrollbar py-4 md:py-12 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD */}
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Ventas de Hoy', value: 'S/ 2,450', icon: DollarSign, trend: '+12%', color: 'text-green-500' },
                    { label: 'Pedidos Activos', value: '18', icon: ShoppingBag, color: 'text-brand-black' },
                    { label: 'Nuevos Clientes', value: '45', icon: Users, color: 'text-brand-orange' },
                    { label: 'Puntuación', value: '4.8', icon: TrendingUp, color: 'text-brand-orange' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-brand-cream p-6 md:p-8 rounded-[32px] shadow-sm border border-brand-black/5">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-2xl bg-brand-orange/5 ${stat.color}`}>
                          <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        {stat.trend && <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>}
                      </div>
                      <p className="text-[10px] font-black text-brand-black/30 tracking-widest uppercase mb-2">{stat.label}</p>
                      <p className="text-xl md:text-3xl font-black tracking-tight text-brand-black">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Order Status */}
                  <div className="lg:col-span-2 bg-brand-cream rounded-[40px] p-8 md:p-10 shadow-sm border border-brand-black/5">
                     <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-black flex items-center gap-3 text-brand-black uppercase tracking-tight">
                           <CheckCircle2 className="text-brand-orange w-7 h-7" /> Pedidos Recientes
                        </h3>
                        <button className="text-[10px] font-black text-brand-orange tracking-widest uppercase hover:underline">Ver Todo el historial</button>
                     </div>
                     <div className="space-y-4">
                        {[
                          { id: '#MB-921', client: 'Maria Garcia', total: 'S/ 85.50', status: 'En Cocina' },
                          { id: '#MB-920', client: 'Roberto Ruiz', total: 'S/ 120.00', status: 'En Reparto' },
                          { id: '#MB-919', client: 'Elena Torres', total: 'S/ 45.00', status: 'Entregado' },
                        ].map((order, i) => (
                          <div key={i} className="flex items-center justify-between p-5 bg-brand-cream-light rounded-3xl border border-brand-black/5 hover:border-brand-orange/20 transition-all cursor-pointer group">
                             <div className="flex items-center gap-6">
                                <div className="text-[10px] font-black text-brand-black/20 tracking-widest uppercase">{order.id}</div>
                                <div>
                                   <p className="font-black text-brand-black leading-none mb-1 group-hover:text-brand-orange transition-colors">{order.client}</p>
                                   <p className="text-[10px] text-brand-black/40 font-black uppercase tracking-tight">Total: {order.total}</p>
                                </div>
                             </div>
                             <span className={`text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm ${
                                order.status === 'Entregado' ? 'bg-green-500 text-white' : 'bg-brand-orange text-white'
                             }`}>
                                {order.status}
                             </span>
                          </div>
                        ))}
                     </div>
                  </div>
                  {/* Quick toggle */}
                  <div className="bg-brand-black rounded-[40px] p-10 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-brand-black/50 opacity-40 shrink-0" />
                      <div className={`relative z-10 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-all duration-700 ${isStoreOpen ? 'bg-green-500/20 text-green-400 shadow-[0_0_30px_rgba(74,222,128,0.3)]' : 'bg-red-500/20 text-red-400'}`}>
                         <Power className="w-10 h-10" />
                      </div>
                      <h3 className="relative z-10 text-2xl font-black mb-3 leading-tight text-white uppercase italic tracking-tight">Estado Local</h3>
                      <p className="relative z-10 text-[11px] text-white/40 mb-10 font-bold px-4 uppercase tracking-widest leading-relaxed">Pausar o activar la recepción de pedidos en tiempo real.</p>
                      <button 
                        onClick={() => setIsStoreOpen(!isStoreOpen)}
                        className={`relative z-10 w-full py-5 rounded-2xl font-black text-xs tracking-widest transition-all uppercase ${isStoreOpen ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-brand-orange text-white shadow-xl shadow-brand-orange/20'}`}
                      >
                        {isStoreOpen ? 'CERRAR LOCAL' : 'ABRIR LOCAL'}
                      </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. MENU MANAGEMENT */}
            {activeTab === 'menu' && (
              <motion.div 
                key="menu"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row justify-between items-center bg-brand-cream p-8 md:p-10 rounded-[40px] shadow-sm border border-brand-black/5 gap-6">
                   <div className="text-center md:text-left">
                      <h3 className="text-3xl font-black tracking-tighter text-brand-black uppercase italic">Gestión de Carta</h3>
                      <p className="text-xs text-brand-black/40 font-bold uppercase tracking-widest mt-1">Catálogo actual: {items.length} platos de nuestra carta</p>
                   </div>
                   <button 
                     onClick={() => setIsAddDishModalOpen(true)}
                     className="bg-brand-black hover:bg-brand-black/90 text-white w-full md:w-auto px-10 py-5 rounded-[24px] shadow-xl shadow-brand-black/10 transition-all font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 uppercase"
                   >
                      <Plus className="w-6 h-6" /> AGREGAR PLATO
                   </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="bg-brand-cream p-6 rounded-[32px] flex items-center gap-5 group border border-brand-black/5 hover:border-brand-orange/40 hover:shadow-lg transition-all">
                      <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden relative shadow-inner">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-brand-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-[9px] font-black text-brand-orange uppercase tracking-widest mb-1.5 truncate">{getCategoryLabel(item.categoryId)}</div>
                        <h4 className="font-black text-brand-black leading-tight mb-2 truncate uppercase text-sm tracking-tight">{item.title}</h4>
                        <p className="text-brand-black font-black text-base">S/ {item.price}</p>
                      </div>
                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-3 bg-brand-cream-light hover:bg-brand-orange hover:text-white rounded-xl text-brand-black/30 transition-all shadow-sm">
                            <Pencil className="w-4 h-4" />
                         </button>
                         <button className="p-3 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl text-red-400 transition-all shadow-sm">
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 3. LOYALTY MANAGEMENT */}
            {activeTab === 'loyalty' && (
               <motion.div 
                 key="loyalty"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 className="space-y-8"
               >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Stamper Config */}
                    <div className="bg-brand-cream p-10 rounded-[40px] shadow-sm border border-brand-black/5">
                        <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-brand-black uppercase tracking-tight">
                           <Award className="text-brand-orange w-8 h-8" /> Digital Stamper Card
                        </h3>
                        <div className="space-y-8">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-brand-black/30 tracking-widest uppercase">Target de Sellos</label>
                              <div className="flex items-center gap-4">
                                 <input 
                                   type="number" 
                                   className="w-full bg-brand-cream-light border border-brand-black/5 rounded-[20px] px-8 py-5 text-lg font-black text-brand-black focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all"
                                   value={loyaltyConfig.stampsToReward}
                                   onChange={(e) => setLoyaltyConfig({...loyaltyConfig, stampsToReward: parseInt(e.target.value)})}
                                 />
                                 <Gift className="w-10 h-10 text-brand-orange opacity-20 shrink-0" />
                              </div>
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-brand-black/30 tracking-widest uppercase">Combo Mambo de Regalo</label>
                              <input 
                                className="w-full bg-brand-cream-light border border-brand-black/5 rounded-[20px] px-8 py-5 text-sm font-black text-brand-black focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all uppercase"
                                value={loyaltyConfig.rewardName}
                                onChange={(e) => setLoyaltyConfig({...loyaltyConfig, rewardName: e.target.value})}
                              />
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-brand-black/30 tracking-widest uppercase">Ticket Mínimo (S/)</label>
                              <input 
                                type="number"
                                className="w-full bg-brand-cream-light border border-brand-black/5 rounded-[20px] px-8 py-5 text-lg font-black text-brand-black focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all"
                                value={loyaltyConfig.minPurchaseForStamp}
                                onChange={(e) => setLoyaltyConfig({...loyaltyConfig, minPurchaseForStamp: parseInt(e.target.value)})}
                              />
                           </div>
                        </div>
                    </div>

                    {/* Points Config */}
                    <div className="space-y-8">
                       <div className="bg-brand-cream p-10 rounded-[40px] shadow-sm border border-brand-black/5">
                          <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-brand-black uppercase tracking-tight">
                              <Star className="text-brand-orange w-8 h-8" /> MamboPoints & Rangos
                          </h3>
                          <div className="space-y-8">
                             <div className="flex gap-6">
                                <div className="space-y-3 flex-1">
                                   <label className="text-[10px] font-black text-brand-black/30 tracking-widest uppercase">Meta Plata</label>
                                   <input 
                                     type="number"
                                     className="w-full bg-brand-cream border border-brand-blue/5 rounded-[20px] px-6 py-4 text-base font-black text-brand-blue focus:ring-4 focus:ring-brand-cyan/10 focus:outline-none transition-all"
                                     value={loyaltyConfig.silverThreshold}
                                     onChange={(e) => setLoyaltyConfig({...loyaltyConfig, silverThreshold: parseInt(e.target.value)})}
                                   />
                                </div>
                                <div className="space-y-3 flex-1">
                                   <label className="text-[10px] font-black text-brand-black/30 tracking-widest uppercase">Meta Oro</label>
                                   <input 
                                     type="number"
                                     className="w-full bg-brand-cream border border-brand-blue/5 rounded-[20px] px-6 py-4 text-base font-black text-brand-blue focus:ring-4 focus:ring-brand-cyan/10 focus:outline-none transition-all"
                                     value={loyaltyConfig.goldThreshold}
                                     onChange={(e) => setLoyaltyConfig({...loyaltyConfig, goldThreshold: parseInt(e.target.value)})}
                                   />
                                </div>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[10px] font-black text-brand-black/30 tracking-widest uppercase">Ratio de Puntos (1Sol : Xpts)</label>
                                <input 
                                  type="number"
                                  className="w-full bg-brand-cream-light border border-brand-black/5 rounded-[20px] px-8 py-5 text-xl font-black text-brand-orange focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all"
                                  value={loyaltyConfig.pointsPerSol}
                                  onChange={(e) => setLoyaltyConfig({...loyaltyConfig, pointsPerSol: parseInt(e.target.value)})}
                                />
                             </div>
                          </div>
                       </div>
                       <button className="w-full bg-brand-black hover:bg-brand-black/90 text-white py-6 rounded-[32px] font-black text-xs tracking-[.3em] uppercase shadow-xl shadow-brand-black/20 hover:scale-[1.02] transition-all">
                          ACTUALIZAR ESTRATEGIA VIP
                       </button>
                    </div>
                  </div>
               </motion.div>
            )}

            {/* 4. CMS MANAGEMENT */}
            {activeTab === 'cms' && (
              <motion.div 
                key="cms"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-10"
              >
                <div className="bg-brand-cream p-8 md:p-12 rounded-[40px] shadow-sm border border-brand-black/5">
                   <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-10 flex items-center gap-4 text-brand-black uppercase italic">
                      <ImageIcon className="text-brand-orange w-8 h-8" /> Vitrina de Portada
                   </h3>
                   <div className="space-y-8">
                      {slides.map((slide, i) => (
                        <div key={slide.id} className="p-8 bg-brand-cream-light rounded-[32px] border border-brand-black/5 space-y-6 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-6 bg-brand-orange/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                           <div className="flex justify-between items-center relative z-10">
                              <span className="text-[10px] font-black text-brand-black/20 uppercase tracking-[0.4em]">Billboard #{i+1}</span>
                              <div className="flex gap-4">
                                <button className="p-3 bg-brand-cream rounded-xl text-brand-black/30 hover:text-brand-orange shadow-sm transition-all"><Pencil className="w-5 h-5" /></button>
                                <button className="p-3 bg-brand-cream rounded-xl text-brand-black/30 hover:text-red-500 shadow-sm transition-all"><Trash2 className="w-5 h-5" /></button>
                              </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                              <div className="space-y-3">
                                 <label className="text-[10px] font-black text-brand-orange tracking-widest uppercase">Header Principal</label>
                                 <input 
                                    className="w-full bg-white border border-brand-black/5 rounded-2xl px-6 py-4 text-sm font-black text-brand-black focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all uppercase"
                                    value={slide.desktopTitle}
                                    onChange={(e) => {
                                      const newSlides = [...slides];
                                      newSlides[i].desktopTitle = e.target.value;
                                      setSlides(newSlides);
                                    }}
                                 />
                              </div>
                              <div className="space-y-3">
                                 <label className="text-[10px] font-black text-brand-orange tracking-widest uppercase">Mensaje de Seducción</label>
                                 <textarea 
                                    className="w-full bg-white border border-brand-black/5 rounded-2xl px-6 py-4 text-[13px] font-bold text-brand-black/60 focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all h-24 resize-none leading-relaxed"
                                    value={slide.desktopText}
                                    onChange={(e) => {
                                      const newSlides = [...slides];
                                      newSlides[i].desktopText = e.target.value;
                                      setSlides(newSlides);
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                      <button className="bg-brand-cream-light text-brand-black/40 border border-brand-black/5 py-5 rounded-[24px] font-black text-[11px] tracking-widest uppercase hover:text-brand-black transition-all">
                         DESCARTAR CAMBIOS
                      </button>
                      <button className="bg-brand-black hover:bg-brand-black/90 text-white py-5 rounded-[24px] font-black text-[11px] tracking-widest uppercase shadow-xl shadow-brand-black/20 hover:scale-[1.01] transition-all">
                         SINCRONIZAR CON WEB
                      </button>
                   </div>
                </div>
              </motion.div>
            )}

            {/* 5. CONFIGURATION */}
            {activeTab === 'config' && (
              <motion.div 
                key="config"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="max-w-2xl mx-auto space-y-8"
              >
                <div className="bg-brand-cream p-10 md:p-12 rounded-[40px] shadow-sm border border-brand-black/5">
                   <h3 className="text-3xl font-black mb-10 tracking-tight text-brand-black italic uppercase">Ajustes Generales</h3>
                   
                   <div className="space-y-10">
                      {/* WhatsApp Config */}
                      <div className="space-y-5">
                         <div className="flex items-center gap-3 mb-2">
                            <Phone className="w-6 h-6 text-green-500" />
                            <label className="text-[11px] font-black text-brand-black/30 tracking-[0.2em] uppercase">WhatsApp Central de Pedidos</label>
                         </div>
                         <div className="flex gap-4">
                            <input 
                               className="flex-1 bg-brand-cream-light border border-brand-black/5 rounded-2xl px-6 py-5 text-base font-black text-brand-black focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all"
                               value={whatsapp}
                               onChange={(e) => setWhatsapp(e.target.value)}
                            />
                            <button className="bg-green-50 text-green-600 px-6 rounded-2xl border border-green-100 font-black text-[10px] tracking-widest uppercase hover:bg-green-100 transition-all shrink-0">
                                TEST APP
                            </button>
                         </div>
                      </div>

                      {/* Social Media */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-brand-black/5">
                         <div className="space-y-3">
                            <div className="flex items-center gap-3 mb-2">
                               <Instagram className="w-5 h-5 text-brand-orange" />
                               <label className="text-[10px] font-black text-brand-black/30 uppercase tracking-widest">Canal Instagram</label>
                            </div>
                            <input className="w-full bg-brand-cream-light border border-brand-black/5 rounded-2xl px-6 py-4 text-xs font-black text-brand-black/40" value="@mamboclubrestobar" readOnly />
                         </div>
                         <div className="space-y-3">
                            <div className="flex items-center gap-3 mb-2">
                               <Facebook className="w-5 h-5 text-brand-orange" />
                               <label className="text-[10px] font-black text-brand-black/30 uppercase tracking-widest">Página Facebook</label>
                            </div>
                            <input className="w-full bg-brand-cream-light border border-brand-black/5 rounded-2xl px-6 py-4 text-xs font-black text-brand-black/40" value="/mamboclubrestobar" readOnly />
                         </div>
                      </div>

                      <button className="w-full bg-brand-black hover:bg-brand-black/90 text-white py-6 rounded-[24px] font-black text-[11px] tracking-[.3em] uppercase shadow-2xl shadow-brand-black/20 hover:brightness-110 active:scale-95 transition-all mt-6">
                         GUARDAR PREFERENCIAS
                      </button>
                   </div>
                </div>

                <div className="p-8 bg-brand-orange/5 rounded-[32px] border border-brand-orange/20 flex items-start gap-6 shadow-sm">
                   <div className="p-3 bg-brand-cream rounded-2xl shadow-sm text-brand-orange">
                      <AlertCircle className="w-6 h-6 shrink-0" />
                   </div>
                   <div>
                      <h4 className="font-black text-brand-black mb-2 text-base uppercase tracking-tight">Seguridad del Panel</h4>
                      <p className="text-[11px] text-brand-black/40 leading-relaxed font-bold uppercase tracking-wide">
                         Cualquier cambio en la configuración de WhatsApp se reflejará en tiempo real en la carta digital. 
                         Verifica el número antes de guardar.
                      </p>
                   </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          <AnimatePresence>
            {isAddDishModalOpen && (
              <AddDishModal 
                onClose={() => setIsAddDishModalOpen(false)} 
                onSave={(newDish) => {
                  setItems([newDish, ...items]);
                  setIsAddDishModalOpen(false);
                }}
                categories={CATEGORIES}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
