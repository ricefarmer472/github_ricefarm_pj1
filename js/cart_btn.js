document.addEventListener('DOMContentLoaded', () => {

    /*
     * localStorageからカート情報を取得し、JSONオブジェクトに変換して返す。
     * キー名はご指定の 'shoppingCart_test_rf1' を使用します。
     * @returns {Array} カート内の商品オブジェクトの配列
     */
    const getCart = () => {
        const cart = localStorage.getItem('shoppingCart_test_rf1');
        return cart ? JSON.parse(cart) : [];
    };

    /**
     * ヘッダーのカートアイコンの数量を更新する。
     */
    const updateCartIcon = () => {
        const cart = getCart();
        const cartCountElement = document.getElementById('cart-count');

        // cart-count要素が存在する場合のみ処理を実行
        if (cartCountElement) {
            // カート内の各商品のquantityプロパティを合計して総数を計算
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            // 計算した総数を要素のテキストとして設定
            cartCountElement.textContent = totalItems;
        }
    };

    // ページが読み込まれた際に、一度だけカートアイコンの表示を更新する
    updateCartIcon();
    
});