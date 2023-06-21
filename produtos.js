fetch("https://pcd1-7b97c-default-rtdb.firebaseio.com/data/.json")
  .then((response) => response.json())
  .then((data) => {
    // Manipular os dados recebidos
    const tableBody = document.querySelector("#data tbody");

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const item = data[key];

        const row = document.createElement("tr");
        const barcodeCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const quantityCell = document.createElement("td");

        barcodeCell.textContent = item.codigoBarras;
        nameCell.textContent = item.nome;
        quantityCell.textContent = item.qtde;

        row.appendChild(barcodeCell);
        row.appendChild(nameCell);
        row.appendChild(quantityCell);

        tableBody.appendChild(row);
      }
    }

    // Inicializar o DataTable
    $(document).ready(function () {
      $("#data").DataTable();
    });
  })
  .catch((error) => {
    console.error("Ocorreu um erro:", error);
  });

  function voltar() {
    // Redirecionar para a outra página
    window.location.href = "caixa.html";
  }