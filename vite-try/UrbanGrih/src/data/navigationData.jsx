import design1 from "../assets/design1.jpg";
import design2 from "../assets/design2.jpg";
import design3 from "../assets/design3.jpg";
import design4 from "../assets/design4.jpg";
import design5 from "../assets/design5.jpg";
import flatdesign1 from "../assets/flatdesign1.jpg";




export const NAV_DATA = {
    design: {
        label: "Design",
        dropdownLayout: "two-column",
        grouped: true,
        subcategories: {
            architecture: {
                heading: "Architect Design",
                items: [
                    { key: "arch-1", label: "Architecture 1" },
                    { key: "arch-2", label: "Architecture 2" },
                    { key: "arch-3", label: "Architecture 3" },
                ],
            },
            interior: {
                heading: "Interior Design",
                items: [
                    { key: "int-1", label: "Interior 1" },
                    { key: "int-2", label: "Interior 2" },
                    { key: "int-3", label: "Interior 3" },
                ],
            },
        },
    },

    materials: {
        label: "materials",
        grouped: false,
        subcategories: {
            furniture: { label: "Furniture" },
            lighting: { label: "Lighting" },
            tiles: { label: "Tiles & Flooring" },
            paint: { label: "Paint & Decor" },
            hardware: { label: "Hardware" },
            modularKitchen: { label: "Modular Kitchen" },
        },
    },

    experts: {
        label: "experts",
        grouped: false,
        subcategories: {
            architects: { label: "Architects" },
            contractors: { label: "Contractors" },
            vastu: { label: "Vastu Consultants" },
            interiorDesigners: { label: "Interior Designers" },
        },
    },
};

export const NAV_CATEGORIES = {
    design: {
        architecture:[
            { key: "arch-1", options: [
                { key: "arch-1a", label: "Architecture 1A", img: design1 },
                { key: "arch-1b", label: "Architecture 1B", img: design2 }, 
                { key: "arch-1c", label: "Architecture 1C", img: design3 },
                { key: "arch-1d", label: "Architecture 1D", img: design4 },
                { key: "arch-1e", label: "Architecture 1E", img: design5 },
                { key: "arch-1f", label: "Architecture 1F", img: flatdesign1 },
            ] },
            { key: "arch-2", options: [
                { key: "arch-2a", label: "Architecture 2A", img: design1 },
                { key: "arch-2b", label: "Architecture 2B", img: design2 },
                { key: "arch-2c", label: "Architecture 2C", img: design3 },
            ] },
            { key: "arch-3", options: [
                { key: "arch-3a", label: "Architecture 3A", img: design1 },
                { key: "arch-3b", label: "Architecture 3B", img: design2 },
                { key: "arch-3c", label: "Architecture 3C", img: design3 },
            ]},
        ], 
        interior:[
            { key: "int-1", options: [
                { key: "int-1a", label: "Interior 1A", img: design1 },
                { key: "int-1b", label: "Interior 1B", img: design2 },
                { key: "int-1c", label: "Interior 1C", img: design3 },
            ] },
            { key: "int-2", options: [
                { key: "int-2a", label: "Interior 2A", img: design1 },
                { key: "int-2b", label: "Interior 2B", img: design2 },
                { key: "int-2c", label: "Interior 2C", img: design3 },
            ] },
            { key: "int-3", options: [
                { key: "int-3a", label: "Interior 3A", img: design1 },
                { key: "int-3b", label: "Interior 3B", img: design2 },
                { key: "int-3c", label: "Interior 3C", img: design3 },
            ] },
        ]
    },
    experts : {
        architects: [
            { key: "arch-1", label: "Architect 1", img: design1 },
            { key: "arch-2", label: "Architect 2", img: design2 },
            { key: "arch-3", label: "Architect 3", img: design3 },
        ],
        contractors: [
            { key: "cont-1", label: "Contractor 1", img: design1 },
            { key: "cont-2", label: "Contractor 2", img: design2 },
            { key: "cont-3", label: "Contractor 3", img: design3 },
        ],
        vastu: [
            { key: "vastu-1", label: "Vastu Consultant 1", img: design1 },
            { key: "vastu-2", label: "Vastu Consultant 2", img: design2 },
            { key: "vastu-3", label: "Vastu Consultant 3", img: design3 },
        ],
        interiorDesigners: [
            { key: "intdes-1", label: "Interior Designer 1", img: design1 },
            { key: "intdes-2", label: "Interior Designer 2", img: design2 },
            { key: "intdes-3", label: "Interior Designer 3", img: design3 },
        ],
    }, 
    materials: {
        furniture: [
            { key: "furn-1", label: "Furniture 1", img: design1 },
            { key: "furn-2", label: "Furniture 2", img: design2 },
            { key: "furn-3", label: "Furniture 3", img: design3 },
        ],
        lighting: [
            { key: "light-1", label: "Lighting 1", img: design1 },
            { key: "light-2", label: "Lighting 2", img: design2 },
            { key: "light-3", label: "Lighting 3", img: design3 },
        ],
        tiles: [
            { key: "tile-1", label: "Tiles & Flooring 1", img: design1 },
            { key: "tile-2", label: "Tiles & Flooring 2", img: design2 },
            { key: "tile-3", label: "Tiles & Flooring 3", img: design3 },
        ],
        paint: [
            { key: "paint-1", label: "Paint & Decor 1", img: design1 },
            { key: "paint-2", label: "Paint & Decor 2", img: design2 },
            { key: "paint-3", label: "Paint & Decor 3", img: design3 },
        ],
        hardware: [
            { key: "hard-1", label: "Hardware 1", img: design1 },
            { key: "hard-2", label: "Hardware 2", img: design2 },
            { key: "hard-3", label: "Hardware 3", img: design3 },
        ],
        modularKitchen: [
            { key: "modkit-1", label: "Modular Kitchen 1", img: design1 },
            { key: "modkit-2", label: "Modular Kitchen 2", img: design2 },
            { key: "modkit-3", label: "Modular Kitchen 3", img: design3 },
        ],
    }
}
