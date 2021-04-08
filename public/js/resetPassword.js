jQuery(document).ready(function(){
  // code jquery pour la gestion des cliques => a
  
  $('.registration-form #buttonResetSubmit').click(function(e) {
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
  var sValueEmail = $('input#email').val();

  var oPassword = $('input#password')[0];
  var sValuePassword = $('input#password').val();

  var oConfirmationPassword = $('input#confirmationpassword')[0];
  var sValueConfirmationPassword = $('input#confirmationpassword').val();

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
    if (sValuePassword.length < 8) {
      setErrorFor(oPassword, 'Votre mot de passe doit comporter au moins 8 caractères');
      bSuccess = false;
    }
    else {
      setSuccessFor(oPassword);
    }
  }

  if (sValueConfirmationPassword == '') {
    setErrorFor(oConfirmationPassword);
    bSuccess = false;
  }
  else {
    if (sValuePassword != sValueConfirmationPassword) {
      setErrorFor(oConfirmationPassword, 'Les deux mots de passe sont différents');
      bSuccess = false;
    }
  }

  if (bSuccess) {
    var object = {};
    object["email"] = sValueEmail;
    object["password"] = sValuePassword;

    // Envoyer le contenu vers le controller
    var formJson = JSON.stringify(object);
    $.ajax({
        url: "api/reset-password",
        type: "POST",
        data: formJson,
        success: function (oUser) {
          $('div.form-control').removeClass('success error');
          $('div.form-control small').addClass('d-none');
          
          if (!oUser['result']) {
            $('p#errorMessage').removeClass('d-none');
          }
          else {
            $('div.registration-form form div.form-control, .centerButtonSubmit').remove();
            $('div#successful').removeClass('d-none').addClass('d-flex');
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
