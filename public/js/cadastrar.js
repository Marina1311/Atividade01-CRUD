const cadastro = document.getElementById('cadastro');

let nome = document.getElementById('nome');
let marca = document.getElementById('marca');
let preco = document.getElementById('preco');
let qtde = document.getElementById('qtde');
let descricao = document.getElementById('descricao');
let img_prod = document.getElementById('img_prod');

cadastro.addEventListener('submit', async (e) => {

    e.preventDefault();

    const carregarDados = new FormData();

    carregarDados.append('nome', nome.value);
    carregarDados.append('marca', marca.value);
    carregarDados.append('preco', preco.value);
    carregarDados.append('quantidade', qtde.value);
    carregarDados.append('descricao', descricao.value);
    carregarDados.append('img_prod', img_prod.files[0]);

    await fetch('/api/paginas', {
        method: 'POST',
        body: carregarDados,
    });

    window.location.href = '/admin';

});
