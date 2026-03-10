// Telegram Web App initialization
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Apply Telegram theme colors
document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#0d0d0d');
document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#ffffff');

// Products data
const products = [
    {
        id: 1,
        name: 'Yamaha MT-09 SP',
        category: 'motorcycles',
        price: 989000,
        oldPrice: 1099000,
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=400&fit=crop',
        description: 'Спортивный мотоцикл с 3-цилиндровым двигателем объемом 847 куб.см. Мощность 115 л.с.',
        specs: {
            'Двигатель': '847 куб.см',
            'Мощность': '115 л.с.',
            'Масса': '193 кг',
            'Топливо': '14 л'
        }
    },
    {
        id: 2,
        name: 'Kawasaki Ninja ZX-6R',
        category: 'motorcycles',
        price: 1199000,
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a42?w=400&h=400&fit=crop',
        description: 'Суперспорт с рядным 4-цилиндровым двигателем. Максимальная скорость 254 км/ч.',
        specs: {
            'Двигатель': '636 куб.см',
            'Мощность': '130 л.с.',
            'Масса': '196 кг',
            'Топливо': '17 л'
        }
    },
    {
        id: 3,
        name: 'Honda PCX 160',
        category: 'scooters',
        price: 269900,
        image: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=400&h=400&fit=crop',
        description: 'Комфортный скутер для города с экономичным двигателем и просторным багажником.',
        specs: {
            'Двигатель': '157 куб.см',
            'Мощность': '16 л.с.',
            'Масса': '134 кг',
            'Топливо': '8.1 л'
        }
    },
    {
        id: 4,
        name: 'Vespa Primavera 150',
        category: 'scooters',
        price: 549000,
        oldPrice: 599000,
        image: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=400&h=400&fit=crop',
        description: 'Итальянская классика с современными технологиями. Стиль и комфорт в одном.',
        specs: {
            'Двигатель': '155 куб.см',
            'Мощность': '12.5 л.с.',
            'Масса': '138 кг',
            'Топливо': '8 л'
        }
    },
    {
        id: 5,
        name: 'Can-Am Renegade 1000R',
        category: 'atv',
        price: 1450000,
        image: 'https://images.unsplash.com/photo-1606162939443-a32436f7e79c?w=400&h=400&fit=crop',
        description: 'Мощный квадроцикл для экстремального бездорожья. 91 л.с. мощности.',
        specs: {
            'Двигатель': '976 куб.см',
            'Мощность': '91 л.с.',
            'Привод': '4x4',
            'Топливо': '20 л'
        }
    },
    {
        id: 6,
        name: 'Polaris Sportsman 570',
        category: 'atv',
        price: 899000,
        oldPrice: 949000,
        image: 'https://images.unsplash.com/photo-1598898067053-54ea172ef8df?w=400&h=400&fit=crop',
        description: 'Универсальный квадроцикл для работы и отдыха. Надежность и проходимость.',
        specs: {
            'Двигатель': '567 куб.см',
            'Мощность': '44 л.с.',
            'Привод': '4x4',
            'Топливо': '26 л'
        }
    },
    {
        id: 7,
        name: 'Масло Motul 7100 4T',
        category: 'parts',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1635789222487-480e36990a11?w=400&h=400&fit=crop',
        description: 'Синтетическое моторное масло для 4-тактных мотоциклов. 10W-40, 1л.',
        specs: {
            'Тип': 'Синтетика',
            'Вязкость': '10W-40',
            'Объем': '1 литр',
            'Применение': '4-тактные'
        }
    },
    {
        id: 8,
        name: 'Шлем Shoei X-Fifteen',
        category: 'parts',
        price: 45900,
        oldPrice: 52900,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        description: 'Профессиональный гоночный шлем. Легкий вес, отличная вентиляция.',
        specs: {
            'Материал': 'Карбон',
            'Вес': '1450 г',
            'Сертификация': 'ECE 22.06',
            'Визор': 'Антифог'
        }
    },
    {
        id: 9,
        name: 'BMW S 1000 RR',
        category: 'motorcycles',
        price: 2199000,
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a42?w=400&h=400&fit=crop',
        description: 'Флагманский суперспорт BMW. 210 л.с. и передовые технологии.',
        specs: {
            'Двигатель': '999 куб.см',
            'Мощность': '210 л.с.',
            'Масса': '197 кг',
            'Топливо': '16.5 л'
        }
    },
    {
        id: 10,
        name: 'Sym Symphony SR 125',
        category: 'scooters',
        price: 189000,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&h=400&fit=crop',
        description: 'Легкий городской скутер с современным дизайном и экономичным двигателем.',
        specs: {
            'Двигатель': '124 куб.см',
            'Мощность': '9 л.с.',
            'Масса': '113 кг',
            'Топливо': '6.2 л'
        }
    }
];

// State
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let currentCategory = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});

// Render products
function renderProducts(productsToRender = products) {
    const grid = document.getElementById('productsGrid');
    
    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card" onclick="openProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    ${formatPrice(product.price)} ₽
                    ${product.oldPrice ? `<span class="product-price-old">${formatPrice(product.oldPrice)} ₽</span>` : ''}
                </div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="btn-icon btn-favorite ${favorites.includes(product.id) ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
                        ${favorites.includes(product.id) ? '❤️' : '🤍'}
                    </button>
                    <button class="btn-icon btn-cart" onclick="addToCart(${product.id})">🛒</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Format price
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Get category name
function getCategoryName(category) {
    const names = {
        motorcycles: 'Мотоциклы',
        scooters: 'Скутеры',
        atv: 'Квадроциклы',
        parts: 'Запчасти'
    };
    return names[category] || category;
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter products
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    renderProducts(filtered);
}

// Search products
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    let filtered = products;
    
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    if (query) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }
    
    renderProducts(filtered);
}

// Open product modal
function openProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-image">
        <div class="modal-body">
            <span class="modal-category">${getCategoryName(product.category)}</span>
            <h2 class="modal-title">${product.name}</h2>
            <p class="modal-description">${product.description}</p>
            <div class="modal-specs">
                ${Object.entries(product.specs).map(([key, value]) => `
                    <div class="spec-item">
                        <span class="spec-label">${key}</span>
                        <span class="spec-value">${value}</span>
                    </div>
                `).join('')}
            </div>
            <div class="modal-price">${formatPrice(product.price)} ₽</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id}); closeModal();">
                Добавить в корзину
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

// Add to cart
function addToCart(id) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    showToast('Добавлено в корзину');
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    renderCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Show cart
function showCart() {
    renderCart();
    document.getElementById('cartModal').classList.add('active');
}

// Close cart
function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Корзина пуста</div>';
        checkoutBtn.disabled = true;
        document.getElementById('totalPrice').textContent = '0 ₽';
        return;
    }
    
    checkoutBtn.disabled = false;
    
    let total = 0;
    
    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';
        
        total += product.price * item.quantity;
        
        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">${formatPrice(product.price)} ₽ × ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `;
    }).join('');
    
    document.getElementById('totalPrice').textContent = `${formatPrice(total)} ₽`;
}

// Checkout
function checkout() {
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    
    const itemsList = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return product ? `${product.name} × ${item.quantity}` : '';
    }).filter(Boolean).join('\n');
    
    const message = `🛒 Новый заказ!\n\n${itemsList}\n\n💰 Итого: ${formatPrice(total)} ₽`;
    
    // Send to Telegram
    if (tg.initDataUnsafe.user) {
        tg.sendData(JSON.stringify({
            type: 'order',
            items: cart,
            total: total,
            user: tg.initDataUnsafe.user
        }));
    } else {
        // For testing outside Telegram
        alert(`Заказ оформлен!\n\n${message}`);
        cart = [];
        saveCart();
        updateCartCount();
        closeCart();
    }
}

// Toggle favorite
function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    
    if (index === -1) {
        favorites.push(id);
        showToast('Добавлено в избранное');
    } else {
        favorites.splice(index, 1);
        showToast('Удалено из избранного');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderProducts();
}

// Show toast
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2500);
}

// Show section
function showSection(section) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    const productsGrid = document.getElementById('productsGrid');
    const favoritesSection = document.querySelector('.favorites-section') || createFavoritesSection();
    const profileSection = document.querySelector('.profile-section') || createProfileSection();
    
    // Hide all sections
    productsGrid.style.display = 'none';
    favoritesSection.style.display = 'none';
    profileSection.style.display = 'none';
    
    switch(section) {
        case 'catalog':
            productsGrid.style.display = 'grid';
            break;
        case 'favorites':
            renderFavorites();
            favoritesSection.style.display = 'block';
            break;
        case 'profile':
            profileSection.style.display = 'block';
            break;
    }
}

// Create favorites section
function createFavoritesSection() {
    const section = document.createElement('div');
    section.className = 'favorites-section';
    section.innerHTML = '<h2 class="section-title">❤️ Избранное</h2><div class="products-grid" id="favoritesGrid"></div>';
    document.querySelector('.app').insertBefore(section, document.querySelector('.bottom-nav'));
    return section;
}

// Render favorites
function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    if (!grid) return;
    
    const favoriteProducts = products.filter(p => favorites.includes(p.id));
    
    if (favoriteProducts.length === 0) {
        grid.innerHTML = '<div class="cart-empty">Нет избранных товаров</div>';
        return;
    }
    
    grid.innerHTML = favoriteProducts.map(product => `
        <div class="product-card" onclick="openProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">${formatPrice(product.price)} ₽</div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="btn-icon btn-favorite active" onclick="toggleFavorite(${product.id})">❤️</button>
                    <button class="btn-icon btn-cart" onclick="addToCart(${product.id})">🛒</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Create profile section
function createProfileSection() {
    const user = tg.initDataUnsafe.user || { first_name: 'Гость', last_name: '' };
    
    const section = document.createElement('div');
    section.className = 'profile-section';
    section.innerHTML = `
        <h2 class="section-title">👤 Профиль</h2>
        <div class="profile-card">
            <div class="profile-avatar">👤</div>
            <div class="profile-name">${user.first_name} ${user.last_name || ''}</div>
            <div class="profile-phone">${user.username ? '@' + user.username : 'Гостевой режим'}</div>
        </div>
        <div class="profile-menu">
            <div class="profile-menu-item" onclick="showSection('favorites')">
                <span class="profile-menu-icon">❤️</span>
                <span class="profile-menu-text">Избранное</span>
                <span class="profile-menu-arrow">→</span>
            </div>
            <div class="profile-menu-item" onclick="showToast('История заказов')">
                <span class="profile-menu-icon">📦</span>
                <span class="profile-menu-text">Мои заказы</span>
                <span class="profile-menu-arrow">→</span>
            </div>
            <div class="profile-menu-item" onclick="showToast('Настройки')">
                <span class="profile-menu-icon">⚙️</span>
                <span class="profile-menu-text">Настройки</span>
                <span class="profile-menu-arrow">→</span>
            </div>
            <div class="profile-menu-item" onclick="showToast('Помощь')">
                <span class="profile-menu-icon">💬</span>
                <span class="profile-menu-text">Помощь</span>
                <span class="profile-menu-arrow">→</span>
            </div>
        </div>
    `;
    document.querySelector('.app').insertBefore(section, document.querySelector('.bottom-nav'));
    return section;
}

// Close modals on backdrop click
document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') closeModal();
});

document.getElementById('cartModal').addEventListener('click', (e) => {
    if (e.target.id === 'cartModal') closeCart();
});

// Telegram back button
tg.BackButton.onClick(() => {
    const productModal = document.getElementById('productModal');
    const cartModal = document.getElementById('cartModal');
    
    if (productModal.classList.contains('active')) {
        closeModal();
    } else if (cartModal.classList.contains('active')) {
        closeCart();
    }
});
