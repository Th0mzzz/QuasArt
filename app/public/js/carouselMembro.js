

const cards = document.querySelectorAll(".card__membro")
let indexAtual = 0;

function atualizarCard() {
    cards.forEach((card, indexCard) => {
        card.style.transform = `translateX(-${indexAtual * 100}%)`;

        if (indexCard === indexAtual) {
            card.classList.add("active")
        } else {
            card.classList.remove("active")
        }
    })
}
document.getElementById('previous').addEventListener('click', () => {
    indexAtual = (indexAtual - 1 + cards.length) % cards.length;
    atualizarCard();
});
document.getElementById('next').addEventListener('click', () => {
    indexAtual = (indexAtual + 1) % cards.length;
    atualizarCard();
});


atualizarCard()
