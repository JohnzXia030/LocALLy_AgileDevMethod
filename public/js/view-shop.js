import { base64AucunePhoto } from "./base64-aucunePhoto.js";

$(document).ready(function () {

  var queryString = window.location.search;
  var urLParams = new URLSearchParams(queryString);
  var paramId = urLParams.get('id');  
  var apiURL = "api/get-info-shop/" + paramId;

  $.ajax({
      url: apiURL,
      type: "GET",
      dataType: 'JSON',
      success: function (data){
        var shop = data['shop'][0];
        var photos = shop['pictures'];
        
        /*
          $("#name-product").html(article['a_name']);
          $("#name-shop").html(shop["sh_name"]);
          $("#price-product").html(article['a_price'] + " €  " );
        */

        // PHOTOS
        if (photos.length == 0) {
          // Aucune photos disponibles
          photos.push({'p_base64': base64AucunePhoto});
        }

        for (var i = 0 ; i < photos.length ; i++) {
          $('div.carousel-inner').append(
            '<div class="item">' +
              '<div class="col-xs-4">' +
                  '<a href="#1">' +
                    '<img src="'+'data:image/png;base64,' + photos[i]['p_base64']+'" class="img-responsive">'+
                  '</a>' +
              '</div>'+
            '</div>');
        }
        $('div.carousel-inner div.item:first').addClass('active');
        
        // Instantiate the Bootstrap carousel
        $('.multi-item-carousel').carousel({
          interval: false
        });

        // for every slide in carousel, copy the next slide's item in the slide.
        // Do the same for the next, next item.
        $('.multi-item-carousel .item').each(function(){
          var next = $(this).next();
          if (!next.length) {
            next = $(this).siblings(':first');
          }
          next.children(':first-child').clone().appendTo($(this));
          
          if (next.next().length>0) {
            next.next().children(':first-child').clone().appendTo($(this));
          } else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
          }
        });
      },
      erreur: function (data){
          console.log(data);       
      },
      cache: false,
      contentType: false,
      processData: false
  });


});
