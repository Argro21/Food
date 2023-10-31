'use strict';
window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display  = 'none';
        });
    
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        });
    };
  
    function showTabContent(i = 0) {
            tabsContent[i].style.display = 'block';
            tabs[i].classList.add('tabheader__item_active')

    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }

            });
        }
    });
    


// Timer

    const deadline = '2023-11-11';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;

        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
        days = Math.floor(t / (1000 * 60 * 60 *24));
        hours = Math.floor((t / (1000 * 60 * 60) % 24));
        minutes = Math.floor((t / (1000 * 60) % 60));
        seconds = Math.floor((t / 1000) % 60);
        };
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,

        };
    };

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        };
    };

    function setClock(selector, endtime){
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            };
        };
    };

    setClock('.timer', deadline);



    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');;

    function openModal() {
        modal.classList.toggle('show');
        modal.classList.toggle('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);

    };

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', openModal)
    });

    function closeModal() {
        modal.classList.toggle('show');
        modal.classList.toggle('hide');

            document.body.style.overflow = '';
    };

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    });

    const modalTimerId = setTimeout(closeModal, 10000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);

    //Class - юзаем классы для карточек

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; 
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;        
            this.changeToUAH(); 
        }
        
        // document.querySelector('.menu__item').img.src = this.src;
        // document.querySelector('.menu__item-subtitle') = this.title;
        // document.querySelector('.menu__item-descr') = this.descr;
        // document.querySelector('.menu__item-total') = this.price;

        changeToUAH () {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.parent.append(element);
        }

    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        "vegy",
        'Меню для "фитоняшек" - это красиво',
        'О, ну тут много текста. ',
        5,
        ".menu .container",
        ".menu__item",
        ".frst"
        

    ).render();

    new MenuCard(
        'img/tabs/vegy.jpg',
        "Fitnes",
        'Меню для "фитоняшек" - это красиво',
        'О, ну тут много текста. ',
        5,
        '.menu .container',
        

    ).render();
    new MenuCard(
        'img/tabs/vegy.jpg',
        "Fitnes",
        'Меню для "фитоняшек" - это красиво',
        'О, ну тут много текста. ',
        5,
        '.menu .container',
        

    ).render();





});