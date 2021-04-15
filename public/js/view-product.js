import { base64AucunePhoto } from "./base64-aucunePhoto.js";

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
          var article = data.data[0]['article'];
          var photos = data.data[0]['pictures'];
          var shop = data.shop[0]['shop'];
          
          $("#name-product").html(article['a_name']);
          $("#name-shop").html(shop["sh_name"]).attr('data-idshop', shop["sh_id"]);
          $("#price-product").html(article['a_price'] + " €  " );

          /* DISCOUNT */
          if (article['a_discount'] != 0  ){
              $("#discount").html(article['a_discount'] + " % de remise").removeClass("d-none");
              $("#price-product").addClass("line");
              var discount=article['a_price'] * article['a_discount'] / 100 ;
              var discountPrice = article['a_price'] - discount;
              $("#discount-price").html(discountPrice + " €").removeClass("d-none");
          }

          /* EN STOCK OU INDISPONIBLE */
          if(article['a_quantity_stock'] !=0 ){
              $("#available-product").html("En stock").addClass("text-green");
          } else {
              $("#available-product").html("Indisponible").addClass("text-red");
              $("#add-product").prop('disabled', true);
          }

          /* DESCRIPTION ET TYPE DE LIVRAISON */
          $("#about-product").html(article['a_description']);
          $("#delivery-product").html(shop["sh_pick"]);

          /* PHOTOS */
          if (photos.length == 0) {
            // Aucune photos disponibles
            photos.push({'p_base64': base64AucunePhoto});
          }

          for (var i = 0 ; i < photos.length ; i++) {
            $("ul.slides").append('<li id="slide'+i+'"><img src="'+'data:image/png;base64,' + photos[i]['p_base64']+'"/></li>');
            $("ul.thumbnails").append('<li><a href="#slide'+i+'"><img src="'+'data:image/png;base64,' + photos[i]['p_base64']+'"/></a></li>');
          }
          
          if (photos.length == 1) {
            $("ul.thumbnails").addClass('d-none');
          }
          else {
            // Calcul de la taille des photos (thumbnails) en fonction du nombre
            var taillePhoto = 50 / (photos.length);
            $(".thumbnails img").css("height", taillePhoto + "vmin");
          }
      },
      erreur: function (data){
          console.log(data);       
      },
      cache: false,
      contentType: false,
      processData: false
  });

  $('a#name-shop').click(function(e) {
    e.preventDefault();
    var idShop = $(this).attr('data-idshop');
    window.location.assign('view-shop?id=' + idShop);
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