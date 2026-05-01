export const CATEGORIES = [
  { id: 'entradas', label: 'ENTRADAS' },
  { id: 'ceviches', label: 'NUESTROS CEVICHES' },
  { id: 'fondos', label: 'PLATOS DE FONDO' },
  { id: 'parrillas', label: 'PARRILLAS Y BRASAS' },
  { id: 'combos', label: 'DUOS & TRIOS' },
  { id: 'bebidas', label: 'BEBIDAS' }
];

export const MENU_ITEMS = [
  // CEVICHES
  {
    id: 1,
    categoryId: 'ceviches',
    subCategory: 'Clásicos',
    tag: 'Clásico',
    isTop: true,
    title: 'Ceviche de Pescado',
    price: '35.00',
    description: 'Pescado fresco del día marinado en limón de Chulucanas, ají limo, cebolla roja, acompañado de camote glaseado y canchita.',
    image: '/ceviche-pedrito.webp'
  },
  {
    id: 3,
    categoryId: 'ceviches',
    subCategory: 'Clásicos',
    tag: 'Norteño',
    isTop: false,
    title: 'Ceviche Mixto Mambo',
    price: '42.00',
    description: 'Pescado, pulpo, calamar y langostinos en nuestro aliño secreto piurano de la casa.',
    image: '/Ceviche_Mixto_Mambo.webp'
  },
  {
    id: 11,
    categoryId: 'ceviches',
    subCategory: 'Especiales',
    tag: 'Especial',
    isTop: false,
    title: 'Ceviche de Conchas Negras',
    price: '45.00',
    description: 'Directo de Tumbes, con limón, ají limo y cebolla picada. Potencia pura.',
    image: '/Ceviche_de_Conchas_Negras.webp'
  },
  {
    id: 12,
    categoryId: 'ceviches',
    subCategory: 'Tiraditos',
    tag: 'Refrescante',
    isTop: false,
    title: 'Tiradito al Ají Amarillo',
    price: '38.00',
    description: 'Láminas de pescado en crema de ají amarillo, limón y un toque de crema de leche.',
    image: '/Tiradito_al_Aji_Amarillo.webp'
  },
  {
    id: 13,
    categoryId: 'ceviches',
    subCategory: 'Clásicos',
    tag: 'Popular',
    isTop: false,
    title: 'Ceviche Carretillero',
    price: '40.00',
    description: 'Nuestro ceviche clásico de pescado acompañado de abundante chicharrón de pota crujiente.',
    image: '/Ceviche_Carretillero.webp'
  },
  {
    id: 14,
    categoryId: 'ceviches',
    subCategory: 'Especiales',
    tag: 'Marino',
    isTop: false,
    title: 'Ceviche de Langostinos',
    price: '44.00',
    description: 'Langostinos selectos blanqueados y marinados en el punto exacto de limón y ají.',
    image: '/Ceviche_de_Langostinos.webp'
  },
  {
    id: 15,
    categoryId: 'ceviches',
    subCategory: 'Tiraditos',
    tag: 'Fusión',
    isTop: false,
    title: 'Tiradito Mambo Nikei',
    price: '46.00',
    description: 'Fusión peruano-japonesa con salsa de soja, aceite de sésamo y un toque de jengibre.',
    image: '/Tiradito_Mambo_Nikei.webp'
  },
  {
    id: 49,
    categoryId: 'ceviches',
    subCategory: 'Tiraditos',
    tag: 'Tres Ajíes',
    isTop: false,
    title: 'Tiradito Tres Colores',
    price: '42.00',
    description: 'Láminas de pescado en tres salsas: Rocoto, Ají Amarillo y Crema de la casa.',
    image: '/Tiradito_Tres_Colores.webp'
  },
  {
    id: 16,
    categoryId: 'ceviches',
    subCategory: 'Especiales',
    tag: 'Picante',
    isTop: false,
    title: 'Ceviche de Pulpo al Olivo',
    price: '48.00',
    description: 'Trozos de pulpo suave con una base de ceviche y coronado con nuestra crema de olivo premium.',
    image: '/Ceviche_de_Pulpo_al_Olivo.webp'
  },
  {
    id: 50,
    categoryId: 'ceviches',
    subCategory: 'Especiales',
    tag: 'Marino',
    isTop: false,
    title: 'Ceviche de Calamar y Pescado',
    price: '38.00',
    description: 'Aros de calamar tierno y dados de pescado en una leche de tigre intensa.',
    image: '/Ceviche_de_Calamar_y_Pescado.webp'
  },

  // ENTRADAS
  {
    id: 2,
    categoryId: 'entradas',
    subCategory: 'Marinas',
    tag: 'Favorito',
    isTop: true,
    title: 'Leche de Tigre Especial',
    price: '18.00',
    description: 'Concentrado de ceviche con trozos de pescado y mariscos, coronado con chicharrón de pota.',
    image: '/leche-tigre.webp'
  },
  {
    id: 51,
    categoryId: 'entradas',
    subCategory: 'Marinas',
    tag: 'Clásico',
    isTop: false,
    title: 'Choros a la Chalaca (6 und)',
    price: '22.00',
    description: 'Mejillones frescos con salsa de cebolla, tomate y un toque de ají limo.',
    image: '/Choros_a_la_Chalaca.webp'
  },
  {
    id: 23,
    categoryId: 'entradas',
    subCategory: 'Marinas',
    tag: 'Abundante',
    isTop: false,
    title: 'Chicharrón de Pota',
    price: '25.00',
    description: 'Pota crocante con yuca frita y salsa criolla piurana.',
    image: '/chicharon-pescado.webp'
  },
  {
    id: 17,
    categoryId: 'entradas',
    subCategory: 'Para Compartir',
    tag: 'Crujiente',
    isTop: false,
    title: 'Tequeños Mambo (8 und)',
    price: '22.00',
    description: 'Masa wantán rellena de queso andino, fritos al momento, acompañados de crema de palta.',
    image: '/Tequenos_Mambo.webp'
  },
  {
    id: 52,
    categoryId: 'entradas',
    subCategory: 'Para Compartir',
    tag: 'Favorito',
    isTop: false,
    title: 'Trío de Alitas Mambo',
    price: '32.00',
    description: 'Alitas BBQ, Acevichadas y Alitas al Maracuyá (9 und).',
    image: '/Trio_de_Alitas_Mambo.webp'
  },
  {
    id: 21,
    categoryId: 'entradas',
    subCategory: 'Para Compartir',
    tag: 'Clásico',
    isTop: false,
    title: 'Papa a la Huancaína',
    price: '18.00',
    description: 'Rodajas de papa sancochada bañadas en crema de ají amarillo y queso fresco.',
    image: '/Papa_a_la_Huancaina.webp'
  },
  {
    id: 18,
    categoryId: 'entradas',
    subCategory: 'Causas',
    tag: 'Tradicional',
    isTop: false,
    title: 'Causa Limeña de Pollo',
    price: '20.00',
    description: 'Masa de papa amarilla con ají amarillo, rellena de pollo deshilachado, palta y mayonesa.',
    image: '/Causa_Limena_de_Pollo.webp'
  },
  {
    id: 53,
    categoryId: 'entradas',
    subCategory: 'Causas',
    tag: 'Marino',
    isTop: false,
    title: 'Causa Acevichada',
    price: '32.00',
    description: 'Causa de papa amarilla coronada con nuestro ceviche clásico.',
    image: '/Causa_Acevichada.webp'
  },
  {
    id: 19,
    categoryId: 'entradas',
    subCategory: 'Causas',
    tag: 'Marino',
    isTop: false,
    title: 'Causa de Langostinos',
    price: '28.00',
    description: 'Nuestra clásica causa coronada con langostinos al vapor y salsa golf artesanal.',
    image: '/causa-marina.webp'
  },
  {
    id: 20,
    categoryId: 'entradas',
    subCategory: 'Tradición',
    tag: 'Norteño',
    isTop: false,
    title: 'Tamalitos Verdes Piuranos',
    price: '15.00',
    description: 'Tradición piurana a base de choclo fresco y culantro, servidos con salsa criolla.',
    image: '/Tamalitos_Verdes_Piuranos.webp'
  },
  {
    id: 54,
    categoryId: 'entradas',
    subCategory: 'Tradición',
    tag: 'Norteño',
    isTop: false,
    title: 'Majado de Yuca con Chicharrón',
    price: '28.00',
    description: 'Yuca majada con aderezo norteño y trozos crujientes de chancho.',
    image: '/Majado_de_Yuca_con_Chicharron.webp'
  },
  {
    id: 22,
    categoryId: 'entradas',
    subCategory: 'Tradición',
    tag: 'Del Mar',
    isTop: false,
    title: 'Pulpo al Olivo',
    price: '32.00',
    description: 'Láminas de pulpo tierno bañadas en crema de botija, aceite de oliva y galletas de soda.',
    image: '/Pulpo_al_Olivo.webp'
  },

  // PLATOS DE FONDO
  {
    id: 4,
    categoryId: 'fondos',
    subCategory: 'Arroces',
    tag: 'Recomendado',
    isTop: true,
    title: 'Arroz con Mariscos',
    price: '38.00',
    description: 'Arroz al dente con coral de langostino, mariscos frescos de Paita, pimientos y un toque de parmesano.',
    image: '/arroz-nautico.webp'
  },
  {
    id: 5,
    categoryId: 'fondos',
    subCategory: 'Especialidades',
    tag: 'Familiar',
    isTop: false,
    title: 'Jalea Mixta Especial',
    price: '48.00',
    description: 'Variedad de mariscos y pescado en tempura crujiente, servido con yuca frita piurana y salsa criolla.',
    image: '/jalea-mixta.webp'
  },
  {
    id: 24,
    categoryId: 'fondos',
    subCategory: 'Arroces',
    tag: 'Wok',
    isTop: false,
    title: 'Arroz Chaufa de Mariscos',
    price: '36.00',
    description: 'Arroz salteado al wok con mariscos frescos, cebollita china, huevo y el toque oriental del chef.',
    image: '/Arroz_Chaufa_de_Mariscos.webp'
  },
  {
    id: 55,
    categoryId: 'fondos',
    subCategory: 'Arroces',
    tag: 'Fusión',
    isTop: false,
    title: 'Chaufa Mambo Especial',
    price: '42.00',
    description: 'Arroz chaufa con trozos de pollo, lomo, mariscos y cecina de la selva.',
    image: '/Chaufa_Mambo_Especial.webp'
  },
  {
    id: 25,
    categoryId: 'fondos',
    subCategory: 'Sopas y Sudados',
    tag: 'Puro Norte',
    isTop: false,
    title: 'Sudado de Cachema (Piurano)',
    price: '45.00',
    description: 'Cachema entera sudada con chicha de jora, tomate, cebolla y ají panca. Un clásico del Norte.',
    image: '/sudado-norteño.webp'
  },
  {
    id: 56,
    categoryId: 'fondos',
    subCategory: 'Sopas y Sudados',
    tag: 'Tradición',
    isTop: false,
    title: 'Chilcano de Pescado Potente',
    price: '15.00',
    description: 'Concentrado de pescado con cebollita china, jengibre y limón.',
    image: '/Chilcano_de_Pescado_Potente.webp'
  },
  {
    id: 26,
    categoryId: 'fondos',
    subCategory: 'Sopas y Sudados',
    tag: 'Potente',
    isTop: false,
    title: 'Parihuela Brava',
    price: '48.00',
    description: 'Sopa concentrada de pescados y mariscos con toque de chicha y ají panca. Levanta muertos.',
    image: '/parihuela-brava.webp'
  },
  {
    id: 27,
    categoryId: 'fondos',
    subCategory: 'Especialidades',
    tag: 'Especialidad',
    isTop: false,
    title: 'Pescado a lo Macho',
    price: '46.00',
    description: 'Filete de pescado a la plancha bañado en una salsa cremosa de mariscos y ajíes peruanos.',
    image: '/Pescado_a_lo_Macho.webp'
  },
  {
    id: 28,
    categoryId: 'fondos',
    subCategory: 'Especialidades',
    tag: 'Sabor Único',
    isTop: false,
    title: 'Tacu Tacu con Picante de Mariscos',
    price: '44.00',
    description: 'Mezcla de arroz y frejol frito, servido con un guiso cremoso y picante de mariscos.',
    image: '/Tacu_Tacu_con_Picante_de_Mariscos.webp'
  },
  {
    id: 57,
    categoryId: 'fondos',
    subCategory: 'Pastas',
    tag: 'Tradición',
    isTop: false,
    title: 'Tallarines Verdes con Lomo',
    price: '45.00',
    description: 'Pasta con salsa de albahaca y espinaca, servido con dados de lomo fino.',
    image: '/Tallarines_Verdes_con_Lomo.webp'
  },
  {
    id: 58,
    categoryId: 'fondos',
    subCategory: 'Pastas',
    tag: 'Deluxe',
    isTop: false,
    title: 'Fettuccine en Salsa de Mariscos',
    price: '48.00',
    description: 'Fettuccine al huevo bañado en nuestra salsa cremosa de la casa con mariscos selectos.',
    image: '/Fettuccine_en_Salsa_de_Mariscos.webp'
  },
  {
    id: 29,
    categoryId: 'fondos',
    subCategory: 'Pastas',
    tag: 'Pasta',
    isTop: false,
    title: 'Tallarín Saltado de Mariscos',
    price: '38.00',
    description: 'Fideos salteados al wok con mariscos, cebolla, tomate y un toque de salsa de soja.',
    image: '/Tallarin_Saltado_de_Mariscos.webp'
  },

  // PARRILLAS Y BRASAS
  {
    id: 6,
    categoryId: 'parrillas',
    subCategory: 'Res y Lomo',
    tag: 'A la Brasa',
    isTop: true,
    title: 'Parrilla Mixta Mambo',
    price: '65.00',
    description: 'Fino corte de lomo, chuleta de cerdo, pechuga de pollo, anticucho y chorizo, servido con papas doradas y ensalada fresca.',
    image: '/Parrilla_Mixta_Mambo.webp'
  },
  {
    id: 59,
    categoryId: 'parrillas',
    subCategory: 'Res y Lomo',
    tag: 'Premium',
    isTop: false,
    title: 'Bife de Chorizo 400g',
    price: '62.00',
    description: 'Corte de res jugoso a la parrilla con papas fritas y ensalada fresca.',
    image: '/Bife_de_Chorizo_400g.webp'
  },
  {
    id: 7,
    categoryId: 'parrillas',
    subCategory: 'Individuales',
    tag: 'Tradicional',
    isTop: true,
    title: 'Anticuchos Corazón',
    price: '28.00',
    description: 'Dos palitos de corazón de res marinado en ají panca y especias, servido con papa dorada y choclo.',
    image: '/Anticuchos_Corazon.webp'
  },
  {
    id: 60,
    categoryId: 'parrillas',
    subCategory: 'Individuales',
    tag: 'Popular',
    isTop: false,
    title: 'Salchipapa Mambo Especial',
    price: '25.00',
    description: 'Papas fritas con hot dog, chorizo parrillero y todas las cremas de la casa.',
    image: '/Salchipapa_Mambo_Especial.webp'
  },
  {
    id: 8,
    categoryId: 'parrillas',
    subCategory: 'Res y Lomo',
    tag: 'Favorito',
    isTop: true,
    title: 'Lomo Saltado al Wok',
    price: '42.00',
    description: 'Dados de lomo fino salteados con cebolla, tomate y ají amarillo, servido con papas fritas y arroz graneado.',
    image: '/Lomo_Saltado_al_Wok.webp'
  },
  {
    id: 30,
    categoryId: 'parrillas',
    subCategory: 'Res y Lomo',
    tag: 'Corte Fino',
    isTop: false,
    title: 'Bife Ancho Premium 350g',
    price: '55.00',
    description: 'Corte de res seleccionado a la parrilla, servido con papas nativas doradas y chimichurri de la casa.',
    image: '/Bife_Ancho_Premium_350g.webp'
  },
  {
    id: 31,
    categoryId: 'parrillas',
    subCategory: 'Individuales',
    tag: 'Sabor Brasa',
    isTop: false,
    title: 'Pechuga de Pollo a la Parrilla',
    price: '32.00',
    description: 'Láminas de pechuga marinadas en finas hierbas y cocidas al carbón, servidas con ensalada cocida.',
    image: '/Pechuga_de_Pollo_a_la_Parrilla.webp'
  },
  {
    id: 32,
    categoryId: 'parrillas',
    subCategory: 'Individuales',
    tag: 'Especial',
    isTop: false,
    title: 'Chuleta de Cerdo Mambo',
    price: '35.00',
    description: 'Dos chuletas de cerdo jugosas al carbón con un toque de salsa BBQ artesanal.',
    image: '/Chuleta_de_Cerdo_Mambo.webp'
  },
  {
    id: 33,
    categoryId: 'parrillas',
    subCategory: 'Especiales BBQ',
    tag: 'Combinado',
    isTop: false,
    title: 'Parrilla Mar y Tierra',
    price: '72.00',
    description: 'Corte de lomo fino acompañado de langostinos al grill y pulpo anticuchero.',
    image: '/Parrilla_Mar_y_Tierra.webp'
  },
  {
    id: 61,
    categoryId: 'parrillas',
    subCategory: 'Especiales BBQ',
    tag: 'Wok',
    isTop: false,
    title: 'Pollo Saltado al Estilo Mambo',
    price: '32.00',
    description: 'Pechuga de pollo al wok con cebolla, tomate y un toque de chicha de jora.',
    image: '/Pollo_Saltado_al_Estilo_Mambo.webp'
  },
  {
    id: 34,
    categoryId: 'parrillas',
    subCategory: 'Especiales BBQ',
    tag: 'Para Picar',
    isTop: false,
    title: 'Costillitas BBQ Mambo',
    price: '48.00',
    description: 'Media costillar de cerdo bañada en nuestra salsa secreta, servido con camote frito.',
    image: '/Costillitas_BBQ_Mambo.webp'
  },

  // DUOS & TRIOS
  {
    id: 9,
    categoryId: 'combos',
    subCategory: 'Combos Marinos',
    tag: 'Promo',
    isTop: false,
    title: 'Bandeja Mambo',
    price: '55.00',
    description: 'Ceviche de Pescado + Arroz con Mariscos + Chicharrón de Pescado.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 35,
    categoryId: 'combos',
    subCategory: 'Combos Marinos',
    tag: 'Clásico',
    isTop: false,
    title: 'Dúo Marino',
    price: '42.00',
    description: 'Ceviche de Pescado + Arroz con Mariscos.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 36,
    categoryId: 'combos',
    subCategory: 'Combos Criollos',
    tag: 'Popular',
    isTop: false,
    title: 'Trío Criollo',
    price: '58.00',
    description: 'Lomo Saltado + Ají de Gallina + Causa Limeña.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 37,
    categoryId: 'combos',
    subCategory: 'Piqueos y Familiares',
    tag: 'Familiar',
    isTop: false,
    title: 'Combo Parrillero Familiar',
    price: '145.00',
    description: '2 Lomo, 2 Pollo, 2 Chuletas, 4 Chorizos, Papas y Ensalada Grande + Chicha 1L.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 38,
    categoryId: 'combos',
    subCategory: 'Combos Marinos',
    tag: 'Norteño',
    isTop: false,
    title: 'Dúo Norteño',
    price: '48.00',
    description: 'Ceviche de Pescado + Sudado de Cachema Individual.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 39,
    categoryId: 'combos',
    subCategory: 'Combos Marinos',
    tag: 'Trío Mambo',
    isTop: false,
    title: 'Trío Mambo Marino',
    price: '56.00',
    description: 'Ceviche Especial + Chicharrón de Pota + Arroz con Mariscos.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 40,
    categoryId: 'combos',
    subCategory: 'Combos Criollos',
    tag: 'Ejecutivo',
    isTop: false,
    title: 'Oferta Almuerzo Mambo',
    price: '35.00',
    description: 'Entrada del día + Plato de Fondo Seleccionado + Bebida del momento.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 41,
    categoryId: 'combos',
    subCategory: 'Piqueos y Familiares',
    tag: 'Piqueo',
    isTop: false,
    title: 'Combo Pisco & Piqueo',
    price: '68.00',
    description: 'Fuente de Tequeños y Alitas BBQ + 2 Chilcanos Clásicos.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800'
  },

  // BEBIDAS
  {
    id: 10,
    categoryId: 'bebidas',
    subCategory: 'Sin Alcohol',
    tag: 'Infaltable',
    isTop: false,
    title: 'Chicha Morada Premium 1L',
    price: '15.00',
    description: 'Elaborada con maíz morado piurano, piña, canela y clavo de olor.',
    image: '/chicha-morada.webp'
  },
  {
    id: 42,
    categoryId: 'bebidas',
    subCategory: 'Sin Alcohol',
    tag: 'Frozen',
    isTop: false,
    title: 'Limonada Frozen',
    price: '12.00',
    description: 'Refrescante limonada con abundante hielo frappé.',
    image: '/Limonada_Frozen.webp'
  },
  {
    id: 43,
    categoryId: 'bebidas',
    subCategory: 'Sin Alcohol',
    tag: 'Natural',
    isTop: false,
    title: 'Jugo de Maracuyá',
    price: '10.00',
    description: 'Fruta de la pasión fresca de estación.',
    image: '/Jugo_de_Maracuya.webp'
  },
  {
    id: 44,
    categoryId: 'bebidas',
    subCategory: 'Sin Alcohol',
    tag: 'Gaseosa',
    isTop: false,
    title: 'Inca Kola / Coca Cola 500ml',
    price: '6.00',
    description: 'Botella personal helada.',
    image: '/Inca_Kola_Coca_Cola.webp'
  },
  {
    id: 45,
    categoryId: 'bebidas',
    subCategory: 'Cocteles y Cervezas',
    tag: 'Cerveza',
    isTop: false,
    title: 'Cerveza Cusqueña 330ml',
    price: '10.00',
    description: 'Dorada, negra o roja bien helada.',
    image: '/Cerveza_Cusquena.webp'
  },
  {
    id: 46,
    categoryId: 'bebidas',
    subCategory: 'Cocteles y Cervezas',
    tag: 'Cóstel',
    isTop: false,
    title: 'Pisco Sour Clásico',
    price: '22.00',
    description: 'Nuestra bebida bandera preparada con Pisco Quebranta.',
    image: '/Pisco_Sour_Clasico.webp'
  },
  {
    id: 47,
    categoryId: 'bebidas',
    subCategory: 'Cocteles y Cervezas',
    tag: 'Refrescante',
    isTop: false,
    title: 'Chilcano de Pisco',
    price: '18.00',
    description: 'Pisco, ginger ale, limón y amargo de angostura.',
    image: '/Chilcano_de_Pisco.webp'
  },
  {
    id: 48,
    categoryId: 'bebidas',
    subCategory: 'Agua',
    tag: 'Agua',
    isTop: false,
    title: 'Agua Mineral 500ml',
    price: '4.00',
    description: 'Con o sin gas.',
    image: '/Agua_Mineral.webp'
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    desktopTitle: 'MAMBO CLUB',
    desktopText: 'La mejor experiencia culinaria de Talara. Ceviches frescos, carnes a la brasa y el ambiente que estabas buscando.',
    mobileTitle: 'Mambo Club',
    mobileSubtitle: 'Restobar & Parrillas',
    image: '/banner-1.webp'
  },
  {
    id: 2,
    desktopTitle: 'CARNES Y BRASAS',
    desktopText: 'Cortes premium seleccionados y preparados al carbón para un sabor inigualable.',
    mobileTitle: 'Brasas',
    mobileSubtitle: 'Sabor al Carbón',
    image: '/banner-2.webp'
  },
  {
    id: 3,
    desktopTitle: 'AUTÉNTICO CEVICHE',
    desktopText: 'Mantenemos la esencia de Talara con los insumos más frescos del día.',
    mobileTitle: 'Marinos',
    mobileSubtitle: 'Puro Norte',
    image: '/ceviche-pedrito.webp'
  }
];

