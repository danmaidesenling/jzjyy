(function() {
    var medicines = [
        { id: 1, name: '阿司匹林', description: '止痛药', price: 5.99, image: 'aspirin.jpg' },
        { id: 2, name: '布洛芬', description: '抗炎药', price: 8.99, image: 'ibuprofen.jpg' },
        { id: 3, name: '对乙酰氨基酚', description: '退烧药', price: 6.99, image: 'paracetamol.jpg' },
        { id: 4, name: '维生素C', description: '增强免疫力', price: 4.99, image: 'vitamin_c.jpg' },
        { id: 5, name: '阿莫西林', description: '抗生素', price: 10.99, image: 'amoxicillin.jpg' },
        { id: 6, name: '头孢', description: '抗生素', price: 12.99, image: 'cephalosporin.jpg' },
        { id: 7, name: '止咳糖浆', description: '止咳药', price: 6.50, image: 'cough_syrup.jpg' },
        { id: 8, name: '抗过敏药', description: '抗过敏药', price: 9.99, image: 'antihistamine.jpg' },
        { id: 9, name: '奥美拉唑', description: '胃药', price: 7.99, image: 'omeprazole.jpg' },
        { id: 10, name: '复合维生素', description: '营养补充', price: 14.99, image: 'multivitamins.jpg' },
        { id: 11, name: '抗菌药', description: '抗菌药', price: 11.99, image: 'antibacterial.jpg' },
        { id: 12, name: '银翘解毒丸', description: '中成药', price: 8.50, image: 'yin_qiao.jpg' },
        { id: 13, name: '牛黄解毒片', description: '中成药', price: 10.50, image: 'niu_huang.jpg' },
        { id: 14, name: '复方感冒药', description: '感冒药', price: 9.00, image: 'cold_medicine.jpg' },
        { id: 15, name: '抗真菌药', description: '抗真菌药', price: 13.99, image: 'antifungal.jpg' }
    ];

    var cart = [];
    var currentPage = 1;
    var itemsPerPage = 10;

    function login() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var errorElem = document.getElementById('login-error');

        if (username === 'user' && password === '123') {
            errorElem.innerHTML = '';
            document.getElementById('login').style.display = 'none';
            document.getElementById('medicine-list').style.display = 'block';
            displayMedicines();
            setupPagination();
        } else {
            errorElem.innerHTML = '用户名或密码错误';
        }
    }

    function displayMedicines() {
        var medicinesElem = document.getElementById('medicines');
        medicinesElem.innerHTML = '';

        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var paginatedItems = medicines.slice(startIndex, endIndex);

        for (var i = 0; i < paginatedItems.length; i++) {
            var medicine = paginatedItems[i];
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

    function setupPagination() {
        var paginationElem = document.getElementById('pagination');
        paginationElem.innerHTML = '';

        var totalPages = Math.ceil(medicines.length / itemsPerPage);

        for (var i = 1; i <= totalPages; i++) {
            var pageButton = document.createElement('button');
            pageButton.className = 'page-button';
            pageButton.innerHTML = i;
            pageButton.onclick = function() {
                currentPage = parseInt(this.innerHTML, 10);
                displayMedicines();
                updatePagination();
            };
            paginationElem.appendChild(pageButton);
        }

        updatePagination();
    }

    function updatePagination() {
        var paginationButtons = document.getElementsByClassName('page-button');

        for (var i = 0; i < paginationButtons.length; i++) {
            paginationButtons[i].classList.remove('active');
        }

        paginationButtons[currentPage - 1].classList.add('active');
    }
	
	function pay() {
        var popup = document.getElementById('barcode-popup');
        popup.style.display = 'flex';
    }

    function closePopup() {
        var popup = document.getElementById('barcode-popup');
        popup.style.display = 'none';
    }

    window.login = login;
    window.viewCart = viewCart;
    window.backToMedicines = backToMedicines;
    window.pay = pay;
    window.closePopup = closePopup;
})();

