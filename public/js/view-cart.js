$(document).ready(function () {

  $.ajax({
    url: "api/get-cart",
    type: "GET",
    dataType: 'JSON',
    success: function (data){
      if (data['articles'].length == 0) {
        $('#loading').addClass('d-none').removeClass('d-flex');
        $('.cart, #emptyCart').removeClass('d-none');
      }
      else {
        var subTotalPrice = 0;
        for (var i = 0 ; i < data['articles'].length ; i++) {
          var base64PhotoArticle = data['articles'][i]['product'][0]['pictures'][0]['p_base64'];
          var idArticle = data['articles'][i]['product'][0]['article']['a_id'];
          var nameArticle = data['articles'][i]['product'][0]['article']['a_name'];
          var quantityArticle = data['articles'][i]['quantity'];
          var priceArticle = data['articles'][i]['product'][0]['article']['a_price'];
          var totalArticle = priceArticle * quantityArticle;
          var discountArticle = data['articles'][i]['product'][0]['article']['a_discount'];
          /* DISCOUNT */
          var discount = null;
          var discountPrice = null;
          var totalDiscountPrice = null;
          if (discountArticle != 0){
            discount = priceArticle * discountArticle / 100 ;
            discountPrice = priceArticle - discount;
            totalDiscountPrice = discountPrice * quantityArticle;
            subTotalPrice += totalDiscountPrice;
          }
          else {
            subTotalPrice += totalArticle;
          }
          
          $('.cartWrap').append(
            '<li class="items odd" data-idarticle=' + idArticle + '>' +
              '<div class="infoWrap">' +
                '<div class="cartSection">' +
                  '<img src="'+'data:image/png;base64,' + base64PhotoArticle + '" class="itemImg" />' +
                  '<h3>' + nameArticle + '</h3>' +
                  '<div class="d-flex align-items-center">' +
                  //  '<fieldset  data-quantity></fieldset>' +
                    '<span> ' + quantityArticle + ' x </span>' +
                    '<span class="mx-2 price">' + priceArticle + ' € </span>' +
                    '<span class="stockStatus mx-2"> En Stock</span>' +
                  '</div>' +
                '</div>' +
                '<div class="prodTotal cartSection">' +
                    '<span class="mx-2 totalPrice">' + totalArticle + ' € </span>' +
                '</div>' +
                '<div class="cartSection removeWrap d-none">' +
                    '<a href="#" class="remove">x</a>' +
                '</div>' +
              '</div>' +
            '</li>'
          );
          if (discount != null) {
            $('li.items[data-idarticle=' + idArticle + '] span.price')
              .addClass('line')
              .after('<span> ' + discountPrice + ' €  </span>');
            $('li.items[data-idarticle=' + idArticle + '] span.totalPrice')
              .addClass('line')
              .after('<span> ' + totalDiscountPrice + ' €  </span>');
          }
        }

        $('#subtotalPrice').html(subTotalPrice + ' €').attr('data-subtotalprice', subTotalPrice);
        $('#totalPrice').html(subTotalPrice + ' €');

        $('#loading').addClass('d-none').removeClass('d-flex');
        $('.cart, .cartWrap, .code_delivery, .subtotal').removeClass('d-none');
      }
    },
    erreur: function (data){
      console.log(data);
    },
    cache: false,
    contentType: false,
    processData: false
  });

  $('select#deliverySelect').change(function() {
    var subTotalPrice = parseFloat($('#subtotalPrice').attr('data-subtotalprice'));
    if ($(this).val() == "Livraison à domicile") {
      $('#deliveryPrice').html('5 €');
      $('#totalPrice').html(subTotalPrice + 5 + ' €');
    }
    else {
      $('#deliveryPrice').html('0 €');
      $('#totalPrice').html(subTotalPrice + ' €');
    }
  });

  // Bouton Quantité
  let quantities = document.querySelectorAll('[data-quantity]');
  if (quantities instanceof Node) quantities = [quantities];
  if (quantities instanceof NodeList) quantities = [].slice.call(quantities);
  if (quantities instanceof Array) {
    quantities.forEach(div => (div.quantity = new QuantityInput(div, 'Down', 'Up')));
  }
});


/**
 *  @class
 *  @function Quantity
 *  @param {DOMobject} element to create a quantity wrapper around
 */
 class QuantityInput {
  constructor(self, decreaseText, increaseText) {
    // Create input
    this.input = document.createElement('input');
    this.input.value = 1;
    this.input.type = 'number';
    this.input.name = 'quantity';
    this.input.pattern = '[0-9]+';

    // Get text for buttons
    this.decreaseText = decreaseText || 'Decrease quantity';
    this.increaseText = increaseText || 'Increase quantity';

    // Button constructor
    function Button(text, className){
      this.button = document.createElement('button');
      this.button.type = 'button';
      this.button.innerHTML = text;
      this.button.title = text;
      this.button.classList.add(className);

      return this.button;
    }

    // Create buttons
    this.subtract = new Button(this.decreaseText, 'sub');
    this.add = new Button(this.increaseText, 'add');

    // Add functionality to buttons
    this.subtract.addEventListener('click', () => this.change_quantity(-1));
    this.add.addEventListener('click', () => this.change_quantity(1));

    // Add input and buttons to wrapper
    self.appendChild(this.subtract);
    self.appendChild(this.input);
    self.appendChild(this.add);
  }

  change_quantity(change) {
    // Get current value
    let quantity = Number(this.input.value);

    // Ensure quantity is a valid number
    if (isNaN(quantity)) quantity = 1;

    // Change quantity
    quantity += change;

    // Ensure quantity is always a number
    quantity = Math.max(quantity, 1);

    // Output number
    this.input.value = quantity;
  }
}