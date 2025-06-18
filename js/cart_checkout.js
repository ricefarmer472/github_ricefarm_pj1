document.addEventListener('DOMContentLoaded', () => {

    // クラス名 'btn-login' を持つボタン要素を取得します
    const checkoutButton = document.querySelector('.btn-login');

    // ボタンがページ内に存在する場合のみ、処理を実行します
    if (checkoutButton) {
        // ボタンにクリックイベントを追加します
        checkoutButton.addEventListener('click', () => {

            // localStorageから 'currentUser' というキーでログイン情報を取得します
            const currentUser = localStorage.getItem('currentUser');

            if (currentUser) {
                // --- ログイン情報が存在する場合 ---
                // 決済ページ (order.html) へ遷移します
                window.location.href = 'order.html';
            } else {
                // --- ログイン情報が存在しない場合 ---
                // ユーザーにログインが必要であることを通知します
                alert('決済に進むにはログインが必要です。');
                // ログインページ (login.html) へ遷移します
                window.location.href = 'login.html';
            }
        });
    }
});