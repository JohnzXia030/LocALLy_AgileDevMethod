$(document).ready(function () {

  $.ajax({
    url: "api/get-current-orders",
    type: "GET",
    dataType: 'JSON',
    async: false,
    success: function (data){
      var orders = data['orders'];
      
      if (orders.length == 0) {
        $('#loading').addClass('d-none').removeClass('d-flex');
        $('.cart, #emptyCart').removeClass('d-none');
      }
      else {
        for (var i = 0 ; i < orders.length ; i++) {
          console.log(orders[i]);
          var idOrder = orders[i]['o_id'];
          var idShop = orders[i]['o_id_shop'];
          var nameShop = orders[i]['sh_name'];
          var total = orders[i]['o_total'];
          var date = orders[i]['o_date'];
          var dateFormat = (new Date(Date.parse(date))).toLocaleString('dr-FR').split(',')[0];
          var state = orders[i]['s_name'];

          var articles = orders[i]['basket'];

          var construct =
            '<li class="items odd" data-idorder="' + idOrder + '">' +
              '<div class="infoWrap">' +
                '<div class="cartSection">' +
                  '<h3>Commande du ' + dateFormat + '</h3>' +
                  '<div class="d-flex align-items-center">' +
                    '<span class="mx-2">Commerce : </span>' +
                    '<a class="name-shop pointer" data-idshop="' + idShop + '">' + nameShop + '</a>' +
                  '</div>' +
                '</div>' +
                '<div class="prodTotal cartSection">' +
                    '<span class="mx-2 totalPrice"> ' + total + ' € </span>' +
                '</div>' +
                '<div class="cartSection text-center">' +
                    '<span class="mx-2"> Etat : ' + state + ' </span>' +
                '</div>' +
                '<div class="cartSection removeWrap">' +
                    '<span class="btn btn-sm cancel bg-red" data-idorder="' + idOrder + '">Annuler</span>' +
                '</div>' +
              '</div>' +
              '<div class="infoWrap m-3 mb-0">' +
                '<div class="cartSection">' +
                  '<h4>Articles</h4>' +
                '</div>' +
              '</div>';

          for (var j = 0 ; j < articles.length ; j++) {
            var nameArticle = articles[j]['a_name'];
            var idArticle = articles[j]['a_id'];
            var totalArticle = articles[j]['b_sub_total'];
            var quantityArticle = articles[j]['b_quantity_article'];

            construct +=
              '<div class="infoWrap row mx-3">' +
                '<div class="cartSection col-5">' +
                  '<div class="d-flex align-items-center">' +
                    '<span class="mx-2"> ' + quantityArticle + ' x </span>' +
                    '<a class="name-article pointer" data-idarticle="' + idArticle + '">' + nameArticle + '</a>' +
                  '</div>' +
                '</div>' +
                '<div class="cartSection">' +
                    '<span class="mx-2 totalPrice"> ' + totalArticle + ' € </span>' +
                '</div>' +
              '</div>';
          }

          construct +=
            '</li>';

          $('.cartWrap').append(construct);
        }

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
  
  $('a.name-shop').click(function(e) {
    e.preventDefault();
    var idShop = $(this).attr('data-idshop');
    window.location.assign('../view/view-shop?id=' + idShop);
  });
  
  $('a.name-article').click(function(e) {
    e.preventDefault();
    var idArticle = $(this).attr('data-idarticle');
    window.location.assign('../view/view-product?id=' + idArticle);
  });
  
  $('a.pastOrders').click(function(e) {
    e.preventDefault();
    window.location.assign('past-orders');
  });

  $('span.cancel').click(function() {
    window.location = $('a#modalLink').attr('href');
    var idOrder = $(this).attr('data-idorder');
    $('a#confirmCancel').attr('data-idorder', idOrder);
  });

  $('a#closeModal').click(function(e) {
    window.location = "#!";
  });

  $('a#confirmCancel').click(function(e) {
    var idOrder = $(this).attr('data-idorder');

    $.ajax({
      url: "api/cancel-order/"+idOrder,
      type: "GET",
      dataType: 'JSON',
      async: false,
      success: function (data){
        window.location = "#!";
        document.location.reload();
      },
      erreur: function (data){
        console.log(data);
      },
      cache: false,
      contentType: false,
      processData: false
    });


  });
});
