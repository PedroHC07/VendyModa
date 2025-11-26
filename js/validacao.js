function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function validarEmail(email) {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(text, type = 'error') {
    const container = document.getElementById('contato-messages');
    if (!container) return;
    container.innerHTML = '';

    const div = document.createElement('div');
    div.className = `contato-message ${type}`;
    div.setAttribute('role', 'status');

    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerText = type === 'success' ? '✓' : '⚠';

    const txt = document.createElement('div');
    txt.className = 'message-text';
    txt.innerHTML = text;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'close';
    btn.setAttribute('aria-label', 'Fechar mensagem');
    btn.innerText = '✕';
    btn.addEventListener('click', () => {
        if (container.contains(div)) container.removeChild(div);
    });

    div.appendChild(icon);
    div.appendChild(txt);
    div.appendChild(btn);
    container.appendChild(div);

    // Auto dismiss after 6 seconds
    setTimeout(() => {
        if (container.contains(div)) container.removeChild(div);
    }, 6000);
}

function initContatoValidation() {
    const form = document.getElementById('formContato');
    if (!form) return;

    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nomeEl = document.getElementById('nome');
        const assuntoEl = document.getElementById('assunto');
        const mensagemEl = document.getElementById('mensagem');

        const nome = nomeEl ? nomeEl.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const cpf = cpfInput ? cpfInput.value.trim() : '';
        const assunto = assuntoEl ? assuntoEl.value.trim() : '';
        const mensagem = mensagemEl ? mensagemEl.value.trim() : '';

        const errors = [];
        if (!nome) errors.push('O nome é obrigatório.');
        if (!validarEmail(email)) errors.push('Informe um e-mail válido.');
        if (!validarCPF(cpf)) errors.push('Informe um CPF válido.');
        if (!assunto) errors.push('O assunto é obrigatório.');
        if (!mensagem) errors.push('A mensagem é obrigatória.');

        if (errors.length > 0) {
            showMessage(errors.join('<br>'), 'error');
            if (emailInput) emailInput.setAttribute('aria-invalid', 'true');
            if (cpfInput) cpfInput.setAttribute('aria-invalid', 'true');
            return;
        }

        showMessage('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
        form.reset();
        if (emailInput) emailInput.removeAttribute('aria-invalid');
        if (cpfInput) cpfInput.removeAttribute('aria-invalid');
    });

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (validarEmail(emailInput.value.trim())) {
                emailInput.removeAttribute('aria-invalid');
            }
        });
    }

    if (cpfInput) {
        cpfInput.addEventListener('input', () => {
            if (validarCPF(cpfInput.value.trim())) {
                cpfInput.removeAttribute('aria-invalid');
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContatoValidation);
} else {
    initContatoValidation();
}
