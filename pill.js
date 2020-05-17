if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready)	
}
else{
	ready()
}


function ready(){
	var removeCartItemButtons = document.getElementsByClassName('c')
	console.log(removeCartItemButtons)
	for (var i = 0; i < removeCartItemButtons.length; i++){
		var button = removeCartItemButtons[i]
		button.addEventListener('click', removeCartItem)
	}
	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for(var i = 0; i < quantityInputs.length; i++){
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChanged)
	}

	var addToCartButtons = document.getElementsByClassName('a')
	for(var i = 0; i < addToCartButtons.length; i++){
		var button =  addToCartButtons[i]
		button.addEventListener('click', addToCartClicked)
	}

	document.getElementsByClassName('b')[0].addEventListener('click', purchaseClicked)

}

function  removeCartItem(event){
	var butttonClicked = event.target
		butttonClicked.parentElement.parentElement.remove()
		updateCartTotal()

}

function purchaseClicked(){
	alert("Thanks you for shopping")
	var cartItems = document.getElementsByClassName('cart-items')[0]
	while(cartItems.hasChildNodes()){
		cartItems.removeChild(cartItems.firstChild)
	}
	updateCartTotal()
}

function quantityChanged(event){
	var input = event.target
	if (isNaN(input.value) || input.value <= 0){
		input.value = 1
	}
	updateCartTotal()
}

function addToCartClicked(event){
	var button = event.target
	var shopItem = button.parentElement.parentElement.parentElement
	var title = shopItem.getElementsByClassName('item-title')[0].innerText
	var price = shopItem.getElementsByClassName('item-price')[0].innerText
	var imageSrc = shopItem.getElementsByClassName('item-image')[0].src
	console.log(title, price, imageSrc)
	addItemsToCart(title, price, imageSrc)
	updateCartTotal()

}

function addItemsToCart(title, price, imageSrc){
	var cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
	for (var i = 0; i < cartItemNames.length; i++){
		if(cartItemNames[i].innerText == title){
			alert("This item is already added to the cart")
			return 
		}
	}
	var cartRowContents = `
		<div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="c" type="button">REMOVE</button>
        </div>`
		
		cartRow.innerHTML = cartRowContents
		cartItems.append(cartRow)
		cartRow.getElementsByClassName('c')[0].addEventListener('click', removeCartItem)
		cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}

function updateCartTotal(){
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
	var cartRows = cartItemContainer.getElementsByClassName('cart-row')
	var total = 0
	for(var i = 0; i < cartRows.length; i++){
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-price')[0]
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		var price = parseFloat(priceElement.innerText.replace('$', ''))
		var quantity  = quantityElement.value
		total = total + (price*quantity)
	}
	total = Math.round(total * 100) / 100
	document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total

}

