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
            console.log(article);
            var typeArticle = article['a_type'];

            // Redirection vers la bonne page en fonction du type d'article
            if (typeArticle == 'product') {
                window.location.replace('view-product?id=' + paramId);
            }
            else {
                window.location.replace('view-service?id=' + paramId);
            }
      },
      erreur: function (data){
          console.log(data);       
      },
      cache: false,
      contentType: false,
      processData: false
  });
});