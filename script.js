// El Tío Market - Product Data
const products = [
    {
        id: 1,
        name: "Arroz La Especial 1kg",
        price: 2800,
        image: "images/arroz.jpg",
        category: "alimentos"
    },
    {
        id: 2,
        name: "Aceite Vegetal El Tío 900ml",
        price: 9200,
        image: "images/aceite.jpg",
        category: "alimentos"
    },
    {
        id: 3,
        name: "Leche Entera 1L",
        price: 3500,
        image: "images/leche.jpg",
        category: "lácteos"
    },
    {
        id: 4,
        name: "Café Supremo 500g",
        price: 12500,
        image: "images/cafe.jpg",
        category: "bebidas"
    },
    {
        id: 5,
        name: "Atún en Lata 170g",
        price: 4800,
        image: "images/atun.jpg",
        category: "enlatados"
    },
    {
        id: 6,
        name: "Papas Fritas Margarita",
        price: 3000,
        image: "images/papas.jpg",
        category: "snacks"
    }
];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const searchIcon = document.querySelector('.fa-search');
const cartIcon = document.querySelector('.fa-shopping-cart');

// Render Products
function renderProducts(productsToRender = products) {
    productGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toLocaleString('es-CO')}</p>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Añadir
                    </button>
                </div>
            </div>
        `;
    });

    // Add event listeners to new buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Cart Functionality
let cart = [];

function addToCart(event) {
    const productId = parseInt(event.target.closest('button').dataset.id);
    const product = products.find(p => p.id === productId);
    
    cart.push(product);
    updateCartCounter();
    showToast(`${product.name} añadido al carrito`);
}

function updateCartCounter() {
    const counter = document.createElement('span');
    counter.className = 'cart-counter';
    counter.textContent = cart.length;
    
    // Remove existing counter if present
    const existingCounter = document.querySelector('.cart-counter');
    if (existingCounter) existingCounter.remove();
    
    cartIcon.appendChild(counter);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Search Functionality
function handleSearch() {
    const query = prompt("Buscar en El Tío Market:");
    if (!query) return;
    
    const results = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length > 0) {
        renderProducts(results);
    } else {
        alert(`No encontramos "${query}". Mostrando todos los productos.`);
        renderProducts();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Event Listeners
    searchIcon.addEventListener('click', handleSearch);
    cartIcon.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Tienes ${cart.length} productos en el carrito.\nTotal: $${calculateTotal().toLocaleString('es-CO')}`);
        } else {
            alert("Tu carrito de El Tío Market está vacío");
        }
    });
});

// Helper Functions
function calculateTotal() {
    return cart.reduce((total, product) => total + product.price, 0);
}