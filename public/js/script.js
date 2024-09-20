const listarPTable = document.getElementById('listarProdutos');

document.addEventListener('DOMContentLoaded', async () => {

    const response = await fetch('/api/paginas/');
    const produtos = await response.json();
    listarProdutos(produtos);

});

const listarProdutos = (produtos) => {

    listarPTable.innerHTML = '';
    produtos.forEach(produto => {
        const tr = document.createElement('tr');

        const td_id = document.createElement('td');
        td_id.textContent = produto.id;
        tr.appendChild(td_id);

        const td_nome = document.createElement('td');
        td_nome.textContent = produto.nome;
        tr.appendChild(td_nome);

        const td_marca = document.createElement('td');
        td_marca.textContent = produto.marca;
        tr.appendChild(td_marca);

        const td_preco = document.createElement('td');
        td_preco.textContent = `R$ ${produto.preco.toFixed(2)}`;
        tr.appendChild(td_preco);

        const td_qtde = document.createElement('td');
        td_qtde.textContent = produto.quantidade;
        td_qtde.classList.add('text-center');
        tr.appendChild(td_qtde);

        const td_img = document.createElement('td');
        if (produto.img_produto) {
            const img = document.createElement('img');
            img.src = produto.img_produto;
            img.alt = produto.nome;
            img.width = 100; // Definindo o tamanho da imagem
            td_img.appendChild(img);
        }
        tr.appendChild(td_img);

        const td_acao = document.createElement('td');
        let btnEditar = document.createElement('a');
        btnEditar.classList.add('btn', 'btn-warning', 'me-3');
        btnEditar.href = `editar.html?id=${produto.id}`;
        btnEditar.textContent = 'EDITAR';
        td_acao.appendChild(btnEditar);

        let btnExcluir = document.createElement('button');
        btnExcluir.classList.add('btn', 'btn-danger', 'me-3');
        btnExcluir.textContent = 'EXCLUIR';
        btnExcluir.dataset.id = produto.id;
        btnExcluir.dataset.name = produto.nome;
        td_acao.appendChild(btnExcluir);
        td_acao.classList.add('text-center');

        tr.appendChild(td_acao);

        listarPTable.appendChild(tr);

    });

};

const delProduto = async (id) => {
    await fetch(`/api/paginas/${id}`, {
        method: 'DELETE',
    });

    alert("Produto excluído com Sucesso!!");
    window.location.href = '/listar';
};

document.addEventListener('click', (e) => {
    let result = e.target.classList.contains('btn-danger');
    if (result) {
        const id_ex = e.target.getAttribute('data-id');
        const nome_ex = e.target.getAttribute('data-name');
        let ok = confirm(`Tem certeza que deseja excluir o produto: ${nome_ex}?`);
        if (ok) {
            delProduto(id_ex);
        } else {
            exibirProdutos();
        }
    }

});