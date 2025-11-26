document.addEventListener('DOMContentLoaded', function () {
    const themeLink = document.getElementById('theme-link');
    const toggleButtons = document.querySelectorAll('#theme-toggle');
    if (!themeLink) return;

    function applyTheme(theme) {
        if (theme === 'dark') {
            themeLink.href = 'css/estilo-dark.css';
        } else {
            themeLink.href = 'css/estilo.css';
        }
        localStorage.setItem('vendy-theme', theme);
        toggleButtons.forEach(function (b) {
            b.textContent = theme === 'dark' ? 'Modo claro' : 'Modo escuro';
        });
    }

    const saved = localStorage.getItem('vendy-theme') || 'light';
    applyTheme(saved);

    function toggle() {
        const current = localStorage.getItem('vendy-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    }

    toggleButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            toggle();
        });
    });
});
