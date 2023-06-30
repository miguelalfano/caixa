class LoginService {
  firebaseUrl = "https://users-992a2-default-rtdb.firebaseio.com/users.json";

  constructor() {}

  async carregar() {
    try {
      let response = await fetch(this.firebaseUrl);
      let data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async novoUsuario(dados) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    };
    const response = await fetch(this.firebaseUrl, requestOptions);

    let data = await response.json();
    return data;
  }
}
