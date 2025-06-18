document.addEventListener('DOMContentLoaded', () => {

    const getCart = () => JSON.parse(localStorage.getItem('shoppingCart_test_rf1')) || [];
    const saveCart = (cart) => localStorage.setItem('shoppingCart_test_rf1', JSON.stringify(cart));

    const cartItemsContainer = document.getElementById('cart-item-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryTotal = document.getElementById('summary-total');

    const formatCurrency = (amount) => `¥${amount.toLocaleString()}`;

    const renderCart = () => {
        const cart =getCart();
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.classList.remove('hidden');
            document.querySelector('.order-summary').classList.add('hidden');
            document.querySelector('.cart-header').classList.add('hidden');
        } else {
            emptyCartMessage.classList.add('hidden');
            document.querySelector('.order-summary').classList.remove('hidden');
            document.querySelector('.cart-header').classList.remove('hidden');

            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';

                itemElement.dataset.productId = item.id;

                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                    </div>
                    <div class="item-price">${formatCurrency(item.price)}</div>
                    <div class="item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn" data-action="decrease">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" data-action="increase">+</button>
                        </div>
                    </div>
                    <div class="item-total">${formatCurrency(item.price * item.quantity)}</div>
                    <div class="item-remove">
                        <button class="remove-button" data-action="remove">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }
        updateTotals();
        updateCartIcon();
    };

    const updateTotals = () => {
        const cart = getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = (subtotal > 0) ? 550 : 0; // カートが空なら送料も0
        const total = subtotal + shipping;

        summarySubtotal.textContent = formatCurrency(subtotal);
        summaryShipping.textContent = formatCurrency(shipping);
        summaryTotal.textContent = formatCurrency(total);
    };

    const updateCartIcon = () => {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalItems;
    };

    cartItemsContainer.addEventListener('click', (event) => {
        const target = event.target.closest('button');
        if (!target) return;

        const action = target.dataset.action;
        const itemElement = target.closest('.cart-item');
        const productId = itemElement.dataset.productId;
        
        let cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex === -1) return;

        if (action === 'increase') {
            cart[itemIndex].quantity++;
        }
        if (action === 'decrease') {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                // 数量が1の時に'-'を押したら削除
                cart.splice(itemIndex, 1);
            }
        }
        if (action === 'remove') {
            cart.splice(itemIndex, 1);
        }

        saveCart(cart);
        renderCart(); // カートを再描画
    });

    renderCart();
});


