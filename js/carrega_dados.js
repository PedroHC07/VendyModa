document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('dados-table');
    if (!table) return;
    const tbody = table.querySelector('tbody');

    fetch('dados.json')
        .then(function (resp) {
            if (!resp.ok) throw new Error('Falha ao carregar dados.json');
            return resp.json();
        })
        .then(function (data) {
            if (!Array.isArray(data)) return;
            tbody.innerHTML = '';
            data.forEach(function (item) {
                const tr = document.createElement('tr');

                const tdImg = document.createElement('td');
                const img = document.createElement('img');
                img.src = item.imagem || '';
                img.alt = item.nome || '';
                img.style.width = '80px';
                tdImg.appendChild(img);

                const tdNome = document.createElement('td'); tdNome.textContent = item.nome || '';
                const tdCat = document.createElement('td'); tdCat.textContent = item.categoria || '';
                const tdPreco = document.createElement('td'); tdPreco.textContent = item.preco || '';
                const tdDisp = document.createElement('td'); tdDisp.textContent = item.disponibilidade || '';

                tr.appendChild(tdImg);
                tr.appendChild(tdNome);
                tr.appendChild(tdCat);
                tr.appendChild(tdPreco);
                tr.appendChild(tdDisp);

                tbody.appendChild(tr);
            });
        })
        .catch(function (err) {
            tbody.innerHTML = '<tr><td colspan="5">Erro ao carregar dados: ' + (err.message || '') + '</td></tr>';
            console.error(err);
        });
});
