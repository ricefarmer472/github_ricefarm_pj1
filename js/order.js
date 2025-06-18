document.addEventListener('DOMContentLoaded', () => {

    // --- ヘルパー関数 ---
    const getCart = () => JSON.parse(localStorage.getItem('shoppingCart_test_rf1')) || [];
    const formatCurrency = (amount) => `¥${amount.toLocaleString()}`;

    // --- DOM要素の取得 ---
    const itemsContainer = document.getElementById('checkout-items-container');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryTotal = document.getElementById('summary-total');
    const confirmButton = document.getElementById('confirm-purchase-btn');

    // --- ページの描画処理 ---
    const renderCheckoutPage = () => {
        const cart = getCart();

        // カートが空なら、カートページにリダイレクトする
        if (cart.length === 0) {
            alert('カートに商品がありません。トップページに戻ります。');
            window.location.href = 'toppage.html';
            return;
        }

        // 1. 商品リストを描画
        itemsContainer.innerHTML = ''; // コンテナをクリア
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>カラー: ${item.color} / 数量: ${item.quantity}</p>
                </div>
                <div class="item-price">
                    ${formatCurrency(item.price * item.quantity)}
                </div>
            `;
            itemsContainer.appendChild(itemElement);
        });

        // 2. 金額を計算して表示
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 550; // 送料は固定
        const total = subtotal + shipping;

        summarySubtotal.textContent = formatCurrency(subtotal);
        summaryShipping.textContent = formatCurrency(shipping);
        summaryTotal.textContent = formatCurrency(total);
    };

    // --- イベントリスナー ---
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            // ボタンを無効化して、二重クリックを防止
            confirmButton.disabled = true;
            confirmButton.textContent = '処理中...';

            // localStorageからカート情報を削除（カートを空にする）
            localStorage.removeItem('shoppingCart_test_rf1');

            // 「ご購入ありがとうございます」のポップアップを表示
            alert('ご購入ありがとうございます');

            // toppage.htmlへ遷移
            window.location.href = 'toppage.html';
        });
    }

    // --- 初期化処理 ---
    renderCheckoutPage();
});

// --- 動的に生成される商品リストのための補助スタイル ---
// 既存のCSSに .checkout-item などのスタイルがない場合でも、最低限の表示を保ちます。
const orderPageStyle = document.createElement('style');
orderPageStyle.textContent = `
    .checkout-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 0;
        border-bottom: 1px solid #e5e7eb;
    }
    .checkout-item:last-child {
        border-bottom: none;
    }
    .checkout-item .item-image {
        width: 64px;
        height: 64px;
        object-fit: cover;
        border-radius: 6px;
    }
    .checkout-item .item-info {
        flex-grow: 1; /* 残りのスペースを埋める */
    }
    .checkout-item .item-info h3 {
        font-size: 1rem;
        font-weight: 500;
        margin: 0 0 4px 0;
    }
    .checkout-item .item-info p {
        font-size: 0.9rem;
        color: #6b7280;
        margin: 0;
    }
    .checkout-item .item-price {
        font-weight: 600;
    }
`;
document.head.appendChild(orderPageStyle);
