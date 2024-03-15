document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card__membro');
    let currentIndex = 0;

    function updateCards() {
        const width = window.innerWidth;
        cards.forEach((card, index) => {
            card.style.display = 'none'; // Esconde todos os cards inicialmente
        });

        if (width > 768) { // Para desktops
            // Mostra o card atual
            cards[currentIndex].style.display = 'block';
            // Tenta mostrar os próximos dois cards, se existirem
            if (cards[currentIndex + 1]) {
                cards[currentIndex + 1].style.display = 'block';
            }
            if (cards[currentIndex + 2]) {
                cards[currentIndex + 2].style.display = 'block';
            }
        } else { // Para celulares
            // Mostra apenas o card atual
            cards[currentIndex].style.display = 'block';
        }
    }

    document.getElementById('next').addEventListener('click', function () {
        if (currentIndex < cards.length - 1) {
            currentIndex += 1;
            updateCards();
        }
    });

    document.getElementById('previous').addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updateCards();
        }
    });

    // Atualiza os cards inicialmente e também ao redimensionar a janela
    updateCards();
    window.addEventListener('resize', updateCards);
});
