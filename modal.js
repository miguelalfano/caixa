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

module.exports = {
  openModal: openModal,
  closeModal: closeModal,
};
