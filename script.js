// Example function to add an item to the cart (already exists in your script)
function addToCart(itemName, itemPrice) {
    // Logic for adding items to the cart
    console.log(`Added ${itemName} for R$${itemPrice}`);
}

// Inicialização do Carrinho
let cart = [];
let totalPrice = 0;

// Adicionar Item ao Carrinho
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalPrice += itemPrice;
    updateCart();
}

// Atualizar o Carrinho
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    // Mapear itens do carrinho para o HTML
    cartItems.innerHTML = cart
        .map((item) => `<li>${item.name} - R$ ${item.price.toFixed(2)}</li>`)
        .join("");

    // Atualizar o preço total
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Abrir/Fechar o Carrinho
function toggleCart() {
    const cartPanel = document.getElementById("cart-panel");
    cartPanel.classList.toggle("open");
}

// Finalizar Compra (Checkout)
function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    // Formatar mensagem para o WhatsApp
    const formatCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`;
    const orderDetails = cart
        .map((item) => `*${item.name}* - ${formatCurrency(item.price)}`)
        .join("\n");
    const totalFormatted = formatCurrency(totalPrice);
    const message = `*Olá, gostaria de fazer um pedido!*\n\n${orderDetails}\n\n*Total*: ${totalFormatted}\n\nAguardo a confirmação do pedido.`;

    // Redirecionar para o WhatsApp
    const whatsappNumber = "55987654321";
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Resetar o carrinho após o pedido
    cart = [];
    totalPrice = 0;
    updateCart();
}