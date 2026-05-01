import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, QrCode, Clock, Map, ShoppingCart, ConciergeBell, 
  Minus, Plus, Pencil, Trash2, AlertTriangle, User, 
  Share2, Banknote, CreditCard, Copy, Check, Utensils,
  Image as ImageIcon, Save
} from 'lucide-react';
import { CartItem, Category, MenuItem } from '../types';

export function QRModal({ onClose }: { onClose: () => void }) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://mamborestobar.pe';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}&color=000000`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
        className="relative w-full max-w-sm bg-brand-cream rounded-3xl shadow-2xl border border-brand-black/10 overflow-hidden flex flex-col p-8 text-center"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-brand-black/50 hover:text-brand-black transition-colors z-10 bg-brand-black/5 rounded-full">
          <X className="w-5 h-5"/>
        </button>

        <QrCode className="w-12 h-12 text-brand-orange mx-auto mb-4" />
        <h3 className="text-2xl font-black text-brand-black mb-2 uppercase">Escanea el QR</h3>
        <p className="text-sm text-brand-black/60 mb-8 font-medium leading-relaxed">
           ¡Lleva nuestra carta contigo! Con que escanees este código, podrás ver nuestro menú en tu celular.
        </p>

        <div className="bg-brand-cream-light p-5 rounded-2xl mx-auto shadow-inner w-max border border-brand-black/5">
           <img src={qrUrl} alt="QR Code" className="w-[200px] h-[200px] mix-blend-multiply" />
        </div>
      </motion.div>
    </div>
  );
}

export function ScheduleModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm bg-brand-cream rounded-3xl shadow-2xl border border-brand-black/10 overflow-hidden"
      >
         <div className="bg-brand-black p-6 flex items-center justify-between border-b border-white/5">
            <h3 className="text-xl font-black flex items-center gap-2 text-white uppercase tracking-tight">
               <Clock className="text-brand-orange" /> Horarios de Atención
            </h3>
            <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
               <X className="w-5 h-5"/>
            </button>
         </div>
         <div className="p-6">
            <ul className="space-y-4">
               <li className="flex justify-between items-center pb-4 border-b border-brand-black/5">
                  <span className="font-bold text-brand-black">Martes - Sábado</span>
                  <span className="text-brand-orange font-black text-sm">11:00 AM - 5:00 PM</span>
               </li>
               <li className="flex justify-between items-center pb-4 border-b border-brand-black/5">
                  <span className="font-bold text-brand-black">Domingos y Feriados</span>
                  <span className="text-brand-orange font-black text-sm">11:00 AM - 6:00 PM</span>
               </li>
               <li className="flex justify-between items-center">
                  <span className="font-bold text-brand-black">Lunes</span>
                  <span className="text-brand-black/40 font-black text-sm">CERRADO</span>
               </li>
            </ul>
            <div className="mt-8 bg-brand-orange/5 p-5 rounded-2xl flex items-start gap-3 border border-brand-orange/10">
               <Map className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
               <p className="text-sm font-bold text-brand-black/60 leading-relaxed">
                 Te esperamos en nuestro local principal o pide para llevar. ¡La mejor sazón y brasas!
               </p>
            </div>
         </div>
      </motion.div>
    </div>
  )
}

export function CartModal({ cart, onClose, onRemove, onUpdateQuantity, onUpdateComment, total }: { cart: CartItem[], onClose: () => void, onRemove: (id: string) => void, onUpdateQuantity: (id: string, q: number) => void, onUpdateComment: (id: string, c: string) => void, total: number }) {
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = useState<CartItem | null>(null);
  const [editCommentText, setEditCommentText] = useState('');

  const handleOrder = () => {
    let message = `*Hola Mambo Club Restobar, quiero hacer un pedido:*\n\n`;
    cart.forEach(c => {
      message += `${c.quantity}x ${c.item.title} (S/ ${c.item.price})\n`;
      if (c.comment) {
        message += `   📝 _Nota: ${c.comment}_\n`;
      }
      message += `\n`;
    });
    message += `*Total: S/ ${total.toFixed(2)}*\n\n`;
    message += `_Enviado desde el App de Mambo Club Restobar_`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=51910931580&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-blue-dark/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-brand-cream-light h-full shadow-2xl border-l border-brand-black/5 flex flex-col"
      >
         <div className="bg-brand-black p-6 flex items-center justify-between border-b border-white/5 shrink-0">
            <h3 className="text-2xl font-black flex items-center gap-3 text-white uppercase tracking-tight">
               <ShoppingCart className="text-brand-orange w-7 h-7" /> Tu Pedido
            </h3>
            <button onClick={onClose} className="p-2 bg-white/10 text-white hover:text-white rounded-full hover:bg-white/20 transition-colors">
               <X className="w-6 h-6"/>
            </button>
         </div>

         <div className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar">
            {cart.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-brand-black/20 space-y-6">
                  <ConciergeBell className="w-20 h-20 opacity-10" />
                  <p className="text-lg font-black uppercase tracking-widest">Tu pedido está vacío</p>
                  <button onClick={onClose} className="text-sm font-bold text-brand-orange hover:underline">Ver nuestra carta</button>
               </div>
            ) : (
               cart.map((c) => (
                 <div key={c.cartItemId} className="bg-brand-cream-light border border-brand-black/5 rounded-[24px] p-5 flex gap-5 relative shadow-sm hover:shadow-md transition-shadow group">
                    <img src={c.item.image} alt={c.item.title} className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-inner" />
                    <div className="flex-1 flex flex-col justify-center">
                       <h4 className="font-black text-brand-black leading-tight pr-6 uppercase text-sm mb-1">{c.item.title}</h4>
                       <span className="text-brand-orange font-black text-lg">S/ {(parseFloat(c.item.price) * c.quantity).toFixed(2)}</span>
                       <div className="flex items-center text-xs text-brand-black/60 mt-3 bg-white w-max rounded-xl overflow-hidden border border-brand-black/5 shadow-sm">
                          <button onClick={() => {
                            if (c.quantity - 1 <= 0) setItemToDelete(c.cartItemId);
                            else onUpdateQuantity(c.cartItemId, c.quantity - 1);
                          }} className="px-3 py-2 hover:bg-brand-black/5 transition-colors text-brand-black"><Minus className="w-3.5 h-3.5"/></button>
                          <span className="text-brand-black font-black px-3 text-center min-w-[32px] text-sm">{c.quantity}</span>
                          <button onClick={() => onUpdateQuantity(c.cartItemId, c.quantity + 1)} className="px-3 py-2 hover:bg-brand-black/5 transition-colors text-brand-black"><Plus className="w-3.5 h-3.5"/></button>
                       </div>
                       {c.comment ? (
                         <div className="relative group mt-3">
                           <p className="text-[11px] text-brand-black/50 bg-brand-cream px-4 py-2 pr-10 rounded-xl italic font-medium border border-brand-black/5">
                             "{c.comment}"
                           </p>
                           <button 
                             onClick={() => { setItemToEdit(c); setEditCommentText(c.comment); }}
                             className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-black/30 hover:text-brand-black bg-brand-black/5 hover:bg-brand-black/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                           >
                             <Pencil className="w-3 h-3" />
                           </button>
                         </div>
                       ) : (
                         <button 
                           onClick={() => { setItemToEdit(c); setEditCommentText(''); }}
                           className="text-[11px] text-brand-orange font-black uppercase tracking-widest hover:text-brand-black mt-3 flex items-center gap-2 transition-colors w-max"
                         >
                           <Pencil className="w-3 h-3" /> Añadir nota
                         </button>
                       )}
                    </div>
                    <button 
                      onClick={() => setItemToDelete(c.cartItemId)}
                      className="absolute top-4 right-4 p-2 text-brand-black/10 hover:text-red-500 bg-transparent hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
               ))
            )}
         </div>

         {cart.length > 0 && (
           <div className="p-8 bg-brand-black rounded-t-[40px] shrink-0 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
              <div className="flex justify-between items-center mb-8">
                 <span className="text-xl font-black text-white/50 uppercase tracking-widest">Total</span>
                 <span className="text-4xl font-black text-white">S/ {total.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleOrder}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-black text-lg px-8 py-5 rounded-[24px] flex items-center justify-center uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-brand-orange/20"
              >
                Pedir por WhatsApp <Share2 className="w-5 h-5 ml-3" />
              </button>
           </div>
         )}
      </motion.div>

      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setItemToDelete(null)}
              className="absolute inset-0 bg-brand-blue-dark/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-brand-cream rounded-[32px] p-8 shadow-2xl border border-brand-blue/10 text-center"
            >
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-2 text-brand-blue uppercase tracking-tight">¿Eliminar del pedido?</h3>
              <p className="text-sm text-brand-blue/40 mb-8 font-medium">Se quitará este delicioso plato de tu carrito de compras.</p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    onRemove(itemToDelete!);
                    setItemToDelete(null);
                  }}
                  className="w-full py-4 rounded-2xl bg-red-500 text-white font-black hover:bg-red-600 transition-colors uppercase tracking-widest text-sm"
                >
                  Sí, eliminar plato
                </button>
                <button 
                  onClick={() => setItemToDelete(null)}
                  className="w-full py-4 rounded-2xl border border-brand-blue/10 text-brand-blue/60 font-black hover:bg-brand-blue/5 transition-colors uppercase tracking-widest text-sm"
                >
                  No, mantenerlo
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Comment Modal */}
        {itemToEdit && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setItemToEdit(null)}
              className="absolute inset-0 bg-brand-blue-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-brand-cream rounded-[32px] p-8 shadow-2xl border border-brand-blue/10"
            >
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-brand-blue uppercase tracking-tight">
                <Pencil className="w-6 h-6 text-brand-cyan"/> {itemToEdit.comment ? 'Editar Nota' : 'Añadir Nota'}
              </h3>
              <p className="text-xs text-brand-blue/40 mb-3 font-bold uppercase tracking-widest">Plato: {itemToEdit.item.title}</p>
              <textarea 
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
                placeholder="Ej: Sin picante, extra limón..."
                className="w-full bg-brand-cream text-brand-blue-dark rounded-2xl p-4 text-sm font-medium resize-none h-32 outline-none focus:ring-4 focus:ring-brand-cyan/10 border border-brand-blue/5 mb-8"
                autoFocus
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setItemToEdit(null)}
                  className="flex-1 px-6 py-4 rounded-xl border border-brand-blue/10 text-brand-blue/40 font-black hover:bg-brand-blue/5 transition-colors text-xs uppercase tracking-widest"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    onUpdateComment(itemToEdit!.cartItemId, editCommentText);
                    setItemToEdit(null);
                  }}
                  className="flex-1 px-6 py-4 rounded-xl bg-brand-cyan text-white font-black hover:bg-[#00B8A1] transition-colors text-xs uppercase tracking-widest shadow-lg shadow-brand-cyan/20"
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PaymentQRModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'yape' | 'plin'>('yape');

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
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
        className="relative w-full max-w-sm bg-white rounded-[40px] p-10 shadow-2xl border border-brand-black/10 text-center"
      >
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }} 
          className="absolute top-6 right-6 p-2 text-brand-black/30 hover:text-brand-black transition-all bg-brand-black/5 hover:bg-brand-black/10 rounded-full z-[310]"
        >
          <X className="w-5 h-5"/>
        </button>

        <QrCode className="w-12 h-12 text-brand-orange mx-auto mb-4" />
        <h3 className="text-2xl font-black mb-8 text-brand-black uppercase tracking-tight">Pagar con QR</h3>

        <div className="flex bg-brand-cream-light p-1.5 rounded-2xl mb-10 border border-brand-black/5">
          <button 
            onClick={() => setActiveTab('yape')}
            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'yape' ? 'bg-[#742284] text-white shadow-xl scale-[1.02]' : 'text-brand-black/40 hover:text-brand-black'}`}
          >
            YAPE
          </button>
          <button 
            onClick={() => setActiveTab('plin')}
            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'plin' ? 'bg-[#00D0B6] text-white shadow-xl scale-[1.02]' : 'text-brand-black/40 hover:text-brand-black'}`}
          >
            PLIN
          </button>
        </div>

        <div className="bg-brand-cream p-5 rounded-3xl mx-auto mb-8 relative border border-brand-black/5 shadow-inner">
          <div className="relative">
              <img 
                src={activeTab === 'yape' 
                  ? "/qr-yape.webp" 
                  : "/qr-plin.webp"} 
                alt="QR de Pago" 
                className="w-full aspect-square object-contain"
              />
          </div>
          <p className="mt-4 text-brand-black/10 text-[9px] font-black tracking-[0.3em] uppercase">Escaneo de Pago</p>
        </div>

        <p className="text-sm text-brand-black/60 leading-relaxed font-medium italic">
          Escanea el código y envíanos tu comprobante por WhatsApp para validar tu pedido.
        </p>
      </motion.div>
    </div>
  );
}

export function CashModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
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
        className="relative w-full max-w-sm bg-white rounded-[40px] p-10 shadow-2xl border border-brand-black/10 text-center"
      >
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }} 
          className="absolute top-6 right-6 p-2 text-brand-black/30 hover:text-brand-black transition-all bg-brand-black/5 hover:bg-brand-black/10 rounded-full z-[310]"
        >
          <X className="w-5 h-5"/>
        </button>

        <Banknote className="w-12 h-12 text-brand-orange mx-auto mb-4" />
        <h3 className="text-2xl font-black mb-6 text-brand-black uppercase tracking-tight">Pago en Efectivo</h3>
        
        <div className="bg-brand-orange/5 border border-brand-orange/20 p-8 rounded-3xl mb-8">
          <p className="text-lg font-bold text-brand-orange leading-tight uppercase tracking-widest">
            Aceptamos billetes de hasta <span className="text-3xl font-black block mt-2 text-brand-black">S/ 100.00</span>
          </p>
        </div>

        <p className="text-sm text-brand-black/50 leading-relaxed font-bold">
          Por favor, indícanos con cuánto pagarás para llevarte el vuelto exacto. ¡Gracias!
        </p>
      </motion.div>
    </div>
  );
}

export function BankTransferModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);

  const accounts = [
    { name: 'BCP', number: '123-4567890-1-23', type: 'Soles', titular: 'MAMBO RESTOBAR' },
    { name: 'BBVA', number: '9876-5432-10-12345678', type: 'Soles', titular: 'MAMBO RESTOBAR' }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
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
        className="relative w-full max-w-sm bg-white rounded-[40px] p-10 shadow-2xl border border-brand-black/10"
      >
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }} 
          className="absolute top-6 right-6 p-2 text-brand-black/30 hover:text-brand-black transition-all bg-brand-black/5 hover:bg-brand-black/10 rounded-full z-[310]"
        >
          <X className="w-5 h-5"/>
        </button>

        <CreditCard className="w-12 h-12 text-brand-orange mx-auto mb-4" />
        <h3 className="text-2xl font-black text-center mb-8 text-brand-black uppercase tracking-tight">Transferencias</h3>

        <div className="space-y-5">
          {accounts.map((acc) => (
            <div key={acc.name} className="bg-brand-cream-light p-5 rounded-2xl border border-brand-black/5 shadow-sm group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-black text-brand-orange tracking-wider">{acc.name}</h4>
                  <p className="text-[10px] text-brand-black/40 uppercase font-bold">{acc.type}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(acc.number, acc.name)}
                  className="p-2.5 bg-white rounded-xl shadow-sm border border-brand-black/5 hover:bg-brand-orange hover:text-white transition-all text-brand-black/40"
                >
                  {copied === acc.name ? <Check className="w-4 h-4 text-green-500"/> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-sm font-mono font-black tracking-widest mb-2 text-brand-black">{acc.number}</p>
              <p className="text-[10px] text-brand-black/40 font-bold uppercase tracking-widest">Titular: {acc.titular}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[11px] text-brand-black/40 text-center font-bold uppercase tracking-widest">
          Envíanos tu comprobante por WhatsApp.
        </p>
      </motion.div>
    </div>
  );
}

export function AddDishModal({ onClose, onSave, categories }: { onClose: () => void, onSave: (dish: MenuItem) => void, categories: Category[] }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    categoryId: categories[0]?.id || '',
    tag: 'Nuevo',
    description: '',
    image: '',
    isTop: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.image) return;
    onSave({
      ...formData,
      id: Date.now()
    });
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-black/90 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full max-w-2xl bg-brand-cream rounded-[40px] shadow-2xl border border-brand-black/10 overflow-hidden"
      >
        <div className="bg-brand-black p-8 flex items-center justify-between border-b border-white/5 relative overflow-hidden">
           {/* Decorative background logo/icon */}
           <Utensils className="absolute -right-4 -bottom-4 w-32 h-32 text-brand-orange/10 rotate-12" />
           
           <div className="relative z-10">
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tight flex items-center gap-4">
                 <Plus className="text-brand-orange w-8 h-8" /> Registrar Plato
              </h3>
              <p className="text-brand-orange/60 text-[10px] font-black tracking-[0.3em] uppercase mt-1">Nuevo Potaje en Bitácora</p>
           </div>
           <button onClick={onClose} className="relative z-10 p-3 bg-white/10 text-white hover:bg-white/20 rounded-2xl transition-all">
              <X className="w-6 h-6"/>
           </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Preview / Input */}
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-brand-black/30 tracking-widest uppercase">Imagen del Plato (URL)</label>
                    <div className="flex gap-2">
                       <input 
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 bg-brand-cream-light border border-brand-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-brand-black focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all"
                       />
                    </div>
                 </div>

                 <div className="aspect-square bg-brand-cream-light rounded-[32px] overflow-hidden border border-brand-black/5 flex items-center justify-center relative group">
                    {formData.image ? (
                       <>
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </>
                    ) : (
                       <div className="flex flex-col items-center gap-4 text-brand-black/20">
                          <ImageIcon className="w-16 h-16" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Vista Previa</p>
                       </div>
                    )}
                 </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-brand-black/30 tracking-widest uppercase">Nombre del Plato</label>
                    <input 
                       type="text"
                       required
                       value={formData.title}
                       onChange={(e) => setFormData({...formData, title: e.target.value})}
                       placeholder="Ej: Lomo Saltado al Wok"
                       className="w-full bg-brand-cream-light border border-brand-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-brand-black focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-brand-black/30 tracking-widest uppercase">Precio (S/)</label>
                       <input 
                          type="text"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          placeholder="45.00"
                          className="w-full bg-brand-cream-light border border-brand-black/5 rounded-2xl px-6 py-4 text-sm font-black text-brand-black focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-brand-black/30 tracking-widest uppercase">Tag / Etiqueta</label>
                       <input 
                          type="text"
                          value={formData.tag}
                          onChange={(e) => setFormData({...formData, tag: e.target.value})}
                          placeholder="Nuevo, Clásico..."
                          className="w-full bg-brand-cream-light border border-brand-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-brand-black focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all"
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-brand-black/30 tracking-widest uppercase">Categoría</label>
                    <select 
                       value={formData.categoryId}
                       onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                       className="w-full bg-brand-cream-light border border-brand-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-brand-black focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                       {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                       ))}
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-brand-black/30 tracking-widest uppercase">Descripción</label>
                    <textarea 
                       value={formData.description}
                       onChange={(e) => setFormData({...formData, description: e.target.value})}
                       placeholder="Detalles sobre este exquisito plato..."
                       className="w-full bg-brand-cream-light border border-brand-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-brand-black/70 focus:ring-4 focus:ring-brand-orange/10 focus:outline-none transition-all h-32 resize-none"
                    />
                 </div>

                 <div className="flex items-center gap-3 bg-brand-cream-light/50 p-4 rounded-2xl border border-brand-black/5">
                    <input 
                       type="checkbox"
                       id="isTop"
                       checked={formData.isTop}
                       onChange={(e) => setFormData({...formData, isTop: e.target.checked})}
                       className="w-5 h-5 rounded-lg border-brand-black/10 text-brand-orange focus:ring-brand-orange/20 cursor-pointer"
                    />
                    <label htmlFor="isTop" className="text-xs font-black text-brand-black/60 uppercase tracking-widest cursor-pointer">Destacar en Portada (Top 3)</label>
                 </div>
              </div>
           </div>

           <div className="mt-12 flex gap-4">
              <button 
                 type="button"
                 onClick={onClose}
                 className="flex-1 px-8 py-5 rounded-[24px] border border-brand-black/10 text-brand-black/40 font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-black/5 transition-all"
              >
                 Cancelar
              </button>
              <button 
                 type="submit"
                 className="flex-[2] px-8 py-5 rounded-[24px] bg-brand-black hover:bg-brand-black/90 text-white font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-brand-black/20 transition-all flex items-center justify-center gap-3"
              >
                 <Save className="w-5 h-5" /> Lanzar al Menú
              </button>
           </div>
        </form>
      </motion.div>
    </div>
  );
}
export function LoginModal({ onClose, onLogin }: { onClose: () => void, onLogin: (role: 'cliente' | 'admin') => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((username === 'admin' || username === 'cliente') && password === '123456') {
      onLogin(username as 'admin' | 'cliente');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
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
        className="relative w-full max-w-sm bg-white rounded-[40px] p-10 shadow-2xl border border-brand-black/10"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-brand-black/30 hover:text-brand-black transition-colors bg-brand-black/5 rounded-full">
          <X className="w-5 h-5"/>
        </button>

        <User className="w-12 h-12 text-brand-orange mx-auto mb-4" />
        <h3 className="text-2xl font-black text-center mb-8 text-brand-black uppercase tracking-tight">Acceso</h3>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-brand-black/40 mb-2 uppercase tracking-[0.2em]">Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              className="w-full bg-brand-cream-light border border-brand-black/5 rounded-2xl px-5 py-4 text-brand-black outline-none focus:ring-4 focus:ring-brand-orange/10 transition-all font-bold placeholder:text-brand-black/20"
              placeholder="admin o cliente"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-brand-black/40 mb-2 uppercase tracking-[0.2em]">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-cream-light border border-brand-black/5 rounded-2xl px-5 py-4 text-brand-black outline-none focus:ring-4 focus:ring-brand-orange/10 transition-all font-bold placeholder:text-brand-black/20"
              placeholder="••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs font-black text-center mt-2 uppercase tracking-widest">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-brand-black text-white font-black py-5 rounded-2xl mt-4 hover:bg-brand-black/90 transition-all uppercase tracking-[0.2em] shadow-lg shadow-brand-black/20 active:scale-95"
          >
            Ingresar
          </button>
        </form>
      </motion.div>
    </div>
  )
}
