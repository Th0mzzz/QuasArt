const modals = document.querySelectorAll(".modal");

modals.forEach(modal => {
    const closeBtn = modal.querySelector(".closeBtn");

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    })
})
