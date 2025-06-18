document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login_form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // デフォルトのフォーム送信（ページのリロード）をキャンセルします。
            event.preventDefault();

            // フォームから入力された値を取得します。
            const email = document.getElementById('email').value;

            // --- ここからが変更点 ---

            // ログイン成功と仮定し、ダミーのユーザー情報を作成します。
            // 本来はサーバーから返されたユーザー情報を使います。
            const user = {
                name: '山田 太郎',
                email: email
            };

            // ユーザー情報をJSON形式の文字列に変換してlocalStorageに保存します。
            // キー名は 'currentUser' とします。
            localStorage.setItem('currentUser', JSON.stringify(user));

            // ログイン成功後、トップページにリダイレクトします。
            window.location.href = 'toppage.html';
        });
    }

    // --- 新規会員登録ボタンの処理 ---
    const newUserButton = document.querySelector('.newlogin_btn_loginpage');
    if (newUserButton) {
        newUserButton.addEventListener('click', () => {
            // newlogin.htmlへ遷移
            window.location.href = 'newlogin.html';
        });
    }
});