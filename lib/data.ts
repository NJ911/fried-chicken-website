export const MENU_ITEMS = [
    // --- Fried Chicken ---
    {
        id: "16",
        name: "Golden Crispy Chicken",
        description: "Juicy chicken with golden brown, crunchy skin. Choose your portion size.",
        price: 8.99, // Base price for smallest portion or single unit display
        category: "Fried Chicken",
        image: "/menu/golden_drumstick_thigh.png",
        popular: true,
        pricingTiers: {
            2: 8.99,
            4: 16.99,
            6: 24.99,
            8: 32.99,
            12: 46.99,
            24: 89.99
        }
    },
    {
        id: "17",
        name: "Original Pepper Taste Fried Chicken",
        description: "Crispy fried chicken seasoned with our signature black pepper blend.",
        price: 8.99,
        category: "Fried Chicken",
        image: "/menu/pepper_drumstick_thigh.png",
        pricingTiers: {
            2: 8.99,
            4: 16.99,
            6: 24.99,
            8: 32.99,
            12: 46.99,
            24: 89.99
        }
    },
    {
        id: "15",
        name: "3 PCs New Orlean Roasted Wings",
        description: "Glazed roasted chicken wings with a savory BBQ finish.",
        price: 6.99,
        category: "Fried Chicken",
        image: "/menu/roasted_wings.png",
    },

    // --- Sandwiches ---
    {
        id: "2",
        name: "Spicy Chicken Sandwich",
        description: "Brioche bun, spicy mayo, pickles, and our signature hot spice blend.",
        price: 12.99,
        category: "Sandwiches",
        image: "/sandwich.png",
        popular: true,
    },
    {
        id: "12",
        name: "Original Chicken Sandwich",
        description: "Crispy chicken patty with lettuce and mayo on a puffy bun.",
        price: 11.99,
        category: "Sandwiches",
        image: "/menu/fried_chicken_burger.png",
    },
    {
        id: "14",
        name: "New orlean roasted chicken burger",
        description: "Roasted chicken patty with Cajun spices, lettuce, and tomato on a brioche bun.",
        price: 11.99,
        category: "Sandwiches",
        image: "/menu/roasted_chicken_burger.png",
    },

    // --- Wraps ---
    {
        id: "11",
        name: "Beijing Fried Chicken Wrap",
        description: "Crispy chicken, cucumber, scallions, and hoisin sauce in a soft wrap.",
        price: 11.99,
        category: "Wraps",
        image: "/menu/beijing_wrap.png",
    },
    {
        id: "13",
        name: "Mexico Chicken Wrap",
        description: "Grilled chicken, salsa, corn, beans, and spicy seasoning in a tortilla.",
        price: 11.99,
        category: "Wraps",
        image: "/menu/mexico_chicken_wrap.png",
    },

    // --- Sides ---
    {
        id: "3",
        name: "Golden Tenders (5pc)",
        description: "Hand-breaded tenders served with your choice of 2 dipping sauces.",
        price: 14.99,
        category: "Sides",
        image: "/tenders.png",
        popular: true,
    },
    {
        id: "18",
        name: "Popcorn Chicken",
        description: "Bite-sized golden crispy fried chicken pieces.",
        price: 8.99,
        category: "Sides",
        image: "/menu/popcorn_chicken.png",
    },
    {
        id: "19",
        name: "Egg&Veggie Soup",
        description: "Comforting soup with egg drops, corn, and peas.",
        price: 4.49,
        category: "Sides",
        image: "/menu/egg_veggie_soup.png",
    },
    {
        id: "20",
        name: "Fries",
        description: "Classic crispy golden french fries.",
        price: 4.99,
        category: "Sides",
        image: "/menu/fries.png",
    },
    {
        id: "23",
        name: "Waffle Fries",
        description: "Crispy golden waffle-cut potatoes.",
        price: 6.99,
        category: "Sides",
        image: "/menu/waffle_fries.png",
    },

    // --- Dessert ---
    {
        id: "21",
        name: "Pineapple Pie",
        description: "Crispy pie with warm, sweet pineapple filling.",
        price: 5.49,
        category: "Dessert",
        image: "/menu/pineapple_pie.png",
    },
    {
        id: "22",
        name: "Taro Pie",
        description: "Crispy pie with sweet and creamy taro filling.",
        price: 5.49,
        category: "Dessert",
        image: "/menu/taro_pie.png",
    },

    // --- Drinks ---
    {
        id: "24",
        name: "Coconut milky Juice",
        description: "Refreshing white coconut drink with coconut slices.",
        price: 3.49,
        category: "Drinks",
        image: "/menu/coconut_milky_juice.png",
    },
    {
        id: "25",
        name: "Coke",
        description: "Ice-cold classic Coca-Cola.",
        price: 2.59,
        category: "Drinks",
        image: "/menu/coke.png",
    },
    {
        id: "26",
        name: "Green Tea",
        description: "Refreshing iced green tea.",
        price: 3.69,
        category: "Drinks",
        image: "/menu/green_tea.png",
    },
    {
        id: "27",
        name: "Lemon Ice Tea",
        description: "Amber lemon iced tea, perfect for a sunny day.",
        price: 3.69,
        category: "Drinks",
        image: "/menu/lemon_ice_tea.png",
    },
    {
        id: "28",
        name: "Peach Soda",
        description: "Sparkling peach soda with ice.",
        price: 3.69,
        category: "Drinks",
    },
    {
        id: "29",
        name: "Sprite",
        description: "Lemon-lime flavored soft drink.",
        price: 2.59,
        category: "Drinks",
    },
    {
        id: "30",
        name: "加多宝",
        description: "Traditional Chinese herbal tea (Jia Duo Bao).",
        price: 3.49,
        category: "Drinks",
    },
    {
        id: "31",
        name: "康师傅茉莉蜜茶",
        description: "Master Kang Jasmine Honey Tea.",
        price: 3.69,
        category: "Drinks",
    },
];

export const CATEGORIES = ["All", "Fried Chicken", "Sandwiches", "Wraps", "Sides", "Dessert", "Drinks"];
