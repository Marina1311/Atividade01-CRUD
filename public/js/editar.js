const form_edit = document.getElementById('editar_produto');
const url = new URLSearchParams(window.location.search);
const id_url = url.get('id');

let id = document.getElementById('id_edit');
let nome = document.getElementById('nome');
let marca = document.getElementById('marca');
let preco = document.getElementById('preco');
let qtde = document.getElementById('qtde');
let descricao = document.getElementById('descricao');
let img_prod = document.getElementById('img_prod');


document.addEventListener('DOMContentLoaded', async () => {  

    const response = await fetch('api/paginas');
    const produtos = await response.json();
    const produto = produtos.find(produto => produto.id == id_url);

    if (produto) {
        id.value = produto.id;
        nome.value = produto.nome;
        marca.value = produto.marca
        preco.value = produto.preco;
        qtde.value = produto.quantidade; 
        descricao.value = produto.descricao;
    } else {
        alert("Produto não encontrado!!");
        window.location.href = '/listar';
    }

});

form_edit.addEventListener('submit', async (e) => {

    e.preventDefault();

    const att_dados = new FormData();

    att_dados.append('nome', nome.value);
    att_dados.append('marca', marca.value);
    att_dados.append('preco', preco.value);
    att_dados.append('quantidade', qtde.value);
    att_dados.append('descricao', descricao.value);
    // Caso seja adicionado uma nova imagem
    if (img_prod.files.length > 0) {
        att_dados.append('img_prod', img_prod.files[0]);
    }

    await fetch(`/api/paginas/${id.value}`, {
        method: 'PUT',
        body: att_dados,
    });

    alert("Produto alterado com sucesso!!");
    window.location.href = '/listar';

});