function produtos() {
  window.location.href = "./../produto/produtos.html";
}

function bye() {
  localStorage.removeItem("user");
  window.location.href = "./../index.html";
}

function preencherOpcoes() {
  var codigoBarrasSelect = document.getElementById("codigoBarras");
  var nomeSelect = document.getElementById("nome");

  // Fazer a requisição para o Firebase e obter os dados dos produtos
  fetch("https://pcd1-7b97c-default-rtdb.firebaseio.com/data/.json")
    .then((response) => response.json())
    .then((data) => {
      // Limpar as opções existentes
      codigoBarrasSelect.innerHTML = "";
      nomeSelect.innerHTML = "";

      // Adicionar as opções dos produtos
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const produto = data[key];

          const codigoBarrasOption = document.createElement("option");
          codigoBarrasOption.value = produto.codigoBarras;
          codigoBarrasOption.textContent = produto.codigoBarras;
          codigoBarrasSelect.appendChild(codigoBarrasOption);

          const nomeOption = document.createElement("option");
          nomeOption.value = key;
          nomeOption.textContent = produto.nome;
          nomeSelect.appendChild(nomeOption);
        }
      }

      // Adicionar evento de clique para alterar os selects
      codigoBarrasSelect.addEventListener("change", function () {
        var selectedIndex = codigoBarrasSelect.selectedIndex;
        nomeSelect.selectedIndex = selectedIndex;
      });

      nomeSelect.addEventListener("change", function () {
        var selectedIndex = nomeSelect.selectedIndex;
        codigoBarrasSelect.selectedIndex = selectedIndex;
      });
    })
    .catch((error) => {
      console.error("Ocorreu um erro:", error);
    });
}

async function registrarVenda() {
  var codigoBarrasSelect = document.getElementById("codigoBarras");
  var nomeSelect = document.getElementById("nome");
  var qtdeInput = document.getElementById("qtde");

  // Obter as informações da venda
  var codigoBarras = codigoBarrasSelect.value;
  var produtoKey = nomeSelect.value;
  var qtdeVenda = parseInt(qtdeInput.value);

  // Fazer a requisição para o Firebase e obter os dados do produto
  const produtoFirebase = await new ProdutoService().buscar(produtoKey);

  // Subtrair a quantidade da venda da quantidade existente no banco de dados
  var qtdeAtual = produtoFirebase.qtde;
  var novaQtde = qtdeAtual - qtdeVenda;

  if (novaQtde >= 0) {
    // Atualizar a quantidade do produto no banco de dados

    const qtdeAtualizada = await new ProdutoService().atualizarQuantidade(
      produtoKey, novaQtde
    );

    console.log("Quantidade atualizada com sucesso:", qtdeAtualizada);

    // Criar um novo registro de venda
    criarRegistroVenda(
      codigoBarras,
      nomeSelect.options[nomeSelect.selectedIndex].text,
      qtdeVenda
    );

    // Exibir os dados da venda
    console.log("Código de Barras:", codigoBarras);
    console.log("Nome:", nomeSelect.options[nomeSelect.selectedIndex].text);
    console.log("Quantidade da Venda:", qtdeVenda);

    // Adicionar a venda na tabela
    adicionarVenda(
      codigoBarras,
      nomeSelect.options[nomeSelect.selectedIndex].text,
      qtdeVenda,
      qtdeAtual - novaQtde
    );

    // Fechar o modal após a venda ser registrada
    ("myModal");
  } else {
    alert(
      "A quantidade de sua venda é maior do que a quantidade atual do produto."
    );
  }
}

var meuInput = document.getElementById("qtde");

meuInput.addEventListener("input", function () {
  if (meuInput.value < 0) {
    meuInput.value = "";
  }
});

async function criarRegistroVenda(codigoBarras, nomeProduto, qtdeVenda) {
  var user = JSON.parse(localStorage.getItem("user"));
  console.log(user)

  const vendas = await new CaixaService().carregar();
  // Obter a quantidade existente do produto
  var quantidadeExistente = vendas[codigoBarras]
    ? vendas[codigoBarras].quantidade
    : 0;

  // Calcular a nova quantidade
  var novaQuantidade = quantidadeExistente + qtdeVenda;

  // Criar o objeto JSON com os dados atualizados
  var vendaData = {
    codigoBarras: codigoBarras,
    nome: nomeProduto,
    quantidade: novaQuantidade,
    numVenda: Math.floor(Math.random() * 1000) + 1,
    user_id: user.id, // Adicionar o ID do usuário à venda
  };

  // Enviar a requisição POST para adicionar o registro de venda atualizado
  const novaVenda = await new CaixaService().nova(vendaData)
}

function adicionarVenda(codigoBarras, nome, qtdeVenda, numVenda) {
  var tableBody = document.querySelector("#vendas tbody");

  var row = document.createElement("tr");
  var codigoBarrasCell = document.createElement("td");
  var nomeCell = document.createElement("td");
  var qtdeCell = document.createElement("td");
  var numCell = document.createElement("td");

  codigoBarrasCell.textContent = codigoBarras;
  nomeCell.textContent = nome;
  qtdeCell.textContent = qtdeVenda;
  numCell.textContent = numVenda;

  row.appendChild(codigoBarrasCell);
  row.appendChild(nomeCell);
  row.appendChild(qtdeCell);
  row.appendChild(numCell);

  tableBody.appendChild(row);
}

async function exibirVendas() {
  const user = JSON.parse(localStorage.getItem("user"))
  var tableBody = document.querySelector("#vendas tbody");

  // Fazer a requisição para o Firebase e obter os dados das vendas

  const vendas = await new CaixaService().filtrarPorUsuario(user.id)
  console.log(vendas)

  // Limpar as vendas existentes
  tableBody.innerHTML = "";

  // Adicionar as vendas do usuário logado na tabela
  for (const key in vendas) {
    if (Object.hasOwnProperty.call(vendas, key)) {
      const venda = vendas[key];

      // Verificar se a venda pertence ao usuário logado
      if (venda.userId === userId) {
        var row = document.createElement("tr");
        var codigoBarrasCell = document.createElement("td");
        var nomeCell = document.createElement("td");
        var qtdeCell = document.createElement("td");
        var numCell = document.createElement("td");

        codigoBarrasCell.textContent = venda.codigoBarras;
        nomeCell.textContent = venda.nome;
        qtdeCell.textContent = venda.quantidade;
        numCell.textContent = venda.numVenda;

        row.appendChild(codigoBarrasCell);
        row.appendChild(nomeCell);
        row.appendChild(qtdeCell);
        row.appendChild(numCell);

        tableBody.appendChild(row);
      }
    }
  }
}

// Executar as funções de inicialização
preencherOpcoes();
exibirVendas().then((r) => {console.log(r)})

//console.log(new CaixaService().filtrarPorUsuario("-NZCe85TeOzWFrstdtGa"))
