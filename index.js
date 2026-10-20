/* =====================================
   STEPSTYLE FOOTWEAR
   CLEAN JAVASCRIPT
===================================== */


document.addEventListener("DOMContentLoaded", function () {

    /* =================================
       PRODUCT DATA
    ================================= */

    const products = [];

    const shoeImages = [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=700&q=80"
    ];

    const slipperImages = [
        "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=700&q=80"
    ];


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


    const audiences = [
        "Men",
        "Women",
        "Kids"
    ];


    /* =================================
       CREATE 100 SHOES
    ================================= */

    for (let i = 1; i <= 100; i++) {

        products.push({

            id: "S" + i,

            name:
                audiences[(i - 1) % 3]
                + " "
                + shoeTypes[(i - 1) % shoeTypes.length]
                + " "
                + i,

            category: "Shoes",

            audience:
                audiences[(i - 1) % 3],

            price:
                650 + ((i * 37) % 451),

            rating:
                (4 + ((i % 10) / 10)).toFixed(1),

            image:
                shoeImages[(i - 1) % shoeImages.length]

        });

    }


    /* =================================
       CREATE 100 SLIPPERS
    ================================= */

    for (let i = 1; i <= 100; i++) {

        products.push({

            id: "P" + i,

            name:
                audiences[(i - 1) % 3]
                + " "
                + slipperTypes[(i - 1) % slipperTypes.length]
                + " "
                + i,

            category: "Slippers",

            audience:
                audiences[(i - 1) % 3],

            price:
                150 + ((i * 7) % 351),

            rating:
                (4 + ((i % 10) / 10)).toFixed(1),

            image:
                slipperImages[(i - 1) % slipperImages.length]

        });

    }


    /* =================================
       VARIABLES
    ================================= */

    let filteredProducts = [...products];

    let selectedCategory = "All";

    let visibleProducts = 24;

    let cart = [];


    /* =================================
       ELEMENTS
    ================================= */

    const grid =
        document.getElementById("productsGrid");

    const result =
        document.getElementById("productResult");

    const loadMore =
        document.getElementById("loadMore");

    const audienceFilter =
        document.getElementById("audienceFilter");

    const priceFilter =
        document.getElementById("priceFilter");

    const searchInput =
        document.getElementById("searchInput");

    const cartCount =
        document.getElementById("cartCount");

    const cartSidebar =
        document.getElementById("cartSidebar");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    /* =================================
       DISPLAY PRODUCTS
    ================================= */

    function displayProducts() {

        grid.innerHTML = "";


        const items =
            filteredProducts.slice(
                0,
                visibleProducts
            );


        items.forEach(function (product) {

            const card =
                document.createElement("article");

            card.className = "product-card";


            card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                    <span class="badge">
                        ${product.category}
                    </span>

                    <button
                        class="wishlist"
                        data-id="${product.id}"
                    >
                        <i class="fa-regular fa-heart"></i>
                    </button>

                </div>


                <div class="product-info">

                    <span class="product-audience">
                        ${product.audience}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="product-row">

                        <strong class="price">
                            ₹${product.price}
                        </strong>

                        <span class="rating">
                            ★ ${product.rating}
                        </span>

                    </div>

                    <button
                        class="add-cart"
                        data-id="${product.id}"
                    >
                        <i class="fa-solid fa-cart-plus"></i>
                        Add to Cart
                    </button>

                </div>
            `;


            grid.appendChild(card);

        });


        result.textContent =
            filteredProducts.length + " products";


        if (
            visibleProducts >=
            filteredProducts.length
        ) {

            loadMore.style.display = "none";

        } else {

            loadMore.style.display = "block";

        }

    }


    /* =================================
       FILTER
    ================================= */

    function applyFilters() {

        const audience =
            audienceFilter.value;

        const price =
            priceFilter.value;


        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        filteredProducts =
            products.filter(function (product) {


                if (
                    selectedCategory !== "All" &&
                    product.category !== selectedCategory
                ) {
                    return false;
                }


                if (
                    audience !== "All" &&
                    product.audience !== audience
                ) {
                    return false;
                }


                if (price !== "All") {

                    const parts =
                        price.split("-");

                    const min =
                        Number(parts[0]);

                    const max =
                        Number(parts[1]);


                    if (
                        product.price < min ||
                        product.price > max
                    ) {
                        return false;
                    }

                }


                if (search !== "") {

                    const text =
                        (
                            product.name +
                            " " +
                            product.category +
                            " " +
                            product.audience
                        ).toLowerCase();


                    if (!text.includes(search)) {
                        return false;
                    }

                }


                return true;

            });


        visibleProducts = 24;

        displayProducts();

    }


    /* =================================
       CATEGORY FILTER BUTTONS
    ================================= */

    document
        .querySelectorAll(".filter")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(".filter")
                        .forEach(function (btn) {
                            btn.classList.remove("active");
                        });


                    button.classList.add("active");


                    selectedCategory =
                        button.dataset.category;


                    applyFilters();

                }
            );

        });


    /* =================================
       CATEGORY CARDS
    ================================= */

    document
        .querySelectorAll(".category-card")
        .forEach(function (card) {

            card.addEventListener(
                "click",
                function () {

                    const category =
                        card.dataset.category;

                    const audience =
                        card.dataset.audience;


                    if (category) {

                        selectedCategory =
                            category;


                        document
                            .querySelectorAll(".filter")
                            .forEach(function (btn) {

                                btn.classList.remove("active");

                                if (
                                    btn.dataset.category ===
                                    category
                                ) {
                                    btn.classList.add("active");
                                }

                            });

                    }


                    if (audience) {

                        audienceFilter.value =
                            audience;

                    }


                    applyFilters();


                    document
                        .getElementById("products")
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );

        });


    /* =================================
       SELECT FILTERS
    ================================= */

    audienceFilter.addEventListener(
        "change",
        applyFilters
    );


    priceFilter.addEventListener(
        "change",
        applyFilters
    );


    /* =================================
       SEARCH
    ================================= */

    searchInput.addEventListener(
        "input",
        applyFilters
    );


    /* =================================
       LOAD MORE
    ================================= */

    loadMore.addEventListener(
        "click",
        function () {

            visibleProducts += 24;

            displayProducts();

        }
    );


    /* =================================
       PRODUCT BUTTONS
       EVENT DELEGATION
    ================================= */

    grid.addEventListener(
        "click",
        function (event) {


            const cartButton =
                event.target.closest(".add-cart");


            if (cartButton) {

                const id =
                    cartButton.dataset.id;

                addToCart(id);

                return;

            }


            const wishlistButton =
                event.target.closest(".wishlist");


            if (wishlistButton) {

                wishlistButton.classList.toggle(
                    "liked"
                );


                const icon =
                    wishlistButton.querySelector("i");


                icon.classList.toggle(
                    "fa-regular"
                );


                icon.classList.toggle(
                    "fa-solid"
                );

            }

        }
    );


    /* =================================
       CART
    ================================= */

    function addToCart(id) {

        const product =
            products.find(function (item) {

                return item.id === id;

            });


        if (!product) {
            return;
        }


        cart.push(product);

        updateCart();

        openCart();

    }


    function removeFromCart(index) {

        cart.splice(index, 1);

        updateCart();

    }


    function updateCart() {

        cartCount.textContent =
            cart.length;


        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <i class="fa-solid fa-cart-shopping"></i>

                    <p>Your cart is empty</p>

                </div>

            `;

            cartTotal.textContent = "₹0";

            return;

        }


        cartItems.innerHTML = "";


        let total = 0;


        cart.forEach(function (product, index) {

            total += product.price;


            const item =
                document.createElement("div");


            item.className = "cart-item";


            item.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${product.name}
                    </h4>

                    <p>
                        ₹${product.price}
                    </p>

                </div>

                <button
                    class="remove"
                    data-index="${index}"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            `;


            cartItems.appendChild(item);

        });


        cartTotal.textContent =
            "₹" + total;


        document
            .querySelectorAll(".remove")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );

                        removeFromCart(index);

                    }
                );

            });

    }


    /* =================================
       CART OPEN / CLOSE
    ================================= */

    function openCart() {

        cartSidebar.classList.add("open");

        cartOverlay.style.display = "block";

    }


    function closeCart() {

        cartSidebar.classList.remove("open");

        cartOverlay.style.display = "none";

    }


    document
        .getElementById("cartBtn")
        .addEventListener(
            "click",
            openCart
        );


    document
        .getElementById("closeCart")
        .addEventListener(
            "click",
            closeCart
        );


    cartOverlay.addEventListener(
        "click",
        closeCart
    );


    /* =================================
       WHATSAPP ORDER
    ================================= */

    document
        .getElementById("whatsappOrder")
        .addEventListener(
            "click",
            function () {

                if (cart.length === 0) {

                    alert(
                        "Please add a product to cart first."
                    );

                    return;

                }


                let message =
                    "Hello StepStyle Footwear!%0A%0A";


                message +=
                    "I want to order:%0A";


                let total = 0;


                cart.forEach(function (product, index) {

                    message +=
                        (index + 1) +
                        ". " +
                        product.name +
                        " - ₹" +
                        product.price +
                        "%0A";


                    total += product.price;

                });


                message +=
                    "%0ATotal: ₹" +
                    total;


                /*
                    CHANGE THIS NUMBER
                    TO YOUR FRIEND'S
                    WHATSAPP NUMBER.
                */

                const phone =
                    "919999999999";


                window.open(
                    "https://wa.me/" +
                    phone +
                    "?text=" +
                    message,
                    "_blank"
                );

            }
        );


    /* =================================
       SEARCH PANEL
    ================================= */

    const searchPanel =
        document.getElementById(
            "searchPanel"
        );


    document
        .getElementById("searchBtn")
        .addEventListener(
            "click",
            function () {

                searchPanel.style.display =
                    "block";

                searchInput.focus();

            }
        );


    document
        .getElementById("closeSearch")
        .addEventListener(
            "click",
            function () {

                searchPanel.style.display =
                    "none";

            }
        );


    searchPanel.addEventListener(
        "click",
        function (event) {

            if (event.target === searchPanel) {

                searchPanel.style.display =
                    "none";

            }

        }
    );


    /* =================================
       MOBILE MENU
    ================================= */

    const menuBtn =
        document.getElementById(
            "menuBtn"
        );


    const nav =
        document.getElementById(
            "mainNav"
        );


    menuBtn.addEventListener(
        "click",
        function () {

            if (nav.style.display === "flex") {

                nav.style.display = "none";

            } else {

                nav.style.display = "flex";

                nav.style.position = "absolute";

                nav.style.top = "80px";

                nav.style.left = "0";

                nav.style.right = "0";

                nav.style.padding = "25px";

                nav.style.background = "white";

                nav.style.flexDirection = "column";

                nav.style.boxShadow =
                    "0 15px 30px rgba(0,0,0,.1)";

            }

        }
    );


    /* =================================
       FIRST LOAD
    ================================= */

    displayProducts();

});
