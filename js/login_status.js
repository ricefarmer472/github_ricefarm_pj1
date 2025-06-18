document.addEventListener('DOMContentLoaded', () => {

    // クラス名を元に、ログイン状態を表示するコンテナ要素を取得します
    const loginStatusContainer = document.querySelector('.header_contents_login_n_cart_login');
    
    // localStorageから'currentUser'キーでユーザー情報を取得します
    const currentUserJSON = localStorage.getItem('currentUser');
    
    // JSON文字列をオブジェクトに変換します（なければnullになります）
    const currentUser = currentUserJSON ? JSON.parse(currentUserJSON) : null;

    // コンテナ要素が見つかった場合のみ、処理を実行します
    if (loginStatusContainer) {
        if (currentUser) {
            // --- ログインしている場合の処理 ---
            
            // 「ログイン済み」の表示と「ログアウト」ボタンを動的に生成します
            loginStatusContainer.innerHTML = `
                <div class="logged-in-status">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                    <p>ログイン済み</p>
                </div>
            `;

        } else {
            // --- ログインしていない場合の処理 ---

            // 元のHTML構造をaタグで囲み、login.htmlへのリンクにします
            loginStatusContainer.innerHTML = `
                <a href="login.html" class="login-link-style">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <p>ログイン</p>
                </a>
            `;
        }
    }
});

const style = document.createElement('style');
style.textContent = `
    /* ログインしていない時のリンクスタイル */
    .login-link-style {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
        gap: 8px; /* アイコンとテキストの間隔 */
    }

    /* ログインしている時の表示スタイル */
    .logged-in-status {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    /* ヘッダーのログインエリア全体のスタイル調整 */
    .header_contents_login_n_cart_login {
        display: flex;
        align-items: center;
        gap: 16px;
    }
`;
document.head.appendChild(style);