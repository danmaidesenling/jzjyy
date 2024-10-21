(function() {
	var medicalReagentsImageUrl = 'https://img.picgo.net/2024/07/26/midical5ac195f8b8ff51c4.png';
    var medicines = [
        { id: 1, name: '血清学检测试剂', description: '用于血清学检测的试剂', price: 50.99, image: medicalReagentsImageUrl },
        { id: 2, name: '酶联免疫吸附试剂', description: '用于ELISA检测的试剂', price: 80.99, image: medicalReagentsImageUrl },
        { id: 3, name: '聚合酶链反应试剂', description: '用于PCR检测的试剂', price: 120.99, image: medicalReagentsImageUrl },
        { id: 4, name: '细胞培养基', description: '用于细胞培养的试剂', price: 60.99, image: medicalReagentsImageUrl },
        { id: 5, name: '蛋白质分析试剂', description: '用于蛋白质分析的试剂', price: 100.99, image: medicalReagentsImageUrl },
        { id: 6, name: '核酸提取试剂', description: '用于核酸提取的试剂', price: 75.99, image: medicalReagentsImageUrl },
        { id: 7, name: '流式细胞仪试剂', description: '用于流式细胞检测的试剂', price: 95.99, image: medicalReagentsImageUrl },
        { id: 8, name: '基因组测序试剂', description: '用于基因组测序的试剂', price: 150.99, image: medicalReagentsImageUrl },
        { id: 9, name: '免疫荧光试剂', description: '用于免疫荧光检测的试剂', price: 85.99, image: medicalReagentsImageUrl },
        { id: 10, name: '化学发光试剂', description: '用于化学发光检测的试剂', price: 110.99, image: medicalReagentsImageUrl },
        { id: 11, name: '抗体试剂盒', description: '用于抗体检测的试剂盒', price: 130.99, image: medicalReagentsImageUrl },
        { id: 12, name: '血液学分析试剂', description: '用于血液学分析的试剂', price: 90.99, image: medicalReagentsImageUrl },
        { id: 13, name: '生化分析试剂', description: '用于生化分析的试剂', price: 70.99, image: medicalReagentsImageUrl },
        { id: 14, name: '病理分析试剂', description: '用于病理分析的试剂', price: 115.99, image: medicalReagentsImageUrl },
        { id: 15, name: '分子生物学试剂', description: '用于分子生物学研究的试剂', price: 140.99, image: medicalReagentsImageUrl }
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

