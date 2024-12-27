// Example function to add an item to the cart (already exists in your script)
function addToCart(itemName, itemPrice) {
    // Logic for adding items to the cart
    console.log(`Added ${itemName} for R$${itemPrice}`);
}

// Carrinho de Compras
let cart = [];
let totalPrice = 0;

function addToCart(itemName, itemPrice) {
    // Verifica se o item já está no carrinho
    const itemIndex = cart.findIndex(item => item.name === itemName);

    if (itemIndex !== -1) {
        // Se o item já existe, apenas aumenta a quantidade
        cart[itemIndex].quantity += 1;
    } else {
        // Caso contrário, adiciona o item ao carrinho com quantidade inicial 1
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    totalPrice += itemPrice;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Limpar itens anteriores
    cartItems.innerHTML = '';

    // Adicionar novos itens
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
        
        // Botões de editar e excluir com as classes de estilo
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit');
        editButton.onclick = () => editItem(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => {
            if (confirm("Tem certeza que deseja excluir este item?")) {
                removeItem(index);
            }
        };

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        cartItems.appendChild(li);
    });

    // Atualizar preço total
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function removeItem(index) {
    const item = cart[index];
    totalPrice -= item.price * item.quantity;
    cart.splice(index, 1);
    updateCart();
}

function editItem(index) {
    const newQuantity = prompt('Digite a nova quantidade:', cart[index].quantity);
    
    if (newQuantity && !isNaN(newQuantity) && newQuantity > 0) {
        const item = cart[index];
        const quantityDifference = newQuantity - item.quantity;
        
        // Atualiza a quantidade
        item.quantity = newQuantity;

        // Atualiza o preço total com a diferença
        totalPrice += quantityDifference * item.price;
        updateCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    // Função para formatar o valor em moeda
    function formatCurrency(value) {
        return `R$ ${value.toFixed(2).replace('.', ',')}`;
    }

    // Detalhes do pedido
    const orderDetails = cart.map(item => {
        return `*${item.name}* - ${formatCurrency(item.price)} x ${item.quantity}`;
    }).join('\n');

    // Calcular o preço total e formatar
    const totalFormatted = formatCurrency(totalPrice);

    // Criar a mensagem final com uma saudação e o total
    const message = `*Olá, gostaria de fazer um pedido!*\n\n` + 
                    `${orderDetails}\n\n` + 
                    `*Total*: ${totalFormatted}\n\n` +
                    `Aguardo a confirmação do pedido.`;

    // Enviar para o WhatsApp com codificação correta
    window.location.href = `https://wa.me/55987654321?text=${encodeURIComponent(message)}`;

    // Resetar o carrinho após o pedido
    cart = [];
    totalPrice = 0;
    updateCart();
}

// Abrir/Fechar o Carrinho
function toggleCart() {
    const cartPanel = document.getElementById("cart-panel");
    cartPanel.classList.toggle("open");
}
