async function adicionarUsuario() {
  var nome = document.getElementById("modal-nome").value;
  var senha = document.getElementById("modal-senha").value;

  let ultimoId = await new Firebase().carregarUltimoIdUsuario();

  ultimoId++;

  let usuarioParaSerSalvo = {
    id: ultimoId,
    nome: nome,
    senha: senha,
  };

  let data = await new Firebase().salvarUsuario(usuarioParaSerSalvo);

  console.log("Registro de usuário criado com sucesso:", data);
  alert("Usuário cadastrado com sucesso!");
  fecharModal();
  document.getElementById("modal-nome").value = "";
  document.getElementById("modal-senha").value = "";

  // Cadastra o usuário no banco de dados com o novo ID
}

async function login() {
  var nome = document.getElementById("nome").value;
  var senha = document.getElementById("senha").value;

  console.log(nome, senha);

  if (nome === "" || senha === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  let data = await new Firebase().carregarUsuarios();

  const usuarios = Object.values(data);
  const usuarioExistente = usuarios.find(
    (usuario) => usuario.nome === nome && usuario.senha === senha
  );

  if (usuarioExistente) {
    // Redireciona para outra aba em HTML

    delete usuarioExistente.senha;
    localStorage.setItem("user", usuarioExistente);
    window.location.href = "./../caixa/caixa.html";
  } else {
    alert("Este usuário não existe");
    // Limpa os campos de nome e senha
    document.getElementById("nome").value = "";
    document.getElementById("senha").value = "";
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