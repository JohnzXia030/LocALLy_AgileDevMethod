jQuery(document).ready(function(){
  // code jquery pour la gestion des cliques => a
  var sRole = '';

  $("#demo2-a").click(function(){
    sRole = "Professionel";
    gestionRole(sRole);
  });

  // code jquery pour la gestion des cliques => b
  $("#demo2-b").click(function(){
    sRole="Particulier";
    gestionRole(sRole);
  });

  $('#form #buttonSubmit').click(function(e) {
    e.preventDefault();
    checkInputs();
  });
});

// Cette fonction gère le contrôle des champs du formulaire
function gestionRole(sRole){
  $("#demo2-a").siblings("label").removeClass('border-red');
  $("#demo2-b").siblings("label").removeClass('border-red');

  $('div.form-control').removeClass('error success');
  $('div.form-control small').addClass('d-none');

  if(sRole=="Professionel"){
    $('#birth').parent().addClass('d-none');
    $('#phoneNumber').parent().addClass('d-none');
    $('#streetNum').parent().addClass('d-none');
    $('#streetName').parent().addClass('d-none');
    $('#city').parent().addClass('d-none');
    $('#birth').val('');
    $('#phoneNumber').val('');
    $('#streetNum').val('');
    $('#streetName').val('');
    $('#city').val('');
  }
  else {
    $('#birth').parent().removeClass('d-none');
    $('#phoneNumber').parent().removeClass('d-none');
    $('#streetNum').parent().removeClass('d-none');
    $('#streetName').parent().removeClass('d-none');
    $('#city').parent().removeClass('d-none');
  }
} 

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
  var sRole = null;
  if ($("#demo2-a").is(':checked')) {
    sRole = 'Professionel';
  }
  else {
    if ($("#demo2-b").is(':checked')) {
      sRole = 'Particulier';
    }
  }

  var aChamp = [];
  if (sRole == null) {
    $("#demo2-a").siblings("label").addClass('border-red');
    $("#demo2-b").siblings("label").addClass('border-red');
  }
  else {
    aChamp.push($('#lastName'), $('#firstName'), $('#email'), $('#password'));

    if (sRole == 'Particulier') {
      aChamp.push($('#birth'), $('#phoneNumber'), $('#streetNum'), $('#streetName'), $('#city'));
    }
    var bSuccess = true;

    for (var i = 0 ; i < aChamp.length ; i++) {
      var sValue = aChamp[i].val();
      var sType = aChamp[i].attr('type');

      if (sValue != undefined) {
        sValue = sValue.trim();
      }

      if (sType == 'email') {
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		    if(reg.test(sValue)){
          setSuccessFor(aChamp[i][0]);
        }
        else {
          bSuccess = false;
          setErrorFor(aChamp[i][0], "L'adresse e-mail renseignée n'est pas valide");
        }
      }
      else {
        if (sType == 'tel') {
          var reg = /^0[1-9]([-. ]?[0-9]{2}){4}$/;
          if(reg.test(sValue)){
            setSuccessFor(aChamp[i][0]);
          }
          else {
            bSuccess = false;
            setErrorFor(aChamp[i][0], "Le numéro de téléphone renseigné n'est pas valide");
          }
        }
        else {
          if (sType == 'date' && sValue != '') {
            if (calculateAge(sValue) < 16) {
              bSuccess = false;
              setErrorFor(aChamp[i][0], 'Vous devez avoir au minimum 16 ans.');
            }
            else {
              setSuccessFor(aChamp[i][0]);
            }
          }
          else {
            if(sValue == '' || sValue == undefined){
              bSuccess = false;
              setErrorFor(aChamp[i][0], '');
            } else{
              setSuccessFor(aChamp[i][0]);
            }
          }
        }
      }
    }

    if (bSuccess) {

      var object = {};
      object["lastname"]=$("#lastName").val();
      object["firstname"]=$("#firstName").val();
      object["email"]=$("#email").val();
      object["password"]=$("#password").val();
      object["birth"]=$("#birth").val();
      object["phoneNumber"]=$("#phoneNumber").val();
      object["streetNum"]=$("#streetNum").val();
      object["streetName"]=$("#streetName").val();
      object["city"]=$("#city").val();
      object["role"]=sRole;

      var formJson = JSON.stringify(object);
      // Envoyer le contenu vers le controller
        
      $('div.social-media').remove();
      $('form.form').remove();
      $('div#successful').removeClass('d-none');
      console.log(object);
      console.log(formJson);
      $.ajax({
          url: "api/add-user",
          type: "POST",
          data: formJson,
          success: function (msg) {
              console.log(msg);
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
}

function calculateAge(inputDate) {
  var birthday = new Date(inputDate);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
