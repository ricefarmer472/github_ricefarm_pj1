document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('main_product_image');
    const subImage = document.querySelectorAll('.sub_image_container_image');

    subImage.forEach(subimage => {
        subimage.addEventListener('click', () => {
            subImage.forEach(img => img.classList.remove('active'));
            subimage.classList.add('active');
            if (mainImage) {
                mainImage.src = subimage.dataset.src;
            }
        });
    });

    const getCart = () => {
        const cart = localStorage.getItem('shoppingCart_test_rf1');
        return cart ? JSON.parse(cart) : [];
    };

    const saveCart = (cart) => {
        localStorage.setItem('shoppingCart_test_rf1', JSON.stringify(cart))
    };

    const updateCartIcon = () => {
        const cart = getCart();
        const cartCountElement = document.getElementById('cart-count');
        if(cartCountElement) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    };

    const addToCartBtn = document.getElementById('AddtoCart');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const cart = getCart();

            const quantity = 1;
            const priceText = document.querySelector('.info_container_price p').textContent;

            const productToAdd = {
                id: 'P002', // 本来はバックエンドから取得する商品ID
                name: document.querySelector('.info_container_title').textContent,
                price: parseInt(priceText.replace(/[^0-9]/g, ''), 10), // '¥'や','を除去して数値に
                image: document.getElementById('main_product_image').src,
                quantity: quantity
            };

            const existingProductIndex = cart.findIndex(item =>
                item.id === productToAdd.id
            );

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += productToAdd.quantity;
            } else {
                cart.push(productToAdd)
            }

            saveCart(cart);

            updateCartIcon();
        })
    }

    updateCartIcon();
});