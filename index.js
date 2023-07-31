const productCategories = {
    'Гаманці': [
        { name: 'Гаманець чоловічий', description: 'Опис гаманця чоловічого' },
        { name: 'Гаманець жіночий', description: 'Опис гаманця жіночого' },
        { name: 'Гаманець унісекс', description: 'Опис унісекс гаманця' }
    ],
    'Сумки': [
        { name: 'Сумка чоловіча', description: 'Опис сумки чоловічої' },
        { name: 'Сумка жіноча', description: 'Опис сумки жіночої' },
        { name: 'Сумка унісекс', description: 'Опис унісекс сумки' }
    ],
    'Ремені': [
        { name: 'Чоловічий ремінь', description: 'Опис чоловічого ременя' },
        { name: 'Жіночий ремінь', description: 'Опис жіночогоременя' },
        { name: 'Ремінь унісекс', description: 'Опис унісекс ременя' }
    ]
};

function showProducts(category) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    const products = productCategories[category];
    products.forEach((product) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = product.name;
        link.onclick = () => showProductDetails(product);
        listItem.appendChild(link);
        productList.appendChild(listItem);
    });

    const categoriesElement = document.getElementById('categories');
    categoriesElement.classList.remove('hidden');
}

function showProductDetails(product) {
    const productName = document.getElementById('productName');
    const productDescription = document.getElementById('productDescription');
    const productInfo = document.getElementById('productInfo');
    const orderForm = document.getElementById('orderForm');

    productName.textContent = product.name;
    productDescription.textContent = product.description;

    productInfo.classList.remove('hidden');
    orderForm.classList.add('hidden');
}

function buyProduct() {
    const orderForm = document.getElementById('orderForm');
    orderForm.classList.remove('hidden');
}

function submitOrder(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const city = document.getElementById('city').value;
    const delivery = document.getElementById('delivery').value;
    const payment = document.getElementById('payment').value;
    const quantity = document.getElementById('quantity').value;
    const comment = document.getElementById('comment').value;

    if (!fullName || !delivery || !quantity) {
        alert("Будь ласка, заповніть обов'язкові поля.");
        return;
    }

    const productName = document.getElementById('productName').textContent;
    const orderInfo = `Замовлення:
Товар: ${productName}
Кількість: ${quantity}
ПІБ: ${fullName}
Місто: ${city}
Склад Нової пошти: ${delivery}
Оплата: ${payment}
Коментар: ${comment}`;

    alert(`Товар куплено! Дякуємо за замовлення!\n\n${orderInfo}`);

    const order = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        price: calculateTotalPrice(quantity), 
        fullName,
        city,
        delivery,
        payment,
        quantity,
        comment,
    };

    saveOrderToLocalStorage(order);

    const form = document.querySelector('form');
    form.reset();

    const productInfo = document.getElementById('productInfo');
    const orderForm = document.getElementById('orderForm');
    productInfo.classList.add('hidden');
    orderForm.classList.add('hidden');

    const categoriesElement = document.getElementById('categories');
    categoriesElement.classList.remove('hidden');

    showProducts('');
}

function showOrders() {
    const categoriesElement = document.getElementById('categories');
    const productList = document.getElementById('productList');
    const orderList = document.getElementById('orderList');

    categoriesElement.classList.add('hidden');
    productList.classList.add('hidden');
    orderList.innerHTML = '';

    const orders = getOrdersFromLocalStorage();
    if (orders.length === 0) {
        orderList.innerHTML = '<p>Заказов не найдено.</p>';
    } else {
        orders.forEach((order) => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            orderItem.dataset.id = order.id;

            const orderHeader = document.createElement('div');
            orderHeader.classList.add('order-header');
            orderHeader.innerHTML = `
                <span>${order.date}</span>
                <span>Ціна: ${order.price} грн</span>
                <button onclick="showOrderDetails(${order.id})">Деталі</button>
                <button onclick="deleteOrder(${order.id})">Видалити</button>
            `;

            const orderDetails = document.createElement('div');
            orderDetails.classList.add('order-details', 'hidden');
            orderDetails.innerHTML = `
                <p>ПІБ покупця: ${order.fullName}</p>
                <p>Місто: ${order.city}</p>
                <p>Склад Нової пошти: ${order.delivery}</p>
                <p>Оплата: ${order.payment}</p>
                <p>Кількість: ${order.quantity}</p>
                <p>Коментар: ${order.comment}</p>
            `;

            orderItem.appendChild(orderHeader);
            orderItem.appendChild(orderDetails);
            orderList.appendChild(orderItem);
        });
    }

    const orderInfo = document.getElementById('orderInfo');
    orderInfo.classList.add('hidden');
}

function showOrderDetails(orderId) {
    const orderItem = document.querySelector(`.order-item[data-id="${orderId}"]`);
    if (orderItem) {
        const orderDetails = orderItem.querySelector('.order-details');
        orderDetails.classList.toggle('hidden');
    }
}

function deleteOrder(orderId) {
    const orders = getOrdersFromLocalStorage();
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    saveOrdersToLocalStorage(updatedOrders);
    showOrders();
}

function getOrdersFromLocalStorage() {
    const ordersString = localStorage.getItem('orders');
    return ordersString ? JSON.parse(ordersString) : [];
}

function saveOrdersToLocalStorage(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function saveOrderToLocalStorage(order) {
    const orders = getOrdersFromLocalStorage();
    orders.push(order);
    saveOrdersToLocalStorage(orders);
}

function calculateTotalPrice(quantity) {

    return Math.floor(Math.random() * 1000) + 500;
}


showProducts('');
