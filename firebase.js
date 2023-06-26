class Firebase {
  constructor() {}

  async carregarUsuarios() {
    let response = await fetch(
      "https://users-992a2-default-rtdb.firebaseio.com/users.json"
    );
    let data = response.json();
    console.log(data);
    return data;
  }

  async carregarUltimoIdUsuario() {
    // Consulta o banco de dados para verificar se há registros
    let response = await fetch(
      "https://users-992a2-default-rtdb.firebaseio.com/users.json"
    );

    let data = await response.json();

    console.log(data);

    if (data === null) {
      // Se o banco estiver vazio, reinicia a contagem
      return 0;
    } else {
      // Se houver registros, encontra o maior ID existente
      var ids = Object.keys(data);

      var ultimoHashFirebase = ids[ids.length - 1];

      return data[ultimoHashFirebase].id;
    }
  }

  async carregarProdutos() {}

  async carregarVendas() {}

  async salvarVendas() {}

  async salvarUsuario(user) {
    let response = await fetch(
      "https://users-992a2-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify({
          id: user.ultimoId,
          nome: user.nome,
          senha: user.senha,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let data = await response.json();

    return data;
  }


  async adicionar(data) {
    try {
      let response = await fetch(
        "https://pcd1-7b97c-default-rtdb.firebaseio.com/data.json",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error("Erro ao adicionar produto no Firebase: " + error);
    }
  }
}
