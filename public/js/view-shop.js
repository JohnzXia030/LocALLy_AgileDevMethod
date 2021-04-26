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
        var shop = data['shop'][0]['shop'];
        var photos = data['shop'][0]['pictures'];
        var city = data['city'];
        
        $("#name-shop").html(shop["sh_name"]);
        $("#type_shop").html(shop["sh_type"]);
        $("#address_shop").html(shop["sh_num_street"]+ " " + shop["sh_name_street"] + " " + shop["sh_address_add"] + "</br>" + city["c_zip_code"] + " " + city["c_name"]);
        $("#phone_shop").html(shop["sh_num_phone"]);

        $("#about-shop").html(shop["sh_description"]);
        /*
        var horaires = shop["sh_open_hours"];
        var jsonHoraires = JSON.parse(horaires);
        $("#open-hours").html(
          "Lundi : " + jsonHoraires['monday'].replace(';', ' ; ') + 
          "</br> Mardi : " + jsonHoraires['tuesday'].replace(';', ' ; ') + 
          "</br> Mercredi : " + jsonHoraires['wednesday'].replace(';', ' ; ') + 
          "</br> Jeudi : " + jsonHoraires['thursday'].replace(';', ' ; ') + 
          "</br> Vendredi : " + jsonHoraires['friday'].replace(';', ' ; ') + 
          "</br> Samedi : " + jsonHoraires['saturday'].replace(';', ' ; ') + 
          "</br> Dimanche : " + jsonHoraires['sunday'].replace(';', ' ; ')
        );
          */
        var articles = data['articles'];
        var idArticles = [];
        for (var i = 0 ; i < articles.length ; i++) {
          if (!idArticles.includes(articles[i]['a_id'])) {
            idArticles.push(articles[i]['a_id']);

            var divPrix = 
              '<div class="my-4 font-bold text-yellow size-20">' + 
                '<span> ' + articles[i]['a_price'] + ' € </span>' +
              '</div>';
              
            /* DISCOUNT */
            if (articles[i]['a_discount'] != 0 ) {
              var discount = articles[i]['a_price'] * articles[i]['a_discount'] / 100 ;
              var discountPrice = articles[i]['a_price'] - discount;

              divPrix = 
              '<div class="my-4 font-bold text-yellow size-20">' + 
                '<span class="line mx-2"> ' + articles[i]['a_price'] + ' €</span>' +
                '<span> ' + discountPrice + ' € </span>' +
              '</div>' +
              '<div class="my-4">' + 
                '<span> ' + articles[i]['a_discount'] + ' % de remise</span>' +
              '</div>';
            }

            $("div#articles").append(
              '<div class="property-card m-4 p-0">' +
                  '<a href="#" class="viewArticle" data-idarticle="' + articles[i]['a_id'] + '">' +
                      '<div class="property-image" data-idarticle="' + articles[i]['a_id'] + '"></div>' +
                  '</a>' +
                  '<div class="property-description">' +
                      '<div class="my-4 font-bold"><span> ' + articles[i]['a_name'] + ' </span></div>' +
                      divPrix +
                  '</div>' +
              '</div>' 
            );
            $("div.property-image[data-idarticle=" + articles[i]['a_id'] +"]").css("background-image", "url(data:image/png;base64,"+articles[i]['p_base64']+")");


          }
        }

        $('a.viewArticle').click(function(e) {
          e.preventDefault();
          var idArticle = $(this).attr('data-idarticle');
          window.location.assign('view-article?id=' + idArticle);
        });

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
