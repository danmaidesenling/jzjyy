(function() {
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "123") {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("main-page").style.display = "block";
        loadReagents();
        return false;
    } else {
        alert("用户名或密码错误");
        return false;
    }
}

function register() {
    // Basic registration logic
    alert("注册成功");
    showLogin();
    return false;
}

function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLogin() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

function showTab(tabId) {
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }
    document.getElementById(tabId).style.display = "block";
}

function loadReagents() {
    var reagents = [
        {name: "药品1", description: "这是药品1的描述", price: "100元"},
        {name: "药品2", description: "这是药品2的描述", price: "150元"},
        // More items can be added here
    ];

    var reagentsList = document.getElementById("reagents-list");
    reagentsList.innerHTML = "";

    for (var i = 0; i < reagents.length; i++) {
        var item = document.createElement("div");
        item.className = "reagent-item";
        item.innerHTML = "<h3>" + reagents[i].name + "</h3><p>" + reagents[i].description + "</p><p>价格: " + reagents[i].price + "</p><input type='number' value='1' min='1'><button onclick='addToCart();'>加入购物车</button>";
        reagentsList.appendChild(item);
    }
}

function addToCart() {
    alert("加入购物车成功");
}

function pay() {
    document.getElementById("barcode-popup").style.display = "block";
}

function closePopup() {
    document.getElementById("barcode-popup").style.display = "none";
}

})();