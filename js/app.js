/**
 * SalvaPlato Colombia - Core Application Logic
 * Módulo de Autenticación, Menús Completos de Restaurantes Rappi, Descuento Dual y Carrito
 */

// Base de Datos Realista de Restaurantes Líderes en Rappi Colombia con Menú Completo
const RAPPI_COLOMBIA_RESTAURANTS = [
  {
    id: "rest-crepes",
    name: "Crepes & Waffles",
    brandLogo: "🥞",
    category: "Gourmet",
    tag: "🏆 Top Pedidos Rappi",
    rating: 4.9,
    reviews: 3420,
    distance: "600 m",
    address: "Zona G - Cra. 5 # 69-26, Bogotá",
    coverImage: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
    openingHours: "11:30 AM - 10:00 PM",
    crmStatus: "accepted",
    contactName: "Valentina Gómez (Administradora Zona G)",
    contactPhone: "+57 310 452 8891",
    meetingNotes: "Aceptaron piloto. Excedentes de crepes salados en cierre nocturno (54% OFF) y 20% permanente en toda la carta por pedir en local con la app.",
    menu: [
      {
        categoryName: "🌙 Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "cw-rec-1",
            title: "Bolsa Rescate: Crepe Salado Pollo Trufado + Ensalada",
            description: "Crepe artesanal con pollo en salsa cremosa de trufas y porción de ensalada fresca del día.",
            originalPrice: 35900,
            discountedPrice: 16500,
            discountPercent: 54,
            stock: 4,
            pickupWindow: "Hoy 8:45 PM - 9:45 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-rec-2",
            title: "Pack Mini Waffles + Salsa Tibia de Arequipe",
            description: "Masa fresca horneada del día con salsa artesanal de arequipe y almendras tostadas.",
            originalPrice: 22000,
            discountedPrice: 10500,
            discountPercent: 52,
            stock: 3,
            pickupWindow: "Hoy 5:00 PM - 6:30 PM",
            type: "rescue",
            shift: "afternoon",
            image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "⭐ Carta Regular (20% OFF Permanente SalvaPlato)",
        isRescue: false,
        items: [
          {
            id: "cw-reg-1",
            title: "Crepe de Pollo, Champiñones y Queso",
            description: "El clásico más pedido en Colombia. Pechuga desmechada, champiñones frescos y salsa blanca suave.",
            originalPrice: 31900,
            discountedPrice: 25500,
            discountPercent: 20,
            stock: 25,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-reg-2",
            title: "Crepe Stroganoff de Lomo Fino",
            description: "Julianas de lomo de res tierno en reducción de vino tinto y crema agria.",
            originalPrice: 38900,
            discountedPrice: 31100,
            discountPercent: 20,
            stock: 20,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "cw-reg-3",
            title: "Waffle de Nutella y Fresas Frescas",
            description: "Waffle crocante por fuera y suave por dentro, bañado en Nutella con fresas picadas.",
            originalPrice: 24500,
            discountedPrice: 19600,
            discountPercent: 20,
            stock: 30,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "🥤 Bebidas Naturales (20% OFF)",
        isRescue: false,
        items: [
          {
            id: "cw-beb-1",
            title: "Jugo Natural de Mandarina Frappé",
            description: "100% fruta natural recién exprimida sin azúcar añadida.",
            originalPrice: 11500,
            discountedPrice: 9200,
            discountPercent: 20,
            stock: 40,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "rest-corral",
    name: "El Corral - Hamburguesas",
    brandLogo: "🍔",
    category: "Hamburguesas",
    tag: "🔥 Tradición Colombiana",
    rating: 4.8,
    reviews: 5120,
    distance: "350 m",
    address: "Parque 93 - Cra. 11A # 93-42, Bogotá",
    coverImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    openingHours: "11:00 AM - 11:00 PM",
    crmStatus: "pitch",
    contactName: "Carlos Rincón (Gerente de Turno)",
    contactPhone: "+57 315 882 1045",
    meetingNotes: "Reunión positiva. 20% permanente para usuarios de la app en mesa y 52% de descuento en el turno de cierre para no apagar parrillas con carne lista.",
    menu: [
      {
        categoryName: "🌙 Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "corral-rec-1",
            title: "Combo Corralísima con Queso + Papas en Cascos",
            description: "Carne 100% de res a la parrilla de leña, queso mozzarella, vegetales y papas rústicas de cierre.",
            originalPrice: 34900,
            discountedPrice: 16900,
            discountPercent: 52,
            stock: 3,
            pickupWindow: "Hoy 9:30 PM - 10:30 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "⭐ Carta Regular (20% OFF Permanente SalvaPlato)",
        isRescue: false,
        items: [
          {
            id: "corral-reg-1",
            title: "Hamburguesa Corral Tradicional",
            description: "La auténtica con carne asada al carbón, cebolla grille, lechuga y salsa de la casa.",
            originalPrice: 26900,
            discountedPrice: 21500,
            discountPercent: 20,
            stock: 30,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-reg-2",
            title: "Vaquera con Tocineta y BBQ",
            description: "Carne Angus, tocineta crujiente, cebolla crispy y salsa barbacoa ahumada.",
            originalPrice: 32900,
            discountedPrice: 26300,
            discountPercent: 20,
            stock: 20,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "corral-reg-3",
            title: "Malteada de Café / Chocolate Tradicional",
            description: "Cremosa con helado de vainilla y doble shot de espresso colombiano.",
            originalPrice: 14500,
            discountedPrice: 11600,
            discountPercent: 20,
            stock: 40,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "rest-frisby",
    name: "Frisby - Pollo Apanado",
    brandLogo: "🍗",
    category: "Pollo",
    tag: "⭐ Nadie lo hace como Frisby",
    rating: 4.7,
    reviews: 4100,
    distance: "800 m",
    address: "Chapinero - Calle 63 # 13-35, Bogotá",
    coverImage: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",
    openingHours: "11:00 AM - 10:00 PM",
    crmStatus: "accepted",
    contactName: "Martha Lucía (Supervisora Bogotá)",
    contactPhone: "+57 301 723 9904",
    meetingNotes: "Aceptaron piloto de inmediato. Gran merma de pollo apanado a las 9 PM. 20% permanente en salón.",
    menu: [
      {
        categoryName: "🌙 Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "fris-rec-1",
            title: "Pack Apanado: 4 Presas Frisby + Arepas + Miel",
            description: "Pollo crocante recién salido de vitrina con arepitas fritas y miel de maple original.",
            originalPrice: 36900,
            discountedPrice: 17900,
            discountPercent: 51,
            stock: 5,
            pickupWindow: "Hoy 8:30 PM - 9:30 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "fris-rec-2",
            title: "Frisby Tacos / Tornados + Papas Francesa",
            description: "Almuerzo rápido de cierre de turno de mediodía en perfecto estado y temperatura.",
            originalPrice: 26500,
            discountedPrice: 12900,
            discountPercent: 51,
            stock: 4,
            pickupWindow: "Hoy 2:30 PM - 3:45 PM",
            type: "rescue",
            shift: "lunch",
            image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "⭐ Carta Regular (20% OFF Permanente SalvaPlato)",
        isRescue: false,
        items: [
          {
            id: "fris-reg-1",
            title: "Frisby Mediano (8 Presas + Acompañamiento)",
            description: "Para compartir en familia o amigos con ensalada de repollo dulce y arepas.",
            originalPrice: 48900,
            discountedPrice: 39100,
            discountPercent: 20,
            stock: 20,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "rest-panpaya",
    name: "Pan Pa' Ya! - Panadería & Café",
    brandLogo: "🥐",
    category: "Panadería",
    tag: "🥖 Pan del Día Garantizado",
    rating: 4.8,
    reviews: 2190,
    distance: "1.1 km",
    address: "Usaquén - Calle 119 # 6A-15, Bogotá",
    coverImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    openingHours: "6:30 AM - 9:00 PM",
    crmStatus: "accepted",
    contactName: "Don Bernardo (Administrador Usaquén)",
    contactPhone: "+57 312 901 3345",
    meetingNotes: "Perfecto para bolsas sorpresa de panadería fresca al finalizar el turno de la tarde.",
    menu: [
      {
        categoryName: "🌙 Rescate de la Tarde (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "ppy-rec-1",
            title: "Bolsa Rescate: 6 Panes Artesanales + Pandebonos",
            description: "Surtido horneado hoy: croissants de queso, trenzas campesinas y pandebonos esponjosos.",
            originalPrice: 27000,
            discountedPrice: 11900,
            discountPercent: 56,
            stock: 6,
            pickupWindow: "Hoy 6:00 PM - 7:30 PM",
            type: "rescue",
            shift: "afternoon",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "⭐ Carta Regular (20% OFF Permanente SalvaPlato)",
        isRescue: false,
        items: [
          {
            id: "ppy-reg-1",
            title: "Desayuno / Desayunadero Campesino Completo",
            description: "Huevos al gusto, tamal tolimense, chocolate caliente y canasta de pan caliente.",
            originalPrice: 25000,
            discountedPrice: 20000,
            discountPercent: 20,
            stock: 30,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "rest-homeburgers",
    name: "Home Burgers",
    brandLogo: "🍔",
    category: "Hamburguesas",
    tag: "✨ Simple y Real",
    rating: 4.9,
    reviews: 3880,
    distance: "750 m",
    address: "Zona Rosa - Calle 85 # 12-44, Bogotá",
    coverImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
    openingHours: "12:00 PM - 11:00 PM",
    crmStatus: "pending",
    contactName: "Pendiente Visita",
    contactPhone: "+57 320 000 0000",
    meetingNotes: "Llevar la app abierta con el cálculo de ROI para hamburgueserías artesanales.",
    menu: [
      {
        categoryName: "🌙 Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "home-rec-1",
            title: "Doble Cheeseburger Clásica + Papas Rústicas",
            description: "Doble carne jugosa sellada al hierro, queso cheddar madurado y pan suave artesanal horneado hoy.",
            originalPrice: 31000,
            discountedPrice: 14900,
            discountPercent: 52,
            stock: 3,
            pickupWindow: "Hoy 9:30 PM - 10:30 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "⭐ Carta Regular (20% OFF Permanente SalvaPlato)",
        isRescue: false,
        items: [
          {
            id: "home-reg-1",
            title: "Single Bacon Cheeseburger",
            description: "Carne fresca, queso cheddar fundido y tocineta ahumada artesanal.",
            originalPrice: 24000,
            discountedPrice: 19200,
            discountPercent: 20,
            stock: 25,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "rest-masa",
    name: "Masa - Panadería & Brunch",
    brandLogo: "🍞",
    category: "Panadería",
    tag: "🥐 Repostería Francesa",
    rating: 4.9,
    reviews: 1840,
    distance: "900 m",
    address: "Quinta Camacho - Calle 70 # 4-83, Bogotá",
    coverImage: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
    openingHours: "7:00 AM - 9:00 PM",
    crmStatus: "accepted",
    contactName: "Juliana Méndez (Gerente)",
    contactPhone: "+57 318 440 2911",
    meetingNotes: "Masa maneja estándares rigurosos de frescura. Gran bolsa sorpresa gourmet al final del día.",
    menu: [
      {
        categoryName: "🌙 Rescate de Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "masa-rec-1",
            title: "Bolsa Sorpresa Masa: Sourdough + 2 Croissants Almendra",
            description: "Hogaza entera de masa madre natural y 2 piezas de repostería hojaldrada del día.",
            originalPrice: 38000,
            discountedPrice: 16800,
            discountPercent: 56,
            stock: 3,
            pickupWindow: "Hoy 8:30 PM - 9:30 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "⭐ Carta Regular (20% OFF Permanente SalvaPlato)",
        isRescue: false,
        items: [
          {
            id: "masa-reg-1",
            title: "Tostadas Francesas de Brioche con Frutos Rojos",
            description: "Pan brioche artesanal bañado en vainilla, miel de agave y compota de moras silvestres.",
            originalPrice: 28000,
            discountedPrice: 22400,
            discountPercent: 20,
            stock: 20,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "rest-wok",
    name: "Wok - Comida Asiática & Sushi",
    brandLogo: "🥢",
    category: "Asiática",
    tag: "🍣 Ingredientes Sostenibles",
    rating: 4.9,
    reviews: 6200,
    distance: "1.4 km",
    address: "Usaquén - Cra. 6A # 117-26, Bogotá",
    coverImage: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
    openingHours: "12:00 PM - 10:30 PM",
    crmStatus: "pitch",
    contactName: "Felipe Sáenz (Jefe de Cocina)",
    contactPhone: "+57 316 771 9022",
    meetingNotes: "Interesados en liquidar platos calientes al mediodía y sushi al cierre de noche.",
    menu: [
      {
        categoryName: "🌙 Rescate Nocturno & Almuerzo (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "wok-rec-1",
            title: "Pad Thai de Pollo & Vegetales al Wok + Rollitos Primavera",
            description: "Fideos de arroz salteados con vegetales orgánicos, pollo y salsa de tamarindo.",
            originalPrice: 42000,
            discountedPrice: 19500,
            discountPercent: 54,
            stock: 4,
            pickupWindow: "Hoy 3:00 PM - 4:15 PM",
            type: "rescue",
            shift: "lunch",
            image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: "wok-rec-2",
            title: "Combo Sushi Variado (10 Bocados Frescos del Día)",
            description: "Makis frescos preparados en el último turno con salmón del pacífico y aguacate hass.",
            originalPrice: 46000,
            discountedPrice: 21900,
            discountPercent: 52,
            stock: 2,
            pickupWindow: "Hoy 9:15 PM - 10:15 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "⭐ Carta Regular (20% OFF Permanente SalvaPlato)",
        isRescue: false,
        items: [
          {
            id: "wok-reg-1",
            title: "Arroz Wok Especial (Camarón, Pollo y Cerdo)",
            description: "Arroz jazmín salteado al wok a alta temperatura con vegetales y tortilla de huevo.",
            originalPrice: 39000,
            discountedPrice: 31200,
            discountPercent: 20,
            stock: 30,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "rest-qbano",
    name: "Sándwich Qbano",
    brandLogo: "🥪",
    category: "Sandwich",
    tag: "🥫 La Salsa Especial Inconfundible",
    rating: 4.7,
    reviews: 3100,
    distance: "1.8 km",
    address: "Galerías - Calle 53 # 24-18, Bogotá",
    coverImage: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    openingHours: "10:30 AM - 10:00 PM",
    crmStatus: "accepted",
    contactName: "Jairo Ospina (Punto Galerías)",
    contactPhone: "+57 314 550 1289",
    meetingNotes: "Aceptaron piloto. Fácil de validar en caja por el datáfono.",
    menu: [
      {
        categoryName: "🌙 Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "qbano-rec-1",
            title: "Super Combo Especial Qbano 22cm + Papas Rústicas",
            description: "Sándwich tostado al horno con carnes frías selectas, queso fundido y salsa Qbano.",
            originalPrice: 28500,
            discountedPrice: 13900,
            discountPercent: 51,
            stock: 5,
            pickupWindow: "Hoy 8:45 PM - 9:45 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "⭐ Carta Regular (20% OFF Permanente SalvaPlato)",
        isRescue: false,
        items: [
          {
            id: "qbano-reg-1",
            title: "Combo Cordero / Roast Beef 22cm",
            description: "Cortes de carne magra marinada con vegetales frescos y papas en fosforito.",
            originalPrice: 31000,
            discountedPrice: 24800,
            discountPercent: 20,
            stock: 25,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "rest-juanvaldez",
    name: "Juan Valdez Café",
    brandLogo: "☕",
    category: "Café",
    tag: "☕ Orgullo Colombiano",
    rating: 4.8,
    reviews: 4700,
    distance: "500 m",
    address: "Parque Santander - Cra. 7 # 16-36, Bogotá",
    coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
    openingHours: "7:00 AM - 8:30 PM",
    crmStatus: "pending",
    contactName: "Gerencia de Tienda Bogotá Centro",
    contactPhone: "+57 311 000 0000",
    meetingNotes: "Ideal para rescatar la repostería fresca de la vitrina que expira el mismo día.",
    menu: [
      {
        categoryName: "🌙 Rescate de Onces (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "jv-rec-1",
            title: "Bolsa Once: Café Latte Grande + 2 Hojaldres de Arequipe",
            description: "Café de origen colombiano 100% arábico acompañado de hojaldres del día.",
            originalPrice: 23500,
            discountedPrice: 10900,
            discountPercent: 54,
            stock: 5,
            pickupWindow: "Hoy 5:30 PM - 7:00 PM",
            type: "rescue",
            shift: "afternoon",
            image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "⭐ Carta Regular (20% OFF Permanente SalvaPlato)",
        isRescue: false,
        items: [
          {
            id: "jv-reg-1",
            title: "Nevado de Arequipe o Café Juan Valdez",
            description: "Bebida frappé con café espresso, leche condensada, arequipe y crema chantilly.",
            originalPrice: 16500,
            discountedPrice: 13200,
            discountPercent: 20,
            stock: 40,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "rest-archies",
    name: "Archie's - Pizza Gourmet & Pasta",
    brandLogo: "🍕",
    category: "Pizzería",
    tag: "🍕 Horno de Leña",
    rating: 4.7,
    reviews: 2900,
    distance: "1.6 km",
    address: "Pepe Sierra - Calle 116 # 15-40, Bogotá",
    coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    openingHours: "12:00 PM - 10:30 PM",
    crmStatus: "rejected",
    contactName: "Mauricio Restrepo",
    contactPhone: "+57 317 221 0033",
    meetingNotes: "Desean ver cómo avanza el piloto con otras cadenas de la zona. Recontactar el próximo mes.",
    menu: [
      {
        categoryName: "🌙 Rescate Nocturno / Cierre (50% a 70% OFF)",
        isRescue: true,
        items: [
          {
            id: "arch-rec-1",
            title: "Pizza Mediana Artesanal 4 Quesos & Albahaca",
            description: "Horneada en leña, masa madurada, mozzarella di bufala y salsa de tomates frescos.",
            originalPrice: 48000,
            discountedPrice: 22900,
            discountPercent: 52,
            stock: 2,
            pickupWindow: "Hoy 9:30 PM - 10:30 PM",
            type: "rescue",
            shift: "night",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80"
          }
        ]
      },
      {
        categoryName: "⭐ Carta Regular (20% OFF Permanente SalvaPlato)",
        isRescue: false,
        items: [
          {
            id: "arch-reg-1",
            title: "Pasta Fettuccine Alfredo con Pollo",
            description: "Pasta fresca artesanal en salsa de mantequilla, parmesano madurado y pechuga a la parrilla.",
            originalPrice: 39500,
            discountedPrice: 31600,
            discountPercent: 20,
            stock: 20,
            pickupWindow: "Todo el día en local",
            type: "permanent",
            shift: "all",
            image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=400&q=80"
          }
        ]
      }
    ]
  }
];

// Estado Global de la Aplicación
const AppState = {
  restaurants: [],
  vouchers: [],
  cart: [],
  currentUser: null,
  activeMode: 'client', // 'client', 'merchant', 'pitch', 'crm'
  activeCategory: 'all',
  activeShift: 'all', // 'all', 'lunch', 'afternoon', 'night'
  onlyAcceptedFilter: false,
  clientView: 'feed', // 'feed', 'my-vouchers'
  currentRestaurantId: 'rest-crepes',
  selectedOffer: null,
  currentStoreRestaurant: null,

  init() {
    this.loadAuth();
    this.loadStorage();
    this.render();
    this.bindGlobalEvents();
    this.updateClockDisplay();
    this.updateCartUI();
  },

  // 1. GESTIÓN DE AUTENTICACIÓN Y USUARIOS
  loadAuth() {
    const savedUser = localStorage.getItem('salvaplato_user_v3');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (e) {
        this.currentUser = this.getDefaultUser();
      }
    } else {
      this.currentUser = this.getDefaultUser();
      this.saveUser();
    }
    this.updateUserUI();
  },

  getDefaultUser() {
    return {
      id: "usr-" + Date.now(),
      name: "Juan Camilo Pérez",
      email: "juan.perez@ejemplo.com",
      phone: "+57 312 445 9901",
      city: "Bogotá D.C.",
      walletBalance: 24500, // $24.500 COP de SalvaCoins
      kgSaved: 8.4,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    };
  },

  saveUser() {
    if (this.currentUser) {
      localStorage.setItem('salvaplato_user_v3', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('salvaplato_user_v3');
    }
    this.updateUserUI();
  },

  updateUserUI() {
    const userButton = document.getElementById('header-user-btn');
    const authButton = document.getElementById('header-login-btn');
    const userNameDisplay = document.getElementById('user-display-name');
    const userBalanceDisplay = document.getElementById('user-wallet-badge');

    if (this.currentUser) {
      if (userButton) userButton.classList.remove('hidden');
      if (authButton) authButton.classList.add('hidden');
      if (userNameDisplay) userNameDisplay.textContent = this.currentUser.name.split(' ')[0];
      if (userBalanceDisplay) userBalanceDisplay.textContent = this.formatCurrency(this.currentUser.walletBalance);
    } else {
      if (userButton) userButton.classList.add('hidden');
      if (authButton) authButton.classList.remove('hidden');
    }
  },

  loginUser(email, password) {
    this.currentUser = {
      id: "usr-" + Date.now(),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      phone: "+57 310 000 0000",
      city: "Bogotá D.C.",
      walletBalance: 15000,
      kgSaved: 4.2,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    };
    this.saveUser();
    this.closeAuthModal();
    this.showToast(`¡Bienvenido de nuevo, ${this.currentUser.name}!`);
    if (window.SoundEngine) SoundEngine.playSuccess();
  },

  registerUser(name, email, phone, city) {
    this.currentUser = {
      id: "usr-" + Date.now(),
      name: name,
      email: email,
      phone: phone,
      city: city || "Bogotá D.C.",
      walletBalance: 20000, // Bono de bienvenida de $20.000 COP
      kgSaved: 0,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    };
    this.saveUser();
    this.closeAuthModal();
    this.showToast(`¡Cuenta creada con éxito! Recibiste $20.000 en SalvaCoins 🌱`);
    if (window.SoundEngine) SoundEngine.playSuccess();
  },

  logoutUser() {
    this.currentUser = null;
    this.saveUser();
    document.getElementById('profile-modal')?.classList.add('hidden');
    this.showToast('Sesión cerrada');
  },

  openAuthModal(tab = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    this.setAuthTab(tab);
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  closeAuthModal() {
    document.getElementById('auth-modal')?.classList.add('hidden');
  },

  setAuthTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('auth-tab-login')?.classList.toggle('border-emerald-600', isLogin);
    document.getElementById('auth-tab-login')?.classList.toggle('text-emerald-700', isLogin);
    document.getElementById('auth-tab-login')?.classList.toggle('border-transparent', !isLogin);
    document.getElementById('auth-tab-login')?.classList.toggle('text-slate-400', !isLogin);

    document.getElementById('auth-tab-register')?.classList.toggle('border-emerald-600', !isLogin);
    document.getElementById('auth-tab-register')?.classList.toggle('text-emerald-700', !isLogin);
    document.getElementById('auth-tab-register')?.classList.toggle('border-transparent', isLogin);
    document.getElementById('auth-tab-register')?.classList.toggle('text-slate-400', isLogin);

    document.getElementById('auth-login-form')?.classList.toggle('hidden', !isLogin);
    document.getElementById('auth-register-form')?.classList.toggle('hidden', isLogin);
  },

  openProfileModal() {
    if (!this.currentUser) {
      this.openAuthModal();
      return;
    }
    const modal = document.getElementById('profile-modal');
    const content = document.getElementById('profile-modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-white relative">
        <button onclick="document.getElementById('profile-modal').classList.add('hidden')" class="absolute top-3 right-3 text-slate-400 hover:text-white p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-full border-2 border-emerald-500 overflow-hidden bg-slate-700">
            <img src="${this.currentUser.avatar}" class="w-full h-full object-cover">
          </div>
          <div>
            <span class="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
              Comensal SalvaPlato
            </span>
            <h3 class="font-black text-base mt-0.5">${this.currentUser.name}</h3>
            <p class="text-xs text-slate-300">${this.currentUser.email}</p>
          </div>
        </div>
      </div>

      <div class="p-5 space-y-4 text-xs text-slate-700">
        <!-- Billetera SalvaCoins -->
        <div class="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Billetera SalvaCoins (Cashback)</span>
            <span class="text-xl font-black text-emerald-700">${this.formatCurrency(this.currentUser.walletBalance)}</span>
            <span class="text-[10px] text-emerald-600 block mt-0.5">Dinero redimible en tus próximos rescates</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            🌱
          </div>
        </div>

        <!-- Estadísticas de Impacto Personal -->
        <div class="grid grid-cols-2 gap-2 text-center">
          <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span class="text-[10px] text-slate-400 block font-medium">Comida Salvada</span>
            <span class="font-black text-slate-900 text-sm">${this.currentUser.kgSaved} kg</span>
          </div>
          <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span class="text-[10px] text-slate-400 block font-medium">Ciudad Activa</span>
            <span class="font-black text-slate-900 text-sm">${this.currentUser.city}</span>
          </div>
        </div>

        <!-- Opciones de cuenta -->
        <div class="space-y-1 pt-1 border-t border-slate-100">
          <button onclick="AppState.setClientView('my-vouchers'); document.getElementById('profile-modal').classList.add('hidden')" class="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between font-bold text-slate-800">
            <span class="flex items-center gap-2"><i data-lucide="ticket" class="w-4 h-4 text-emerald-600"></i> Mis Bonos & Reservas</span>
            <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
          </button>
          <button onclick="AppState.setMode('crm'); document.getElementById('profile-modal').classList.add('hidden')" class="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between font-bold text-slate-800">
            <span class="flex items-center gap-2"><i data-lucide="clipboard-list" class="w-4 h-4 text-indigo-600"></i> Mi Ruta Comercial (Restaurantes)</span>
            <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
          </button>
        </div>

        <button onclick="AppState.logoutUser()" class="w-full py-2.5 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition flex items-center justify-center gap-1">
          <i data-lucide="log-out" class="w-4 h-4"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  // 2. CARGA Y PERSISTENCIA DE DATOS
  loadStorage() {
    const savedRest = localStorage.getItem('salvaplato_restaurants_colombia_v3');
    if (savedRest) {
      try {
        this.restaurants = JSON.parse(savedRest);
      } catch (e) {
        this.restaurants = RAPPI_COLOMBIA_RESTAURANTS;
      }
    } else {
      this.restaurants = RAPPI_COLOMBIA_RESTAURANTS;
      this.saveRestaurants();
    }

    const savedVouchers = localStorage.getItem('salvaplato_vouchers');
    if (savedVouchers) {
      try {
        this.vouchers = JSON.parse(savedVouchers);
      } catch (e) {
        this.vouchers = [];
      }
    }
  },

  saveRestaurants() {
    localStorage.setItem('salvaplato_restaurants_colombia_v3', JSON.stringify(this.restaurants));
  },

  saveVouchers() {
    localStorage.setItem('salvaplato_vouchers', JSON.stringify(this.vouchers));
  },

  // 3. EVENTOS GLOBALES
  bindGlobalEvents() {
    // Selector de modo de barra superior (Comensal, Restaurante, Pitch, CRM)
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.dataset.mode;
        this.setMode(mode);
      });
    });

    // Selector de Horario / Turno
    document.querySelectorAll('.shift-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.shift-pill').forEach(p => {
          p.classList.remove('bg-emerald-600', 'text-white', 'shadow-md');
          p.classList.add('bg-slate-800', 'text-slate-300');
        });
        e.currentTarget.classList.add('bg-emerald-600', 'text-white', 'shadow-md');
        e.currentTarget.classList.remove('bg-slate-800', 'text-slate-300');
        
        this.activeShift = e.currentTarget.dataset.shift;
        this.updateClockDisplay();
        this.renderRestaurantFeed();
      });
    });

    // Marco de celular toggle
    const frameToggle = document.getElementById('frame-toggle-btn');
    if (frameToggle) {
      frameToggle.addEventListener('click', () => {
        const wrapper = document.getElementById('app-shell-wrapper');
        const isFramed = wrapper.classList.toggle('max-w-md');
        wrapper.classList.toggle('shadow-2xl');
        wrapper.classList.toggle('rounded-[40px]');
        wrapper.classList.toggle('border-[8px]');
        wrapper.classList.toggle('border-slate-800');
        wrapper.classList.toggle('my-4');
        wrapper.classList.toggle('max-h-[88vh]');
        wrapper.classList.toggle('overflow-y-auto');
        frameToggle.innerHTML = isFramed 
          ? '<i data-lucide="maximize-2" class="w-4 h-4"></i><span>Pantalla Completa</span>'
          : '<i data-lucide="smartphone" class="w-4 h-4"></i><span>Ver en Celular</span>';
        if (window.lucide) lucide.createIcons();
      });
    }

    // Toggle de solo restaurantes aceptados
    const onlyAcceptedCheckbox = document.getElementById('filter-only-accepted');
    if (onlyAcceptedCheckbox) {
      onlyAcceptedCheckbox.addEventListener('change', (e) => {
        this.onlyAcceptedFilter = e.target.checked;
        this.renderRestaurantFeed();
      });
    }

    // Tabs internas comensal
    document.querySelectorAll('.client-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.setClientView(view);
      });
    });

    // Filtros de categoría comensal
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('bg-emerald-600', 'text-white', 'shadow-md'));
        e.currentTarget.classList.add('bg-emerald-600', 'text-white', 'shadow-md');
        this.activeCategory = e.currentTarget.dataset.category;
        this.renderRestaurantFeed();
      });
    });

    // Formularios de Login y Registro
    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        this.loginUser(email, pass);
      });
    }

    const registerForm = document.getElementById('auth-register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;
        const city = document.getElementById('reg-city').value;
        this.registerUser(name, email, phone, city);
      });
    }

    // Formulario crear oferta flash
    const newOfferForm = document.getElementById('create-offer-form');
    if (newOfferForm) {
      newOfferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCreateOffer(new FormData(newOfferForm));
      });

      const origPriceInput = document.getElementById('new-orig-price');
      const discPriceInput = document.getElementById('new-disc-price');
      const previewPct = document.getElementById('new-offer-pct-preview');

      const updatePct = () => {
        const orig = parseFloat(origPriceInput?.value) || 0;
        const disc = parseFloat(discPriceInput?.value) || 0;
        if (orig > 0 && disc > 0 && orig > disc) {
          const pct = Math.round(((orig - disc) / orig) * 100);
          if (previewPct) previewPct.textContent = `-${pct}% de Descuento`;
        } else {
          if (previewPct) previewPct.textContent = `-0%`;
        }
      };

      if (origPriceInput) origPriceInput.addEventListener('input', updatePct);
      if (discPriceInput) discPriceInput.addEventListener('input', updatePct);
    }

    // Validador de Códigos de Mesero
    const validateForm = document.getElementById('validator-form');
    if (validateForm) {
      validateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pinInput = document.getElementById('validator-pin-input');
        if (pinInput) {
          this.validateVoucherPIN(pinInput.value.trim());
        }
      });
    }

    // Selector de Restaurante en Modo Comercio
    const merchantRestSelect = document.getElementById('merchant-restaurant-select');
    if (merchantRestSelect) {
      merchantRestSelect.addEventListener('change', (e) => {
        this.currentRestaurantId = e.target.value;
        this.renderMerchantView();
      });
    }
  },

  updateClockDisplay() {
    const clockText = document.getElementById('simulated-clock-text');
    if (!clockText) return;

    const timeMap = {
      'all': '⏰ Todas las Horas (20% Permanente en Carta + Rescates Activos)',
      'lunch': '☀️ 02:45 PM (Turno Almuerzo - Rescate Menús Ejecutivos)',
      'afternoon': '☕ 05:45 PM (Turno Onces - Rescate Panaderías y Cafés)',
      'night': '🌙 09:15 PM (Cierre Nocturno - Descuentos hasta 70% OFF)'
    };

    clockText.textContent = timeMap[this.activeShift] || '⏰ Horario Simulado';
  },

  setMode(mode) {
    this.activeMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
      const active = btn.dataset.mode === mode;
      btn.classList.toggle('bg-emerald-600', active);
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('shadow-md', active);
      btn.classList.toggle('bg-slate-800', !active);
      btn.classList.toggle('text-slate-300', !active);
    });

    document.getElementById('view-client').classList.toggle('hidden', mode !== 'client');
    document.getElementById('view-merchant').classList.toggle('hidden', mode !== 'merchant');
    document.getElementById('view-pitch').classList.toggle('hidden', mode !== 'pitch');
    document.getElementById('view-crm').classList.toggle('hidden', mode !== 'crm');

    // Desplazar al tope suavemente al cambiar de modo
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (mode === 'merchant') {
      this.renderMerchantView();
    } else if (mode === 'pitch') {
      if (window.ROICalculator) ROICalculator.init();
    } else if (mode === 'crm') {
      this.renderCRMView();
    } else {
      this.renderRestaurantFeed();
      this.renderMyVouchers();
    }

    if (window.lucide) lucide.createIcons();
  },

  setClientView(view) {
    this.clientView = view;
    document.querySelectorAll('.client-nav-btn').forEach(btn => {
      const active = btn.dataset.view === view;
      btn.classList.toggle('text-emerald-600', active);
      btn.classList.toggle('text-slate-400', !active);
    });

    document.getElementById('client-feed-section').classList.toggle('hidden', view !== 'feed');
    document.getElementById('client-vouchers-section').classList.toggle('hidden', view !== 'my-vouchers');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'my-vouchers') {
      this.renderMyVouchers();
    }
    if (window.lucide) lucide.createIcons();
  },

  render() {
    this.renderRestaurantFeed();
    this.renderMyVouchers();
    this.renderMerchantView();
    this.renderCRMView();
    this.updateVouchersBadge();
    if (window.lucide) lucide.createIcons();
  },

  // 4. FEED DE RESTAURANTES Y OFERTAS PARA COMENSALES
  renderRestaurantFeed() {
    const container = document.getElementById('restaurant-offers-container');
    if (!container) return;

    let filteredRestaurants = this.restaurants.filter(r => {
      if (this.onlyAcceptedFilter && r.crmStatus !== 'accepted') return false;
      if (this.activeCategory !== 'all' && r.category !== this.activeCategory) return false;
      return true;
    });

    if (filteredRestaurants.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 px-4 bg-white rounded-2xl border border-slate-100">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            <i data-lucide="store" class="w-8 h-8 text-amber-500"></i>
          </div>
          <h3 class="font-bold text-slate-700 text-sm">No hay restaurantes en este filtro</h3>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Prueba desmarcando el filtro de solo aceptados o cambiando de categoría.
          </p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = filteredRestaurants.map(rest => {
      // Extraer platos destacados (tanto rescate nocturno como 20% carta)
      let allItems = [];
      rest.menu.forEach(cat => {
        cat.items.forEach(it => {
          if (this.activeShift === 'all' || !it.shift || it.shift === 'all' || it.shift === this.activeShift) {
            allItems.push({ ...it, categoryName: cat.categoryName });
          }
        });
      });

      const topItem = allItems[0] || rest.menu[0]?.items[0];

      return `
        <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col">
          <!-- Portada con click para abrir menú completo -->
          <div onclick="AppState.openRestaurantStore('${rest.id}')" class="relative h-44 w-full overflow-hidden bg-slate-100 cursor-pointer group">
            <img src="${rest.coverImage}" alt="${rest.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
            
            <!-- Badges de Descuento Superior -->
            <div class="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
              <span class="bg-emerald-600 text-white font-black text-[11px] px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                ⭐ 20% OFF Permanente
              </span>
              <span class="bg-red-600 text-white font-black text-[11px] px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                🌙 Noche hasta 60%
              </span>
            </div>

            <!-- Horarios y distancia -->
            <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-2 py-1 rounded-xl shadow flex items-center gap-1">
              <i data-lucide="clock" class="w-3 h-3 text-emerald-600"></i>
              <span>${rest.openingHours}</span>
            </div>

            <!-- Datos del restaurante -->
            <div class="absolute bottom-2.5 left-3 right-3 text-white">
              <div class="flex items-center gap-1.5 mb-0.5">
                <span class="text-xl">${rest.brandLogo}</span>
                <h4 class="font-black text-base drop-shadow truncate">${rest.name}</h4>
                ${rest.crmStatus === 'accepted' ? '<span class="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">CONFIRMADO</span>' : ''}
              </div>
              <div class="flex items-center gap-2 text-[11px] text-white/90">
                <span class="flex items-center gap-0.5 font-bold"><i data-lucide="star" class="w-3.5 h-3.5 text-amber-400 fill-amber-400"></i> ${rest.rating} (${rest.reviews})</span>
                <span>•</span>
                <span class="flex items-center gap-0.5"><i data-lucide="map-pin" class="w-3 h-3 text-emerald-400"></i> ${rest.distance} • ${rest.address.split('-')[0]}</span>
              </div>
            </div>
          </div>

          <!-- Vista previa de plato destacado y botón Ver Menú -->
          <div class="p-3.5 flex flex-col justify-between flex-1">
            ${topItem ? `
              <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold ${topItem.type === 'rescue' ? 'text-red-700 bg-red-50' : 'text-emerald-700 bg-emerald-50'} px-2 py-0.5 rounded-md">
                    ${topItem.type === 'rescue' ? '🌙 Excedente Nocturno' : '⭐ Plato Recomendado (20% OFF)'}
                  </span>
                  ${topItem.stock <= 5 ? `<span class="text-[10px] font-bold text-amber-600">¡Quedan ${topItem.stock}!</span>` : ''}
                </div>
                <h5 class="font-bold text-slate-800 text-xs mt-1 truncate">${topItem.title}</h5>
                <div class="flex items-center justify-between mt-1.5">
                  <div class="flex items-baseline gap-1.5">
                    <span class="text-sm font-black text-slate-900">${this.formatCurrency(topItem.discountedPrice)}</span>
                    <span class="text-xs text-slate-400 line-through">${this.formatCurrency(topItem.originalPrice)}</span>
                  </div>
                  <button 
                    onclick="AppState.quickOrderSingleItem('${rest.id}', '${topItem.id}')"
                    class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow transition">
                    Salvar
                  </button>
                </div>
              </div>
            ` : ''}

            <div class="flex items-center justify-between pt-1">
              <span class="text-[11px] text-slate-500 font-medium">
                ${allItems.length} opciones con descuento
              </span>
              <button 
                onclick="AppState.openRestaurantStore('${rest.id}')" 
                class="text-xs font-black text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                <span>Ver Menú Completo</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  // 5. PANTALLA COMPLETA DE RESTAURANTE (STORE PAGE CON MENÚ COMPLETO)
  openRestaurantStore(restaurantId) {
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;

    this.currentStoreRestaurant = restaurant;
    const modal = document.getElementById('restaurant-detail-modal');
    const content = document.getElementById('restaurant-detail-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <!-- Cabecera y portada -->
      <div class="relative h-52 w-full bg-slate-900">
        <img src="${restaurant.coverImage}" class="w-full h-full object-cover opacity-80">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/40 to-transparent"></div>
        
        <button onclick="document.getElementById('restaurant-detail-modal').classList.add('hidden')" class="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-full hover:bg-black transition">
          <i data-lucide="arrow-left" class="w-5 h-5"></i>
        </button>

        <!-- Información sobre imagen -->
        <div class="absolute bottom-4 left-4 right-4 text-white">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${restaurant.brandLogo}</span>
            <h2 class="text-xl font-black">${restaurant.name}</h2>
          </div>
          <p class="text-xs text-slate-300 mt-0.5">${restaurant.address}</p>
          <div class="flex items-center gap-2 text-xs text-white/90 mt-1.5">
            <span class="bg-emerald-600 px-2 py-0.5 rounded font-bold flex items-center gap-1">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-white"></i> ${restaurant.rating}
            </span>
            <span>• Horario: ${restaurant.openingHours}</span>
            <span>• ${restaurant.category}</span>
          </div>
        </div>
      </div>

      <!-- Banner explicativo de descuentos del local -->
      <div class="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs">
        <div class="flex items-center gap-2">
          <i data-lucide="badge-percent" class="w-5 h-5 text-emerald-700 shrink-0"></i>
          <div>
            <span class="font-bold text-emerald-950 block">Descuento SalvaPlato Aplicado:</span>
            <span class="text-emerald-800 text-[11px]">20% permanente en la carta y hasta 60% en excedentes nocturnos.</span>
          </div>
        </div>
      </div>

      <!-- Menú por Categorías -->
      <div class="p-4 space-y-6 pb-28">
        ${restaurant.menu.map(cat => `
          <div class="space-y-3">
            <h3 class="font-black text-sm text-slate-800 flex items-center justify-between border-b pb-1">
              <span>${cat.categoryName}</span>
              <span class="text-[10px] font-bold ${cat.isRescue ? 'text-red-600' : 'text-emerald-700'}">
                ${cat.isRescue ? 'Stock Limitado' : 'Disponible en salón'}
              </span>
            </h3>

            <div class="space-y-3">
              ${cat.items.map(item => `
                <div class="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3 hover:border-slate-300 transition">
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center gap-1.5">
                      <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded ${item.type === 'rescue' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}">
                        -${item.discountPercent}% OFF
                      </span>
                      ${item.type === 'rescue' ? `<span class="text-[10px] text-amber-700 font-bold">¡Quedan ${item.stock}!</span>` : ''}
                    </div>
                    <h4 class="font-bold text-slate-800 text-sm leading-snug">${item.title}</h4>
                    <p class="text-slate-500 text-xs line-clamp-2">${item.description}</p>
                    
                    <div class="pt-1 flex items-baseline gap-2">
                      <span class="text-base font-black text-slate-900">${this.formatCurrency(item.discountedPrice)}</span>
                      <span class="text-xs text-slate-400 line-through">${this.formatCurrency(item.originalPrice)}</span>
                    </div>
                  </div>

                  <div class="flex flex-col items-end gap-2 shrink-0">
                    <div class="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                      <img src="${item.image}" class="w-full h-full object-cover">
                    </div>
                    <button 
                      onclick="AppState.addToCart('${restaurant.id}', '${item.id}')"
                      class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 transition flex items-center gap-1">
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    modal.classList.remove('hidden');
    // Forzar scroll al tope del modal
    content.scrollTop = 0;
    if (window.lucide) lucide.createIcons();
  },

  // 6. GESTIÓN DEL CARRITO / CANASTA DE COMPRAS
  addToCart(restaurantId, itemId) {
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;

    let targetItem = null;
    restaurant.menu.forEach(cat => {
      const found = cat.items.find(it => it.id === itemId);
      if (found) targetItem = found;
    });

    if (!targetItem) return;

    // Si el carrito tiene productos de otro restaurante, advertir o limpiar
    if (this.cart.length > 0 && this.cart[0].restaurantId !== restaurantId) {
      if (!confirm(`Tu canasta contiene platos de ${this.cart[0].restaurantName}. ¿Deseas vaciarla para pedir en ${restaurant.name}?`)) {
        return;
      }
      this.cart = [];
    }

    const existingIndex = this.cart.findIndex(i => i.id === itemId);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push({
        ...targetItem,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantAddress: restaurant.address,
        quantity: 1
      });
    }

    if (window.SoundEngine) SoundEngine.playSuccess();
    this.showToast(`Agregaste "${targetItem.title}" a tu canasta`);
    this.updateCartUI();
  },

  quickOrderSingleItem(restaurantId, itemId) {
    this.cart = [];
    this.addToCart(restaurantId, itemId);
    this.openCheckoutModal();
  },

  updateCartUI() {
    const floatingBar = document.getElementById('floating-cart-bar');
    const countDisplay = document.getElementById('cart-items-count');
    const totalDisplay = document.getElementById('cart-total-price');
    const savedDisplay = document.getElementById('cart-saved-amount');

    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
    const totalOriginal = this.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const totalSaved = totalOriginal - totalPrice;

    if (floatingBar) {
      if (totalItems > 0) {
        floatingBar.classList.remove('hidden');
        if (countDisplay) countDisplay.textContent = `${totalItems} ${totalItems === 1 ? 'plato' : 'platos'}`;
        if (totalDisplay) totalDisplay.textContent = this.formatCurrency(totalPrice);
        if (savedDisplay) savedDisplay.textContent = `Ahorras ${this.formatCurrency(totalSaved)}`;
      } else {
        floatingBar.classList.add('hidden');
      }
    }
    if (window.lucide) lucide.createIcons();
  },

  openCheckoutModal() {
    if (this.cart.length === 0) return;

    const modal = document.getElementById('order-modal');
    const content = document.getElementById('order-modal-content');
    if (!modal || !content) return;

    const firstItem = this.cart[0];
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
    const totalOriginal = this.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const totalSaved = totalOriginal - totalPrice;

    content.innerHTML = `
      <div class="p-4 border-b border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
            🌱
          </div>
          <div>
            <h3 class="font-bold text-slate-800 text-sm">Resumen de Pedido SalvaPlato</h3>
            <p class="text-[11px] text-slate-500">${firstItem.restaurantName}</p>
          </div>
        </div>
        <button onclick="AppState.closeOrderModal()" class="text-slate-400 p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="p-4 space-y-3.5 text-xs text-slate-600 max-h-[60vh] overflow-y-auto">
        <!-- Lista de platos en canasta -->
        <div class="space-y-2">
          ${this.cart.map(item => `
            <div class="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div class="truncate max-w-[190px]">
                <span class="font-bold text-slate-800 block truncate">${item.quantity}x ${item.title}</span>
                <span class="text-[10px] text-emerald-600 font-medium">-${item.discountPercent}% OFF</span>
              </div>
              <span class="font-black text-slate-900">${this.formatCurrency(item.discountedPrice * item.quantity)}</span>
            </div>
          `).join('')}
        </div>

        <!-- Tipo de Consumo (Presencial con 20% o Recoger) -->
        <div class="bg-emerald-50 p-3 rounded-xl space-y-1 text-emerald-950">
          <span class="font-bold text-xs block">Modalidad de Consumo:</span>
          <div class="flex gap-2 pt-1">
            <label class="flex-1 bg-white p-2 rounded-lg border border-emerald-200 cursor-pointer font-bold text-[11px] flex items-center gap-1.5">
              <input type="radio" name="consumeType" value="dinein" checked class="accent-emerald-600">
              <span>🍽️ Comer en Mesa (20%)</span>
            </label>
            <label class="flex-1 bg-white p-2 rounded-lg border border-emerald-200 cursor-pointer font-bold text-[11px] flex items-center gap-1.5">
              <input type="radio" name="consumeType" value="takeout" class="accent-emerald-600">
              <span>🛍️ Llevar / Takeout</span>
            </label>
          </div>
        </div>

        <!-- Desglose de Precios -->
        <div class="space-y-1.5 pt-1 border-t border-slate-100">
          <div class="flex justify-between text-slate-500">
            <span>Precio habitual de carta:</span>
            <span class="line-through">${this.formatCurrency(totalOriginal)}</span>
          </div>
          <div class="flex justify-between font-bold text-emerald-600">
            <span>Ahorro total SalvaPlato:</span>
            <span>-${this.formatCurrency(totalSaved)}</span>
          </div>
          <div class="flex justify-between font-black text-base text-slate-900 pt-1 border-t border-slate-200">
            <span>Total a cancelar:</span>
            <span class="text-emerald-700">${this.formatCurrency(totalPrice)}</span>
          </div>
        </div>

        <p class="text-[11px] text-slate-400 text-center">
          Se generará tu <strong>Código QR y PIN de 4 dígitos</strong> para validar al pagar en caja.
        </p>
      </div>

      <div class="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
        <button onclick="AppState.closeOrderModal()" class="w-1/3 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600">
          Cancelar
        </button>
        <button onclick="AppState.confirmOrderAndGenerateVoucher()" class="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5">
          <i data-lucide="ticket" class="w-4 h-4"></i>
          <span>Generar Bono QR</span>
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  closeOrderModal() {
    document.getElementById('order-modal')?.classList.add('hidden');
  },

  confirmOrderAndGenerateVoucher() {
    if (this.cart.length === 0) return;

    const firstItem = this.cart[0];
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const voucherId = 'vch-' + Date.now();
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
    const titles = this.cart.map(i => `${i.quantity}x ${i.title}`).join(', ');

    const newVoucher = {
      id: voucherId,
      pin: randomPin,
      restaurantId: firstItem.restaurantId,
      restaurantName: firstItem.restaurantName,
      restaurantAddress: firstItem.restaurantAddress,
      offerTitle: titles,
      originalPrice: this.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0),
      discountedPrice: totalPrice,
      discountPercent: 35,
      pickupWindow: "Hoy durante el turno",
      status: 'active',
      createdAt: new Date().toISOString()
    };

    this.vouchers.unshift(newVoucher);
    this.saveVouchers();

    // Limpiar carrito y cerrar modal de pedido y detalle
    this.cart = [];
    this.updateCartUI();
    this.closeOrderModal();
    document.getElementById('restaurant-detail-modal')?.classList.add('hidden');

    if (window.SoundEngine) SoundEngine.playSuccess();

    this.openTicketModal(newVoucher.id);
    this.updateVouchersBadge();
    this.renderMyVouchers();
  },

  openTicketModal(voucherId) {
    const voucher = this.vouchers.find(v => v.id === voucherId);
    if (!voucher) return;

    const modal = document.getElementById('ticket-modal');
    const content = document.getElementById('ticket-modal-content');
    if (!modal || !content) return;

    const isRedeemed = voucher.status === 'redeemed';

    content.innerHTML = `
      <div class="bg-gradient-to-r ${isRedeemed ? 'from-slate-700 to-slate-900' : 'from-emerald-600 to-teal-700'} p-4 text-white text-center relative">
        <button onclick="AppState.closeTicketModal()" class="absolute top-3 right-3 text-white/80 hover:text-white p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
        <span class="inline-block bg-white/20 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full mb-1">
          ${isRedeemed ? '✅ CANJEADO EN CAJA' : '⏳ LISTO PARA CANJEAR'}
        </span>
        <h3 class="font-black text-base">${voucher.restaurantName}</h3>
        <p class="text-xs text-white/80 truncate max-w-[240px] mx-auto">${voucher.offerTitle}</p>
      </div>

      <div class="p-5 text-center space-y-4">
        <div class="flex justify-center">
          <div id="ticket-qr-container" class="p-2 border-2 ${isRedeemed ? 'border-slate-300 opacity-50' : 'border-emerald-500'} rounded-2xl bg-white shadow-md inline-block"></div>
        </div>

        <div>
          <span class="text-[11px] uppercase tracking-wider font-bold text-slate-400">PIN de Verificación para el Mesero</span>
          <div class="mt-1 flex items-center justify-center gap-2">
            <span class="font-mono text-3xl font-black tracking-widest ${isRedeemed ? 'text-slate-400 line-through' : 'text-slate-900 bg-slate-100 px-4 py-1.5 rounded-xl border border-slate-200'}">
              ${voucher.pin}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 mt-1">Muestra este código al mesero o cajero al momento de pagar</p>
        </div>

        <div class="bg-slate-50 p-3 rounded-xl text-left text-xs space-y-1 border border-slate-100">
          <div class="flex justify-between">
            <span class="text-slate-500">Valor a cancelar:</span>
            <span class="font-bold text-emerald-700 text-sm">${this.formatCurrency(voucher.discountedPrice)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Dirección:</span>
            <span class="font-medium text-slate-700 text-right truncate max-w-[180px]">${voucher.restaurantAddress}</span>
          </div>
        </div>

        ${!isRedeemed ? `
          <div class="pt-2">
            <button 
              onclick="AppState.validateVoucherPIN('${voucher.pin}', true)" 
              class="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
              <span>Simular Canje de Mesero Ahora</span>
            </button>
            <span class="text-[10px] text-slate-400 block mt-1">Demuestra la rapidez de validación ante el restaurante</span>
          </div>
        ` : `
          <div class="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
            <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i>
            <span>¡Bono validado y registrado en caja!</span>
          </div>
        `}
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      const qrBox = document.getElementById('ticket-qr-container');
      if (qrBox && window.QREngine) {
        QREngine.renderQR(qrBox, `SALVAPLATO:${voucher.id}:${voucher.pin}`, 170);
      }
    }, 50);
  },

  closeTicketModal() {
    document.getElementById('ticket-modal')?.classList.add('hidden');
  },

  renderMyVouchers() {
    const container = document.getElementById('my-vouchers-list');
    if (!container) return;

    if (this.vouchers.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 px-4 bg-white rounded-2xl border border-slate-100">
          <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <i data-lucide="ticket" class="w-7 h-7"></i>
          </div>
          <h4 class="font-bold text-slate-800 text-sm">No tienes bonos activos</h4>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Explora las ofertas en Crepes, El Corral, Frisby o Masa y salva tu primer plato.</p>
          <button onclick="AppState.setClientView('feed')" class="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow">
            Explorar Restaurantes
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = this.vouchers.map(v => {
      const isRedeemed = v.status === 'redeemed';
      return `
        <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
          <div class="space-y-1">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded ${isRedeemed ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100 text-emerald-800'}">
                ${isRedeemed ? 'Canjeado' : 'Listo para reclamar'}
              </span>
              <span class="text-xs font-mono font-bold text-slate-400">PIN: ${v.pin}</span>
            </div>
            <h4 class="font-bold text-slate-800 text-sm">${v.restaurantName}</h4>
            <p class="text-xs text-slate-500 truncate max-w-[200px]">${v.offerTitle}</p>
            <p class="text-xs font-bold text-emerald-700">${this.formatCurrency(v.discountedPrice)}</p>
          </div>

          <button 
            onclick="AppState.openTicketModal('${v.id}')"
            class="px-3.5 py-2 rounded-xl text-xs font-bold ${isRedeemed ? 'bg-slate-100 text-slate-600' : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'} flex items-center gap-1">
            <i data-lucide="qr-code" class="w-4 h-4"></i>
            <span>${isRedeemed ? 'Ver' : 'Ver QR'}</span>
          </button>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  updateVouchersBadge() {
    const badge = document.getElementById('vouchers-count-badge');
    const activeCount = this.vouchers.filter(v => v.status === 'active').length;
    if (badge) {
      if (activeCount > 0) {
        badge.textContent = activeCount;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  },

  // 7. VISTA DE RESTAURANTE / COMERCIO
  renderMerchantView() {
    const restSelect = document.getElementById('merchant-restaurant-select');
    if (restSelect) {
      restSelect.innerHTML = this.restaurants.map(r => `
        <option value="${r.id}" ${r.id === this.currentRestaurantId ? 'selected' : ''}>${r.name}</option>
      `).join('');
    }

    const currentRest = this.restaurants.find(r => r.id === this.currentRestaurantId) || this.restaurants[0];
    if (!currentRest) return;

    const redeemedOfThisRest = this.vouchers.filter(v => v.restaurantId === currentRest.id && v.status === 'redeemed');
    const totalRecoveredMoney = redeemedOfThisRest.reduce((sum, v) => sum + (v.discountedPrice * 0.82), 0) + 380000;
    const totalSavedPortions = redeemedOfThisRest.length + 22;
    const totalCO2 = Math.round(totalSavedPortions * 1.8);

    const statMoney = document.getElementById('merchant-stat-money');
    const statPortions = document.getElementById('merchant-stat-portions');
    const statCO2 = document.getElementById('merchant-stat-co2');

    if (statMoney) statMoney.textContent = this.formatCurrency(totalRecoveredMoney);
    if (statPortions) statPortions.textContent = `${totalSavedPortions} platos`;
    if (statCO2) statCO2.textContent = `${totalCO2} kg`;

    const activeOffersContainer = document.getElementById('merchant-active-offers');
    if (activeOffersContainer) {
      let rescueItems = [];
      currentRest.menu.forEach(c => {
        c.items.forEach(it => {
          if (it.type === 'rescue') rescueItems.push(it);
        });
      });

      activeOffersContainer.innerHTML = rescueItems.map(o => `
        <div class="bg-white p-3.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
          <div>
            <span class="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">Rescate Flash</span>
            <h5 class="font-bold text-slate-800 text-sm mt-0.5">${o.title}</h5>
            <div class="text-slate-500 flex items-center gap-2 mt-1">
              <span>Stock: <strong>${o.stock} porciones</strong></span>
              <span>•</span>
              <span class="text-emerald-700 font-bold">${this.formatCurrency(o.discountedPrice)}</span>
              <span class="line-through text-slate-400">${this.formatCurrency(o.originalPrice)}</span>
            </div>
          </div>
          <button onclick="AppState.adjustStock('${currentRest.id}', '${o.id}', 1)" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold">
            +1 Porción
          </button>
        </div>
      `).join('');
    }
  },

  adjustStock(restId, offerId, delta) {
    const rest = this.restaurants.find(r => r.id === restId);
    if (!rest) return;

    let targetItem = null;
    rest.menu.forEach(c => {
      const it = c.items.find(i => i.id === offerId);
      if (it) targetItem = it;
    });

    if (!targetItem) return;
    targetItem.stock = Math.max(0, targetItem.stock + delta);
    this.saveRestaurants();
    this.render();
    this.showToast(`Stock de ${rest.name} actualizado: ${targetItem.stock} porciones`);
  },

  validateVoucherPIN(inputPIN, fromModal = false) {
    if (!inputPIN) {
      this.showToast('Por favor introduce un PIN de 4 dígitos', 'error');
      return;
    }

    const voucherIndex = this.vouchers.findIndex(v => v.pin === inputPIN);

    if (voucherIndex === -1) {
      if (window.SoundEngine) SoundEngine.playError();
      this.showValidationResultModal(false, null, 'Código no encontrado en el sistema');
      return;
    }

    const voucher = this.vouchers[voucherIndex];

    if (voucher.status === 'redeemed') {
      if (window.SoundEngine) SoundEngine.playError();
      this.showValidationResultModal(false, voucher, 'Este cupón YA FUE CANJEADO previamente');
      return;
    }

    voucher.status = 'redeemed';
    voucher.redeemedAt = new Date().toISOString();
    this.saveVouchers();

    if (window.SoundEngine) SoundEngine.playSuccess();

    if (fromModal) {
      this.closeTicketModal();
    }

    const pinInput = document.getElementById('validator-pin-input');
    if (pinInput) pinInput.value = '';

    this.showValidationResultModal(true, voucher, '¡Código Verificado con Éxito!');
    this.render();
  },

  showValidationResultModal(success, voucher, message) {
    const modal = document.getElementById('validation-result-modal');
    const content = document.getElementById('validation-result-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="p-6 text-center space-y-3">
        <div class="w-16 h-16 rounded-full mx-auto flex items-center justify-center ${success ? 'bg-emerald-100 text-emerald-600 animate-bounce' : 'bg-red-100 text-red-600'}">
          <i data-lucide="${success ? 'check-circle' : 'alert-triangle'}" class="w-10 h-10"></i>
        </div>

        <h3 class="font-black text-lg ${success ? 'text-emerald-800' : 'text-red-800'}">
          ${message}
        </h3>

        ${voucher ? `
          <div class="bg-slate-50 p-3.5 rounded-xl text-xs text-left border border-slate-100 space-y-1">
            <div class="font-bold text-slate-800">${voucher.offerTitle}</div>
            <div class="text-slate-500">${voucher.restaurantName}</div>
            <div class="flex justify-between pt-1 border-t border-slate-200">
              <span class="text-slate-600 font-medium">Cobrar en caja al cliente:</span>
              <span class="text-emerald-700 font-black text-sm">${this.formatCurrency(voucher.discountedPrice)}</span>
            </div>
          </div>
        ` : ''}

        <button 
          onclick="document.getElementById('validation-result-modal').classList.add('hidden')"
          class="w-full py-2.5 rounded-xl ${success ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-800 hover:bg-slate-900'} text-white font-bold text-xs shadow-md transition">
          Aceptar
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  handleCreateOffer(formData) {
    const title = formData.get('title');
    const origPrice = parseFloat(formData.get('originalPrice'));
    const discPrice = parseFloat(formData.get('discountedPrice'));
    const stock = parseInt(formData.get('stock')) || 1;
    const windowPickup = formData.get('pickupWindow') || 'Hoy última hora';

    if (!title || !origPrice || !discPrice) {
      this.showToast('Por favor completa todos los campos', 'error');
      return;
    }

    const discountPercent = Math.round(((origPrice - discPrice) / origPrice) * 100);

    const currentRest = this.restaurants.find(r => r.id === this.currentRestaurantId);
    if (!currentRest) return;

    const newOffer = {
      id: 'off-' + Date.now(),
      title: title,
      type: 'rescue',
      shift: 'night',
      description: `Excedente del día en perfecto estado listo para recoger. ¡Salva este alimento!`,
      originalPrice: origPrice,
      discountedPrice: discPrice,
      discountPercent: discountPercent,
      stock: stock,
      pickupWindow: windowPickup,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80"
    };

    if (currentRest.menu[0]) {
      currentRest.menu[0].items.unshift(newOffer);
    }
    this.saveRestaurants();

    const form = document.getElementById('create-offer-form');
    if (form) form.reset();

    if (window.SoundEngine) SoundEngine.playSuccess();
    this.showToast('¡Oferta Flash publicada con éxito en la plataforma!');
    this.render();
  },

  // 8. BITÁCORA Y CRM DE PROSPECCIÓN (MI RUTA DE RESTAURANTES)
  renderCRMView() {
    const container = document.getElementById('crm-restaurants-list');
    if (!container) return;

    const totalCount = this.restaurants.length;
    const acceptedCount = this.restaurants.filter(r => r.crmStatus === 'accepted').length;
    const pitchCount = this.restaurants.filter(r => r.crmStatus === 'pitch').length;
    const pendingCount = this.restaurants.filter(r => r.crmStatus === 'pending').length;

    const elTotal = document.getElementById('crm-stat-total');
    const elAccepted = document.getElementById('crm-stat-accepted');
    const elPitch = document.getElementById('crm-stat-pitch');
    const elPending = document.getElementById('crm-stat-pending');

    if (elTotal) elTotal.textContent = totalCount;
    if (elAccepted) elAccepted.textContent = acceptedCount;
    if (elPitch) elPitch.textContent = pitchCount;
    if (elPending) elPending.textContent = pendingCount;

    container.innerHTML = this.restaurants.map(r => {
      const badgeConfig = {
        accepted: { label: '✅ Aceptó Piloto', class: 'crm-badge-accepted' },
        pitch: { label: '📋 Propuesta Presentada', class: 'crm-badge-pitch' },
        pending: { label: '⏳ Pendiente de Visita', class: 'crm-badge-pending' },
        rejected: { label: '❌ Rechazó', class: 'crm-badge-rejected' }
      }[r.crmStatus || 'pending'];

      return `
        <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img src="${r.coverImage}" class="w-full h-full object-cover">
              </div>
              <div>
                <h4 class="font-black text-slate-800 text-sm leading-tight">${r.name}</h4>
                <span class="text-[11px] text-slate-500">${r.address}</span>
              </div>
            </div>

            <select 
              onchange="AppState.updateRestaurantCRMStatus('${r.id}', this.value)"
              class="text-xs font-bold px-2.5 py-1 rounded-xl border cursor-pointer focus:ring-2 focus:ring-emerald-500 ${badgeConfig.class}">
              <option value="pending" ${r.crmStatus === 'pending' ? 'selected' : ''}>⏳ Pendiente</option>
              <option value="pitch" ${r.crmStatus === 'pitch' ? 'selected' : ''}>📋 Presentado</option>
              <option value="accepted" ${r.crmStatus === 'accepted' ? 'selected' : ''}>✅ Aceptó Piloto</option>
              <option value="rejected" ${r.crmStatus === 'rejected' ? 'selected' : ''}>❌ Rechazó</option>
            </select>
          </div>

          <div class="bg-slate-50 p-3 rounded-xl space-y-2 text-xs">
            <div class="flex items-center justify-between text-slate-600">
              <span class="flex items-center gap-1 font-semibold">
                <i data-lucide="user-check" class="w-3.5 h-3.5 text-emerald-600"></i>
                <span>${r.contactName || 'Sin contacto registrado'}</span>
              </span>
              <a href="tel:${r.contactPhone || ''}" class="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                <i data-lucide="phone" class="w-3.5 h-3.5"></i>
                <span>${r.contactPhone || 'Llamar'}</span>
              </a>
            </div>

            <div class="pt-1 border-t border-slate-200">
              <span class="text-[10px] font-bold text-slate-400 block mb-0.5">Notas de la visita:</span>
              <p class="text-slate-700 text-xs italic bg-white p-2 rounded-lg border border-slate-100">
                "${r.meetingNotes || 'Aún no visitado.'}"
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs pt-1">
            <button 
              onclick="AppState.openRestaurantStore('${r.id}')"
              class="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
              <i data-lucide="utensils" class="w-3.5 h-3.5"></i>
              <span>Ver Carta Completa</span>
            </button>

            <button 
              onclick="AppState.currentRestaurantId = '${r.id}'; AppState.setMode('merchant')"
              class="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[11px] font-bold flex items-center gap-1">
              <span>Abrir como Dueño</span>
              <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  updateRestaurantCRMStatus(restId, newStatus) {
    const rest = this.restaurants.find(r => r.id === restId);
    if (!rest) return;

    rest.crmStatus = newStatus;
    this.saveRestaurants();
    this.render();

    const statusNames = {
      accepted: '¡Marcado como ACEPTÓ PILOTO! 🎉',
      pitch: 'Marcado como Propuesta Presentada 📋',
      pending: 'Marcado como Pendiente ⏳',
      rejected: 'Marcado como Rechazó ❌'
    };
    this.showToast(`${rest.name}: ${statusNames[newStatus] || 'Actualizado'}`);
  },

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 transition-all duration-300 ${type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-600 text-white'}`;
    toast.innerHTML = `
      <i data-lucide="${type === 'success' ? 'check' : 'alert-circle'}" class="w-4 h-4 text-emerald-400"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AppState.init();
});
