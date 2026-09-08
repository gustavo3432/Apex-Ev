document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu Mobile Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. Filtro de Categorias de Carros
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            carCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 3. Seletor de Cores do Card (Personalizador Interativo)
    const colorDots = document.querySelectorAll('.dot');

    colorDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const parentPicker = e.target.closest('.color-picker');
            parentPicker.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
            e.target.classList.add('active');

            const chosenColor = e.target.getAttribute('data-color');
            const card = e.target.closest('.card');
            
            card.style.borderColor = chosenColor;
            card.querySelector('.card-title').style.color = chosenColor;
        });
    });

    // 4. Simulador de Autonomia (Cálculo Dinâmico)
    const speedRange = document.getElementById('speed-range');
    const tempRange = document.getElementById('temp-range');
    const speedVal = document.getElementById('speed-val');
    const tempVal = document.getElementById('temp-val');
    const rangeResult = document.getElementById('range-result');

    function updateAutonomy() {
        if (!speedRange || !tempRange) return;

        const speed = parseInt(speedRange.value);
        const temp = parseInt(tempRange.value);

        speedVal.innerText = `${speed} km/h`;
        tempVal.innerText = `${temp}°C`;

        let baseAutonomy = 550;

        // Ajuste por velocidade
        if (speed > 80) {
            baseAutonomy -= (speed - 80) * 2.2;
        } else if (speed < 60) {
            baseAutonomy += 30;
        }

        // Ajuste por temperatura
        if (temp < 10) {
            baseAutonomy -= (10 - temp) * 3;
        } else if (temp > 30) {
            baseAutonomy -= (temp - 30) * 2;
        }

        rangeResult.innerText = `${Math.round(baseAutonomy)} km`;
    }

    if (speedRange && tempRange) {
        speedRange.addEventListener('input', updateAutonomy);
        tempRange.addEventListener('input', updateAutonomy);
    }

    // 5. Modal Interativo de Agendamento
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModal = document.getElementById('close-modal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const modalCarTitle = document.getElementById('modal-car-title');
    const bookingForm = document.getElementById('booking-form');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const carName = btn.getAttribute('data-car');
            modalCarTitle.innerText = `Agendar Test Drive: ${carName}`;
            modalOverlay.classList.add('active');
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Solicitação enviada com sucesso! Um consultor Apex EV entrará em contato.');
            modalOverlay.classList.remove('active');
            bookingForm.reset();
        });
    }

});
