class CaixaService {
  firebaseVendasURL =
    "https://vendas-6437d-default-rtdb.firebaseio.com/vendas.json";

  constructor() {}

  async carregar() {
    try {
      const response = await fetch(this.firebaseVendasURL);
      let data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async filtrarPorUsuario(user_id) {
    try {
      const response = await fetch(`${this.firebaseVendasURL}?orderBy="user_id"&equalTo="${user_id}"`);
      let data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async nova(vendaData) {
    try {
      const response = await fetch(this.firebaseVendasURL, {
        method: "POST",
        body: JSON.stringify(vendaData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      console.log(data)
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
