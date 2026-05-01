import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronRight, X, Minus, Plus } from 'lucide-react';

export function MenuItemCard({ item, onClick, key }: { item: any, onClick?: () => void, key?: React.Key }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-brand-cream rounded-3xl overflow-hidden shadow-md relative border border-brand-black/5 flex flex-col cursor-pointer group"
      onClick={onClick}
    >
       {/* Badge */}
       {item.isTop && (
         <div className="absolute top-3 left-3 bg-brand-orange text-white text-[9px] md:text-xs font-black px-3 py-1.5 rounded-xl flex items-center z-10 shadow-lg tracking-wider uppercase">
           <Star className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 mr-1 fill-current" /> TOP
         </div>
       )}

       {/* Image Box */}
       <div className="relative w-full h-32 md:h-52 overflow-hidden bg-brand-black">
         <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
         <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
       </div>

       {/* Content Box */}
       <div className="p-4 md:p-6 flex-1 flex flex-col">
          {item.tag && <p className="text-brand-orange text-[10px] md:text-[11px] font-black uppercase mb-1.5 md:mb-2 tracking-widest truncate">{item.tag}</p>}
          
          <h3 className="text-sm md:text-xl font-black leading-tight mb-3 line-clamp-2 flex-1 text-brand-black uppercase">{item.title}</h3>
          
          <div className="flex justify-between items-center mt-auto pt-2 border-t border-brand-black/5">
            <span className="text-brand-black/70 text-xs md:text-lg font-black tracking-tight">S/ {item.price}</span>
            <div className="bg-brand-black text-white w-7 h-7 md:w-9 md:h-9 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-brand-orange transition-colors">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
       </div>
    </motion.div>
  )
}

export function MenuItemModal({ item, onClose, onAdd }: { item: any, onClose: () => void, onAdd: (quantity: number, comment: string) => void }) {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-black/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-brand-cream-light rounded-[40px] shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="relative h-56 md:h-72 w-full shrink-0 bg-brand-black">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/20 text-white rounded-full hover:bg-white/40 transition-colors backdrop-blur-md z-10">
            <X className="w-5 h-5"/>
          </button>
        </div>
        
        <div className="p-8 md:p-10 overflow-y-auto no-scrollbar relative z-10 flex-1">
          {item.tag && <p className="text-brand-orange text-xs font-black uppercase mb-2 tracking-widest">{item.tag}</p>}
          <div className="flex justify-between items-start mb-4 gap-4">
            <h3 className="text-3xl md:text-4xl font-black leading-tight flex-1 text-brand-black uppercase">{item.title}</h3>
          </div>
          
          <div className="bg-brand-orange text-white px-6 py-2 rounded-2xl font-black text-2xl shadow-lg shadow-brand-orange/20 w-max mb-6">
            S/ {item.price}
          </div>
          
          <p className="text-sm md:text-lg text-brand-black/70 leading-relaxed mb-8 font-medium">
            {item.description}
          </p>

          <div className="bg-brand-cream-light p-6 rounded-3xl mb-8 border border-brand-black/5">
             <div className="flex items-center justify-between mb-6">
                <span className="font-black text-xs md:text-sm text-brand-black uppercase tracking-widest">Cantidad</span>
                <div className="flex items-center gap-6 bg-brand-cream rounded-2xl px-4 py-2 border border-brand-black/5 shadow-sm">
                   <button 
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     className="p-1.5 hover:bg-brand-orange/10 text-brand-black rounded-lg transition-colors disabled:opacity-30"
                     disabled={quantity <= 1}
                   >
                     <Minus className="w-5 h-5"/>
                   </button>
                   <span className="font-black text-xl w-6 text-center text-brand-black">{quantity}</span>
                   <button 
                     onClick={() => setQuantity(quantity + 1)}
                     className="p-1.5 hover:bg-brand-orange/10 text-brand-black rounded-lg transition-colors"
                   >
                     <Plus className="w-5 h-5"/>
                   </button>
                </div>
             </div>
             
             <div className="flex flex-col gap-3">
                <span className="font-black text-xs md:text-sm text-brand-black uppercase tracking-widest">Instrucciones especiales</span>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ej: Sin picante, término de carne..."
                  className="w-full bg-brand-cream text-brand-black rounded-2xl p-4 text-sm font-medium resize-none h-24 outline-none focus:ring-4 focus:ring-brand-orange/10 border border-brand-black/5 placeholder:text-brand-black/20"
                />
             </div>
          </div>
          
          <button 
            onClick={() => {
              onAdd(quantity, comment);
              onClose();
            }}
            className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-black text-sm md:text-lg px-8 py-5 rounded-[24px] flex items-center justify-center uppercase tracking-[0.1em] transition-all active:scale-95 shadow-xl shadow-brand-orange/20"
          >
            Añadir a la orden - S/ {(parseFloat(item.price) * quantity).toFixed(2)}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export function MobileActionButton({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={onClick}>
       <div className={`
         flex items-center justify-center transition-all duration-300 active:scale-95
         ${active ? 'bg-brand-orange text-white rounded-2xl w-[70px] h-[70px] shadow-lg shadow-brand-orange/40 relative z-10' : 'bg-brand-cream-light text-brand-black/40 rounded-3xl w-[64px] h-[64px] shadow-sm border border-brand-black/5 hover:opacity-100'}
       `}>
          {icon}
       </div>
       <span className={`text-[9px] font-black tracking-widest uppercase text-center mt-1 ${active ? 'text-brand-orange' : 'text-brand-black/40'}`}>
          {label}
       </span>
    </div>
  )
}

export function InfoCard({ icon, title, subtitle, onClick }: { icon: React.ReactNode, title: string, subtitle: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-brand-cream p-10 rounded-[40px] flex flex-col items-center justify-center text-center shadow-lg border border-brand-black/5 hover:border-brand-orange/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
    >
      <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8' })}
      </div>
      <h3 className="text-xl font-black mb-2 text-brand-black uppercase tracking-tight">{title}</h3>
      <p className="text-sm text-brand-black/50 font-bold tracking-widest uppercase">{subtitle}</p>
    </div>
)
}

