import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  Home, Utensils, ShoppingCart, User, ChevronRight, Award
} from 'lucide-react';

import { AdminView } from './components/views/AdminView';
import { ClienteView } from './components/views/ClienteView';
import { HomeView } from './components/views/HomeView';
import { MenuView } from './components/views/MenuView';
import { QRModal, ScheduleModal, CartModal, LoginModal, PaymentQRModal, CashModal, BankTransferModal } from './components/Modals';
import { CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'carta' | 'admin' | 'cliente' | 'vip'>('inicio');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userRole, setUserRole] = useState<'guest' | 'cliente' | 'admin'>('guest');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPaymentQROpen, setIsPaymentQROpen] = useState(false);
  const [isCashOpen, setIsCashOpen] = useState(false);
  const [isBankTransferOpen, setIsBankTransferOpen] = useState(false);

  const [isVipPassPurchased, setIsVipPassPurchased] = useState(false);

  const handleLoginSuccess = (role: 'admin' | 'cliente') => {
    setUserRole(role);
    setActiveTab(role);
    setIsLoginOpen(false);
  };

  const addToCart = (item: any, quantity: number, comment: string) => {
    setCart(prev => [
      ...prev,
      {
        cartItemId: Math.random().toString(36).substr(2, 9),
        item,
        quantity,
        comment
      }
    ]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(c => c.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(c => 
      c.cartItemId === cartItemId ? { ...c, quantity: newQuantity } : c
    ));
  };

  const updateCartComment = (cartItemId: string, newComment: string) => {
    setCart(prev => prev.map(c => 
      c.cartItemId === cartItemId ? { ...c, comment: newComment } : c
    ));
  };

  const totalCartItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartPrice = cart.reduce((acc, curr) => acc + (parseFloat(curr.item.price) * curr.quantity), 0);

  return (
    <div className="min-h-screen bg-brand-cream-light text-brand-black font-sans flex flex-col pt-0 md:pt-[88px] pb-24 md:pb-0 overflow-x-hidden">
      
      {/* --- DESKTOP HEADER --- */}
      <header className="hidden md:flex fixed top-0 w-full z-50 bg-brand-black shadow-md px-8 py-4 justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('inicio')}>
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-0.5 shadow-lg shrink-0 overflow-hidden">
             <img src="/logo.webp" alt="Logo Mambo Club Restobar" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black italic tracking-tighter leading-none mb-1 text-white uppercase">MAMBO CLUB <span className="text-brand-orange">RESTOBAR</span></h1>
            <p className="text-[10px] text-brand-orange font-bold tracking-widest uppercase m-0 leading-none">
              Cevichería, Parrillas & Drinks
            </p>
          </div>
        </div>

        <nav className="flex gap-12 font-bold text-sm tracking-wide">
          <button 
            onClick={() => setActiveTab('inicio')} 
            className={`pb-1 border-b-2 transition-colors ${activeTab === 'inicio' ? 'border-brand-orange text-white' : 'border-transparent text-white/70 hover:text-white'}`}
          >
            INICIO
          </button>
          <button 
            onClick={() => setActiveTab('carta')} 
            className={`pb-1 border-b-2 transition-colors ${activeTab === 'carta' ? 'border-brand-orange text-white' : 'border-transparent text-white/70 hover:text-white'}`}
          >
            CARTA
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('carta')} 
            className="border border-brand-orange/30 text-white font-bold px-6 py-2.5 rounded hover:bg-brand-orange/10 transition-colors flex items-center text-sm tracking-wider"
          >
            VER MENÚ <ChevronRight className="w-4 h-4 ml-2 text-brand-orange"/>
          </button>
          
          {userRole === 'guest' ? (
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-brand-orange text-white hover:bg-brand-orange-dark font-black px-4 py-2.5 rounded flex items-center text-sm tracking-wider transition-colors shadow-lg shadow-brand-orange/20 uppercase"
            >
              <User className="w-4 h-4 mr-2"/> INGRESAR
            </button>
          ) : (
            <button 
              onClick={() => setActiveTab('cliente')}
              className="bg-brand-orange/20 text-brand-orange hover:bg-brand-orange/30 font-black px-4 py-2.5 rounded flex items-center text-sm tracking-wider transition-colors"
            >
              <User className="w-4 h-4 mr-2"/> MI PERFIL
            </button>
          )}
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto md:px-8">
        {activeTab === 'inicio' && (
          <div key="inicio" className="flex flex-col w-full">
            <HomeView 
              setActiveTab={setActiveTab} 
              onOpenSchedule={() => setIsScheduleOpen(true)}
              onOpenPaymentQR={() => setIsPaymentQROpen(true)}
              onOpenCash={() => setIsCashOpen(true)}
              onOpenBankTransfer={() => setIsBankTransferOpen(true)}
              addToCart={addToCart}
            />
          </div>
        )}
        {activeTab === 'carta' && (
          <div key="carta" className="flex flex-col w-full">
            <MenuView addToCart={addToCart} />
          </div>
        )}
        {activeTab === 'admin' && (
          <div key="admin" className="flex flex-col w-full">
            <AdminView onLogout={() => { setUserRole('guest'); setActiveTab('inicio'); }} />
          </div>
        )}
        {activeTab === 'cliente' && (
          <div key="cliente" className="flex flex-col w-full">
            <ClienteView 
              initialTab="perfil" 
              onLogout={() => { setUserRole('guest'); setActiveTab('inicio'); }} 
              isVipPassPurchased={isVipPassPurchased}
              setIsVipPassPurchased={setIsVipPassPurchased}
            />
          </div>
        )}
        {activeTab === 'vip' && (
          <div key="vip" className="flex flex-col w-full">
            <ClienteView 
              initialTab="vip" 
              onLogout={() => { setUserRole('guest'); setActiveTab('inicio'); }} 
              isVipPassPurchased={isVipPassPurchased}
              setIsVipPassPurchased={setIsVipPassPurchased}
            />
          </div>
        )}
      </main>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {totalCartItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-28 md:bottom-10 right-6 z-40"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-brand-orange text-white p-4 rounded-full shadow-[0_8px_30px_rgba(255,107,0,0.4)] hover:bg-brand-orange-dark transition-colors flex items-center justify-center relative active:scale-95"
            >
              <ShoppingCart className="w-7 h-7" />
              <div className="absolute -top-2 -right-2 bg-brand-black text-white text-xs font-black w-6 h-6 rounded-full border-2 border-brand-cream-light flex items-center justify-center">
                {totalCartItems}
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScheduleOpen && <ScheduleModal onClose={() => setIsScheduleOpen(false)} />}
        {isCartOpen && <CartModal cart={cart} onClose={() => setIsCartOpen(false)} onRemove={removeFromCart} onUpdateQuantity={updateCartQuantity} onUpdateComment={updateCartComment} total={totalCartPrice} />}
        {isLoginOpen && (
          <LoginModal 
            onClose={() => setIsLoginOpen(false)} 
            onLogin={handleLoginSuccess} 
          />
        )}
        {isPaymentQROpen && <PaymentQRModal onClose={() => setIsPaymentQROpen(false)} />}
        {isCashOpen && <CashModal onClose={() => setIsCashOpen(false)} />}
        {isBankTransferOpen && <BankTransferModal onClose={() => setIsBankTransferOpen(false)} />}
      </AnimatePresence>
      <footer className="hidden md:flex flex-col items-center justify-center py-8 text-xs font-bold text-brand-black/50 tracking-wider">
        <p className="mb-2 uppercase">© 2026 MAMBO CLUB RESTOBAR. TODOS LOS DERECHOS RESERVADOS.</p>
        <p>POWERED BY MANGUITO LABS</p>
      </footer>

      {/* --- MOBILE BOTTOM NAV --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-brand-black z-40 border-t border-white/5">
        <div className="flex h-16 relative">
          {userRole === 'guest' ? (
            <>
              <button 
                onClick={() => setActiveTab('inicio')}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors relative ${activeTab === 'inicio' ? 'text-brand-orange' : 'text-white'}`}
              >
                <Home className="w-6 h-6"/>
                <span className="text-[10px] font-bold tracking-wider">INICIO</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('carta')}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors relative ${activeTab === 'carta' ? 'text-brand-orange' : 'text-white'}`}
              >
                <Utensils className="w-6 h-6"/>
                <span className="text-[10px] font-bold tracking-wider">CARTA</span>
              </button>
              
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors relative text-white"
              >
                <User className="w-6 h-6"/>
                <span className="text-[10px] font-bold tracking-wider">INGRESAR</span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setActiveTab('carta')}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors relative ${activeTab === 'carta' ? 'text-brand-orange' : 'text-white'}`}
              >
                <Utensils className="w-6 h-6"/>
                <span className="text-[10px] font-bold tracking-wider">CARTA</span>
              </button>

              <button 
                onClick={() => setActiveTab('vip')}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors relative ${activeTab === 'vip' ? 'text-brand-orange' : 'text-white'}`}
              >
                <Award className="w-6 h-6"/>
                <span className="text-[10px] font-bold tracking-wider">VIP</span>
              </button>
              
              <button 
                onClick={() => setActiveTab(userRole === 'admin' ? 'admin' : 'cliente')}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors relative ${activeTab === 'admin' || activeTab === 'cliente' ? 'text-brand-orange' : 'text-white'}`}
              >
                <User className="w-6 h-6"/>
                <span className="text-[10px] font-bold tracking-wider uppercase">{userRole === 'admin' ? 'ADMIN' : 'PERFIL'}</span>
              </button>
            </>
          )}
        </div>
      </div>

    </div>
  );
}



// --- COMPONENTS ---



