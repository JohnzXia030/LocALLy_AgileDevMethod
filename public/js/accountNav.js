jQuery(document).ready(function(){
  // code jquery pour la gestion des cliques => a
  
  $.ajax({
    url: "../guest/api/is-logged",
    type: "POST",
    success: function (msg) {
        if (msg == '') {
          window.location.replace("login");
        }
    },
    error: function(e){
        console.log(e);
    },
    cache: false,
    contentType: false,
    processData: false
  });

  $('div#navPersonalData').click(function(e) {
    e.preventDefault();
    window.location.assign("account");
  });
});
