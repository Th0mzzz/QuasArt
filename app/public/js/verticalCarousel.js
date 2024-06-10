const verticalCarouselsContainers = document.querySelectorAll(".vertical-carousel__container");

verticalCarouselsContainers.forEach(container => {
    const cards = container.querySelectorAll("[data-verticalCard]");
    const allPrevious = container.querySelectorAll(".previous");
    const allNext = container.querySelectorAll(".next");
    let indexAtual = 0;

    const atualizarCard = (arrayCard) => {
        arrayCard.forEach((card, indexCard) => {
            card.style.transform = `translateY(-${indexAtual * 100}%)`;
            if (indexCard === indexAtual) {
                card.classList.add("active");
            } else {
                card.classList.remove("active");
            }
        });

        // Atualizar estado dos botões
        allPrevious.forEach(previous => {
            if (indexAtual === 0) {
                previous.disabled = true;
            } else {
                previous.disabled = false;
            }
        });

        allNext.forEach(next => {
            if (indexAtual === cards.length - 1) {
                next.disabled = true;
            } else {
                next.disabled = false;
            }
        });
    };

    allNext.forEach(next => {
        next.addEventListener('click', () => {
            if (indexAtual < cards.length - 1) {
                indexAtual++;
                atualizarCard(cards);
            }
        });
    });

    allPrevious.forEach(previous => {
        previous.addEventListener('click', () => {
            if (indexAtual > 0) {
                indexAtual--;
                atualizarCard(cards);
            }
        });
    });

    atualizarCard(cards); // Inicializar o estado dos cartões e botões
});
