document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Marquiz
    const marquizButtons = document.querySelectorAll('.marquiz-button');
    marquizButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            Marquiz.showModal(button.getAttribute('data-marquiz-id'));
        });
    });

    // Карусель кейсов
    const casesCarousel = {
        init() {
            this.grid = document.querySelector('.cases-grid');
            if (!this.grid) return;
            
            this.cards = Array.from(this.grid.children);
            this.cardWidth = this.cards[0].offsetWidth + 24; // ширина + gap
            
            this.setupInfiniteScroll();
            this.bindEvents();
            this.setVisibleCards(2.5);
        },

        setupInfiniteScroll() {
            // Клонируем первую и последнюю карточки
            const firstCard = this.cards[0].cloneNode(true);
            const lastCard = this.cards[this.cards.length - 1].cloneNode(true);
            this.grid.appendChild(firstCard);
            this.grid.prepend(lastCard);
            this.updateTransform(-this.cardWidth);
        },

        bindEvents() {
            this.grid.addEventListener('mousedown', this.startDrag.bind(this));
            this.grid.addEventListener('touchstart', this.startDrag.bind(this));
            this.grid.addEventListener('mousemove', this.drag.bind(this));
            this.grid.addEventListener('touchmove', this.drag.bind(this));
            this.grid.addEventListener('mouseup', this.endDrag.bind(this));
            this.grid.addEventListener('touchend', this.endDrag.bind(this));
            this.grid.addEventListener('mouseleave', this.endDrag.bind(this));
        },

        setVisibleCards(count) {
            const wrapper = this.grid.parentElement;
            wrapper.style.maxWidth = `${this.cardWidth * count}px`;
        },

        startDrag(e) {
            this.isDragging = true;
            this.startX = this.getPositionX(e);
            this.grid.style.cursor = 'grabbing';
            this.grid.style.transition = 'none';
        },

        drag(e) {
            if (!this.isDragging) return;
            e.preventDefault();
            const currentX = this.getPositionX(e);
            const diff = currentX - this.startX;
            this.updateTransform(this.currentTranslate + diff);
        },

        endDrag() {
            if (!this.isDragging) return;
            this.isDragging = false;
            this.grid.style.cursor = 'grab';
            this.grid.style.transition = 'transform 0.3s ease';
            this.snapToCard();
        },

        snapToCard() {
            const cardIndex = Math.round(Math.abs(this.currentTranslate) / this.cardWidth);
            this.updateTransform(-cardIndex * this.cardWidth);
            this.checkInfiniteScroll();
        },

        updateTransform(x) {
            this.currentTranslate = x;
            this.grid.style.transform = `translateX(${x}px)`;
        },

        getPositionX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        },

        checkInfiniteScroll() {
            if (this.currentTranslate === 0) {
                setTimeout(() => {
                    this.grid.style.transition = 'none';
                    this.updateTransform(-(this.cardWidth * this.cards.length));
                }, 300);
            } else if (this.currentTranslate === -(this.cardWidth * (this.cards.length + 1))) {
                setTimeout(() => {
                    this.grid.style.transition = 'none';
                    this.updateTransform(-this.cardWidth);
                }, 300);
            }
        }
    };

    casesCarousel.init();

    // Анимация при прокрутке
    const observeElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    observeElements.forEach(element => observer.observe(element));
});
