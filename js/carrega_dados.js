document.addEventListener('DOMContentLoaded', async () => {
    const tabelaProdutos = document.querySelector('#produtos-table tbody');
    const tabelaDados = document.querySelector('#dados-table tbody');

    try {
        const resp = await fetch('dados.json');
        if (!resp.ok) throw new Error('Falha ao carregar dados.json');
        const data = await resp.json();

        if (tabelaProdutos) {
            tabelaProdutos.innerHTML = '';
            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><img src="${item.imagem}" alt="${item.nome}" style="width:80px"></td>
                    <td>${item.nome}</td>
                    <td>${item.categoria}</td>
                    <td>R$ ${parseFloat(item.preco).toFixed(2).replace('.', ',')}</td>
                    <td>${item.disponibilidade}</td>
                `;
                tabelaProdutos.appendChild(tr);
            });
        }

        if (tabelaDados) {
            tabelaDados.innerHTML = '';
            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><img src="${item.imagem}" alt="${item.nome}" style="width:80px"></td>
                    <td>${item.nome}</td>
                    <td>${item.categoria}</td>
                    <td>R$ ${parseFloat(item.preco).toFixed(2).replace('.', ',')}</td>
                    <td>${item.disponibilidade}</td>
                `;
                tabelaDados.appendChild(tr);
            });
        }
    } catch (err) {
        if (tabelaProdutos) tabelaProdutos.innerHTML = `<tr><td colspan="5">Erro: ${err.message}</td></tr>`;
        if (tabelaDados) tabelaDados.innerHTML = `<tr><td colspan="5">Erro: ${err.message}</td></tr>`;
        console.error(err);
    }
});
