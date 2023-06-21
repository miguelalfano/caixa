function produtos() {
  window.location.href = "produtos.html";
}

function bye() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}






function openModal(nomeModal) {
  var myModal = document.getElementById(nomeModal);
  myModal.style.display = "block";
  myModal.classList.add("fade-in");
}

function closeModal(nomeModal) {
  var myModal = document.getElementById(nomeModal);
  myModal.classList.remove("fade-in");
  myModal.classList.add("fade-out");
  setTimeout(function () {
    myModal.style.display = "none";
    myModal.classList.remove("fade-out");
  }, 500);
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






function registrarVenda() {
  var codigoBarrasSelect = document.getElementById("codigoBarras");
  var nomeSelect = document.getElementById("nome");
  var qtdeInput = document.getElementById("qtde");

  // Obter as informações da venda
  var codigoBarras = codigoBarrasSelect.value;
  var produtoKey = nomeSelect.value;
  var qtdeVenda = parseInt(qtdeInput.value);

  // Fazer a requisição para o Firebase e obter os dados do produto
  fetch(
    `https://pcd1-7b97c-default-rtdb.firebaseio.com/data/${produtoKey}.json`
  )
    .then((response) => response.json())
    .then((data) => {
      // Subtrair a quantidade da venda da quantidade existente no banco de dados
      var qtdeAtual = data.qtde;
      var novaQtde = qtdeAtual - qtdeVenda;

      if (novaQtde >= 0) {
        // Atualizar a quantidade do produto no banco de dados
        fetch(
          `https://pcd1-7b97c-default-rtdb.firebaseio.com/data/${produtoKey}/qtde.json`,
          {
            method: "PUT",
            body: JSON.stringify(novaQtde),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Quantidade atualizada com sucesso:", data);

            // Criar um novo registro de venda
            criarRegistroVenda(
              codigoBarras,
              nomeSelect.options[nomeSelect.selectedIndex].text,
              qtdeVenda
            );

            // Exibir os dados da venda
            console.log("Código de Barras:", codigoBarras);
            console.log(
              "Nome:",
              nomeSelect.options[nomeSelect.selectedIndex].text
            );
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
          })
          .catch((error) => {
            console.error("Ocorreu um erro ao atualizar a quantidade:", error);
          });
      } else {
        alert(
          "Quantidade da venda é maior do que a quantidade atual do produto."
        );
      }
    })
    .catch((error) => {
      console.error("Ocorreu um erro:", error);
    });
}






function criarRegistroVenda(codigoBarras, nomeProduto, qtdeVenda) {
  fetch("https://vendas-6437d-default-rtdb.firebaseio.com/.json")
    .then((response) => response.json())
    .then((data) => {
      // Obter a quantidade existente do produto
      var quantidadeExistente = data[codigoBarras]
        ? data[codigoBarras].quantidade
        : 0;

      // Calcular a nova quantidade
      var novaQuantidade = quantidadeExistente + qtdeVenda;

      // Criar o objeto JSON com os dados atualizados
      var vendaData = {
        codigoBarras: codigoBarras,
        nome: nomeProduto,
        quantidade: novaQuantidade,
        numVenda: Math.floor(Math.random() * 1000) + 1,
      };

      // Enviar a requisição POST para adicionar o registro de venda atualizado
      fetch("https://vendas-6437d-default-rtdb.firebaseio.com/vendas.json", {
        method: "POST",
        body: JSON.stringify(vendaData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Registro de venda criado com sucesso:", data);
        })
        .catch((error) => {
          console.error("Ocorreu um erro ao criar o registro de venda:", error);
        });
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao obter os dados existentes:", error);
    });
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






function exibirVendas() {
  var tableBody = document.querySelector("#vendas tbody");

  // Fazer a requisição para o Firebase e obter os dados das vendas
  fetch("https://vendas-6437d-default-rtdb.firebaseio.com/vendas.json")
    .then((response) => response.json())
    .then((data) => {
      // Limpar as vendas existentes
      tableBody.innerHTML = "";

      // Adicionar as vendas na tabela
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const venda = data[key];

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
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao obter as vendas:", error);
    });
}

// Executar as funções de inicialização
preencherOpcoes();
exibirVendas();
