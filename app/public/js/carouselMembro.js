// primeiro ele pega todos os cards que tenham a classe .card__membro, e seta o indexAtual que é 0, ou seja, começa pelo primeiro do array
const cards = document.querySelectorAll(".card__membro")
let indexAtual = 0;

// essa função é usada para mover o carrosel, ela da um translate X em todos os cards multiplicando o indice do atual do array por -100%, ou seja, se for o primeiro do array (0), vai ser igual a translateX = 0%, se for o 3 do array(2), vai ser -200%.
function atualizarCard() {
    cards.forEach((card, indexCard) => {
        card.style.transform = `translateX(-${indexAtual * 100}%)`;
        // para saber qual que é o card ativo no momento, eu utilizo o parametro do proprio forEach, pq ai eu verifico qual é o item do array da vez e adiciona a classe active nele
        if (indexCard === indexAtual) {
            card.classList.add("active")
        } else {
            card.classList.remove("active")
        }
    })
}
// aqui a gnt adiciona nos botoes prev e next as funções de aumentar e diminuir o indexAtual, e logo em seguida, chamar a função para mover todos. se o index era 0 (0%), foi para 1 (-100%)
document.getElementById('previous').addEventListener('click', () => {
    indexAtual = (indexAtual - 1 + cards.length) % cards.length;
    atualizarCard();
});
document.getElementById('next').addEventListener('click', () => {
    indexAtual = (indexAtual + 1) % cards.length;
    atualizarCard();
});


atualizarCard()
