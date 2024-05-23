$(document).ready(function() {
    // Array para armazenar os itens do carrinho
    var cartItems = [];

    // Adicionar ao carrinho
    $(".add-to-cart").click(function() {
        var name = $(this).data("name");
        var price = parseFloat($(this).data("price"));
        var item = {
            name: name,
            price: price,
            quantity: 1
        };

        // Verificar se o item já está no carrinho
        var alreadyInCart = false;
        cartItems.forEach(function(cartItem) {
            if (cartItem.name === item.name) {
                cartItem.quantity++;
                alreadyInCart = true;
            }
        });

        // Se não estiver no carrinho, adiciona
        if (!alreadyInCart) {
            cartItems.push(item);
        }

        // Atualizar o contador do carrinho no botão
        $("#cartCount").text(cartItems.length);

        // Atualizar o modal do carrinho
        updateCartModal();
    });

    // Atualizar o modal do carrinho
    function updateCartModal() {
        var cartItemsHTML = "";
        var cartTotal = 0;

        cartItems.forEach(function(item) {
            var total = item.price * item.quantity;
            cartTotal += total;
            cartItemsHTML += "<tr>" +
                "<td>" + item.name + "</td>" +
                "<td>R$" + item.price.toFixed(2) + "</td>" +
                "<td>" + item.quantity + "</td>" +
                "<td>R$" + total.toFixed(2) + "</td>" +
                "<td><button class='btn btn-danger btn-sm remove-item' data-name='" + item.name + "'>Remover</button></td>" +
                "</tr>";
        });

        $("#cartItems").html(cartItemsHTML);
        $("#cartTotal").text(cartTotal.toFixed(2));
    }

    // Remover item do carrinho
    $(document).on("click", ".remove-item", function() {
        var itemName = $(this).data("name");
        cartItems = cartItems.filter(function(item) {
            return item.name !== itemName;
        });

        // Atualizar o contador do carrinho no botão
        $("#cartCount").text(cartItems.length);

        // Atualizar o modal do carrinho
        updateCartModal();
    });

    // Abrir modal do carrinho
    $("#cartButton").click(function() {
        updateCartModal();
        $('#cartModal').modal('show');
    });
});
