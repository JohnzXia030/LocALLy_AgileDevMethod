

$(document).ready(function () {
    var queryString = window.location.search;
    var urLParams = new URLSearchParams(queryString);
    var paramId = urLParams.get('id');
    // Afficher l'info d'article
    let apiURL = "api/get-info-article/" + paramId;
    $.ajax({
        url: apiURL,
        type: "GET",
        dataType: 'JSON',
        success: function (data){
            console.log(data.shop);
            article = data.data[0]['article'];
            photo = data.data[0]['pictures'];
            shop = data.shop[0];
            $("#name-product").html(article['a_name']);
            /* Nom de magasin */
            $("#name-shop").html(shop["sh_name"]);

            $("#price-product").html(article['a_price'] + " €  " );

           /* DISCOUNT */
            if (article['a_discount'] != 0  ){
                $("#discount").html(article['a_discount'] + " % de remise").removeClass("d-none");
                $("#price-product").addClass("line");
                var discount=article['a_price'] * article['a_discount'] / 100 ;
                var discountPrice = article['a_price'] - discount;
                $("#discount-price").html(discountPrice + " €").removeClass("d-none");
            }
            /* STOCK */
            if(article['a_quantity_stock'] !=0 ){
                $("#available-product").html("En stock").addClass("text-green");
            } else {
                $("#available-product").html("Indisponible").addClass("text-red");
            }

            $("#about-product").html(article['a_description']);
            
            /* type de livraison */
            $("#delivery-product").html(shop["sh_type"]);
        },
        erreur: function (data){
            console.log(data);       
        },
        cache: false,
        contentType: false,
        processData: false
    });

// Set up quantity forms
//Quantite
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