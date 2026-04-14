const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const mongoose = require("mongoose");
const Product = require("../models/product/product.mongo");
const Register = require("../models/user/register.mongo");

// Product data organized by category
const productData = {
  Electronics: [
    // Phones & Accessories (20 products)
    {
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      basePrice: 1199,
      stock: [15, 25],
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      basePrice: 1099,
      stock: [20, 30],
    },
    {
      name: "Google Pixel 8 Pro",
      brand: "Google",
      basePrice: 899,
      stock: [10, 20],
    },
    { name: "OnePlus 12", brand: "OnePlus", basePrice: 799, stock: [15, 25] },
    { name: "Xiaomi 14 Pro", brand: "Xiaomi", basePrice: 699, stock: [20, 35] },
    { name: "iPhone 14", brand: "Apple", basePrice: 799, stock: [25, 40] },
    {
      name: "Samsung Galaxy A54",
      brand: "Samsung",
      basePrice: 449,
      stock: [30, 50],
    },
    {
      name: "Google Pixel 7a",
      brand: "Google",
      basePrice: 499,
      stock: [20, 35],
    },
    {
      name: "Wireless Charging Pad",
      brand: "Belkin",
      basePrice: 29.99,
      stock: [50, 100],
    },
    {
      name: "Phone Case Clear",
      brand: "Spigen",
      basePrice: 14.99,
      stock: [100, 200],
    },
    {
      name: "Screen Protector Tempered Glass",
      brand: "amFilm",
      basePrice: 9.99,
      stock: [150, 250],
    },
    {
      name: "USB-C Cable 6ft",
      brand: "Anker",
      basePrice: 12.99,
      stock: [80, 150],
    },
    {
      name: "Car Phone Mount",
      brand: "iOttie",
      basePrice: 24.99,
      stock: [40, 80],
    },
    {
      name: "PopSocket Phone Grip",
      brand: "PopSockets",
      basePrice: 9.99,
      stock: [100, 200],
    },
    {
      name: "Portable Charger 20000mAh",
      brand: "Anker",
      basePrice: 45.99,
      stock: [30, 60],
    },
    {
      name: "Lightning Cable 6ft",
      brand: "Apple",
      basePrice: 19.99,
      stock: [60, 120],
    },
    {
      name: "Phone Ring Holder",
      brand: "IRING",
      basePrice: 7.99,
      stock: [80, 150],
    },
    {
      name: "Bluetooth Selfie Stick",
      brand: "Mpow",
      basePrice: 15.99,
      stock: [40, 80],
    },
    {
      name: "Waterproof Phone Pouch",
      brand: "JOTO",
      basePrice: 8.99,
      stock: [60, 120],
    },
    {
      name: "Fast Wireless Charger",
      brand: "Samsung",
      basePrice: 34.99,
      stock: [35, 70],
    },

    // Laptops & Computers (20 products)
    {
      name: "MacBook Pro 16 inch M3",
      brand: "Apple",
      basePrice: 2499,
      stock: [8, 15],
    },
    {
      name: "MacBook Air M2",
      brand: "Apple",
      basePrice: 1199,
      stock: [15, 25],
    },
    { name: "Dell XPS 15", brand: "Dell", basePrice: 1799, stock: [10, 20] },
    { name: "HP Spectre x360", brand: "HP", basePrice: 1499, stock: [12, 22] },
    {
      name: "Lenovo ThinkPad X1 Carbon",
      brand: "Lenovo",
      basePrice: 1699,
      stock: [15, 25],
    },
    {
      name: "ASUS ROG Gaming Laptop",
      brand: "ASUS",
      basePrice: 1899,
      stock: [8, 15],
    },
    {
      name: "Microsoft Surface Laptop 5",
      brand: "Microsoft",
      basePrice: 1299,
      stock: [12, 20],
    },
    { name: "Acer Aspire 5", brand: "Acer", basePrice: 599, stock: [25, 40] },
    {
      name: "Gaming Mouse RGB",
      brand: "Logitech",
      basePrice: 59.99,
      stock: [40, 80],
    },
    {
      name: "Mechanical Keyboard RGB",
      brand: "Corsair",
      basePrice: 129.99,
      stock: [30, 60],
    },
    {
      name: "Wireless Mouse",
      brand: "Logitech",
      basePrice: 29.99,
      stock: [60, 120],
    },
    {
      name: "Laptop Stand Aluminum",
      brand: "Rain Design",
      basePrice: 49.99,
      stock: [35, 70],
    },
    {
      name: "USB Hub 7-Port",
      brand: "Anker",
      basePrice: 34.99,
      stock: [40, 80],
    },
    {
      name: "Laptop Sleeve 15 inch",
      brand: "tomtoc",
      basePrice: 19.99,
      stock: [50, 100],
    },
    {
      name: "Webcam 1080p",
      brand: "Logitech",
      basePrice: 79.99,
      stock: [25, 50],
    },
    {
      name: "External SSD 1TB",
      brand: "Samsung",
      basePrice: 109.99,
      stock: [30, 60],
    },
    {
      name: "Monitor 27 inch 4K",
      brand: "LG",
      basePrice: 399,
      stock: [15, 30],
    },
    {
      name: "Laptop Cooling Pad",
      brand: "Havit",
      basePrice: 24.99,
      stock: [40, 80],
    },
    {
      name: "Bluetooth Keyboard",
      brand: "Logitech",
      basePrice: 39.99,
      stock: [35, 70],
    },
    {
      name: "Laptop Backpack",
      brand: "SwissGear",
      basePrice: 49.99,
      stock: [45, 90],
    },

    // Audio (15 products)
    {
      name: "AirPods Pro 2nd Gen",
      brand: "Apple",
      basePrice: 249,
      stock: [30, 60],
    },
    {
      name: "Sony WH-1000XM5 Headphones",
      brand: "Sony",
      basePrice: 399,
      stock: [20, 40],
    },
    {
      name: "Bose QuietComfort 45",
      brand: "Bose",
      basePrice: 329,
      stock: [25, 45],
    },
    {
      name: "JBL Flip 6 Speaker",
      brand: "JBL",
      basePrice: 129.99,
      stock: [40, 80],
    },
    {
      name: "Samsung Galaxy Buds Pro",
      brand: "Samsung",
      basePrice: 199,
      stock: [35, 70],
    },
    {
      name: "Beats Studio Buds",
      brand: "Beats",
      basePrice: 149.99,
      stock: [30, 60],
    },
    {
      name: "Anker Soundcore Earbuds",
      brand: "Anker",
      basePrice: 79.99,
      stock: [50, 100],
    },
    {
      name: "Marshall Bluetooth Speaker",
      brand: "Marshall",
      basePrice: 199,
      stock: [20, 40],
    },
    {
      name: "Podcast Microphone USB",
      brand: "Blue Yeti",
      basePrice: 129.99,
      stock: [25, 50],
    },
    {
      name: "Studio Headphones",
      brand: "Audio-Technica",
      basePrice: 149,
      stock: [30, 60],
    },
    {
      name: "Portable Bluetooth Speaker",
      brand: "UE Boom",
      basePrice: 99.99,
      stock: [40, 80],
    },
    {
      name: "Gaming Headset RGB",
      brand: "SteelSeries",
      basePrice: 89.99,
      stock: [35, 70],
    },
    {
      name: "Soundbar for TV",
      brand: "Samsung",
      basePrice: 249,
      stock: [20, 40],
    },
    {
      name: "Wireless Earbuds Sport",
      brand: "Powerbeats",
      basePrice: 149.99,
      stock: [30, 60],
    },
    {
      name: "Karaoke Microphone",
      brand: "Singing Machine",
      basePrice: 39.99,
      stock: [25, 50],
    },

    // Smart Home (10 products)
    {
      name: "Echo Dot 5th Gen",
      brand: "Amazon",
      basePrice: 49.99,
      stock: [60, 120],
    },
    {
      name: "Google Nest Hub",
      brand: "Google",
      basePrice: 99.99,
      stock: [40, 80],
    },
    {
      name: "Smart Thermostat",
      brand: "Nest",
      basePrice: 249,
      stock: [20, 40],
    },
    {
      name: "Smart Light Bulbs 4-Pack",
      brand: "Philips Hue",
      basePrice: 49.99,
      stock: [50, 100],
    },
    {
      name: "Smart Plug 4-Pack",
      brand: "TP-Link",
      basePrice: 24.99,
      stock: [60, 120],
    },
    {
      name: "Video Doorbell",
      brand: "Ring",
      basePrice: 99.99,
      stock: [30, 60],
    },
    {
      name: "Security Camera Indoor",
      brand: "Wyze",
      basePrice: 29.99,
      stock: [50, 100],
    },
    { name: "Smart Lock", brand: "August", basePrice: 149.99, stock: [25, 50] },
    {
      name: "Robot Vacuum",
      brand: "iRobot Roomba",
      basePrice: 299,
      stock: [15, 30],
    },
    {
      name: "Smart LED Strip 16ft",
      brand: "Govee",
      basePrice: 19.99,
      stock: [70, 140],
    },
  ],

  Clothing: [
    // Men's (15 products)
    {
      name: "Men's Cotton T-Shirt Black",
      brand: "Hanes",
      basePrice: 12.99,
      stock: [100, 200],
    },
    {
      name: "Men's Polo Shirt",
      brand: "Lacoste",
      basePrice: 89.99,
      stock: [50, 100],
    },
    {
      name: "Men's Jeans Slim Fit",
      brand: "Levi's",
      basePrice: 59.99,
      stock: [60, 120],
    },
    { name: "Men's Hoodie", brand: "Nike", basePrice: 49.99, stock: [70, 140] },
    {
      name: "Men's Running Shoes",
      brand: "Adidas",
      basePrice: 79.99,
      stock: [50, 100],
    },
    {
      name: "Men's Dress Shirt",
      brand: "Calvin Klein",
      basePrice: 44.99,
      stock: [60, 120],
    },
    {
      name: "Men's Chinos",
      brand: "Dockers",
      basePrice: 39.99,
      stock: [70, 140],
    },
    {
      name: "Men's Winter Jacket",
      brand: "The North Face",
      basePrice: 199,
      stock: [30, 60],
    },
    {
      name: "Men's Sneakers White",
      brand: "Converse",
      basePrice: 59.99,
      stock: [80, 160],
    },
    {
      name: "Men's Belt Leather",
      brand: "Fossil",
      basePrice: 34.99,
      stock: [50, 100],
    },
    {
      name: "Men's Wallet",
      brand: "Tommy Hilfiger",
      basePrice: 29.99,
      stock: [70, 140],
    },
    {
      name: "Men's Watch Analog",
      brand: "Casio",
      basePrice: 49.99,
      stock: [40, 80],
    },
    {
      name: "Men's Socks 6-Pack",
      brand: "Under Armour",
      basePrice: 19.99,
      stock: [100, 200],
    },
    {
      name: "Men's Swim Shorts",
      brand: "Speedo",
      basePrice: 34.99,
      stock: [50, 100],
    },
    {
      name: "Men's Baseball Cap",
      brand: "New Era",
      basePrice: 24.99,
      stock: [80, 160],
    },

    // Women's (15 products)
    {
      name: "Women's Yoga Pants",
      brand: "Lululemon",
      basePrice: 98,
      stock: [60, 120],
    },
    {
      name: "Women's Tank Top",
      brand: "Nike",
      basePrice: 24.99,
      stock: [80, 160],
    },
    {
      name: "Women's Dress Summer",
      brand: "Zara",
      basePrice: 49.99,
      stock: [50, 100],
    },
    {
      name: "Women's Jeans Skinny",
      brand: "Levi's",
      basePrice: 64.99,
      stock: [60, 120],
    },
    {
      name: "Women's Cardigan",
      brand: "H&M",
      basePrice: 34.99,
      stock: [70, 140],
    },
    {
      name: "Women's Running Shoes",
      brand: "Nike",
      basePrice: 89.99,
      stock: [50, 100],
    },
    {
      name: "Women's Handbag",
      brand: "Michael Kors",
      basePrice: 149,
      stock: [30, 60],
    },
    {
      name: "Women's Sunglasses",
      brand: "Ray-Ban",
      basePrice: 159,
      stock: [40, 80],
    },
    {
      name: "Women's Scarf",
      brand: "Burberry",
      basePrice: 249,
      stock: [25, 50],
    },
    {
      name: "Women's Leggings",
      brand: "Athleta",
      basePrice: 54.99,
      stock: [70, 140],
    },
    {
      name: "Women's Blouse",
      brand: "Ann Taylor",
      basePrice: 44.99,
      stock: [60, 120],
    },
    {
      name: "Women's Sneakers",
      brand: "Adidas",
      basePrice: 74.99,
      stock: [60, 120],
    },
    {
      name: "Women's Winter Coat",
      brand: "Canada Goose",
      basePrice: 899,
      stock: [15, 30],
    },
    {
      name: "Women's Ankle Boots",
      brand: "Steve Madden",
      basePrice: 89.99,
      stock: [40, 80],
    },
    {
      name: "Women's Watch",
      brand: "Fossil",
      basePrice: 99.99,
      stock: [35, 70],
    },
  ],

  Books: [
    // Fiction (10 products)
    {
      name: "The Midnight Library",
      brand: "Matt Haig",
      basePrice: 14.99,
      stock: [50, 100],
    },
    {
      name: "Project Hail Mary",
      brand: "Andy Weir",
      basePrice: 16.99,
      stock: [45, 90],
    },
    {
      name: "The Seven Husbands of Evelyn Hugo",
      brand: "Taylor Jenkins Reid",
      basePrice: 13.99,
      stock: [60, 120],
    },
    {
      name: "Where the Crawdads Sing",
      brand: "Delia Owens",
      basePrice: 15.99,
      stock: [55, 110],
    },
    {
      name: "Atomic Habits",
      brand: "James Clear",
      basePrice: 16.99,
      stock: [70, 140],
    },
    {
      name: "Educated",
      brand: "Tara Westover",
      basePrice: 14.99,
      stock: [50, 100],
    },
    {
      name: "The Silent Patient",
      brand: "Alex Michaelides",
      basePrice: 13.99,
      stock: [45, 90],
    },
    { name: "Dune", brand: "Frank Herbert", basePrice: 17.99, stock: [40, 80] },
    {
      name: "1984",
      brand: "George Orwell",
      basePrice: 12.99,
      stock: [80, 160],
    },
    {
      name: "To Kill a Mockingbird",
      brand: "Harper Lee",
      basePrice: 11.99,
      stock: [70, 140],
    },

    // Non-Fiction (10 products)
    {
      name: "Sapiens",
      brand: "Yuval Noah Harari",
      basePrice: 18.99,
      stock: [60, 120],
    },
    {
      name: "Thinking, Fast and Slow",
      brand: "Daniel Kahneman",
      basePrice: 19.99,
      stock: [45, 90],
    },
    {
      name: "The Subtle Art of Not Giving a F*ck",
      brand: "Mark Manson",
      basePrice: 14.99,
      stock: [70, 140],
    },
    {
      name: "Becoming",
      brand: "Michelle Obama",
      basePrice: 16.99,
      stock: [55, 110],
    },
    {
      name: "Can't Hurt Me",
      brand: "David Goggins",
      basePrice: 17.99,
      stock: [50, 100],
    },
    {
      name: "The Body Keeps the Score",
      brand: "Bessel van der Kolk",
      basePrice: 19.99,
      stock: [40, 80],
    },
    {
      name: "The Psychology of Money",
      brand: "Morgan Housel",
      basePrice: 15.99,
      stock: [60, 120],
    },
    {
      name: "How to Win Friends and Influence People",
      brand: "Dale Carnegie",
      basePrice: 12.99,
      stock: [80, 160],
    },
    {
      name: "The Power of Now",
      brand: "Eckhart Tolle",
      basePrice: 13.99,
      stock: [55, 110],
    },
    {
      name: "Man's Search for Meaning",
      brand: "Viktor Frankl",
      basePrice: 11.99,
      stock: [65, 130],
    },
  ],

  Home: [
    // Kitchen (15 products)
    {
      name: "Instant Pot Duo 7-in-1",
      brand: "Instant Pot",
      basePrice: 89.99,
      stock: [30, 60],
    },
    {
      name: "Ninja Blender",
      brand: "Ninja",
      basePrice: 69.99,
      stock: [40, 80],
    },
    {
      name: "KitchenAid Stand Mixer",
      brand: "KitchenAid",
      basePrice: 379,
      stock: [20, 40],
    },
    {
      name: "Keurig Coffee Maker",
      brand: "Keurig",
      basePrice: 129.99,
      stock: [35, 70],
    },
    {
      name: "Air Fryer 5 Quart",
      brand: "Cosori",
      basePrice: 99.99,
      stock: [40, 80],
    },
    {
      name: "Nonstick Cookware Set",
      brand: "T-fal",
      basePrice: 79.99,
      stock: [30, 60],
    },
    {
      name: "Knife Set 15-Piece",
      brand: "Cuisinart",
      basePrice: 49.99,
      stock: [45, 90],
    },
    {
      name: "Cutting Board Set",
      brand: "Gorilla Grip",
      basePrice: 19.99,
      stock: [60, 120],
    },
    {
      name: "Food Storage Containers",
      brand: "Rubbermaid",
      basePrice: 24.99,
      stock: [70, 140],
    },
    {
      name: "Dish Drying Rack",
      brand: "Simplehuman",
      basePrice: 39.99,
      stock: [40, 80],
    },
    {
      name: "Electric Kettle",
      brand: "Cuisinart",
      basePrice: 34.99,
      stock: [50, 100],
    },
    {
      name: "Toaster 4-Slice",
      brand: "Breville",
      basePrice: 99.99,
      stock: [30, 60],
    },
    {
      name: "Measuring Cups Set",
      brand: "OXO",
      basePrice: 14.99,
      stock: [80, 160],
    },
    {
      name: "Mixing Bowls Set",
      brand: "Pyrex",
      basePrice: 29.99,
      stock: [60, 120],
    },
    {
      name: "Can Opener Electric",
      brand: "Hamilton Beach",
      basePrice: 19.99,
      stock: [50, 100],
    },

    // Bedroom (10 products)
    {
      name: "Memory Foam Pillow 2-Pack",
      brand: "Beckham Hotel",
      basePrice: 39.99,
      stock: [60, 120],
    },
    {
      name: "Bed Sheets Queen Set",
      brand: "Mellanni",
      basePrice: 34.99,
      stock: [70, 140],
    },
    {
      name: "Weighted Blanket 15lbs",
      brand: "YnM",
      basePrice: 59.99,
      stock: [40, 80],
    },
    {
      name: "Blackout Curtains 2-Panel",
      brand: "Nicetown",
      basePrice: 29.99,
      stock: [55, 110],
    },
    {
      name: "Alarm Clock Digital",
      brand: "Philips",
      basePrice: 24.99,
      stock: [60, 120],
    },
    {
      name: "Nightstand Lamp",
      brand: "TaoTronics",
      basePrice: 19.99,
      stock: [70, 140],
    },
    {
      name: "Mattress Topper Queen",
      brand: "Lucid",
      basePrice: 79.99,
      stock: [35, 70],
    },
    {
      name: "Clothes Hangers 50-Pack",
      brand: "Zober",
      basePrice: 16.99,
      stock: [80, 160],
    },
    {
      name: "Laundry Basket",
      brand: "Sterilite",
      basePrice: 12.99,
      stock: [90, 180],
    },
    {
      name: "Jewelry Organizer",
      brand: "Umbra",
      basePrice: 29.99,
      stock: [50, 100],
    },
  ],

  Sports: [
    // Fitness (15 products)
    {
      name: "Yoga Mat Extra Thick",
      brand: "Manduka",
      basePrice: 69.99,
      stock: [50, 100],
    },
    {
      name: "Dumbbells Set 20lbs",
      brand: "Bowflex",
      basePrice: 199,
      stock: [25, 50],
    },
    {
      name: "Resistance Bands Set",
      brand: "Fit Simplify",
      basePrice: 12.99,
      stock: [80, 160],
    },
    {
      name: "Adjustable Bench",
      brand: "Bowflex",
      basePrice: 299,
      stock: [15, 30],
    },
    {
      name: "Jump Rope",
      brand: "WOD Nation",
      basePrice: 14.99,
      stock: [70, 140],
    },
    {
      name: "Foam Roller",
      brand: "TriggerPoint",
      basePrice: 29.99,
      stock: [60, 120],
    },
    {
      name: "Exercise Ball 65cm",
      brand: "Trideer",
      basePrice: 19.99,
      stock: [50, 100],
    },
    {
      name: "Pull Up Bar",
      brand: "Perfect Fitness",
      basePrice: 29.99,
      stock: [40, 80],
    },
    {
      name: "Kettlebell 20lbs",
      brand: "AmazonBasics",
      basePrice: 34.99,
      stock: [45, 90],
    },
    {
      name: "Ab Roller Wheel",
      brand: "Perfect Fitness",
      basePrice: 16.99,
      stock: [65, 130],
    },
    {
      name: "Yoga Blocks 2-Pack",
      brand: "Gaiam",
      basePrice: 9.99,
      stock: [80, 160],
    },
    {
      name: "Gym Bag",
      brand: "Under Armour",
      basePrice: 39.99,
      stock: [55, 110],
    },
    {
      name: "Water Bottle 32oz",
      brand: "Hydro Flask",
      basePrice: 34.99,
      stock: [70, 140],
    },
    {
      name: "Workout Gloves",
      brand: "Harbinger",
      basePrice: 19.99,
      stock: [60, 120],
    },
    { name: "Yoga Strap", brand: "Gaiam", basePrice: 7.99, stock: [90, 180] },

    // Outdoor (10 products)
    {
      name: "Camping Tent 4-Person",
      brand: "Coleman",
      basePrice: 129.99,
      stock: [25, 50],
    },
    {
      name: "Sleeping Bag",
      brand: "Teton Sports",
      basePrice: 59.99,
      stock: [40, 80],
    },
    {
      name: "Hiking Backpack 50L",
      brand: "Osprey",
      basePrice: 189,
      stock: [20, 40],
    },
    {
      name: "Camping Stove",
      brand: "Coleman",
      basePrice: 44.99,
      stock: [35, 70],
    },
    {
      name: "Headlamp LED",
      brand: "Petzl",
      basePrice: 29.99,
      stock: [50, 100],
    },
    {
      name: "Trekking Poles Pair",
      brand: "Black Diamond",
      basePrice: 79.99,
      stock: [30, 60],
    },
    {
      name: "Hydration Pack",
      brand: "CamelBak",
      basePrice: 69.99,
      stock: [40, 80],
    },
    {
      name: "Camping Chair Folding",
      brand: "Helinox",
      basePrice: 99.99,
      stock: [35, 70],
    },
    {
      name: "Cooler 48 Quart",
      brand: "Coleman",
      basePrice: 49.99,
      stock: [30, 60],
    },
    {
      name: "Portable Hammock",
      brand: "ENO",
      basePrice: 59.99,
      stock: [45, 90],
    },
  ],

  Other: [
    // Toys & Games (10 products)
    {
      name: "LEGO Star Wars Set",
      brand: "LEGO",
      basePrice: 79.99,
      stock: [40, 80],
    },
    {
      name: "Nintendo Switch Game",
      brand: "Nintendo",
      basePrice: 59.99,
      stock: [50, 100],
    },
    {
      name: "Board Game Catan",
      brand: "Catan Studio",
      basePrice: 44.99,
      stock: [60, 120],
    },
    {
      name: "Puzzle 1000 Pieces",
      brand: "Ravensburger",
      basePrice: 16.99,
      stock: [70, 140],
    },
    {
      name: "Playing Cards Deck",
      brand: "Bicycle",
      basePrice: 4.99,
      stock: [150, 300],
    },
    {
      name: "Remote Control Car",
      brand: "Traxxas",
      basePrice: 199,
      stock: [20, 40],
    },
    {
      name: "Action Figure",
      brand: "Hasbro",
      basePrice: 19.99,
      stock: [80, 160],
    },
    {
      name: "Coloring Book Adults",
      brand: "Johanna Basford",
      basePrice: 9.99,
      stock: [100, 200],
    },
    {
      name: "Chess Set Wooden",
      brand: "Wegiel",
      basePrice: 39.99,
      stock: [35, 70],
    },
    {
      name: "Stuffed Animal Bear",
      brand: "Gund",
      basePrice: 24.99,
      stock: [60, 120],
    },
  ],
};

// Descriptions by category
const descriptions = {
  Electronics: [
    "High-quality electronics with cutting-edge technology",
    "Premium build quality and performance",
    "Perfect for work, entertainment, and everyday use",
    "Latest model with advanced features",
    "Reliable and durable construction",
  ],
  Clothing: [
    "Comfortable and stylish design",
    "Made from premium quality materials",
    "Perfect for everyday wear",
    "Available in multiple colors and sizes",
    "Durable and long-lasting",
  ],
  Books: [
    "Bestselling title with rave reviews",
    "Engaging read from start to finish",
    "Perfect for book lovers",
    "Highly rated by readers worldwide",
    "A must-read for anyone interested in the genre",
  ],
  Home: [
    "Essential for every home",
    "Durable and practical design",
    "Makes everyday tasks easier",
    "High-quality construction",
    "Perfect addition to your home",
  ],
  Sports: [
    "Perfect for fitness enthusiasts",
    "Durable and built to last",
    "Helps you achieve your fitness goals",
    "Professional-grade quality",
    "Comfortable and effective",
  ],
  Other: [
    "Fun and entertaining",
    "Great for all ages",
    "Hours of enjoyment",
    "High-quality construction",
    "Makes a perfect gift",
  ],
};

// Image URLs (placeholder - you can replace with real image URLs)
const getImageUrl = (category, index) => {
  return `https://via.placeholder.com/400x400?text=${encodeURIComponent(category)}+${index}`;
};

// Generate random stock within range
const randomStock = (range) => {
  return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
};

// Get random description
const getDescription = (category) => {
  const descArray = descriptions[category];
  return descArray[Math.floor(Math.random() * descArray.length)];
};

// Generate products
const generateProducts = (adminUserId) => {
  const allProducts = [];
  let imageIndex = 1;

  for (const [category, products] of Object.entries(productData)) {
    products.forEach((product) => {
      allProducts.push({
        name: product.name,
        description: getDescription(category),
        price: product.basePrice,
        category: category,
        stock: randomStock(product.stock),
        brand: product.brand,
        images: [getImageUrl(category, imageIndex)],
        createdBy: adminUserId,
      });
      imageIndex++;
    });
  }

  return allProducts;
};

// Main seeding function
async function seedProducts() {
  try {
    console.log("🌱 Starting product seeding...\n");

    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to database\n");

    // Find admin user
    const adminUser = await Register.findOne({ role: "admin" });

    if (!adminUser) {
      console.error("❌ No admin user found!");
      console.log("   Please create an admin user first using create-admin.js");
      process.exit(1);
    }

    console.log("✓ Found admin user:", adminUser.email, "\n");

    // Check if products already exist
    const existingCount = await Product.countDocuments();

    if (existingCount > 0) {
      console.log(
        `⚠ Warning: ${existingCount} products already exist in database`,
      );
      console.log("   Delete them first? (yes/no)");

      // For automation, automatically delete and continue
      console.log("   Deleting existing products...");
      await Product.deleteMany({});
      console.log("✓ Deleted existing products\n");
    }

    // Generate products
    console.log("📦 Generating 150 products...");
    const products = generateProducts(adminUser._id);
    console.log(`✓ Generated ${products.length} products\n`);

    // Insert products
    console.log("💾 Inserting products into database...");
    const inserted = await Product.insertMany(products);
    console.log(`✓ Inserted ${inserted.length} products\n`);

    // Show summary
    console.log("📊 Summary by Category:");
    const categoryCounts = {};

    for (const product of inserted) {
      categoryCounts[product.category] =
        (categoryCounts[product.category] || 0) + 1;
    }

    for (const [category, count] of Object.entries(categoryCounts)) {
      console.log(`   ${category}: ${count} products`);
    }

    console.log("\n✅ Product seeding completed successfully!\n");
    console.log("🎉 You now have 150 products to test with!\n");
  } catch (err) {
    console.error("❌ Error seeding products:", err);
  } finally {
    await mongoose.connection.close();
    console.log("✓ Database connection closed");
    process.exit(0);
  }
}

// Run the seeder
seedProducts();
