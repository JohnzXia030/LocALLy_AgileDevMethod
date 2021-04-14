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
              var discount = article['a_price'] * article['a_discount'] / 100 ;
              var discountPrice = article['a_price'] - discount;
              $("#discount-price").html(discountPrice + " €").removeClass("d-none");
          }

          /* DESCRIPTION */
          $("#about-product").html(article['a_description']);
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
});