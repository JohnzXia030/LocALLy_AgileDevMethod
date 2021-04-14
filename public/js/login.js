jQuery(document).ready(function(){
  // code jquery pour la gestion des cliques => a
  

  $('.registration-form #buttonSubmit').click(function(e) {
    e.preventDefault();
    checkInputs();
  });
});

function setErrorFor(input, message = ''){
  var formControl = $(input).parent();
  var small = formControl.find('small');
  formControl.addClass('error');
  if (message != '') {
    small.html(message); 
    small.removeClass('d-none');
  }
}

function setSuccessFor(input) {
  var formControl = $(input).parent();
  formControl.addClass('success').removeClass('error');
  var small = formControl.find('small');
  small.addClass('d-none');
}

function checkInputs(){
  $('p#errorMessage').addClass('d-none');

  var oEmail = $('input#email')[0];
  var oPassword = $('input#password')[0];
  var sValueEmail = $('input#email').val();
  var sValuePassword = $('input#password').val();

  var bSuccess = true;

  if (sValueEmail == '') {
    setErrorFor(oEmail);
    bSuccess = false;
  }
  else {
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!reg.test(sValueEmail)){
      setErrorFor(oEmail, "L'adresse e-mail renseignée n'est pas valide");
      bSuccess = false;
    }
    else {
      setSuccessFor(oEmail);
    }
  }

  if (sValuePassword == '') {
    setErrorFor(oPassword);
    bSuccess = false;
  }
  else {
    setSuccessFor(oPassword);
  }

  if (bSuccess) {
    var object = {};
    object["email"] = sValueEmail;
    object["password"] =  sValuePassword;

    // Envoyer le contenu vers le controller
    var formJson = JSON.stringify(object);
    $.ajax({
        url: "api/check-login",
        type: "POST",
        data: formJson,
        success: function (oUser) {
            if (oUser.result.length == 0) { // Authentification échouée
              $('div.form-control').removeClass('success error');
              $('div.form-control small').addClass('d-none');
              $('p#errorMessage').removeClass('d-none');
            }
            else { // Authentification réussie
                window.location.replace('/locally/public/home/');
            }
        },
        error: function(e){
            console.log(e);
        },
        cache: false,
        contentType: false,
        processData: false
    });
  }
}
