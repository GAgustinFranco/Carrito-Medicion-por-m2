export const productsSeed = [
    {
        name: "Piso Flotante Carvalho Coimbra 7mm",
        basePrice: 1500,
        unit: "m2",
        isVariable: false,
        packArea: 2.44, 
        images: [
            "/assets/PisoFlotante7mmCarvalhoCoimbraxm2.jpg"
        ],
        variations: []
    },
    {
        name: "Cielorraso Gemini 200x7 PVC",
        basePrice: 1200,
        unit: "m2",
        isVariable: true,
        packArea: 2.00, 
        images: [
            "/assets/CielorrasodePVCGemini(200x7mm)xm2.webp",
        ],
        variations: [
            { attribute: "Color Blanco", priceModifier: 0 },
            { attribute: "Color Beige", priceModifier: 50 }
        ]
    },
    {
        name: "Piso Laminado Frigg Floor 8mm",
        basePrice: 2000,
        unit: "m2",
        isVariable: true,
        packArea: 2.44, 
        images: [
            "/assets/PisoLaminadoFriggFloor8mm.webp"
        ],
        variations: [
            { attribute: "Roble Aconcagua", priceModifier: 100 },
            { attribute: "Roble Patagonia", priceModifier: 120 }
        ]
    },
    {
        name: "Mont Blanc Lux Ultra 100x100",
        basePrice: 2500,
        unit: "m2",
        isVariable: false,
        packArea: 2.00, 
        images: [
            "/assets/MontBlancLuxUltra100x100.jpg",
        ],
        variations: []
    },
    {
        name: "Rodapié MDF 10cm Blanco",
        basePrice: 250,
        unit: "m",
        isVariable: false,
        packArea: 2.40, 
        images: [
            "/assets/RodapieMDF10cmBlanco.jpg",
        ],
        variations: []
    },
    {
        name: "Pintura Pared Interior 4L",
        basePrice: 3000,
        unit: "unit",
        isVariable: true,
        packArea: undefined, 
        images: [
            "/assets/PinturaParedInterior4L.jpg"
        ],
        variations: [
            { attribute: "Blanco", priceModifier: 0 },
            { attribute: "Gris", priceModifier: 150 }
        ]
    },
    {
        name: "Cielorraso PVC Premium 200x7",
        basePrice: 1400,
        unit: "m2",
        isVariable: true,
        packArea: 2.00, 
        images: [
            "/assets/CielorrasodePVCGemini(200x7mm)xm2.webp"
        ],
        variations: [
            { attribute: "Blanco Mate", priceModifier: 0 },
            { attribute: "Blanco Brillante", priceModifier: 80 }
        ]
    },
    {
        name: "Piso Vinílico Click 5mm",
        basePrice: 1800,
        unit: "m2",
        isVariable: false,
        packArea: 2.44, 
        images: [
            "/assets/PisoVinilicoClick5mm.jpg"
        ],
        variations: []
    },
    {
        name: "Puerta Interior Madera 80x210",
        basePrice: 5000,
        unit: "unit",
        isVariable: true,
        packArea: undefined, 
        images: [
            "/assets/PuertaInteriorMadera80x210.jpg"
        ],
        variations: [
            { attribute: "Roble", priceModifier: 0 },
            { attribute: "Cedro", priceModifier: 300 }
        ]
    },
    {
        name: "Zócalo MDF 8cm Roble",
        basePrice: 220,
        unit: "m",
        isVariable: false,
        packArea: 2.40, 
        images: [
            "/assets/ZocaloMDF8cmRoble.png"
        ],
        variations: []
    },
    {
        name: "Piso Cerámico 60x60",
        basePrice: 2200,
        unit: "m2",
        isVariable: true,
        packArea: 2.16, 
        images: [
            "/assets/PisoCeramico60x60.jpg"
        ],
        variations: [
            { attribute: "Gris Claro", priceModifier: 0 },
            { attribute: "Negro Mate", priceModifier: 100 }
        ]
    },
    {
        name: "Perfil Aluminio 3m",
        basePrice: 350,
        unit: "m",
        isVariable: false,
        packArea: 3.00, 
        images: [
            "/assets/PerfilAluminio3m.jpg"
        ],
        variations: []
    },
    {
        name: "Adhesivo Cerámico 25kg",
        basePrice: 1500,
        unit: "unit",
        isVariable: false,
        packArea: undefined,
        images: [
            "/assets/AdhesivoCeramico25kg.jpg"
        ],
        variations: []
    },
    {
        name: "Revestimiento PVC Texturado",
        basePrice: 1700,
        unit: "m2",
        isVariable: true,
        packArea: 2.00,
        images: [
            "/assets/RevestimientoPVCTexturado.jpg"
        ],
        variations: [
            { attribute: "Textura Madera", priceModifier: 0 },
            { attribute: "Textura Piedra", priceModifier: 70 }
        ]
    }
];