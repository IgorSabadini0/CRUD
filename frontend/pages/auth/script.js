const submit_btn = document.getElementById('submit-btn');

const API_URL = 'http://localhost:3000';

const access = async () => {
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const status = document.getElementById('status');

    const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password })
    });

    const data = await response.json();

    if (response.ok) {
        window.location.href = '../main/index.html';
    } else {
        status.innerText = data.mensagem;
    }
}