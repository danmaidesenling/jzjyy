(function() {
    var medicines = [
        { id: 1, name: '阿司匹林', description: '止痛药', price: 5.99, image: 'aspirin.jpg' },
        { id: 2, name: '布洛芬', description: '抗炎药', price: 8.99, image: 'ibuprofen.jpg' },
        { id: 3, name: '对乙酰氨基酚', description: '退烧药', price: 6.99, image: 'paracetamol.jpg' }
    ];

    var cart = [];

    function login() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var errorElem = document.getElementById('login-error');

        if (username === 'user' && password === '123') {
            errorElem.innerHTML = '';
            document.getElementById('login').style.display = 'none';
            document.getElementById('medicine-list').style.display = 'block';
            displayMedicines();
        } else {
            errorElem.innerHTML = '用户名或密码错误';
        }
    }

    function displayMedicines() {
        var medicinesElem = document.getElementById('medicines');
        medicinesElem.innerHTML = '';

        for (var i = 0; i < medicines.length; i++) {
            var medicine = medicines[i];
            var div = document.createElement('div');
            div.className = 'medicine';

            var img = document.createElement('img');
            img.src = medicine.image;
            img.alt = medicine.name;
            div.appendChild(img);

            var name = document.createElement('h3');
            name.innerHTML = medicine.name;
            div.appendChild(name);

            var description = document.createElement('p');
            description.innerHTML = '描述: ' + medicine.description;
            div.appendChild(description);

            var price = document.createElement('p');
            price.innerHTML = '价格: ¥' + medicine.price.toFixed(2);
            div.appendChild(price);

            var quantityLabel = document.createElement('label');
            quantityLabel.innerHTML = '数量: ';
            div.appendChild(quantityLabel);

            var quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            quantityInput.id = 'quantity-' + medicine.id;
            div.appendChild(quantityInput);

            var button = document.createElement('button');
            button.innerHTML = '添加到购物车';
            button.setAttribute('data-id', medicine.id);
            button.onclick = addToCart;
            div.appendChild(button);

            medicinesElem.appendChild(div);
        }
    }

    function addToCart() {
        var id = parseInt(this.getAttribute('data-id'), 10);
        var quantity = parseInt(document.getElementById('quantity-' + id).value, 10);
        var medicine = medicines.find(function(med) { return med.id === id; });

        var cartItem = cart.find(function(item) { return item.medicine.id === id; });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ medicine: medicine, quantity: quantity });
        }

        displayMessage(medicine.name + ' 已添加到购物车。', 'add-cart-message');
    }

    function displayMessage(message, elementId) {
        var messageElem = document.getElementById(elementId);
        messageElem.innerHTML = message;
        setTimeout(function() {
            messageElem.innerHTML = '';
        }, 3000);
    }

    function viewCart() {
        document.getElementById('medicine-list').style.display = 'none';
        document.getElementById('cart').style.display = 'block';

        var cartItemsElem = document.getElementById('cart-items');
        cartItemsElem.innerHTML = '';

        var totalPrice = 0;

        if (cart.length === 0) {
            cartItemsElem.innerHTML = '您的购物车是空的。';
        } else {
            for (var i = 0; i < cart.length; i++) {
                var cartItem = cart[i];
                var medicine = cartItem.medicine;
                var quantity = cartItem.quantity;

                var div = document.createElement('div');
                div.className = 'medicine';

                var img = document.createElement('img');
                img.src = medicine.image;
                img.alt = medicine.name;
                div.appendChild(img);

                var name = document.createElement('h3');
                name.innerHTML = medicine.name;
                div.appendChild(name);

                var description = document.createElement('p');
                description.innerHTML = '描述: ' + medicine.description;
                div.appendChild(description);

                var price = document.createElement('p');
                price.innerHTML = '价格: ¥' + medicine.price.toFixed(2) + ' x ' + quantity;
                div.appendChild(price);

                cartItemsElem.appendChild(div);

                totalPrice += medicine.price * quantity;
            }
        }

        document.getElementById('total-price').innerHTML = '总价: ¥' + totalPrice.toFixed(2);
    }

    function backToMedicines() {
        document.getElementById('cart').style.display = 'none';
        document.getElementById('medicine-list').style.display = 'block';
    }

    window.login = login;
    window.viewCart = viewCart;
    window.backToMedicines = backToMedicines;
})();

