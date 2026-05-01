import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { CATEGORIES, MENU_ITEMS } from '../../data';
import { MenuItemCard, MenuItemModal } from '../Shared';

export function MenuView({ addToCart }: { addToCart: (i:any, q:number, c:string)=>void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('entradas');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const activeCategoryData = React.useMemo(() => 
    CATEGORIES.find(c => c.id === activeCategory), 
  [activeCategory]);

  const filteredItems = React.useMemo(() => {
    let items = MENU_ITEMS;
    
    // Si hay búsqueda, busca en todo
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return items.filter(i => 
        i.title.toLowerCase().includes(q) || 
        i.description.toLowerCase().includes(q)
      );
    }
    
    // Si no hay búsqueda, filtra por categoría activa
    items = items.filter(i => i.categoryId === activeCategory);
    
    return items;
  }, [searchQuery, activeCategory]);

  const groupedItems = React.useMemo(() => {
    const groups: { [key: string]: typeof MENU_ITEMS } = {};
    
    filteredItems.forEach(item => {
      const sub = item.subCategory || 'Otros';
      if (!groups[sub]) groups[sub] = [];
      groups[sub].push(item);
    });
    
    return groups;
  }, [filteredItems]);

  // Si empezamos a buscar, ocultar la navegación de categorías
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="w-full flex-1 flex flex-col px-4 md:px-0 pt-4 md:pt-12 pb-12 min-h-[60vh]">
      <h2 className="text-3xl font-black mb-6 tracking-tight hidden md:block text-brand-black uppercase">Nuestra Carta</h2>
      
      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-brand-black/30" />
        </div>
        <input 
          type="text" 
          placeholder="¿Qué se te antoja hoy? (ceviche, parrilla, lomo...)" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-brand-cream-light text-brand-black rounded-2xl py-4 pl-14 pr-4 outline-none focus:ring-4 focus:ring-brand-orange/20 transition-all shadow-sm placeholder:text-brand-black/30 text-sm font-bold border border-brand-black/5 focus:border-brand-orange"
        />
      </div>

      {/* Category Navigation (Hidden when searching) */}
      {!isSearching && (
        <div className="mb-10">
          <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 snap-x">
             {CATEGORIES.map(c => {
               const isActive = activeCategory === c.id;
               return (
                 <button 
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className={`snap-start font-black text-xs px-8 py-3 rounded-2xl whitespace-nowrap shadow-sm tracking-widest transition-all active:scale-95 uppercase ${isActive ? 'bg-brand-orange text-white' : 'bg-white text-brand-black/60 hover:text-brand-black border border-brand-black/5'}`}
                 >
                    {c.label}
                 </button>
               )
             })}
          </div>
        </div>
      )}

      {/* List / Grid of items grouped by subcategory */}
      <div className="space-y-12 mt-4">
         {filteredItems.length > 0 ? (
           Object.keys(groupedItems).map(sub => (
             <div key={sub} className="space-y-6">
                {!isSearching && (
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-black text-brand-black uppercase italic tracking-tight shrink-0">{sub}</h3>
                    <div className="h-px bg-brand-black/5 w-full"></div>
                  </div>
                )}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {groupedItems[sub].map((item) => (
                    <MenuItemCard key={`menu-${item.id}`} item={item} onClick={() => setSelectedItem(item)} />
                  ))}
                </div>
             </div>
           ))
         ) : (
           <div className="py-24 flex flex-col items-center justify-center text-brand-black/20 text-center">
              <Search className="w-20 h-20 mb-6 opacity-10" />
              <p className="text-xl font-black tracking-wide text-brand-black/40 uppercase">No encontramos "{searchQuery}"</p>
              <p className="text-sm mt-2 font-bold text-brand-black/30">Intenta buscar otro plato de nuestra carta.</p>
           </div>
         )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} onAdd={(q, c) => addToCart(selectedItem, q, c)} />
        )}
      </AnimatePresence>
    </div>
  )
}
