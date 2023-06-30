var lastUserId = 0;

async function adicionarUsuario() {
  // Capturar os valores do formulário
  var nome = document.getElementById("modal-nome").value;
  var senha = document.getElementById("modal-senha").value;

  // Incrementar o userId
  lastUserId += 1;
  // Dados a serem adicionados
  var dados = {
    userId: lastUserId,
    nome: nome,
    senha: senha,
  };

  // Configurar a requisição POST
  // Enviar a requisição POST para o Firebase
  try {
    const usuarioCadastrado = await new LoginService().novoUsuario(dados);
    console.log(usuarioCadastrado);
  } catch (e) {
    alert("Ocorreu um erro ao cadastrar um novo usuário");
  }
}

async function login() {
  localStorage.removeItem('user')
  var nome = document.getElementById("nome").value;
  var senha = document.getElementById("senha").value;

  console.log(nome, senha);

  if (nome === "" || senha === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  try {
    // Carrega os usuários do Firebase Realtime Database

    const usuariosFirebase = await new LoginService().carregar();

    if (usuariosFirebase) {
      // Verifica se o usuário existe nos dados carregados

      let idsDosUsuarios = Object.keys(usuariosFirebase)

      let usuarioEncontrado = null
      for (let index = 0; index < idsDosUsuarios.length; index++) {
        let u = Object.values(usuariosFirebase)[index]

        if (u.nome === nome && u.senha === senha) {          
          
          u.id = idsDosUsuarios[index]
          usuarioEncontrado = u
        }        
      }

      if (usuarioEncontrado) {
        // Redireciona para outra página HTML
        delete usuarioEncontrado.senha;
        localStorage.setItem("user", JSON.stringify(usuarioEncontrado));
        window.location.href = "./../caixa/caixa.html";
      } else {
        alert("Este usuário não existe");
        // Limpa os campos de nome e senha
        document.getElementById("nome").value = "";
        document.getElementById("senha").value = "";
      }
    } else {
      alert("Não existem usuários cadastrados");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao carregar os usuários:", error);
  }
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
  var senhaInput = document.getElementById("senha");
  var eyeIcon = document.getElementById("eye");

  if (senhaInput.type === "password") {
    senhaInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    senhaInput.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}
