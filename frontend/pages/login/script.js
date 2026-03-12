const submit_btn = document.getElementById('submit-btn');

const API_URL = "http://192.168.0.150:3000";

const submit = async () => {
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
        window.location.href = data.redirectUrl;
    } else {
        status.innerText = data.mensagem;
    }
}