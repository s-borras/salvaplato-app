/**
 * SalvaPlato Colombia - Base de Datos Compartida y Sincronizacion de Franquicias y Sedes
 * Soporta Arquitectura de Franquicias (Marcas) con multiples Sedes/Sucursales,
 * Menus Oficiales Reales con Precios en COP y Descuentos Escalonados por Categoria:
 * - Rescate Nocturno / Cierres (50% a 70% OFF)
 * - Combos Grandes & Especiales (20% OFF)
 * - Platos Fuertes en Carta (15% OFF)
 * - Bebidas, Acompañamientos & Postres (10% OFF)
 */

const COLOMBIA_FRANCHISES = [
  // ==========================================================
  // 1. CREPES & WAFFLES
  // ==========================================================
  {
    id: "fran-crepes",
    name: "Crepes & Waffles",
    brandLogo: "\u{1F95E}",
    logoImage: "assets/logos/crepes-and-waffles.svg",
    category: "Gourmet",
    tag: "\u{1F3C6} Top Pedidos Rappi",
    rating: 4.9,
    reviews: 5420,
    coverImage: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
    openingHours: "11:30 AM - 10:00 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Valentina Gomez (Gerencia Operaciones)",
    contactPhone: "+57 310 452 8891",
    meetingNotes: "Aceptaron piloto. Excedentes en cierre nocturno (54% OFF), 20% en combos de pareja, 15% en crepes individuales y 10% en bebidas.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "cw-rec-1",
            title: "Bolsa Rescate: Crepe Salado Pollo Trufado + Ensalada",
            description: "Crepe artesanal con pollo en salsa cremosa de trufas y ensalada fresca del dia.",
            originalPrice: 35900,
            discountedPrice: 16500,
            discountPercent: 54,
            tier: "rescue",
            stock: 4,
            pickupWindow: "Hoy 8:45 PM - 9:45 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-rec-2",
            title: "Pack Mini Waffles + Salsa Tibia de Arequipe",
            description: "Masa fresca horneada del dia con salsa artesanal de arequipe y almendras tostadas.",
            originalPrice: 22000,
            discountedPrice: 10500,
            discountPercent: 52,
            tier: "rescue",
            stock: 3,
            pickupWindow: "Hoy 5:00 PM - 6:30 PM",
            type: "rescue",
            shift: "afternoon",
            image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "cw-comb-1",
            title: "Combo Pareja C&W: 2 Crepes Fuertes + 2 Bebidas + 1 Waffle Nutella",
            description: "Banquete para dos: 1 Crepe Pollo Champiñones, 1 Crepe Stroganoff, 2 Jugos de Mandarina Frappe y 1 Waffle Nutella para compartir.",
            originalPrice: 79900,
            discountedPrice: 63900,
            discountPercent: 20,
            tier: "combo20",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-comb-2",
            title: "Combo Familiar Brunch C&W: 2 Crepes Salados + 2 Mini Waffles + 4 Bebidas",
            description: "Especial familiar con 2 crepes fuertes a eleccion, 2 mini waffles artesanales con arequipe y 4 jugos naturales.",
            originalPrice: 115000,
            discountedPrice: 92000,
            discountPercent: 20,
            tier: "combo20",
            stock: 15,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Platos Fuertes en Carta (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "cw-reg-1",
            title: "Crepe de Pollo, Champiñones y Queso",
            description: "El plato insignia mas pedido en Colombia. Pechuga desmechada, champiñones frescos y salsa blanca suave.",
            originalPrice: 31900,
            discountedPrice: 27100,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-reg-2",
            title: "Crepe Stroganoff de Lomo Fino",
            description: "Julianas de lomo de res tierno en reduccion de vino tinto, crema agria y champiñones dorados.",
            originalPrice: 38900,
            discountedPrice: 33000,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-reg-3",
            title: "Crepe Bretaña (Jamon Ahumado & Queso Holandes)",
            description: "Fina masa de crepe rellena de jamon ahumado premium, queso holandes fundido y champiñones al ajillo.",
            originalPrice: 29500,
            discountedPrice: 25000,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-reg-4",
            title: "Crepe Sombrero Vueltiao (Carne Criolla & Platano)",
            description: "Tradicion colombiana: carne desmechada en sofrito criollo, queso campesino costeño y tajadas de platano maduro.",
            originalPrice: 32500,
            discountedPrice: 27600,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-reg-5",
            title: "Pita de Salmon Ahumado & Aguacate",
            description: "Pan pita artesanal crocante relleno de lonjas de salmon noruego, aguacate fresco, queso crema y vinagreta oriental.",
            originalPrice: 35900,
            discountedPrice: 30500,
            discountPercent: 15,
            tier: "main15",
            stock: 18,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Bebidas, Acompañamientos & Postres (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "cw-beb-1",
            title: "Jugo Natural de Mandarina Frappe",
            description: "100% fruta natural recien exprimida, servida con hielo frappe sin azucar añadida.",
            originalPrice: 11500,
            discountedPrice: 10300,
            discountPercent: 10,
            tier: "side10",
            stock: 45,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-beb-2",
            title: "Limonada de Coco C&W",
            description: "Bebida cremosa insignia preparada con leche de coco natural y zumo de limon fresco.",
            originalPrice: 12900,
            discountedPrice: 11600,
            discountPercent: 10,
            tier: "side10",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-pos-1",
            title: "Waffle con Arequipe Artesanal & Almendras",
            description: "Waffle crocante recien horneado bañado en salsa tibia de arequipe y lluvia de almendras tostadas.",
            originalPrice: 19500,
            discountedPrice: 17500,
            discountPercent: 10,
            tier: "side10",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-pos-2",
            title: "Copa Suprema de Helado",
            description: "Tres bolas de helado artesanal, trozos de brownie caliente casero, chantilly y salsa de chocolate.",
            originalPrice: 18900,
            discountedPrice: 17000,
            discountPercent: 10,
            tier: "side10",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "crepes-zona-g",
        branchName: "Zona G",
        address: "Cra. 5 # 69-26, Bogota",
        zone: "Zona G / Chapinero",
        distance: "350 m",
        contactName: "Valentina Gomez",
        contactPhone: "+57 310 452 8891",
        isActive: true
      },
      {
        id: "crepes-parque-93",
        branchName: "Parque 93",
        address: "Cra. 11A # 93-42, Bogota",
        zone: "Parque 93 / Chico",
        distance: "800 m",
        contactName: "Carlos Rincon",
        contactPhone: "+57 315 889 1234",
        isActive: true
      },
      {
        id: "crepes-usaquen",
        branchName: "Usaquen Colonial",
        address: "Calle 119 # 6A-15, Bogota",
        zone: "Usaquen",
        distance: "1.2 km",
        contactName: "Mariana Silva",
        contactPhone: "+57 318 444 5566",
        isActive: true
      },
      {
        id: "crepes-calle-85",
        branchName: "Zona Rosa Calle 85",
        address: "Calle 85 # 12-28, Bogota",
        zone: "Zona Rosa / Andino",
        distance: "280 m",
        contactName: "Felipe Morales",
        contactPhone: "+57 311 223 9988",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 2. EL CORRAL - HAMBURGUESAS
  // ==========================================================
  {
    id: "fran-corral",
    name: "El Corral - Hamburguesas",
    brandLogo: "\u{1F354}",
    logoImage: "assets/logos/el-corral.png",
    category: "Hamburguesas",
    tag: "\u{1F525} La Receta Original",
    rating: 4.8,
    reviews: 6120,
    coverImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    openingHours: "11:00 AM - 10:30 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Mauricio Londoño (Director Franquicias)",
    contactPhone: "+57 311 880 2341",
    meetingNotes: "Aceptaron piloto. 20% en combos dobles y familiares, 15% en hamburguesas clasicas y 51% en rescates de cierre.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "corral-rec-1",
            title: "Combo Rescate: Corralisima con Queso + Papas en Cascos",
            description: "Hamburguesa Corralisima con queso cheddar derretido a la parrilla, acompañada de porcion de papas en cascos.",
            originalPrice: 34900,
            discountedPrice: 16900,
            discountPercent: 51,
            tier: "rescue",
            stock: 5,
            pickupWindow: "Hoy 9:00 PM - 10:00 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-rec-2",
            title: "Pack Rescate: 2 Perros Calientes Tradicionales + Papas Francesas",
            description: "Dos perros calientes con salchicha premium, queso fundido, papas chip crocantes y salsas Corral.",
            originalPrice: 36000,
            discountedPrice: 14900,
            discountPercent: 58,
            tier: "rescue",
            stock: 3,
            pickupWindow: "Hoy 9:15 PM - 10:15 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "corral-comb-1",
            title: "Super Combo Doble Vaquera BBQ + Aros de Cebolla + 2 Gaseosas",
            description: "Combo gigante con 2 hamburguesas Vaqueras (tocineta, queso mozzarella y salsa BBQ), aros de cebolla crocantes y 2 gaseosas heladas.",
            originalPrice: 64900,
            discountedPrice: 51900,
            discountPercent: 20,
            tier: "combo20",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-comb-2",
            title: "Combo Pareja Corralisima: 2 Corralisimas con Queso + 2 Papas + 2 Bebidas",
            description: "El combo favorito para dos: dos hamburguesas Corralisimas 220g con queso, 2 porciones de papas en cascos y 2 gaseosas.",
            originalPrice: 78000,
            discountedPrice: 62400,
            discountPercent: 20,
            tier: "combo20",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Platos Fuertes en Carta (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "corral-reg-1",
            title: "Hamburguesa Corral Tradicional",
            description: "125g de jugosa carne 100% res a la parrilla, salsa Corral de la casa, cebolla, tomate y lechuga fresca en pan ajonjoli.",
            originalPrice: 23900,
            discountedPrice: 20300,
            discountPercent: 15,
            tier: "main15",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-reg-2",
            title: "Hamburguesa Corralisima con Queso",
            description: "220g de carne de res a la brasa con queso cheddar fundido, salsa especial Corral, lechuga y tomate fresco.",
            originalPrice: 34900,
            discountedPrice: 29600,
            discountPercent: 15,
            tier: "main15",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-reg-3",
            title: "Hamburguesa Vaquera BBQ con Tocineta",
            description: "Carne a la parrilla con tocineta crocante, queso mozzarella, cebolla grille y salsa BBQ artesanal ahumada.",
            originalPrice: 32900,
            discountedPrice: 27900,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-reg-4",
            title: "Hamburguesa Todoterreno Doble",
            description: "Doble porcion de carne a la parrilla, tocineta ahumada, doble queso mozzarella fundido, verduras y salsa tartara.",
            originalPrice: 39900,
            discountedPrice: 33900,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1583032015879-bf89e9f656cb?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-reg-5",
            title: "Perro Vaquero El Corral",
            description: "Salchicha americana premium en pan artesanal con tocineta crocante, queso fundido y papas fosforito.",
            originalPrice: 24900,
            discountedPrice: 21100,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Bebidas, Acompañamientos & Postres (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "corral-acom-1",
            title: "Porcion de Papas en Cascos Rusticas",
            description: "Las autenticas papas rusticas con piel sazonadas con sal marina y especias Corral.",
            originalPrice: 9900,
            discountedPrice: 8900,
            discountPercent: 10,
            tier: "side10",
            stock: 60,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-acom-2",
            title: "Aros de Cebolla Apanados El Corral",
            description: "Aros de cebolla dulce seleccionados, apanados artesanalmente y fritos al punto dorado crujiente.",
            originalPrice: 11500,
            discountedPrice: 10300,
            discountPercent: 10,
            tier: "side10",
            stock: 45,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1639024471287-032f66e01a87?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-beb-1",
            title: "Malteada Tradicional de Arequipe Colombiano",
            description: "Elaborada con autentico helado de vainilla batido a mano y dulce de arequipe colombiano artesanal.",
            originalPrice: 16900,
            discountedPrice: 15200,
            discountPercent: 10,
            tier: "side10",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-beb-2",
            title: "Malteada de Chocolate Espesa El Corral",
            description: "Clasica y cremosa con jarabe de chocolate holandes y chantilly de la casa.",
            originalPrice: 16900,
            discountedPrice: 15200,
            discountPercent: 10,
            tier: "side10",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "corral-calle-85",
        branchName: "Zona Rosa Calle 85",
        address: "Calle 85 # 12-44, Bogota",
        zone: "Zona Rosa / Andino",
        distance: "260 m",
        contactName: "Mauricio Londoño",
        contactPhone: "+57 311 880 2341",
        isActive: true
      },
      {
        id: "corral-parque-93",
        branchName: "Parque 93",
        address: "Cra. 12 # 93-08, Bogota",
        zone: "Parque 93 / Chico",
        distance: "750 m",
        contactName: "Camila Vargas",
        contactPhone: "+57 314 220 7711",
        isActive: true
      },
      {
        id: "corral-pepe-sierra",
        branchName: "Pepe Sierra Calle 116",
        address: "Calle 116 # 17-22, Bogota",
        zone: "Pepe Sierra / Santa Barbara",
        distance: "1.8 km",
        contactName: "Jorge Restrepo",
        contactPhone: "+57 320 554 9900",
        isActive: true
      },
      {
        id: "corral-salitre",
        branchName: "Ciudad Salitre Plaza",
        address: "Cra. 68B # 24-39, Bogota",
        zone: "Salitre / Aeropuerto",
        distance: "3.5 km",
        contactName: "Adriana Orozco",
        contactPhone: "+57 316 441 2299",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 3. WOK - COMIDA ASIATICA & SUSHI
  // ==========================================================
  {
    id: "fran-wok",
    name: "Wok - Comida Asiatica & Sushi",
    brandLogo: "\u{1F962}",
    logoImage: "assets/logos/wok.png",
    category: "Sushi & Asiatica",
    tag: "\u{1F962} Pesca Responsable",
    rating: 4.8,
    reviews: 4210,
    coverImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80",
    openingHours: "12:00 PM - 10:00 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Benjamin Villegas (Chef Ejecutivo Wok)",
    contactPhone: "+57 315 229 8810",
    meetingNotes: "Comprometidos con cero desperdicio. 20% en barcos de sushi y combos wok, 15% en platos principales.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "wok-rec-1",
            title: "Bandeja Rescate Sushi: 16 Bocados Frescos del Dia + Edamames",
            description: "Seleccion fresca de rollos preparados en el turno de la tarde (salmon, atun y vegetales) con edamames.",
            originalPrice: 54000,
            discountedPrice: 23900,
            discountPercent: 55,
            tier: "rescue",
            stock: 4,
            pickupWindow: "Hoy 9:15 PM - 10:15 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "wok-rec-2",
            title: "Bolsa Rescate: Wok Noodles Salteados con Pollo & Vegetales",
            description: "Fideos salteados al fuego vivo con pechuga campesina, vegetales crocantes y salsa teriyaki de la casa.",
            originalPrice: 36000,
            discountedPrice: 15500,
            discountPercent: 57,
            tier: "rescue",
            stock: 3,
            pickupWindow: "Hoy 9:00 PM - 10:00 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "wok-comb-1",
            title: "Barco Samurai: 24 Bocados Variados + Edamames al Vapor",
            description: "Banquete de sushi: 8 bocados Philadelphia, 8 bocados Ojo de Tigre, 8 bocados Dragon Roll y porcion de edamames con flor de sal.",
            originalPrice: 88000,
            discountedPrice: 70400,
            discountPercent: 20,
            tier: "combo20",
            stock: 18,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "wok-comb-2",
            title: "Festin Asiatico Wok: Pad Thai Mixto + Arroz Especial + 4 Gyozas + 2 Bebidas",
            description: "Combo completo para dos personas con lo mejor del wok tailandes, arroz frito y empanaditas japonesas al vapor.",
            originalPrice: 92000,
            discountedPrice: 73600,
            discountPercent: 20,
            tier: "combo20",
            stock: 15,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Platos Fuertes en Carta (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "wok-reg-1",
            title: "Pad Thai de Pollo & Camaron al Wok",
            description: "Fideos de arroz salteados con tamarindo, pollo, camarones frescos, huevo, mani tostado y brotes de soya.",
            originalPrice: 39900,
            discountedPrice: 33900,
            discountPercent: 15,
            tier: "main15",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "wok-reg-2",
            title: "Arroz Wok Especial (Camaron, Pollo y Cerdo)",
            description: "Arroz frito al wok con lomo de cerdo marinado, pollo campesino, camarones, verduras y toque de aceite de ajonjoli.",
            originalPrice: 37500,
            discountedPrice: 31800,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "wok-reg-3",
            title: "Ramen de Cerdo Tonkotsu Tradicional",
            description: "Caldo espeso cocinado durante 12 horas, fideos ramen frescos, panceta chashu tierna, huevo ajitsuke marinado y algas nori.",
            originalPrice: 42000,
            discountedPrice: 35700,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "wok-reg-4",
            title: "Rollo Ojo de Tigre (Salmon, Atun & Masago)",
            description: "Salmon fresco, atun de pesca responsable, masago crocante, aguacate hass y reduccion teriyaki.",
            originalPrice: 34900,
            discountedPrice: 29600,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "wok-reg-5",
            title: "Pollo Teriyaki con Arroz Jazmin & Verduras",
            description: "Pechuga de pollo sellada a la plancha glaseada en salsa teriyaki de jengibre con arroz aromatico jazmin y brocoli.",
            originalPrice: 32900,
            discountedPrice: 27900,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Bebidas, Acompañamientos & Postres (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "wok-ent-1",
            title: "Gyozas de Cerdo y Jengibre al Vapor (5 uds)",
            description: "Empanaditas artesanales japonesas cocinadas al vapor servidas con vinagreta ponzu y ajonjoli tostado.",
            originalPrice: 19900,
            discountedPrice: 17900,
            discountPercent: 10,
            tier: "side10",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "wok-ent-2",
            title: "Rollitos Primavera Crujientes de Vegetales (4 uds)",
            description: "Rollitos dorados y crujientes rellenos de julianas de vegetales con dip de salsa agridulce casera.",
            originalPrice: 16500,
            discountedPrice: 14800,
            discountPercent: 10,
            tier: "side10",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "wok-beb-1",
            title: "Te Verde Helado con Limon Mandarina & Menta",
            description: "Infusion de hojas de te verde sencha preparado en casa con jugo de limon mandarina y menta fresca.",
            originalPrice: 9900,
            discountedPrice: 8900,
            discountPercent: 10,
            tier: "side10",
            stock: 50,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "wok-pos-1",
            title: "Banano Tempura con Helado de Vainilla",
            description: "Bocados de banano crujiente en tempura bañados en miel de jengibre con helado artesanal de vainilla.",
            originalPrice: 16000,
            discountedPrice: 14400,
            discountPercent: 10,
            tier: "side10",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "wok-zona-t",
        branchName: "Zona T Calle 82",
        address: "Calle 82 # 12-35, Bogota",
        zone: "Zona Rosa / Andino",
        distance: "310 m",
        contactName: "Benjamin Villegas",
        contactPhone: "+57 315 229 8810",
        isActive: true
      },
      {
        id: "wok-parque-93",
        branchName: "Parque 93",
        address: "Cra. 11A # 93-78, Bogota",
        zone: "Parque 93 / Chico",
        distance: "820 m",
        contactName: "Esteban Bernal",
        contactPhone: "+57 317 400 3311",
        isActive: true
      },
      {
        id: "wok-usaquen",
        branchName: "Usaquen Plaza",
        address: "Calle 120A # 6A-04, Bogota",
        zone: "Usaquen",
        distance: "1.3 km",
        contactName: "Diana Beltran",
        contactPhone: "+57 312 901 4455",
        isActive: true
      },
      {
        id: "wok-santa-barbara",
        branchName: "Santa Barbara Calle 122",
        address: "Calle 122 # 15A-34, Bogota",
        zone: "Santa Barbara / Unicentro",
        distance: "2.1 km",
        contactName: "Lucia Paredes",
        contactPhone: "+57 310 778 1122",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 4. PAN PA' YA! - PANADERIA & CAFE
  // ==========================================================
  {
    id: "fran-panpaya",
    name: "Pan Pa' Ya! - Panaderia & Cafe",
    brandLogo: "\u{1F956}",
    logoImage: "assets/logos/pan-pa-ya.png",
    category: "Panaderia & Cafe",
    tag: "\u{1F956} Hornada Fresca",
    rating: 4.8,
    reviews: 3190,
    coverImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    openingHours: "6:30 AM - 9:00 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Pedro Nel Rodriguez (Operaciones)",
    contactPhone: "+57 312 870 9921",
    meetingNotes: "Excelente disposicion para rescate de hojaldres del dia. 20% en desayunaderos grandes y 15% en calentados.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "ppy-rec-1",
            title: "Bolsa Rescate: 8 Panes Artesanales + 3 Pandebonos del Dia",
            description: "Surtido fresco horneado en la mañana y tarde: pan trenza campesino, almojabanas y pandebonos tradicionales.",
            originalPrice: 29000,
            discountedPrice: 11900,
            discountPercent: 59,
            tier: "rescue",
            stock: 6,
            pickupWindow: "Hoy 7:30 PM - 8:45 PM",
            type: "rescue",
            shift: "afternoon",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "ppy-rec-2",
            title: "Pack Hojaldres Dulces de la Tarde (4 uds)",
            description: "Croissants de chocolate, pasteles de gloria y hojaldres de manzana horneados hoy en perfecto estado.",
            originalPrice: 24000,
            discountedPrice: 9900,
            discountPercent: 58,
            tier: "rescue",
            stock: 5,
            pickupWindow: "Hoy 6:30 PM - 8:00 PM",
            type: "rescue",
            shift: "afternoon",
            image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "ppy-comb-1",
            title: "Gran Desayunadero Campesino: Tamal + Huevos + Chocolate + Canasta",
            description: "Banquete tradicional completo: Tamal tolimense especial con pollo y costilla, huevos pericos al gusto, chocolate con queso y canasta de panaderia caliente.",
            originalPrice: 46500,
            discountedPrice: 37200,
            discountPercent: 20,
            tier: "combo20",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "ppy-comb-2",
            title: "Combo Once Santafereño para 3 Personas",
            description: "3 chocolates santafereños con queso campesino, 3 almojabanas recien horneadas y 3 pandebonos crocantes.",
            originalPrice: 49000,
            discountedPrice: 39200,
            discountPercent: 20,
            tier: "combo20",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Platos Fuertes & Sandwiches (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "ppy-reg-1",
            title: "Calentado Paisa Tradicional con Carne Asada",
            description: "Frijoles y arroz salteados con hogao casero, servido con carne asada jugosa, arepa con queso y huevo frito.",
            originalPrice: 28500,
            discountedPrice: 24200,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "ppy-reg-2",
            title: "Sandwich de Pavo y Queso Holandes en Croissant",
            description: "Pechuga de pavo horneada, queso holandes fundido y lechuga fresca en hojaldrado croissant de mantequilla pura.",
            originalPrice: 24900,
            discountedPrice: 21100,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "ppy-reg-3",
            title: "Sandwich Roast Beef en Baguette Artesanal",
            description: "Laminas de roast beef sazonado con cebollas caramelizadas, queso provolone y mostaza Dijon en baguette recien horneado.",
            originalPrice: 27500,
            discountedPrice: 23300,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "ppy-reg-4",
            title: "Lasaña Mixta Gratinada Pan Pa' Ya",
            description: "Capas de pasta artesanal con salsa boloñesa de res, pollo en bechamel suave y abundante queso parmesano gratinado.",
            originalPrice: 29900,
            discountedPrice: 25400,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Panaderia, Cafe & Bebidas (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "ppy-pan-1",
            title: "Pandebono Tradicional Recien Horneado (2 uds)",
            description: "La receta original colombiana con queso costeño, almidon de yuca y harina de maiz caliente.",
            originalPrice: 7000,
            discountedPrice: 6300,
            discountPercent: 10,
            tier: "side10",
            stock: 80,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "ppy-pan-2",
            title: "Almojabana Caliente de Cuajada (2 uds)",
            description: "Masa suave y esponjosa elaborada con cuajada fresca campesina colombiana.",
            originalPrice: 7500,
            discountedPrice: 6700,
            discountPercent: 10,
            tier: "side10",
            stock: 70,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "ppy-beb-1",
            title: "Capuccino Colombiano Grande con Canela",
            description: "Cafe de origen tostado en Colombia con espuma de leche sedosa y toque sutil de canela.",
            originalPrice: 8500,
            discountedPrice: 7600,
            discountPercent: 10,
            tier: "side10",
            stock: 50,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "ppy-beb-2",
            title: "Jugo de Naranja 100% Natural Exprimido al Instante",
            description: "Zumo natural exprimido de naranjas valencianas sin azucar ni preservantes.",
            originalPrice: 9500,
            discountedPrice: 8500,
            discountPercent: 10,
            tier: "side10",
            stock: 50,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "panpaya-usaquen",
        branchName: "Usaquen",
        address: "Calle 119 # 6A-15, Bogota",
        zone: "Usaquen Colonial",
        distance: "1.2 km",
        contactName: "Pedro Nel Rodriguez",
        contactPhone: "+57 312 870 9921",
        isActive: true
      },
      {
        id: "panpaya-chico",
        branchName: "Chico Calle 90",
        address: "Calle 90 # 14-26, Bogota",
        zone: "Chico / Parque 93",
        distance: "650 m",
        contactName: "Martha Lucia Gomez",
        contactPhone: "+57 315 667 8899",
        isActive: true
      },
      {
        id: "panpaya-chapinero",
        branchName: "Chapinero Calle 67",
        address: "Cra. 7 # 67-39, Bogota",
        zone: "Chapinero Alto",
        distance: "1.5 km",
        contactName: "Javier Henao",
        contactPhone: "+57 311 445 0099",
        isActive: true
      },
      {
        id: "panpaya-salitre",
        branchName: "Salitre Gran Estacion",
        address: "Calle 26 # 62-47, Bogota",
        zone: "Salitre",
        distance: "3.2 km",
        contactName: "Gloria Pardo",
        contactPhone: "+57 318 221 4433",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 5. HOME BURGERS
  // ==========================================================
  {
    id: "fran-homeburgers",
    name: "Home Burgers",
    brandLogo: "\u{1F354}",
    logoImage: "assets/logos/home-burgers.svg",
    category: "Hamburguesas Smash",
    tag: "\u{1F969} Smash Burgers Artesanales",
    rating: 4.9,
    reviews: 4890,
    coverImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
    openingHours: "11:30 AM - 10:00 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Camilo Pelaez (Cofundador)",
    contactPhone: "+57 318 776 5543",
    meetingNotes: "Alineados con el rescate nocturno. 20% en combos familiares y 15% en burgers individuales.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "hb-rec-1",
            title: "Bolsa Rescate: Doble Cheeseburger + Papas Rusticas",
            description: "Doble carne smash sellada a la plancha con queso americano y porcion de papas rusticas cortadas a mano.",
            originalPrice: 37800,
            discountedPrice: 17500,
            discountPercent: 54,
            tier: "rescue",
            stock: 4,
            pickupWindow: "Hoy 9:00 PM - 10:00 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "hb-comb-1",
            title: "Super Combo Doble Home: 2 Doble Cheeseburgers + 2 Papas + 2 Bebidas",
            description: "El combo estrella para compartir: dos Doble Cheeseburgers con queso cheddar fundido, dos ordenes de papas rusticas y 2 bebidas frias.",
            originalPrice: 68900,
            discountedPrice: 55100,
            discountPercent: 20,
            tier: "combo20",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "hb-comb-2",
            title: "Combo Familiar 4 Burgers: 4 Single Burgers + 4 Papas Rusticas",
            description: "Banquete para la familia o amigos: 4 hamburguesas sencillas con queso cheddar americano y 4 papas rusticas.",
            originalPrice: 112000,
            discountedPrice: 89600,
            discountPercent: 20,
            tier: "combo20",
            stock: 12,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Platos Fuertes en Carta (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "hb-reg-1",
            title: "Doble Cheeseburger Clasica",
            description: "Dos carnes smash 100% res nacional, queso cheddar americano derretido, lechuga, tomate y salsa especial Home.",
            originalPrice: 28900,
            discountedPrice: 24500,
            discountPercent: 15,
            tier: "main15",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "hb-reg-2",
            title: "Single Bacon Cheeseburger",
            description: "Carne smash sellada al punto perfecto, queso cheddar fundido y tocineta ahumada artesanal extra crocante.",
            originalPrice: 24500,
            discountedPrice: 20800,
            discountPercent: 15,
            tier: "main15",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "hb-reg-3",
            title: "Doble Bacon Cheeseburger",
            description: "Dos carnes smash, doble tocineta ahumada crujiente, doble queso cheddar americano en suave pan brioche tostado.",
            originalPrice: 32900,
            discountedPrice: 27900,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "hb-reg-4",
            title: "Portobello Veggie Burger",
            description: "Champiñon portobello asado a las hierbas, queso suizo fundido, lechuga, tomate y alioli suave.",
            originalPrice: 26500,
            discountedPrice: 22500,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Bebidas, Acompañamientos & Postres (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "hb-acom-1",
            title: "Papas Rusticas Caseras con Sal Marina",
            description: "Papas cortadas a mano cada mañana, fritas con piel en aceite limpio y sazonadas con sal marina fina.",
            originalPrice: 8900,
            discountedPrice: 8000,
            discountPercent: 10,
            tier: "side10",
            stock: 50,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "hb-acom-2",
            title: "Camote Frito Crocante (Sweet Potato Fries)",
            description: "Bastones de camote dulce fritos hasta quedar dorados y crocantes, acompañados de salsa especial.",
            originalPrice: 10900,
            discountedPrice: 9800,
            discountPercent: 10,
            tier: "side10",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "hb-beb-1",
            title: "Malteada Artesanal de Caramelo Salado",
            description: "Helado artesanal cremoso batido con dulce de caramelo salado y crema batida.",
            originalPrice: 15500,
            discountedPrice: 13900,
            discountPercent: 10,
            tier: "side10",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "hb-beb-2",
            title: "Malteada de Vainilla Natural de Madagascar",
            description: "Preparada con autentico helado de vainilla natural de Madagascar.",
            originalPrice: 14900,
            discountedPrice: 13400,
            discountPercent: 10,
            tier: "side10",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "home-calle-85",
        branchName: "Zona Rosa Calle 85",
        address: "Calle 85 # 11-53, Bogota",
        zone: "Zona Rosa / Andino",
        distance: "210 m",
        contactName: "Camilo Pelaez",
        contactPhone: "+57 318 776 5543",
        isActive: true
      },
      {
        id: "home-parque-93",
        branchName: "Parque 93",
        address: "Cra. 13 # 93A-22, Bogota",
        zone: "Parque 93 / Chico",
        distance: "890 m",
        contactName: "Sebastian Castro",
        contactPhone: "+57 316 889 0012",
        isActive: true
      },
      {
        id: "home-usaquen",
        branchName: "Usaquen",
        address: "Cra. 6 # 119-24, Bogota",
        zone: "Usaquen Colonial",
        distance: "1.4 km",
        contactName: "Daniela Forero",
        contactPhone: "+57 312 334 1188",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 6. MASA - PANADERIA & BRUNCH
  // ==========================================================
  {
    id: "fran-masa",
    name: "Masa - Panaderia & Brunch",
    brandLogo: "\u{1F950}",
    logoImage: "assets/logos/masa.png",
    category: "Cafe & Brunch",
    tag: "\u{1F956} Panaderia Artesanal",
    rating: 4.9,
    reviews: 3880,
    coverImage: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
    openingHours: "7:00 AM - 8:00 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Silvana Villegas (Chef y Fundadora)",
    contactPhone: "+57 317 650 9944",
    meetingNotes: "Prioridad a viennoiserie y panaderia europea. 20% en combos de brunch y 15% en sandwiches artesanales.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "masa-rec-1",
            title: "Bolsa Sorpresa Masa Cierre: Hogaza Sourdough + 2 Croissants de Almendra",
            description: "Panaderia recien horneada del dia: una hogaza rustica de masa madre (sourdough) y dos croissants de almendras.",
            originalPrice: 42000,
            discountedPrice: 18900,
            discountPercent: 55,
            tier: "rescue",
            stock: 4,
            pickupWindow: "Hoy 6:45 PM - 7:45 PM",
            type: "rescue",
            shift: "afternoon",
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "masa-rec-2",
            title: "Pack Rescate Dulce de Vitrina: 3 Viennoiseries Francesas",
            description: "Seleccion de la tarde con Pain au Chocolat, Kouign Amann y rollo de canela recien glaseado.",
            originalPrice: 34000,
            discountedPrice: 14500,
            discountPercent: 57,
            tier: "rescue",
            stock: 3,
            pickupWindow: "Hoy 6:30 PM - 7:30 PM",
            type: "rescue",
            shift: "afternoon",
            image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "masa-comb-1",
            title: "Combo Brunch Masa Pareja: Tostadas Francesas + Benedictinos + 2 Cafes + Croissant",
            description: "El brunch mas emblematico de Bogota: Tostadas francesas de brioche con frutos rojos, huevos benedictinos en salmon, 2 cafes Flat White y croissant de almendras.",
            originalPrice: 76000,
            discountedPrice: 60800,
            discountPercent: 20,
            tier: "combo20",
            stock: 18,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "masa-comb-2",
            title: "Canasta Panaderia Familiar Masa: Sourdough 800g + 4 Viennoiseries Surtidas",
            description: "Una hogaza campesina de masa madre fermentada 24h y 4 piezas de hojaldre frances artesanal.",
            originalPrice: 52000,
            discountedPrice: 41600,
            discountPercent: 20,
            tier: "combo20",
            stock: 15,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Platos Fuertes & Brunch (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "masa-reg-1",
            title: "Tostadas Francesas de Brioche con Frutos Rojos",
            description: "Pan brioche artesanal dorado a la perfeccion, miel de maple grado A, compota de frutos rojos y crema mascarpone.",
            originalPrice: 28900,
            discountedPrice: 24500,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "masa-reg-2",
            title: "Huevos Benedictinos con Salmon Ahumado",
            description: "Huevos pochados al punto sobre tostada de pan brioche con lonjas de salmon noruego y salsa holandesa suave.",
            originalPrice: 34500,
            discountedPrice: 29300,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "masa-reg-3",
            title: "Tostada de Aguacate Cremoso & Ricotta en Sourdough",
            description: "Pan de masa madre tostado, aguacate triturado con limon, queso ricotta artesanal, semillas de calabaza y brotes.",
            originalPrice: 26000,
            discountedPrice: 22100,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "masa-reg-4",
            title: "Sandwich de Milanesa de Pollo Crujiente en Focaccia",
            description: "Milanesa de pechuga en panko, rucula fresca, parmesano y alioli suave en focaccia horneada con romero.",
            originalPrice: 33000,
            discountedPrice: 28000,
            discountPercent: 15,
            tier: "main15",
            stock: 22,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "masa-reg-5",
            title: "Sandwich de Prosciutto di Parma & Queso Gruyere",
            description: "Laminas de prosciutto di Parma, queso gruyere fundido, tomates confitados y mantequilla francesa en baguette.",
            originalPrice: 35500,
            discountedPrice: 30100,
            discountPercent: 15,
            tier: "main15",
            stock: 18,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Viennoiserie & Cafe de Especialidad (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "masa-vien-1",
            title: "Croissant Artesanal de Almendras",
            description: "Doble horneada con crema frangipane de almendras y cobertura de almendras fileteadas.",
            originalPrice: 14500,
            discountedPrice: 13000,
            discountPercent: 10,
            tier: "side10",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "masa-vien-2",
            title: "Pain au Chocolat con Doble Barra Francesa",
            description: "Hojaldre 100% mantequilla pura con dos barras de chocolate oscuro Valrhona.",
            originalPrice: 12500,
            discountedPrice: 11200,
            discountPercent: 10,
            tier: "side10",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "masa-beb-1",
            title: "Cafe Flat White con Leche de Avena",
            description: "Doble shot de espresso de finca colombiana con microespuma de leche de avena sedosa.",
            originalPrice: 9800,
            discountedPrice: 8800,
            discountPercent: 10,
            tier: "side10",
            stock: 45,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "masa-beb-2",
            title: "Cold Brew Infusionado en Frio 18 Horas",
            description: "Cafe de origen infusionado pacientemente en frio con notas florales y achocolatadas refrescantes.",
            originalPrice: 11000,
            discountedPrice: 9900,
            discountPercent: 10,
            tier: "side10",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "masa-quinta-camacho",
        branchName: "Quinta Camacho Calle 70",
        address: "Calle 70A # 9-42, Bogota",
        zone: "Quinta Camacho / Chapinero",
        distance: "420 m",
        contactName: "Silvana Villegas",
        contactPhone: "+57 317 650 9944",
        isActive: true
      },
      {
        id: "masa-calle-81",
        branchName: "Zona Rosa Calle 81",
        address: "Calle 81 # 11-34, Bogota",
        zone: "Zona Rosa / Andino",
        distance: "320 m",
        contactName: "Mateo Carvajal",
        contactPhone: "+57 315 882 1100",
        isActive: true
      },
      {
        id: "masa-usaquen",
        branchName: "Usaquen",
        address: "Cra. 6 # 119-17, Bogota",
        zone: "Usaquen Colonial",
        distance: "1.3 km",
        contactName: "Paola Mendoza",
        contactPhone: "+57 312 447 9933",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 7. ARCHIES - PIZZERIA & TRATTORIA
  // ==========================================================
  {
    id: "fran-archies",
    name: "Archies - Pizzeria & Trattoria",
    brandLogo: "\u{1F355}",
    logoImage: "assets/logos/archies.png",
    category: "Pizzeria Italiana",
    tag: "\u{1F355} Horno de Leña",
    rating: 4.7,
    reviews: 3540,
    coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    openingHours: "12:00 PM - 10:00 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Andres Restrepo (Operaciones Archies)",
    contactPhone: "+57 313 449 8812",
    meetingNotes: "Pizzas de masa artesanal en horno de leña. 20% en combos familiares y 15% en pastas y pizzas personales.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "arc-rec-1",
            title: "Caja Rescate: Pizza Mediana Artesanal del Dia",
            description: "Pizza mediana horneada a la piedra en masa delgada artesanal (4 quesos o pepperoni) con orilla crujiente.",
            originalPrice: 41000,
            discountedPrice: 18900,
            discountPercent: 54,
            tier: "rescue",
            stock: 4,
            pickupWindow: "Hoy 9:00 PM - 10:00 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "arc-rec-2",
            title: "Pack Pasta Rescate: Pasta Artesanal Gratinada + Pan de Ajo",
            description: "Porcion abundante de pasta al dente gratinada con mozzarella fresca y orden de pan de ajo crujiente.",
            originalPrice: 38000,
            discountedPrice: 16000,
            discountPercent: 58,
            tier: "rescue",
            stock: 3,
            pickupWindow: "Hoy 8:45 PM - 9:45 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "arc-comb-1",
            title: "Combo Familiar Trattoria: Pizza Grande 8 Porciones + Pan de Ajo + Gaseosa 1.5L",
            description: "Pizza grande en masa delgada a eleccion (4 Quesos o Pepperoni), porcion grande de pan de ajo con parmesano y gaseosa familiar.",
            originalPrice: 84000,
            discountedPrice: 67200,
            discountPercent: 20,
            tier: "combo20",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "arc-comb-2",
            title: "Combo Duo Pasta & Pizza: Pizza Mediana + Fettuccine Alfredo + 2 Bebidas",
            description: "Cena completa para dos: 1 pizza mediana artesanal, 1 plato de fettuccine alfredo con pollo y 2 bebidas de frutas.",
            originalPrice: 78000,
            discountedPrice: 62400,
            discountPercent: 20,
            tier: "combo20",
            stock: 18,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Platos Fuertes en Carta (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "arc-reg-1",
            title: "Pizza Rustica Cuatro Quesos",
            description: "Mozzarella de bufala, gorgonzola aromatico, parmesano reggiano y ricotta artesanal sobre salsa pomodoro y albahaca.",
            originalPrice: 42900,
            discountedPrice: 36400,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "arc-reg-2",
            title: "Pizza Pepperoni Clasica Archies",
            description: "La pizza mas vendida de Archies: abundante pepperoni crocante americano sobre queso mozzarella fundido.",
            originalPrice: 39900,
            discountedPrice: 33900,
            discountPercent: 15,
            tier: "main15",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "arc-reg-3",
            title: "Pizza del Huerto Vegetariana",
            description: "Champiñones salteados, corazones de alcachofa, pimientos asados, aceitunas negras y queso mozzarella de bufala.",
            originalPrice: 38500,
            discountedPrice: 32700,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "arc-reg-4",
            title: "Fettuccine Alfredo con Pechuga de Pollo",
            description: "Pasta fettuccine al dente bañada en salsa cremosa de mantequilla, ajo y parmesano con tiras de pollo a la plancha.",
            originalPrice: 36900,
            discountedPrice: 31300,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "arc-reg-5",
            title: "Lasaña Boloñesa en Horno de Leña",
            description: "Clasica receta italiana con ragu de res a fuego lento, bechamel suave, mozzarella gratinada y pan artesanal.",
            originalPrice: 35500,
            discountedPrice: 30100,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Entradas, Bebidas & Postres (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "arc-ent-1",
            title: "Pan de Ajo Parmesano Tradicional Archies",
            description: "Pan artesanal caliente bañado en mantequilla de ajo confitado, perejil y queso parmesano gratinado.",
            originalPrice: 14900,
            discountedPrice: 13400,
            discountPercent: 10,
            tier: "side10",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "arc-ent-2",
            title: "Carpaccio de Lomo con Rucula & Alcaparras",
            description: "Finas laminas de lomo de res sellado, rucula fresca, alcaparras baby, aceite de oliva virgen y parmesano.",
            originalPrice: 26900,
            discountedPrice: 24200,
            discountPercent: 10,
            tier: "side10",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "arc-pos-1",
            title: "Tiramisu Clasico de la Casa Mascarpone",
            description: "Bizcocho soletilla empapado en cafe espresso y licor de cafe, crema suave de queso mascarpone y cacao puro.",
            originalPrice: 16500,
            discountedPrice: 14800,
            discountPercent: 10,
            tier: "side10",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "arc-beb-1",
            title: "Limonada Cerezada Refrescante Archies",
            description: "Zumo natural de limon fresco con jarabe de cerezas dulces y hielo frappe.",
            originalPrice: 11500,
            discountedPrice: 10300,
            discountPercent: 10,
            tier: "side10",
            stock: 45,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "archies-pepe-sierra",
        branchName: "Pepe Sierra Calle 116",
        address: "Calle 116 # 15-42, Bogota",
        zone: "Pepe Sierra / Santa Barbara",
        distance: "1.7 km",
        contactName: "Andres Restrepo",
        contactPhone: "+57 313 449 8812",
        isActive: true
      },
      {
        id: "archies-parque-93",
        branchName: "Parque 93",
        address: "Cra. 11 # 93A-12, Bogota",
        zone: "Parque 93 / Chico",
        distance: "790 m",
        contactName: "Claudia Martinez",
        contactPhone: "+57 310 882 3344",
        isActive: true
      },
      {
        id: "archies-zona-t",
        branchName: "Zona Rosa Calle 82",
        address: "Calle 82 # 13-26, Bogota",
        zone: "Zona Rosa / Andino",
        distance: "340 m",
        contactName: "Gustavo Rojas",
        contactPhone: "+57 315 221 9900",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 8. FRISBY - POLLO APANADO
  // ==========================================================
  {
    id: "fran-frisby",
    name: "Frisby - Pollo Apanado",
    brandLogo: "\u{1F357}",
    logoImage: "assets/logos/frisby.svg",
    category: "Pollo Apanado",
    tag: "\u{1F357} Nadie lo hace como Frisby lo hace",
    rating: 4.8,
    reviews: 5890,
    coverImage: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",
    openingHours: "10:30 AM - 9:30 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Guillermo Vallejo (Director Regional)",
    contactPhone: "+57 314 990 1255",
    meetingNotes: "Lider indiscutible de pollo frito. Excedentes del turno noche al 56% OFF y combos familiares al 20%.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "frisby-rec-1",
            title: "Pack Apanado Rescate: 4 Presas Frisby + Arepas + Miel",
            description: "4 presas de pollo apanado crocante y jugoso del turno de la tarde con 4 arepitas calientes y miel Frisby.",
            originalPrice: 34900,
            discountedPrice: 15500,
            discountPercent: 56,
            tier: "rescue",
            stock: 5,
            pickupWindow: "Hoy 8:30 PM - 9:30 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "frisby-rec-2",
            title: "Bolsa Rescate: Trocipollos 12 uds + Papas Francesas",
            description: "12 trozos de pechuga apanada crocante con porcion de papas a la francesa y salsa tartara.",
            originalPrice: 32000,
            discountedPrice: 13900,
            discountPercent: 57,
            tier: "rescue",
            stock: 4,
            pickupWindow: "Hoy 8:30 PM - 9:30 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "frisby-comb-1",
            title: "Frisby Mediano Familiar: 8 Presas + Ensalada Grande + 4 Arepas + Miel",
            description: "El combo familiar favorito: 8 presas de pollo crocante, ensalada tradicional de repollo grande, 4 arepitas doradas y miel.",
            originalPrice: 69900,
            discountedPrice: 55900,
            discountPercent: 20,
            tier: "combo20",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "frisby-comb-2",
            title: "Super Balde Festin Frisby: 12 Presas + Papas Grandes + 6 Arepas + Gaseosa 1.5L",
            description: "El banquete mas grande: 12 presas de pollo dorado, porcion familiar de papas francesas, 6 arepas y gaseosa helada.",
            originalPrice: 92000,
            discountedPrice: 73600,
            discountPercent: 20,
            tier: "combo20",
            stock: 15,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Platos Fuertes en Carta (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "frisby-reg-1",
            title: "Combo Personal Frisby 3 Presas + Arepa + Papas + Gaseosa",
            description: "3 presas de pollo apanado crujiente con la receta secreta Frisby, arepa con mantequilla, papas francesas y bebida personal.",
            originalPrice: 27900,
            discountedPrice: 23700,
            discountPercent: 15,
            tier: "main15",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "frisby-reg-2",
            title: "Frisburguer con Tocineta & Queso Mozzarella",
            description: "Filete de pechuga 100% apanada crujiente con tocineta ahumada, queso mozzarella fundido, lechuga y tartara Frisby.",
            originalPrice: 22900,
            discountedPrice: 19400,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "frisby-reg-3",
            title: "Trocipollos Crocantes Frisby (8 uds)",
            description: "Trozos de pechuga de pollo marinada y apanada, tiernos por dentro y crocantes por fuera, con miel pura y salsa tartara.",
            originalPrice: 24500,
            discountedPrice: 20800,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "frisby-reg-4",
            title: "Frisby Crunch Wrap Apanado",
            description: "Tortilla de trigo sellada a la plancha rellena de pollo apanado crujiente, vegetales frescos y aderezo ranch.",
            originalPrice: 21900,
            discountedPrice: 18600,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Acompañamientos & Bebidas (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "frisby-acom-1",
            title: "Canasta de Arepitas Frisby con Miel (6 uds)",
            description: "Las inconfundibles arepitas fritas de maiz Frisby servidas bien calientes con miel de abejas pura.",
            originalPrice: 8500,
            discountedPrice: 7600,
            discountPercent: 10,
            tier: "side10",
            stock: 60,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "frisby-acom-2",
            title: "Porcion de Papas a la Francesa Crocantes",
            description: "Papas francesas cortadas en baston, fritas en aceite vegetal al punto dorado crujiente.",
            originalPrice: 8000,
            discountedPrice: 7200,
            discountPercent: 10,
            tier: "side10",
            stock: 50,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "frisby-acom-3",
            title: "Ensalada Tradicional de Repollo y Zanahoria",
            description: "Ensalada fresca agridulce con el aderezo secreto Frisby.",
            originalPrice: 7500,
            discountedPrice: 6700,
            discountPercent: 10,
            tier: "side10",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "frisby-beb-1",
            title: "Gaseosa Postobon Manzana 400ml Helada",
            description: "La gaseosa clasica colombiana bien fria para acompañar el pollo frito.",
            originalPrice: 6500,
            discountedPrice: 5800,
            discountPercent: 10,
            tier: "side10",
            stock: 60,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "frisby-chapinero",
        branchName: "Chapinero Calle 63",
        address: "Calle 63 # 13-32, Bogota",
        zone: "Chapinero Central",
        distance: "1.1 km",
        contactName: "Guillermo Vallejo",
        contactPhone: "+57 314 990 1255",
        isActive: true
      },
      {
        id: "frisby-zona-rosa",
        branchName: "Zona Rosa Cra. 15",
        address: "Cra. 15 # 83-14, Bogota",
        zone: "Zona Rosa / Andino",
        distance: "190 m",
        contactName: "Natalia Cardenas",
        contactPhone: "+57 311 556 7788",
        isActive: true
      },
      {
        id: "frisby-gran-estacion",
        branchName: "Gran Estacion",
        address: "Calle 26 # 62-49, Bogota",
        zone: "Salitre",
        distance: "3.4 km",
        contactName: "Rodrigo Meza",
        contactPhone: "+57 320 119 4433",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 9. SANDWICH QBANO
  // ==========================================================
  {
    id: "fran-qbano",
    name: "Sandwich Qbano",
    brandLogo: "\u{1F96A}",
    logoImage: "assets/logos/sandwich-qbano.png",
    category: "Sandwiches al Horno",
    tag: "\u{1F956} El Sabor Original",
    rating: 4.7,
    reviews: 3100,
    coverImage: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80",
    openingHours: "11:00 AM - 10:00 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Hector Mario Gomez (Director Franquicias)",
    contactPhone: "+57 315 770 1234",
    meetingNotes: "Clasicos sandwiches al horno con salsa de ajo. 20% en combos duo y 15% en sandwiches 22cm.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "qb-rec-1",
            title: "Bolsa Rescate: 2 Sandwiches Horneados 18cm del Dia + Papas",
            description: "Dos sandwiches horneados (Especial o Pollo) con queso derretido y salsa de ajo de la casa, mas papas rusticas.",
            originalPrice: 38000,
            discountedPrice: 16900,
            discountPercent: 56,
            tier: "rescue",
            stock: 4,
            pickupWindow: "Hoy 9:00 PM - 10:00 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "qb-comb-1",
            title: "Super Combo Duo Qbano: 2 Especiales 22cm + 2 Papas + 2 Bebidas",
            description: "El combo mas pedido para dos: 2 sandwiches Especiales Qbano de 22cm, dos porciones de papas rusticas y 2 bebidas frias.",
            originalPrice: 66000,
            discountedPrice: 52800,
            discountPercent: 20,
            tier: "combo20",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "qb-comb-2",
            title: "Combo Familiar 4 Sandwiches 15cm + 4 Papas + Gaseosa 1.5L",
            description: "4 sandwiches medianos horneados con queso fundido, 4 porciones de papas y gaseosa familiar.",
            originalPrice: 89000,
            discountedPrice: 71200,
            discountPercent: 20,
            tier: "combo20",
            stock: 15,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Platos Fuertes en Carta (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "qb-reg-1",
            title: "Sandwich Especial Qbano 22cm",
            description: "El clasico de Colombia: jamon de cerdo ahumado, queso mozzarella gratinado al horno, lechuga, tomate y la inconfundible salsa de ajo Qbano.",
            originalPrice: 26900,
            discountedPrice: 22800,
            discountPercent: 15,
            tier: "main15",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "qb-reg-2",
            title: "Sandwich de Pollo al Horno & Queso 22cm",
            description: "Tiras de pechuga marinadas en finas hierbas con queso mozzarella fundido y vegetales frescos en pan crujiente horneado.",
            originalPrice: 27900,
            discountedPrice: 23700,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "qb-reg-3",
            title: "Sandwich Ropa Vieja 22cm",
            description: "Carne de res desmechada cocinada lentamente en sofrito tradicional, queso fundido y salsa de ajo de la casa.",
            originalPrice: 29500,
            discountedPrice: 25000,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "qb-reg-4",
            title: "Sandwich Roast Beef & Queso Parmesano 22cm",
            description: "Lonjas de roast beef sazonado con cebollas grille, queso mozzarella, toque de parmesano y aderezo especial.",
            originalPrice: 29900,
            discountedPrice: 25400,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Acompañamientos & Bebidas (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "qb-acom-1",
            title: "Papas Rusticas Qbano con Salsa de Ajo Especial",
            description: "Papas en cascos con piel crocante servidas con el pote generoso de salsa de ajo insignia Qbano.",
            originalPrice: 8900,
            discountedPrice: 8000,
            discountPercent: 10,
            tier: "side10",
            stock: 50,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "qb-acom-2",
            title: "Dedos de Queso Mozzarella Horneados (4 uds)",
            description: "Dedos de hojaldre horneados rellenos de puro queso mozzarella elastico.",
            originalPrice: 11900,
            discountedPrice: 10700,
            discountPercent: 10,
            tier: "side10",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "qb-beb-1",
            title: "Jugo Hit de Mora o Lulo en Botella",
            description: "El tradicional jugo de frutas colombiano bien frio.",
            originalPrice: 6500,
            discountedPrice: 5800,
            discountPercent: 10,
            tier: "side10",
            stock: 60,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "qb-beb-2",
            title: "Limonada Natural Refrescante",
            description: "Limonada recien preparada con hielo frappe.",
            originalPrice: 7500,
            discountedPrice: 6700,
            discountPercent: 10,
            tier: "side10",
            stock: 45,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "qbano-calle-85",
        branchName: "Zona Rosa Calle 85",
        address: "Calle 85 # 13-18, Bogota",
        zone: "Zona Rosa / Andino",
        distance: "230 m",
        contactName: "Hector Mario Gomez",
        contactPhone: "+57 315 770 1234",
        isActive: true
      },
      {
        id: "qbano-galerias",
        branchName: "Galerias",
        address: "Calle 53 # 24-08, Bogota",
        zone: "Galerias / Teusaquillo",
        distance: "2.5 km",
        contactName: "Sandra Milena Ortiz",
        contactPhone: "+57 312 889 0044",
        isActive: true
      },
      {
        id: "qbano-parque-93",
        branchName: "Parque 93",
        address: "Cra. 11 # 94-02, Bogota",
        zone: "Parque 93 / Chico",
        distance: "860 m",
        contactName: "Fabian Duarte",
        contactPhone: "+57 310 445 1199",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 10. JUAN VALDEZ CAFE
  // ==========================================================
  {
    id: "fran-juanvaldez",
    name: "Juan Valdez Cafe",
    brandLogo: "\u2615",
    logoImage: "assets/logos/juan-valdez.png",
    category: "Cafe Colombiano & Pasteleria",
    tag: "\u2615 100% Cafe de Colombia",
    rating: 4.8,
    reviews: 6200,
    coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
    openingHours: "7:00 AM - 9:00 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Paula Andrea Morales (Gerencia)",
    contactPhone: "+57 310 665 4421",
    meetingNotes: "Excelente recibimiento para rescate de pasteleria de vitrina. 20% en combos de desayuno duo y 15% en cafes de especialidad.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "jv-rec-1",
            title: "Pack Vitrina Rescate: 2 Muffins + 2 Almojabanas del Dia",
            description: "Pasteleria fresca horneada en el turno de la mañana y tarde: 2 muffins con trozos de fruta y 2 almojabanas campesinas.",
            originalPrice: 32000,
            discountedPrice: 13500,
            discountPercent: 58,
            tier: "rescue",
            stock: 5,
            pickupWindow: "Hoy 7:30 PM - 8:45 PM",
            type: "rescue",
            shift: "afternoon",
            image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "jv-rec-2",
            title: "Bolsa Rescate: 3 Hojaldres y Pasteles Dulces de la Tarde",
            description: "Surtido dulce de vitrina con pasteles de arequipe, hojaldres de queso y galletas artesanales horneadas hoy.",
            originalPrice: 26000,
            discountedPrice: 11000,
            discountPercent: 58,
            tier: "rescue",
            stock: 4,
            pickupWindow: "Hoy 7:15 PM - 8:30 PM",
            type: "rescue",
            shift: "afternoon",
            image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "jv-comb-1",
            title: "Combo Desayuno Colombiano Duo: 2 Capuccinos + 2 Almojabanas + 2 Pandebonos",
            description: "Desayuno tradicional completo para dos: dos capuccinos de cafe 100% de origen, 2 almojabanas calientes y 2 pandebonos.",
            originalPrice: 44000,
            discountedPrice: 35200,
            discountPercent: 20,
            tier: "combo20",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "jv-comb-2",
            title: "Pack Cafetero de la Tarde: 2 Nevados Grandes + 2 Tortas Artesanales",
            description: "La pausa dulce perfecta: dos nevados espesos con chantilly y dos porciones generosas de torta artesanal Juan Valdez.",
            originalPrice: 42000,
            discountedPrice: 33600,
            discountPercent: 20,
            tier: "combo20",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Cafes Fuertes & Especialidades (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "jv-reg-1",
            title: "Nevado de Arequipe Colombiano con Chantilly",
            description: "Bebida fria batida con cafe de origen colombiano, leche cremosa, arequipe artesanal y corona de crema chantilly.",
            originalPrice: 17500,
            discountedPrice: 14800,
            discountPercent: 15,
            tier: "main15",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "jv-reg-2",
            title: "Nevado de Mocha con Virutas de Chocolate",
            description: "Cafe espresso 100% arabico con salsa de chocolate holandes, leche batida con hielo y virutas de chocolate amargo.",
            originalPrice: 17500,
            discountedPrice: 14800,
            discountPercent: 15,
            tier: "main15",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1579888944880-d98341245702?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "jv-reg-3",
            title: "Latte Vainilla con Cafe de Origen Huila",
            description: "Espresso suave de notas frutales de la region del Huila con leche vaporizada y jarabe natural de vainilla.",
            originalPrice: 12900,
            discountedPrice: 10900,
            discountPercent: 15,
            tier: "main15",
            stock: 45,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "jv-reg-4",
            title: "Tinto Campesino Tradicional con Panela & Clavos",
            description: "El autentico cafe de las fincas cafeteras colombianas preparado con panela pura y toque aromatico de clavos y canela.",
            originalPrice: 7500,
            discountedPrice: 6300,
            discountPercent: 15,
            tier: "main15",
            stock: 60,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "jv-reg-5",
            title: "Cold Brew Tonica con Cascara de Naranja",
            description: "Cafe extraido en frio durante 16 horas servido con agua tonica premium y piel de naranja deshidratada.",
            originalPrice: 13500,
            discountedPrice: 11400,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Panaderia, Pasteleria & Snacks (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "jv-pan-1",
            title: "Almojabana Tradicional Caliente de Cuajada",
            description: "Horneada al punto con cuajada fresca campesina colombiana.",
            originalPrice: 6500,
            discountedPrice: 5800,
            discountPercent: 10,
            tier: "side10",
            stock: 70,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "jv-pan-2",
            title: "Pandebono Tradicional Juan Valdez",
            description: "Elaborado con harina de maiz, almidon de yuca y queso costeño curado.",
            originalPrice: 6500,
            discountedPrice: 5800,
            discountPercent: 10,
            tier: "side10",
            stock: 70,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "jv-pas-1",
            title: "Muffin de Arandanos Silvestres",
            description: "Muffin esponjoso artesanal repleto de arandanos enteros frescos.",
            originalPrice: 9500,
            discountedPrice: 8500,
            discountPercent: 10,
            tier: "side10",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "jv-pas-2",
            title: "Galleta Artesanal de Macadamia & Chocolate Blanco",
            description: "Galleta crujiente horneada con nueces de macadamia colombianas y trozos de chocolate blanco.",
            originalPrice: 8000,
            discountedPrice: 7200,
            discountPercent: 10,
            tier: "side10",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "jv-zona-g",
        branchName: "Zona G Calle 70",
        address: "Calle 70 # 5-21, Bogota",
        zone: "Zona G / Chapinero",
        distance: "370 m",
        contactName: "Paula Andrea Morales",
        contactPhone: "+57 310 665 4421",
        isActive: true
      },
      {
        id: "jv-parque-93",
        branchName: "Parque 93",
        address: "Calle 93 # 11A-31, Bogota",
        zone: "Parque 93 / Chico",
        distance: "760 m",
        contactName: "Alejandro Forero",
        contactPhone: "+57 318 991 3322",
        isActive: true
      },
      {
        id: "jv-usaquen",
        branchName: "Plaza Usaquen",
        address: "Cra. 6 # 118-20, Bogota",
        zone: "Usaquen Colonial",
        distance: "1.2 km",
        contactName: "Catalina Echeverri",
        contactPhone: "+57 312 338 9900",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 11. SIERRA NEVADA - HAMBURGUESAS
  // ==========================================================
  {
    id: "fran-sierranevada",
    name: "Sierra Nevada - Hamburguesas",
    brandLogo: "\u{1F3D4}",
    logoImage: "assets/logos/sierra-nevada.png",
    category: "Hamburguesas Angus",
    tag: "\u{1F969} 100% Angus Colombiano",
    rating: 4.8,
    reviews: 2950,
    coverImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    openingHours: "12:00 PM - 10:00 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Felipe Giraldo (Fundador Sierra Nevada)",
    contactPhone: "+57 314 550 8877",
    meetingNotes: "Hamburguesas de autor con carne angus y queso costeño asado. 20% en combos de pareja y 15% en hamburguesas.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "sn-rec-1",
            title: "Combo Rescate: Hamburguesa Sierra Nevada + Malteada Chocolate",
            description: "Hamburguesa clasica angus a la plancha con queso derretido y malteada artesanal espesa de chocolate.",
            originalPrice: 43800,
            discountedPrice: 18900,
            discountPercent: 57,
            tier: "rescue",
            stock: 4,
            pickupWindow: "Hoy 9:00 PM - 10:00 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "sn-comb-1",
            title: "Combo Pareja Nevada: 2 Tayrona + 2 Papas Francesas + 2 Malteadas",
            description: "El combo mas celebrado: dos hamburguesas Tayrona con queso costeño asado y suero, dos papas francesas y dos malteadas artesanales.",
            originalPrice: 79000,
            discountedPrice: 63200,
            discountPercent: 20,
            tier: "combo20",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "sn-comb-2",
            title: "Combo Familiar Nevada: 4 Hamburguesas Clasicas + 4 Papas + Gaseosa 1.5L",
            description: "4 hamburguesas angus con queso cheddar fundido, 4 papas francesas doradas y gaseosa familiar.",
            originalPrice: 108000,
            discountedPrice: 86400,
            discountPercent: 20,
            tier: "combo20",
            stock: 12,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Platos Fuertes en Carta (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "sn-reg-1",
            title: "Hamburguesa Tayrona (Queso Costeño Asado & Suero)",
            description: "Carne 100% Angus asada a la plancha, generoso bloque de queso costeño asado a la parrilla, tocineta crujiente y suero costeño de la casa.",
            originalPrice: 33500,
            discountedPrice: 28400,
            discountPercent: 15,
            tier: "main15",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "sn-reg-2",
            title: "Hamburguesa Sierra Nevada Clasica Angus",
            description: "Carne Angus nacional, queso cheddar americano fundido, cebolla caramelizada lentamente, lechuga y tomate en pan brioche.",
            originalPrice: 27900,
            discountedPrice: 23700,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "sn-reg-3",
            title: "Hamburguesa Chingaza con Champiñones al Tomillo",
            description: "Carne Angus jugosa con salteado de champiñones portobello al tomillo fresco, queso emmental y alioli suave.",
            originalPrice: 34900,
            discountedPrice: 29600,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "sn-reg-4",
            title: "Hamburguesa Macuira Chipotle Picante",
            description: "Carne Angus con queso pepper jack, jalapeños encurtidos, cebolla crocante y salsa chipotle ahumada.",
            originalPrice: 32500,
            discountedPrice: 27600,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Acompañamientos & Malteadas (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "sn-acom-1",
            title: "Papas Francesas Crocantes con Sal Marina & Romero",
            description: "Bastones de papa dorados sazonados con sal marina de Galerazamba y romero fresco picado.",
            originalPrice: 8900,
            discountedPrice: 8000,
            discountPercent: 10,
            tier: "side10",
            stock: 50,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "sn-acom-2",
            title: "Mazorquitas Tiernas Asadas con Mantequilla de Ajo",
            description: "Mazorquitas de choclo dulce asadas a la brasa con mantequilla clarificada y sal.",
            originalPrice: 10500,
            discountedPrice: 9400,
            discountPercent: 10,
            tier: "side10",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "sn-beb-1",
            title: "Malteada de Chocolate Real con Nibs de Cacao",
            description: "Batida con helado artesanal de chocolate amargo colombiano y trozos crocantes de nibs de cacao.",
            originalPrice: 15900,
            discountedPrice: 14300,
            discountPercent: 10,
            tier: "side10",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "sn-beb-2",
            title: "Malteada de Frutos Rojos Silvestres",
            description: "Helado artesanal batido con mora, frambuesa y fresas silvestres de la sabana.",
            originalPrice: 15900,
            discountedPrice: 14300,
            discountPercent: 10,
            tier: "side10",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "sierra-parque-93",
        branchName: "Parque 93",
        address: "Calle 93 # 12-48, Bogota",
        zone: "Parque 93 / Chico",
        distance: "730 m",
        contactName: "Felipe Giraldo",
        contactPhone: "+57 314 550 8877",
        isActive: true
      },
      {
        id: "sierra-calle-85",
        branchName: "Zona Rosa Calle 85",
        address: "Calle 85 # 11-64, Bogota",
        zone: "Zona Rosa / Andino",
        distance: "220 m",
        contactName: "Lina Marulanda",
        contactPhone: "+57 311 990 2233",
        isActive: true
      }
    ]
  },

  // ==========================================================
  // 12. POKE COLOMBIA
  // ==========================================================
  {
    id: "fran-poke",
    name: "Poke Colombia",
    brandLogo: "\u{1F951}",
    logoImage: "assets/logos/poke-colombia.png",
    category: "Poke & Healthy",
    tag: "\u{1F951} Fresco & Saludable",
    rating: 4.8,
    reviews: 2180,
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
    openingHours: "11:30 AM - 9:30 PM",
    isActive: true,
    crmStatus: "accepted",
    contactName: "Daniela Osorio (Fundadora Poke Colombia)",
    contactPhone: "+57 318 400 9911",
    meetingNotes: "Bowls frescos preparados al momento. 20% en combos de poke para compartir y 15% en bowls de salmon y atun.",
    menu: [
      {
        categoryName: "\u{1F319} Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "poke-rec-1",
            title: "Super Bowl Rescate: Salmon Fresh + Aguacate & Edamames",
            description: "Base de arroz de sushi, cubos de salmon noruego fresco, aguacate, edamames, pepino y salsa ponzu.",
            originalPrice: 38900,
            discountedPrice: 17500,
            discountPercent: 55,
            tier: "rescue",
            stock: 4,
            pickupWindow: "Hoy 8:45 PM - 9:30 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "poke-rec-2",
            title: "Pack Rescate Duo: 2 Mini Poke Bowls Vegetales / Mariscos",
            description: "Dos mini bowls preparados en el turno de la tarde con ingredientes frescos del dia.",
            originalPrice: 42000,
            discountedPrice: 18900,
            discountPercent: 55,
            tier: "rescue",
            stock: 3,
            pickupWindow: "Hoy 8:30 PM - 9:15 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F525} Combos Grandes & Especiales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "poke-comb-1",
            title: "Combo Duo Poke Bowls: 2 Bowls Medianos + 2 Bebidas Frias",
            description: "Banquete saludable para dos: 1 Bowl Salmon Fresh, 1 Bowl Atun Spicy y dos limonadas naturales de hierbabuena.",
            originalPrice: 78000,
            discountedPrice: 62400,
            discountPercent: 20,
            tier: "combo20",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "poke-comb-2",
            title: "Combo Poke + Gyozas: Bowl Grande + 5 Gyozas de Salmon + Limonada",
            description: "Tu bowl favorito tamaño grande acompañado de 5 gyozas al vapor con salsa ponzu y limonada refrescante.",
            originalPrice: 56000,
            discountedPrice: 44800,
            discountPercent: 20,
            tier: "combo20",
            stock: 18,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u2B50 Bowls Fuertes en Carta (15% OFF)",
        isRescue: false,
        items: [
          {
            id: "poke-reg-1",
            title: "Super Bowl Salmon Fresh Ponzu",
            description: "Base de arroz de sushi o quinoa organica, dados de salmon noruego fresco, aguacate hass, edamames, pepino, mango y salsa ponzu citrica.",
            originalPrice: 38900,
            discountedPrice: 33000,
            discountPercent: 15,
            tier: "main15",
            stock: 35,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "poke-reg-2",
            title: "Bowl Atun Rojo Spicy & Masago",
            description: "Atun fresco de pesca responsable marinado en aceite de sesamo y soja, masago crocante, aguacate, cebollin y alioli spicy sriracha.",
            originalPrice: 37500,
            discountedPrice: 31800,
            discountPercent: 15,
            tier: "main15",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "poke-reg-3",
            title: "Bowl Pollo Teriyaki & Piña Asada",
            description: "Pechuga campesina marinada al teriyaki, piña caramelizada a la brasa, pimentones asados, maiz tierno dulce y ajonjoli.",
            originalPrice: 29900,
            discountedPrice: 25400,
            discountPercent: 15,
            tier: "main15",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "poke-reg-4",
            title: "Bowl Mixto Mar y Tierra",
            description: "Salmon noruego, atun rojo y camarones salteados con palmitos de cangrejo, wakame y vinagreta de maracuya.",
            originalPrice: 41500,
            discountedPrice: 35200,
            discountPercent: 15,
            tier: "main15",
            stock: 20,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "\u{1F964} Entradas & Bebidas (10% OFF)",
        isRescue: false,
        items: [
          {
            id: "poke-ent-1",
            title: "Gyozas de Salmon al Vapor (5 uds)",
            description: "Empanaditas al vapor rellenas de salmon fresco y cebollin con salsa ponzu.",
            originalPrice: 18500,
            discountedPrice: 16600,
            discountPercent: 10,
            tier: "side10",
            stock: 30,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "poke-ent-2",
            title: "Ensalada Wakame de Algas con Sesamo",
            description: "Algas wakame aliñadas con aceite de sesamo tostado y vinagre de arroz dulce.",
            originalPrice: 14500,
            discountedPrice: 13000,
            discountPercent: 10,
            tier: "side10",
            stock: 25,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "poke-beb-1",
            title: "Limonada Natural de Hierbabuena o Lychee",
            description: "Zumo natural de limon fresco macerado con hojas de hierbabuena o fruta exotica de lychee.",
            originalPrice: 9900,
            discountedPrice: 8900,
            discountPercent: 10,
            tier: "side10",
            stock: 45,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "poke-beb-2",
            title: "Te Helado Artesanal de Frutos del Bosque",
            description: "Te infusionado con arandanos y fresas sin endulzantes artificiales.",
            originalPrice: 8500,
            discountedPrice: 7600,
            discountPercent: 10,
            tier: "side10",
            stock: 40,
            pickupWindow: "Todo el dia en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ],
    sedes: [
      {
        id: "poke-zona-g",
        branchName: "Zona G Calle 69",
        address: "Calle 69 # 5-08, Bogota",
        zone: "Zona G / Chapinero",
        distance: "390 m",
        contactName: "Daniela Osorio",
        contactPhone: "+57 318 400 9911",
        isActive: true
      },
      {
        id: "poke-chico",
        branchName: "Chico Calle 90",
        address: "Calle 90 # 13A-31, Bogota",
        zone: "Parque 93 / Chico",
        distance: "720 m",
        contactName: "Fabian Duarte",
        contactPhone: "+57 312 990 4455",
        isActive: true
      }
    ]
  }
];

const SharedStore = {
  STORAGE_KEY_FRANCHISES: 'salvaplato_franchises_v9',
  STORAGE_KEY_LEGACY: 'salvaplato_restaurants_colombia_v7',

  /**
   * Limpia claves obsoletas de versiones previas que contenian cartas antiguas o rutas desactualizadas
   */
  cleanObsoleteKeys() {
    try {
      const oldKeys = [
        'salvaplato_franchises_v6',
        'salvaplato_franchises_v7',
        'salvaplato_franchises_v8',
        'salvaplato_restaurants_colombia_v4',
        'salvaplato_restaurants_colombia_v5',
        'salvaplato_restaurants_colombia_v6'
      ];
      oldKeys.forEach(k => localStorage.removeItem(k));
    } catch (e) {}
  },

  /**
   * Obtiene la lista completa de Franquicias registradas.
   */
  getFranchises() {
    this.cleanObsoleteKeys();
    const data = localStorage.getItem(this.STORAGE_KEY_FRANCHISES);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Asegurar siempre que los logos coincidan con las versiones oficiales vigentes
          let updated = false;
          parsed.forEach(p => {
            const canon = COLOMBIA_FRANCHISES.find(c => c.id === p.id);
            if (canon && canon.logoImage && p.logoImage !== canon.logoImage) {
              p.logoImage = canon.logoImage;
              updated = true;
            }
          });
          if (updated) {
            this.saveFranchises(parsed);
          }
          return parsed;
        }
      } catch (e) {
        console.error('Error parseando franquicias guardadas:', e);
      }
    }
    // Inicializar con la lista rica de franquicias colombianas con logos oficiales y menus reales
    this.saveFranchises(COLOMBIA_FRANCHISES);
    return COLOMBIA_FRANCHISES;
  },

  /**
   * Guarda la lista de Franquicias y sincroniza la vista plana para comensales.
   */
  saveFranchises(franchises) {
    localStorage.setItem(this.STORAGE_KEY_FRANCHISES, JSON.stringify(franchises));
    // Sincronizar automaticamente la clave legacy para comensales
    const flatActive = this.flattenFranchisesToRestaurants(franchises, false);
    localStorage.setItem(this.STORAGE_KEY_LEGACY, JSON.stringify(flatActive));
  },

  /**
   * Convierte la jerarquia Franquicia -> Sedes en un arreglo plano de restaurantes/sedes
   * con su logo oficial vectorial, distancia, menu y atributos requeridos por la app comensal.
   */
  flattenFranchisesToRestaurants(franchises, includeInactive = false) {
    const flattened = [];

    franchises.forEach(fran => {
      if (!includeInactive && fran.isActive === false) return;

      fran.sedes.forEach(sede => {
        if (!includeInactive && (sede.isActive === false || fran.isActive === false)) return;

        flattened.push({
          id: sede.id,
          franchiseId: fran.id,
          franchiseName: fran.name,
          name: `${fran.name} (${sede.branchName})`,
          shortName: fran.name,
          branchName: sede.branchName,
          brandLogo: fran.brandLogo,
          logoImage: fran.logoImage || "assets/logos/default-restaurant.svg",
          category: fran.category,
          tag: fran.tag,
          rating: fran.rating,
          reviews: fran.reviews,
          distance: sede.distance || "800 m",
          address: sede.address,
          zone: sede.zone,
          coverImage: fran.coverImage,
          openingHours: fran.openingHours,
          crmStatus: fran.crmStatus,
          contactName: sede.contactName || fran.contactName,
          contactPhone: sede.contactPhone || fran.contactPhone,
          meetingNotes: fran.meetingNotes,
          menu: fran.menu,
          isFranchiseActive: fran.isActive !== false,
          isActive: (fran.isActive !== false) && (sede.isActive !== false)
        });
      });
    });

    return flattened;
  },

  /**
   * Obtiene todos los restaurantes/sedes activos para la vista de comensales.
   */
  getRestaurants(includeInactive = false) {
    const franchises = this.getFranchises();
    return this.flattenFranchisesToRestaurants(franchises, includeInactive);
  },

  saveRestaurants(rests) {
    localStorage.setItem(this.STORAGE_KEY_LEGACY, JSON.stringify(rests));
  },

  // ==========================================================
  // OPERACIONES DE GESTION DINAMICA DE FRANQUICIAS Y SEDES
  // ==========================================================

  addFranchise(newFranchise) {
    const franchises = this.getFranchises();
    if (!newFranchise.id) {
      newFranchise.id = "fran-" + Date.now();
    }
    if (!newFranchise.logoImage) {
      newFranchise.logoImage = "assets/logos/default-restaurant.svg";
    }
    franchises.unshift(newFranchise);
    this.saveFranchises(franchises);
    return newFranchise;
  },

  deleteFranchise(franchiseId) {
    let franchises = this.getFranchises();
    franchises = franchises.filter(f => f.id !== franchiseId);
    this.saveFranchises(franchises);
    return franchises;
  },

  toggleFranchiseActive(franchiseId) {
    const franchises = this.getFranchises();
    const fran = franchises.find(f => f.id === franchiseId);
    if (!fran) return null;

    fran.isActive = fran.isActive === false ? true : false;
    this.saveFranchises(franchises);
    return fran;
  },

  addSede(franchiseId, newSede) {
    const franchises = this.getFranchises();
    const fran = franchises.find(f => f.id === franchiseId);
    if (!fran) return null;

    if (!newSede.id) {
      newSede.id = `${franchiseId}-sede-${Date.now()}`;
    }
    if (newSede.isActive === undefined) {
      newSede.isActive = true;
    }
    fran.sedes.push(newSede);
    this.saveFranchises(franchises);
    return newSede;
  },

  toggleSedeActive(franchiseId, sedeId) {
    const franchises = this.getFranchises();
    const fran = franchises.find(f => f.id === franchiseId);
    if (!fran) return null;

    const sede = fran.sedes.find(s => s.id === sedeId);
    if (!sede) return null;

    sede.isActive = sede.isActive === false ? true : false;
    this.saveFranchises(franchises);
    return sede;
  },

  deleteSede(franchiseId, sedeId) {
    const franchises = this.getFranchises();
    const fran = franchises.find(f => f.id === franchiseId);
    if (!fran) return null;

    fran.sedes = fran.sedes.filter(s => s.id !== sedeId);
    this.saveFranchises(franchises);
    return fran;
  },

  resetToDefaultData() {
    localStorage.removeItem(this.STORAGE_KEY_FRANCHISES);
    localStorage.removeItem(this.STORAGE_KEY_LEGACY);
    return this.getFranchises();
  },

  // ==========================================================
  // GESTION DE CUPONES Y MONEDA
  // ==========================================================
  getVouchers() {
    const data = localStorage.getItem('salvaplato_vouchers_v4') || localStorage.getItem('salvaplato_vouchers');
    if (data) {
      try { return JSON.parse(data); } catch(e) { return []; }
    }
    return [];
  },

  saveVouchers(vouchers) {
    localStorage.setItem('salvaplato_vouchers_v4', JSON.stringify(vouchers));
    localStorage.setItem('salvaplato_vouchers', JSON.stringify(vouchers));
  },

  formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  }
};

// ==========================================================
// SINCRONIZACION EN VIVO ENTRE PESTA�'AS Y VENTANAS (TIEMPO REAL)
// ==========================================================
window.addEventListener('storage', (e) => {
  if (e.key && (e.key.includes('franchises') || e.key.includes('restaurants'))) {
    if (window.ClienteApp && ClienteApp.activeTab === 'feed') {
      ClienteApp.recalculateDistances();
    }
    if (window.AdminApp) {
      AdminApp.populateRestaurantSelectLogin();
      if (AdminApp.activeTab === 'franchises') AdminApp.renderFranchises();
    }
  }
  if (e.key && e.key.includes('vouchers')) {
    if (window.AdminApp) {
      AdminApp.updateMerchantUI();
    }
    if (window.ClienteApp && ClienteApp.activeTab === 'vouchers') {
      ClienteApp.renderMyVouchers();
    }
  }
});