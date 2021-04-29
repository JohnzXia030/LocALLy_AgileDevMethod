jQuery(document).ready(function(){
  
  $.ajax({
    url: "../guest/api/is-logged",
    type: "POST",
    success: function (msg) {
        if (msg == '') {
          window.location.replace("login");
        }
        else {
          $.ajax({
            url: "../guest/api/get-info-user",
            type: "POST",
            success: function (aRetour) {
              var aInfoUser = aRetour['result'][0];

              $('#form #buttonSubmit').attr('data-role', aInfoUser['u_role']);

              $("input#lastName").val(aInfoUser['u_lastname']);
              $("input#firstName").val(aInfoUser['u_firstname']);
              $("input#email").val(aInfoUser['u_email']);

              if (aInfoUser['u_role'] == 3) { // professionnel
                $("input#birth").parents('div.form-control').remove();
                $("input#phoneNumber").parents('div.form-control').remove();
                $("input#streetNum").parents('div.form-control').remove();
                $("input#streetName").parents('div.form-control').remove();
                $("input#city").parents('div.form-control').remove();
              }
              else { // particulier
                $("input#birth").val(aInfoUser['u_birth']);
                $("input#phoneNumber").val(aInfoUser['u_num_phone']);
                $("input#streetNum").val(aInfoUser['u_num_street']);
                $("input#streetName").val(aInfoUser['u_name_street']);
                $("input#city").val(aInfoUser['u_city']);
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
    },
    error: function(e){
        console.log(e);
    },
    cache: false,
    contentType: false,
    processData: false
  });

  $('#form #buttonSubmit').click(function(e) {
    e.preventDefault();
    checkInputs($(this).attr('data-role'));
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

function checkInputs(sCodeRole){
  $('p#errorMessage').addClass('d-none');

  var sRole;
  if (sCodeRole == '3') {
    sRole = 'Professionel';
  }
  else {
      sRole = 'Particulier';
  }

  var aChamp = [];
  aChamp.push($('#lastName'), $('#firstName'), $('#email'));

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
    object["birth"]=$("#birth").val();
    object["phoneNumber"]=$("#phoneNumber").val();
    object["streetNum"]=$("#streetNum").val();
    object["streetName"]=$("#streetName").val();
    object["city"]=$("#city").val();
    
    // Envoyer le contenu vers le controller
    var formJson = JSON.stringify(object);
    $.ajax({
        url: "../guest/api/update-user",
        type: "POST",
        data: formJson,
        success: function (aRetour) {
          if (aRetour['result'] == false) {
            $('div.form-control').removeClass('error success');
            $('div.form-control small').addClass('d-none');
            $('p#errorMessage').removeClass('d-none');
          }
          else {
            $('form.form').remove();
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

function calculateAge(inputDate) {
  var birthday = new Date(inputDate);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
  
