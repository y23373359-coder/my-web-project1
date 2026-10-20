/* ==========================================
   STEPSTYLE FOOTWEAR
   100 SHOES + 100 SLIPPERS
========================================== */


// ==========================================
// PRODUCT DATA
// ==========================================

let products = [];


// ==========================================
// REAL PHOTO SOURCES
// ==========================================
//
// These are real-photo URLs.
// For the final shop website, replace them
// with the actual photos of your friend's shop.
//

const shoeImages = [

    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=80"

];


const slipperImages = [

    "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1526169621262-72a0b0eaf4f8?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=700&q=80",

    "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=700&q=80"

];


// ==========================================
// GENERATE 100 SHOES
// ==========================================

const shoeTypes = [
    "Casual Shoes",
    "Sports Shoes",
    "Running Shoes",
    "School Shoes",
    "Formal Shoes",
    "Sneakers",
    "Walking Shoes",
    "Party Shoes",
    "Daily Wear Shoes",
    "Kids Shoes"
];


const audiences = [
    "Men",
    "Women",
    "Kids"
];


for (let i = 1; i <= 100; i++) {

    const type =
        shoeTypes[(i - 1) % shoeTypes.length];

    const audience =
        audiences[(i - 1) % audiences.length];

    const price =
        650 + ((i * 47) % 451);

    products.push({

        id: `S${i}`,

        name: `${audience} ${type} ${i}`,

        category: "Shoes",

        audience: audience,

        price: price,

        rating: (4 + ((i % 10) / 10)).toFixed(1),

        image:
            shoeImages[(i - 1) % shoeImages.length]

    });

}


// ==========================================
// GENERATE 100 SLIPPERS
// ==========================================

const slipperTypes = [
    "Daily Slippers",
    "Comfort Slippers",
    "Kids Slippers",
    "Printed Slippers",
    "Fashion Slippers",
    "Bathroom Slippers",
    "Party Slippers",
    "Casual Slippers",
    "Ladies Slippers",
    "Men Slippers"
];


for (let i = 1; i <= 100; i++) {

    const type =
        slipperTypes[(i - 1) % slipperTypes.length];

    const audience =
        audiences[(i - 1) % audiences.length];

    const price =
        180 + ((i * 13) % 321);

    products.push({

        id: `P${i}`,

        name: `${audience} ${type} ${i}`,

        category: "Slippers",

        audience: audience,

        price: price,

        rating: (4 + ((i % 10) / 10)).toFixed(1),

        image:
            slipperImages[(i - 1) % slipperImages.length]

    });

}


// ==========================================
// VARIABLES
// ==========================================

let filteredProducts = [...products];

let displayedProducts = 24;

let currentCategory = "All";

let cart = [];


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts() {

    const grid =
        document.getElementById("productsGrid");

    grid.innerHTML = "";

    const visible =
        filteredProducts.slice(0, displayedProducts);


    if (visible.length === 0) {

        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
            ">
                <h2>No products found</h2>
                <p>Try another category or search.</p>
            </div>
        `;

        return;
    }


    visible.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="product-badge">
                    ${product.category}
                </span>

                <button
                    class="heart"
                    onclick="addWishlist('${product.id}')"
                >
                    <i class="fa-regular fa-heart"></i>
                </button>

            </div>


            <div class="product-info">

                <span class="product-type">
                    ${product.audience}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>


                <div class="product-meta">

                    <strong class="product-price">
                        ₹${product.price}
                    </strong>

                    <span class="product-rating">
                        ★ ${product.rating}
                    </span>

                </div>


                <button
                    class="add-cart"
                    onclick="addToCart('${product.id}')"
                >
                    <i class="fa-solid fa-cart-plus"></i>
                    Add to Cart
                </button>

            </div>
        `;


        grid.appendChild(card);

    });


    document.getElementById("productCount").innerText =
        `${filteredProducts.length} products`;

}


// ==========================================
// FILTER CATEGORY
// ==========================================

function filterCategory(category, button) {

    currentCategory = category;

    if (button) {

        document
            .querySelectorAll(".filter-btn")
            .forEach(btn =>
                btn.classList.remove("active")
            );

        button.classList.add("active");

    }


    applyFilters();

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// FILTER AUDIENCE
// ==========================================

function filterAudience(audience) {

    document.getElementById("audienceFilter").value =
        audience;

    applyFilters();

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// APPLY ALL FILTERS
// ==========================================

function applyFilters() {

    const audience =
        document.getElementById("audienceFilter").value;

    const price =
        document.getElementById("priceFilter").value;


    filteredProducts =
        products.filter(product => {


            // Category

            if (
                currentCategory !== "All" &&
                product.category !== currentCategory
            ) {

                return false;

            }


            // Audience

            if (
                audience !== "All" &&
                product.audience !== audience
            ) {

                return false;

            }


            // Price

            if (price !== "All") {

                const [min, max] =
                    price.split("-").map(Number);

                if (
                    product.price < min ||
                    product.price > max
                ) {

                    return false;

                }

            }


            return true;

        });


    displayedProducts = 24;

    displayProducts();

}


// ==========================================
// SEARCH
// ==========================================

function searchProducts() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    filteredProducts =
        products.filter(product => {

            const text =
                `${product.name}
                 ${product.category}
                 ${product.audience}`
                .toLowerCase();

            return text.includes(query);

        });


    displayedProducts = 24;

    displayProducts();


    if (query) {

        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

}


// ==========================================
// LOAD MORE
// ==========================================

function loadMoreProducts() {

    displayedProducts += 24;

    displayProducts();

}


// ==========================================
// CART
// ==========================================

function addToCart(id) {

    const product =
        products.find(item =>
            item.id === id
        );


    if (!product) return;


    cart.push(product);

    updateCart();

    openCart();

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    document.getElementById("cartCount").innerText =
        cart.length;


    const cartItems =
        document.getElementById("cartItems");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        document.getElementById("cartTotal").innerText =
            "₹0";

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item =
            document.createElement("div");

        item.className = "cart-product";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-product-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price}
                </p>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >
                <i class="fa-solid fa-trash"></i>
            </button>

        `;


        cartItems.appendChild(item);

    });


    document.getElementById("cartTotal").innerText =
        `₹${total}`;

}


// ==========================================
// REMOVE CART ITEM
// ==========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("open");

    document
        .getElementById("cartOverlay")
        .style.display = "block";

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("open");

    document
        .getElementById("cartOverlay")
        .style.display = "none";

}


// ==========================================
// WHATSAPP CHECKOUT
// ==========================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    let message =
        "Hello StepStyle Footwear!%0A%0A";

    message +=
        "I want to order:%0A";


    let total = 0;


    cart.forEach((product, index) => {

        message +=
            `${index + 1}. ${product.name} - ₹${product.price}%0A`;

        total += product.price;

    });


    message +=
        `%0ATotal: ₹${total}`;


    // CHANGE THIS NUMBER
    const phone =
        "919162968306;


    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );

}


// ==========================================
// SEARCH MODAL
// ==========================================

function openSearch() {

    document
        .getElementById("searchBox")
        .style.display = "block";

    document
        .getElementById("searchInput")
        .focus();

}


function closeSearch() {

    document
        .getElementById("searchBox")
        .style.display = "none";

}


// ==========================================
// MOBILE MENU
// ==========================================

function toggleMenu() {

    const nav =
        document.querySelector("nav");


    if (nav.style.display === "flex") {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.position = "absolute";

        nav.style.top = "82px";

        nav.style.left = "0";

        nav.style.right = "0";

        nav.style.padding = "25px";

        nav.style.background = "white";

        nav.style.flexDirection = "column";

        nav.style.boxShadow =
            "0 20px 30px rgba(0,0,0,.08)";

    }

}


// ==========================================
// WISHLIST
// ==========================================

function addWishlist(id) {

    const button =
        event.currentTarget;

    const icon =
        button.querySelector("i");


    icon.classList.toggle("fa-regular");

    icon.classList.toggle("fa-solid");


    if (icon.classList.contains("fa-solid")) {

        icon.style.color = "#e85d04";

    } else {

        icon.style.color = "";

    }

}


// ==========================================
// INITIALIZE
// ==========================================

displayProducts();
