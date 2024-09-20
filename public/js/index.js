const listarPtable = document.getElementById("list");

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/paginas');
    const produtos = await response.json();
    listarProdutos(produtos);
});

const pesquisar = document.getElementById("pesquisar");
pesquisar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const response = await fetch('/api/paginas');
    const produtos = await response.json();
    const pesquisa = document.getElementById("pesquisar_prod").value.toLowerCase();
    const prod_filter = produtos.filter(produto => produto.nome.toLowerCase().includes(pesquisa));
    listarProdutos(prod_filter);
});

const listarProdutos = (produtos) => {
    listarPtable.innerHTML = '';

    produtos.forEach(produto => {
        // Criar a coluna
        let col = document.createElement('div');
        col.classList.add('col');
        col.setAttribute('ontouchstart', "this.classList.toggle('hover');");

        // Criar o container
        let container = document.createElement('div');
        container.classList.add('container');
        col.appendChild(container);

        // Front
        let front = document.createElement('div');
        front.classList.add('front');
        front.style.backgroundImage = `url(${produto.img_produto})`;
        container.appendChild(front);

        let innerFront = document.createElement('div');
        innerFront.classList.add('inner');
        front.appendChild(innerFront);

        let nomeProduto = document.createElement('p');
        nomeProduto.textContent = produto.nome;
        innerFront.appendChild(nomeProduto);

        let marcaProduto = document.createElement('span');
        marcaProduto.textContent = produto.marca;
        innerFront.appendChild(marcaProduto);

        // Back
        let back = document.createElement('div');
        back.classList.add('back');
        container.appendChild(back);

        let innerBack = document.createElement('div');
        innerBack.classList.add('inner');
        back.appendChild(innerBack);

        let preco = document.createElement('p');
        preco.classList.add('card-text');
        preco.innerHTML = `<strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}`;
        innerBack.appendChild(preco);

        let qtde = document.createElement('p');
        qtde.classList.add('card-text');
        qtde.innerHTML = `<strong>Quantidade:</strong> ${produto.quantidade}`;
        innerBack.appendChild(qtde);

        let descricao = document.createElement('p');
        descricao.classList.add('card-text');
        descricao.innerHTML = `<strong>Descrição:</strong> ${produto.descricao}`;
        innerBack.appendChild(descricao);

        // Button group
        let divButtonGroup = document.createElement('div');
        divButtonGroup.classList.add('button-group');
        innerBack.appendChild(divButtonGroup);

        let btnCurtir = document.createElement('a');
        btnCurtir.classList.add('btn', 'btn-success', 'me-3');
        btnCurtir.href = '#';
        btnCurtir.textContent = 'CURTIR';
        divButtonGroup.appendChild(btnCurtir);

        let contagemCurtir = document.createElement('span');
        contagemCurtir.classList.add('contagem');
        contagemCurtir.textContent = '0'; 
        divButtonGroup.appendChild(contagemCurtir);

        let contagem = 0;

        btnCurtir.addEventListener('click', (e) => {
            e.preventDefault();

            contagem++;
            contagemCurtir.textContent = contagem;
        });

        // Uncomment this block if you want to add the delete button
        /*
        let btnExcluir = document.createElement('button');
        btnExcluir.classList.add('btn', 'btn-danger', 'me-3');
        btnExcluir.textContent = 'EXCLUIR';
        btnExcluir.dataset.id = produto.id;
        btnExcluir.dataset.name = produto.nome;
        divButtonGroup.appendChild(btnExcluir);
        */

        listarPtable.appendChild(col);
    });
};


const delProduto = async (id) => {
    await fetch(`/api/paginas/${id}`, {
        method: 'DELETE',
    });

    alert("Produto Excluído com Sucesso!");
    window.location.href = 'listar.html';
};

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-danger')) {
        const id_ex = e.target.getAttribute('data-id');
        const nome_ex = e.target.getAttribute('data-name');
        let ok = confirm(`Tem certeza que deseja excluir este produto: ${nome_ex}?`);
        if (ok) {
            delProduto(id_ex);
        }
    }
});