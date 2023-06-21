//MODAIS

// Função para abrir o modal
function openModal(nomeModal) {
  var myModal = document.getElementById(nomeModal);
  myModal.style.display = "block";
  myModal.classList.add("fade-in");
}

// Função para fechar o modal
function closeModal(nomeModal) {
  var myModal = document.getElementById(nomeModal);
  myModal.classList.remove("fade-in");
  myModal.classList.add("fade-out");
  setTimeout(function () {
    myModal.style.display = "none";
    myModal.classList.remove("fade-out");
  }, 500);
}

// VERIFICANDO USUÁRIOS
function adicionarUsuario() {
    var nome = document.getElementById("modal-nome").value;
    var senha = document.getElementById("modal-senha").value;
  
    // Cadastra o usuário no banco de dados
    fetch("https://users-992a2-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      body: JSON.stringify({ nome: nome, senha: senha }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registro de usuário criado com sucesso:", data);
        alert("Usuário cadastrado com sucesso!");
        fecharModal();
        document.getElementById("nome").value = "";
        document.getElementById("senha").value = "";
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao criar o usuário:", error);
      });
  }
  
function verificarUsuario() {
  var nome = document.getElementById("nome").value;
  var senha = document.getElementById("senha").value;

  console.log(nome, senha);

  if (nome === "" || senha === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Verifica se o usuário existe no banco de dados
  fetch("https://users-992a2-default-rtdb.firebaseio.com/users.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const usuarios = Object.values(data);
      const usuarioExistente = usuarios.find(
        (usuario) => usuario.nome === nome && usuario.senha === senha
      );

      if (usuarioExistente) {
        // Redireciona para outra aba em HTML

        delete usuarioExistente.senha;
        localStorage.setItem("user", usuarioExistente);
        window.location.href = "caixa.html";
      } else {
        alert("Este usuário não existe");
        // Limpa os campos de nome e senha
        document.getElementById("nome").value = "";
        document.getElementById("senha").value = "";
      }
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao verificar o banco de dados:", error);
      alert("Este usuário não existe");
    });
}

function mostrarOcultarSenha() {
  var senhaInput = document.getElementById("senha");
  var tipoAtual = senhaInput.getAttribute("type");

  if (tipoAtual === "password") {
    senhaInput.setAttribute("type", "text");
  } else {
    senhaInput.setAttribute("type", "password");
  }
}

function eyeOnClick() {
  const passwordInput = document.querySelector("#senha");

  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  console.log(type);
  passwordInput.setAttribute("type", type);
}
  