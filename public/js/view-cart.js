$(document).ready(function () {

  $.ajax({
    url: "api/get-cart",
    type: "GET",
    dataType: 'JSON',
    async: false,
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
            '<li class="items odd" data-idarticle="' + idArticle + '">' +
              '<div class="infoWrap">' +
                '<div class="cartSection">' +
                  '<img src="'+'data:image/png;base64,' + base64PhotoArticle + '" class="itemImg" />' +
                  '<h3>' + nameArticle + '</h3>' +
                  '<div class="d-flex align-items-center">' +
                    '<fieldset class="inputQuantity" data-quantity data-idarticle="' + idArticle + '" data-articleQuantity="'+quantityArticle+'"></fieldset>' +
                    //'<span> ' + quantityArticle + ' x </span>' +
                    '<span> x </span>' +
                    '<span class="mx-2 price">' + priceArticle + ' € </span>' +
                    '<span class="stockStatus mx-2"> En Stock</span>' +
                  '</div>' +
                '</div>' +
                '<div class="prodTotal cartSection">' +
                    '<span class="mx-2 totalPrice">' + totalArticle + ' € </span>' +
                '</div>' +
                '<div class="cartSection removeWrap">' +
                    '<a href="#" class="remove removeArticle" data-idarticle="' + idArticle + '" data-quantityarticle="' + quantityArticle + '">x</a>' +
                '</div>' +
              '</div>' +
            '</li>'
          );
          
          if (discount != null) {
            $('li.items[data-idarticle="' + idArticle + '"] span.price')
              .addClass('line')
              .after('<span> ' + discountPrice + ' €  </span>');
            $('li.items[data-idarticle="' + idArticle + '"] span.totalPrice')
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

  $('a.removeArticle').click(function() {
    var idArticle = $(this).attr('data-idarticle');
    var quantity = $(this).attr('data-quantityarticle');
    
    $.ajax({
      url: "api/remove/"+idArticle+"/"+quantity,
      type: "GET",
      dataType: 'JSON',
      success: function (data){
        document.location.reload();
      }
    });
  })

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

  // Boutons Quantité
  //let quantities = document.querySelectorAll('[data-quantity]'); console.log(quantities);
  
  var quantities = $('.inputQuantity');
  //console.log(quantities);
  
  for (var i = 0 ; i < quantities.length ; i++) {
    //console.log(quantities[i]);
    //var quantity = new QuantityInput(quantities[i], '', '');

    var articleId = $(quantities[i]).attr('data-idArticle');
    var quantityArticle = parseInt($(quantities[i]).attr('data-articleQuantity'));
    //console.log(quantityArticle);

    $(quantities[i]).append(
      '<button type="button" class="sub"></button>' +
        '<input type="number" readonly class="quantityInput" name="quantity" pattern="[0-9]+" value='+quantityArticle+'>' +
      '<button type="button" class="add"></button>');
  }
  
  $('button.sub').click(function() {
    var fieldset = $(this).parents('fieldset'); console.log(fieldset);
    //var quantity = $(fieldset).find('input').val();
    var idArticle = $(fieldset).attr('data-idarticle');

    $.ajax({
      url: "api/remove/"+idArticle+"/1",
      type: "GET",
      dataType: 'JSON',
      success: function (data){
        document.location.reload();
      }
    });
  });

  $('button.add').click(function() {
    var fieldset = $(this).parents('fieldset'); console.log(fieldset);
    //var quantity = $(fieldset).find('input').val();
    var idArticle = $(fieldset).attr('data-idarticle');

    $.ajax({
      url: "api/add/"+idArticle+"/1",
      type: "GET",
      dataType: 'JSON',
      success: function (data){
        document.location.reload();
      }
    });
  });

  
});
