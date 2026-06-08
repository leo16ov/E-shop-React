
// ─── DATA ────────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: 1, name: "Abrigo Camel Premium", price: 129.99, category: "invierno", badge: "Nuevo", stock: 8,
    description: "Abrigo de corte recto confeccionado en lana premium con acabado camel. Ideal para los días más fríos del invierno porteño. Forro interior de seda que brinda calor sin volumen extra. Cierre a presión oculto y bolsillos laterales.",
    sizes: ["XS","S","M","L","XL"],
    colors: ["#c9a96e","#2d2d2d","#f5f2ec"],
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80","https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80","https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80","https://images.unsplash.com/photo-1594938298603-c8148c4b4eca?w=800&q=80",
    ],
  },
  {
    id: 2, name: "Sweater Tejido Merino", price: 74.99, category: "invierno", stock: 15,
    description: "Sweater de lana merino extrafina con tejido acanalado. Suave al tacto y con excelente regulación térmica. Cuello redondo y manga larga. Lavable a máquina en ciclo delicado.",
    sizes: ["S","M","L","XL"],
    colors: ["#c9b99a","#8b7355","#1a1814"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80","https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80","https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?w=800&q=80",
    ],
  },
  {
    id: 3, name: "Vestido Floral Verano", price: 59.99, category: "verano", badge: "Tendencia", stock: 5,
    description: "Vestido midi con estampado floral multicolor sobre fondo blanco. Tela liviana de viscosa que fluye con el movimiento. Escote en V, mangas cortas y cintura elástica. Perfecto para un día de calor en la ciudad o en la playa.",
    sizes: ["XS","S","M","L"],
    colors: ["#ffffff","#f5c4c4","#c9e8c4"],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80","https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80","https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    ],
  },
  {
    id: 4, name: "Crop Top Lino Blanco", price: 34.99, category: "verano", stock: 20,
    description: "Crop top confeccionado en lino 100% natural. Corte recto, tirantes finos y largo que llega a la cintura. Transpirable y fresco para los días más calurosos. Se lava a mano o en programa suave.",
    sizes: ["XS","S","M","L"],
    colors: ["#ffffff","#e8e4dc","#c9b99a"],
    images: [
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=800&q=80","https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80","https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80",
    ],
  },
  {
    id: 5, name: "Blazer Oversize Mujer", price: 99.99, category: "dama", badge: "Top ventas", stock: 3,
    description: "Blazer oversize de corte masculino adaptado a la silueta femenina. Confeccionado en gabardina de algodón con forrado interior. Un solo botón al frente, solapas anchas y bolsillos con tapa. Versátil para looks formales e informales.",
    sizes: ["XS","S","M","L","XL"],
    colors: ["#2d2d2d","#c9b99a","#f5f2ec"],
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80","https://images.unsplash.com/photo-1594938298603-c8148c4b4eca?w=800&q=80","https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80",
    ],
  },
  {
    id: 6, name: "Falda Midi Plisada", price: 54.99, category: "dama", stock: 12,
    description: "Falda midi con plisado fino a lo largo de toda la pieza. Tela satinada con leve brillo que aporta elegancia. Cintura elástica para mayor comodidad. Largo por debajo de la rodilla, ideal para la oficina o una salida especial.",
    sizes: ["XS","S","M","L"],
    colors: ["#c9b99a","#8b7355","#2d2d2d","#e8e4dc"],
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80","https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&q=80","https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    ],
  },
  {
    id: 7, name: "Campera Cuero Hombre", price: 149.99, category: "hombre", badge: "Nuevo", stock: 6,
    description: "Campera de cuero genuino con forro interior de algodón. Cierre central de metal, puños con hebilla regulable y cuello mao. El clásico que nunca pasa de moda, con un acabado que mejora con el uso y el tiempo.",
    sizes: ["S","M","L","XL","XXL"],
    colors: ["#2d2d2d","#4a3728","#1a1814"],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80","https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80","https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    ],
  },
  {
    id: 8, name: "Jeans Slim Fit Oscuro", price: 69.99, category: "hombre", stock: 18,
    description: "Jean de corte slim fit en denim oscuro de 12 oz. Elasticidad bidireccional para mayor comodidad de movimiento. Cinco bolsillos clásicos y tiro medio. Compatible con cualquier estilo, desde casual hasta semi-formal.",
    sizes: ["28","30","32","34","36","38"],
    colors: ["#1a1814","#2d4a6b","#4a3728"],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80","https://images.unsplash.com/photo-1604176424472-17cd740f77e8?w=800&q=80","https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80",
    ],
  },
  {
    id: 9, name: "Parka Impermeable", price: 119.99, category: "invierno", stock: 9,
    description: "Parka impermeable con sellado de costuras y membrana exterior resistente al agua. Capucha desmontable con regulador, bolsillos con cierre y tiras reflectantes en las mangas. Relleno de plumón sintético de alta densidad.",
    sizes: ["S","M","L","XL","XXL"],
    colors: ["#2d4a6b","#1a1814","#4a6b2d"],
    images: [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80","https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80","https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    ],
  },
  {
    id: 10, name: "Shorts Lino Beige", price: 39.99, category: "verano", stock: 25,
    description: "Short de lino beige con elástico en la cintura y cordón regulable. Dos bolsillos laterales con solapa. Largo a media pierna, corte relajado. Fresco, cómodo y perfecto para la playa o el brunch del fin de semana.",
    sizes: ["XS","S","M","L","XL"],
    colors: ["#c9b99a","#e8e4dc","#8b7355"],
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80","https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80","https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=800&q=80",
    ],
  },
  {
    id: 11, name: "Blusa Satinada Dama", price: 49.99, category: "dama", badge: "Oferta", stock: 4,
    description: "Blusa de satén con efecto seda. Escote cuadrado, mangas abullonadas y largo que cae sobre la cadera. Cierre trasero con botones forrados. Ideal para combinarse con jeans o una falda de noche.",
    sizes: ["XS","S","M","L"],
    colors: ["#f5f2ec","#c9b99a","#2d4a6b","#4a3728"],
    images: [
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80","https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80","https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80",
    ],
  },
  {
    id: 12, name: "Camisa Oxford Hombre", price: 59.99, category: "hombre", stock: 14,
    description: "Camisa de tela Oxford 100% algodón peinado. Corte regular fit con cuello button-down. Puños dobles con botones de nácar. Lavado a máquina sin preocupaciones. Un básico que nunca falla para la oficina o una salida.",
    sizes: ["S","M","L","XL","XXL"],
    colors: ["#ffffff","#c9b99a","#2d4a6b","#1a1814"],
    images: ["https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80","https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80","https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
  },
];
 

export const CATEGORIES = [
  { key: "todos", label: "Todos" },
  { key: "invierno", label: "❄ Invierno" },
  { key: "verano", label: "☀ Verano" },
  { key: "dama", label: "♀ Dama" },
  { key: "hombre", label: "♂ Hombre" },
];