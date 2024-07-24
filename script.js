(function() {
    var medicines = [
        { id: 1, name: 'Aspirin', description: 'Pain reliever', price: 5.99 },
        { id: 2, name: 'Ibuprofen', description: 'Anti-inflammatory', price: 8.99 },
        { id: 3, name: 'Paracetamol', description: 'Fever reducer', price: 6.99 }
    ];

    var cart = [];

    function login() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var errorElem = document.getElementById('login-error');

        if (username === 'user' && password === 'password') {
            errorElem.innerHTML = '';
            document.getElementById('login').style.display = 'none';
            document.getElementById('medicine-list').style.display = 'block';
            displayMedicines();
        } else {
            errorElem.innerHTML = 'Incorrect username or password';
        }
    }

    function displayMedicines() {
        var medicinesElem = document.getElementById('medicines');
        medicinesElem.innerHTML = '';

        for (var i = 0; i < medicines.length; i++) {
            var medicine = medicines[i];
            var div = document.createElement('div');
            div.className = 'medicine';

            var name = document.createElement('h3');
            name.innerHTML = medicine.name;
            div.appendChild(name);

            var description = document.createElement('p');
            description.innerHTML = 'Description: ' + medicine.description;
            div.appendChild(description);

            var price = document.createElement('p');
            price.innerHTML = 'Price: $' + medicine.price.toFixed(2);
            div.appendChild(price);

            var button = document.createElement('button');
            button.innerHTML = 'Add to Cart';
            button.setAttribute('data-id', medicine.id);
            button.onclick = addToCart;
            div.appendChild(button);

            medicinesElem.appendChild(div);
        }
    }

    function addToCart() {
        var id = parseInt(this.getAttribute('data-id'), 10);
        var medicine = medicines.find(function(med) { return med.id === id; });
        cart.push(medicine);
        alert(medicine.name + ' has been added to the cart.');
    }

    function viewCart() {
        document.getElementById('medicine-list').style.display = 'none';
        document.getElementById('cart').style.display = 'block';

        var cartItemsElem = document.getElementById('cart-items');
        cartItemsElem.innerHTML = '';

        if (cart.length === 0) {
            cartItemsElem.innerHTML = 'Your cart is empty.';
        } else {
            for (var i = 0; i < cart.length; i++) {
                var medicine = cart[i];
                var div = document.createElement('div');
                div.className = 'medicine';

                var name = document.createElement('h3');
                name.innerHTML = medicine.name;
                div.appendChild(name);

                var description = document.createElement('p');
                description.innerHTML = 'Description: ' + medicine.description;
                div.appendChild(description);

                var price = document.createElement('p');
                price.innerHTML = 'Price: $' + medicine.price.toFixed(2);
                div.appendChild(price);

                cartItemsElem.appendChild(div);
            }
        }
    }

    function backToMedicines() {
        document.getElementById('cart').style.display = 'none';
        document.getElementById('medicine-list').style.display = 'block';
    }

    window.login = login;
    window.viewCart = viewCart;
    window.backToMedicines = backToMedicines;
})();
