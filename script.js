// script.js (обновленная версия)
document.addEventListener('DOMContentLoaded', function() {
    // DOM элементы
    const saladsContainer = document.getElementById('salads-container');
    const noResults = document.getElementById('no-results');
    const loading = document.getElementById('loading');
    const restaurantFilter = document.getElementById('restaurant');
    const addressFilter = document.getElementById('address');
    const phoneFilter = document.getElementById('phone');
    const saladNameFilter = document.getElementById('salad-name');
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    // Данные салатов
    let salads = [];
    
    // Инициализация приложения
    init();
    
    function init() {
        loadSalads();
        setupEventListeners();
    }
    
    // Загрузка данных (в реальном приложении здесь будет fetch к API)
    function loadSalads() {
        loading.style.display = 'flex';
        saladsContainer.style.display = 'none';
        noResults.style.display = 'none';
        
        // Имитация загрузки данных с сервера
        setTimeout(() => {
            // Моковые данные
            salads = [
                {
                    id: 1,
                    name: "Классический Цезарь",
                    restaurant: "Итальянский дворик",
                    address: "ул. Пушкинская, 15, Барнаул",
                    phone: "+7 (123) 456-78-90",
                    image: "https://avatars.mds.yandex.net/get-entity_search/1987348/1174361991/S600xU_2x",
                    coords: [53.356, 83.768] // Координаты для карты
                },
                {
                    id: 2,
                    name: "Пикантный Цезарь с хреном",
                    restaurant: "Гриль Хаус",
                    address: "пр. Ленина, 42, Барнаул",
                    phone: "+7 (987) 654-32-10",
                    image: "https://i.ytimg.com/vi/9qnmwku8ukA/maxresdefault.jpg",
                    coords: [53.354, 83.769]
                },
                {
                    id: 3,
                    name: "Цезарь с креветками",
                    restaurant: "Моремания",
                    address: "ул. Морская, 5, Барнаул",
                    phone: "+7 (555) 123-45-67",
                    image: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-14/891/842/101/311/112/100063995625b0.png",
                    coords: [53.353, 83.772]
                },
                {
                    id: 4,
                    name: "Вегетарианский Цезарь",
                    restaurant: "Зеленый лист",
                    address: "ул. Садовая, 33, Барнаул",
                    phone: "+7 (333) 222-11-00",
                    image: "https://i.pinimg.com/736x/73/99/45/739945c9252a58d0d276e432a588b81e.jpg",
                    coords: [53.358, 83.771]
                },
                {
                    id: 5,
                    name: "Цезарь с курицей и беконом",
                    restaurant: "Мясной клуб",
                    address: "ул. Грильная, 7, Барнаул",
                    phone: "+7 (777) 888-99-00",
                    image: "https://lafoy.ru/photo_l/foto-3860-10.jpg",
                    coords: [53.355, 83.774]
                },
                {
                    id: 6,
                    name: "Фирменный Цезарь шеф-повара",
                    restaurant: "Гастрономик",
                    address: "пр. Гурманов, 12, Барнаул",
                    phone: "+7 (444) 555-66-77",
                    image: "https://avatars.mds.yandex.net/get-altay/200322/2a0000015b1ff871ec2cf221324b64012664/XXL_height",
                    coords: [53.352, 83.766]
                }
            ];
            
            renderSalads(salads);
            loading.style.display = 'none';
            saladsContainer.style.display = 'grid';
        }, 800);
    }
    
    // Рендер карточек салатов
    function renderSalads(saladsToRender) {
        saladsContainer.innerHTML = '';
        
        if (saladsToRender.length === 0) {
            noResults.style.display = 'flex';
            return;
        }
        
        noResults.style.display = 'none';
        
        saladsToRender.forEach(salad => {
            const saladCard = document.createElement('div');
            saladCard.className = 'salad-card';
            
            saladCard.innerHTML = `
                <img src="${salad.image}" alt="${salad.name}" class="salad-image">
                <div class="salad-content">
                    <h3 class="salad-name">${salad.name}</h3>
                    <p class="salad-restaurant">${salad.restaurant}</p>
                    <p class="salad-address"><i class="fas fa-map-marker-alt"></i> ${salad.address}</p>
                    <p class="salad-phone"><i class="fas fa-phone"></i> ${salad.phone}</p>
                    <button class="btn order-btn" data-salad='${JSON.stringify(salad)}'>
                        <i class="fas fa-shopping-cart"></i> Заказать
                    </button>
                </div>
            `;
            
            saladsContainer.appendChild(saladCard);
        });
        
        // Добавляем обработчики для кнопок заказа
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const saladData = JSON.parse(this.getAttribute('data-salad'));
                window.openSaladModal(saladData);
            });
        });
    }
    
    // Фильтрация салатов
    function filterSalads() {
        const restaurantValue = restaurantFilter.value.toLowerCase();
        const addressValue = addressFilter.value.toLowerCase();
        const phoneValue = phoneFilter.value.toLowerCase();
        const saladNameValue = saladNameFilter.value.toLowerCase();
        
        const filtered = salads.filter(salad => {
            return (
                salad.restaurant.toLowerCase().includes(restaurantValue) &&
                salad.address.toLowerCase().includes(addressValue) &&
                salad.phone.toLowerCase().includes(phoneValue) &&
                salad.name.toLowerCase().includes(saladNameValue)
            );
        });
        
        renderSalads(filtered);
    }
    
    // Сброс фильтров
    function resetFilters() {
        restaurantFilter.value = '';
        addressFilter.value = '';
        phoneFilter.value = '';
        saladNameFilter.value = '';
        renderSalads(salads);
    }
    
    // Настройка обработчиков событий
    function setupEventListeners() {
        restaurantFilter.addEventListener('input', filterSalads);
        addressFilter.addEventListener('input', filterSalads);
        phoneFilter.addEventListener('input', filterSalads);
        saladNameFilter.addEventListener('input', filterSalads);
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
});
// Функция для вращения рулетки
function spinRoulette() {
    const wheel = document.getElementById('roulette-wheel');
    const spinBtn = document.getElementById('spin-btn');
    const result = document.getElementById('discount-result');
    const discountValue = document.getElementById('discount-value');
    const discountCode = document.getElementById('discount-code');
    
    // Отключаем кнопку на время вращения
    spinBtn.disabled = true;
    
    // Скрываем предыдущий результат
    result.style.display = 'none';
    
    // Определяем сектора и соответствующие скидки
    const sections = 10; // 10 секторов на рулетке
    const sectionAngle = 360 / sections; // 36 градусов на сектор
    const discounts = [10, 20, 30, 40, 50, 10, 20, 30, 40, 50]; // Скидки для каждого сектора
    
    // Выбираем случайный сектор (0-9) и соответствующую скидку
    const winningSection = Math.floor(Math.random() * sections);
    const discount = discounts[winningSection];
    
    // Вычисляем угол для выбранного сектора (центр сектора)
    const targetAngle = winningSection * sectionAngle + sectionAngle / 2;
    
    // Количество полных оборотов (3-5)
    const spins = 3 + Math.floor(Math.random() * 3);
    
    // Конечный угол с учетом оборотов и выбранного сектора
    // Вычитаем 90 градусов, так как начальное положение указателя сверху
    const finalAngle = spins * 360 + targetAngle - 90;
    
    // Вращаем рулетку
    wheel.style.transform = `rotate(${-finalAngle}deg)`;
    wheel.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    
    // После завершения вращения показываем результат
    setTimeout(() => {
        discountValue.textContent = `${discount}%`;
        
        // Генерируем случайный промокод
        const code = `CAESAR-${Math.floor(1000 + Math.random() * 9000)}`;
        discountCode.textContent = code;
        
        // Показываем результат
        result.style.display = 'block';
        
        // Сохраняем промокод в localStorage
        localStorage.setItem('discountCode', code);
        localStorage.setItem('discountValue', discount);
    }, 3000);
}