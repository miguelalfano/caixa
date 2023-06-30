class ProdutoService {
  produtoFirebaseUrl = "https://pcd1-7b97c-default-rtdb.firebaseio.com/data/";

  constructor() {}

  async carregar() {
    try {
      const response = await fetch(this.produtoFirebaseUrl + ".json");
      let responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error("Erro ao carregar os produto no Firebase: " + error);
    }
  }

  async buscar(produtoKey) {
    try {
      const response = await fetch(`${this.produtoFirebaseUrl}${produtoKey}.json`);
      let responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error("Erro ao carregar os produto no Firebase: " + error);
    }
  }

  async adicionar(data) {
    try {
      let response = await fetch(this.produtoFirebaseUrl + ".json", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error("Erro ao adicionar produto no Firebase: " + error);
    }
  }

  async atualizarQuantidade(produtoKey, novaQtde) {
    try {
      const response = await fetch(`${this.produtoFirebaseUrl}${produtoKey}/qtde.json`, {
        method: "PUT",
        body: JSON.stringify(novaQtde),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error("Erro ao carregar os produto no Firebase: " + error);
    }
  }
}
