const modals = document.querySelectorAll(".modal");
const btnsOpenModal = document.querySelectorAll("[data-openmodal]")

// Uma função de código para pegar todos os botões com o data atribbute e fazer um querySelector no valor do data que será o do modal que ele quer abrir, com isso ele adiciona a classe show para ele, o tornando visivel

btnsOpenModal.forEach(btn => {
    btn.addEventListener("click", () => {
      let modal = document.querySelector(btn.dataset.openmodal);
      modal.classList.add("show");
    });
  });
  
  modals.forEach(modal => {
    const closeBtn = modal.querySelector(".closeBtn");
    closeBtn?.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  });
  
