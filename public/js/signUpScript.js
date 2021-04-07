jQuery(document).ready(function(){
    // code jquery pour la gestion des cliques => a
      var sRole = '';

      $("#demo2-a").click(function(){
        sRole = "Professionel";
        gestionRolePro(sRole);
      });
     // code jquery pour la gestion des cliques => b
      $("#demo2-b").click(function(){
        sRole="Particulier";
        gestionRoleParticular(sRole);
      });
});

// Cette fonction gère le contrôle des champs du formulaire
// 1# en fonction du rôle. 
function gestionRolePro(sRole){
  //alert("Vous êtes un" + srole)
  if(sRole="Professionnel"){
    
    const form = document.getElementById('form');
    const lastName = document.getElementById('lastName');
    const firstName = document.getElementById('firstName'); 
    const birth = document.getElementById('birth');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const phoneNumber = document.getElementById('phoneNumber');
    const streetNum = document.getElementById('streetNum');
    const streetName = document.getElementById('streetName');
    const city = document.getElementById('city');

    form.addEventListener('submit', e => {
      e.preventDefault();
      
      checkInputs();
    });

    function checkInputs(){
      const lastNameValue = lastName.value.trim();
      const firstNameValue = firstName.value.trim(); 
      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();
      const cityValue = city.value.trim();

      if(lastNameValue === ''){
        setErrorFor(lastName, '');
      } else{
        setSuccessFor(lastName);
      }
      if(firstNameValue===''){
        setErrorFor(firstName, '');
      }else{
        setSuccessFor(firstName);
      }
      if(emailValue === ''){
        setErrorFor(email, '');
      } else{
        setSuccessFor(email);
      }
      if(passwordValue === ''){
        setErrorFor(password, '');
      } else{
        setSuccessFor(password);
      }
      if(cityValue === ''){
        setErrorFor(city, '');
      } else{
        setSuccessFor(city);
      }
    }

    function setErrorFor(input, message){
      const formControl = input.parentElement;
      const small = formControl.querySelector('small');
      formControl.className ='form-control error';
      small.innerText = message;
    }

    function setSuccessFor(input) {
      const formControl = input.parentElement;
      formControl.className = 'form-control success';
    }
  }
} 

function gestionRoleParticular(sRole){
  if(sRole="Particulier"){

      const form = document.getElementById('form');
      const lastName = document.getElementById('lastName');
      const firstName = document.getElementById('firstName'); 
      const birth = document.getElementById('birth');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const phoneNumber = document.getElementById('phoneNumber');
      const streetNum = document.getElementById('streetNum');
      const streetName = document.getElementById('streetName');
      const city = document.getElementById('city');

      form.addEventListener('submit', e => {
        e.preventDefault();
        
        checkInputs();
      });

      function checkInputs(){
        const lastNameValue = lastName.value.trim();
        const firstNameValue = firstName.value.trim(); 
        const birthValue = birth.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const phoneNumberValue = phoneNumber.value.trim();
        const streetNumValue = streetNum.value.trim();
        const streetNameValue = streetName.value.trim();
        const cityValue = city.value.trim();

        if(lastNameValue === ''){
          setErrorFor(lastName, '');
        } else{
          setSuccessFor(lastName);
        }
        if(firstNameValue===''){
          setErrorFor(firstName, '');
        }else{
          setSuccessFor(firstName);
        }
        if(birthValue === ''){
          setErrorFor(birth, '');
        } else{
          setSuccessFor(birth);
        }
        if(emailValue === ''){
          setErrorFor(email, '');
        } else{
          setSuccessFor(email);
        }
        if(passwordValue === ''){
          setErrorFor(password, '');
        } else{
          setSuccessFor(password);
        }
        if(phoneNumberValue === ''){
          setErrorFor(phoneNumber, '');
        } else{
          setSuccessFor(phoneNumber);
        }
        if(streetNumValue === ''){
          setErrorFor(streetNum, '');
        } else{
          setSuccessFor(streetNum);
        }
        if(streetNameValue === ''){
          setErrorFor(streetName, '');
        } else{
          setSuccessFor(streetName);
        }
        if(cityValue === ''){
          setErrorFor(city, '');
        } else{
          setSuccessFor(city);
        }
      }

      function setErrorFor(input, message){
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className ='form-control error';
        small.innerText = message;
      }

      function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
      }
  }
}
  


/*document.getElementById("Inscription").addEventListener("submit", function(){
      var error;
      var lastName = document.getElementById("lastName").value;

      if(!lastName.value){
        error = "Veuillez indiquer votre nom";
      }
      if(error){
        e.preventDefault();
        document.getElementById("error").innerHTML = erreur; 
        return false;
      }
      else{
        console.log("formulaire envoyé");
      }
    });*/

     //e.preventDefault(); 
      /*var error1;
      var error2; 
      var error3;*/

      //myRegex = new Regex("^[0-9]+$");
      /*let lastName = document.getElementById("lastName").value;
      let firstName = document.getElementById("firstName").value; 
      let birth = document.getElementById("birth").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let phoneNumber = document.getElementById("phoneNumber").value;
      let streetNum = document.getElementById("streetNum").value;
      let streetName = document.getElementById("streetName").value;
      let city = document.getElementById("city").value;
      //alert("je suis" + lastName);
      if(!lastName){
        document.getElementById("lastName").style.borderColor = "Tomato";
      }
      if(!firstName){
        document.getElementById("firstName").style.borderColor = "Tomato";
      }
      if(!birth){
        document.getElementById("birth").style.borderColor = "Tomato";
      }
      if(!email){
        error1 = "Veuillez indiquer correctement votre e-mail";
        document.getElementById("email").style.borderColor = "Tomato";
      }
      if(!password){
        error2 = "Votre mdp doit comporter au moins 8 caractères";
        document.getElementById("password").style.borderColor = "Tomato";
      }
      
      if(!phoneNumber){
        error3 = "Veuillez indiquer un numéro de téléphone correcte";
        document.getElementById("phoneNumber").style.borderColor = "Tomato";
      }
      if(!streetNum){
        document.getElementById("streetNum").style.borderColor = "Tomato";
      }
      if(!streetName){
        document.getElementById("streetName").style.borderColor = "Tomato";
        
      }
      if(!city){
        document.getElementById("city").style.borderColor = "Tomato";
      }
      if(error1){
          e.preventDefault();
          document.getElementById("error1").innerHTML = error1; 
          return false;
      }
      if(error2){
          e.preventDefault();
          document.getElementById("error2").innerHTML = error2; 
          return false;
      }
      if(error3){
          e.preventDefault();
          document.getElementById("error3").innerHTML = error3; 
          return false;
      }
      else{ 
        console.log("formulaire envoyé");
      }*/