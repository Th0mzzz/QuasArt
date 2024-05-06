const modals = document.querySelectorAll(".modal");
const btnsOpenModal = document.querySelectorAll("[data-openmodal]")


btnsOpenModal.forEach(btn => {
console.log(btn)
    btn.addEventListener("click", () => {
      let modalSelecionado = document.querySelector(btn.dataset.openmodal);
      console.log(modalSelecionado)
      modalSelecionado.classList.add("show");
    });

  });
  
  modals.forEach(modal => {
    const closeBtn = modal.querySelector(".closeBtn");
    closeBtn?.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  });
  
