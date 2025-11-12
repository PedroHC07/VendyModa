document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contato-form');
    if (!form) return; // só roda em contato.html

    const emailEl = document.getElementById('email');
    const cpfEl = document.getElementById('cpf');
    const messages = document.getElementById('contato-messages');

    function showMessages(html, isError = true) {
        if (!messages) return;
        messages.innerHTML = '<div style="padding:10px;border-radius:6px;background:' + (isError ? '#ffe6e6' : '#e6ffe6') + ';color:' + (isError ? '#a00' : '#060') + '">' + html + '</div>';
    }

    cpfEl.addEventListener('input', function (e) {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = v;
    });

    form.addEventListener('submit', function (ev) {
        messages.innerHTML = '';
        const email = (emailEl.value || '').trim();
        const cpf = (cpfEl.value || '').trim();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

        const errors = [];
        if (!emailRegex.test(email)) errors.push('E-mail inválido. Use o formato joao.silva@net.com');
        if (!cpfRegex.test(cpf)) errors.push('CPF inválido. Use o formato 000.000.000-00');

        if (errors.length) {
            ev.preventDefault();
            showMessages(errors.join('<br>'), true);
            return false;
        }

        ev.preventDefault();
        showMessages('Formulário validado com sucesso! (envio simulado)', false);
        form.reset();
    });
});
