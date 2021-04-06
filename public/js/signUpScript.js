jQuery(document).ready(function(){
    // code jquery pour la gestion des cliques => a
      var srole = '';

      $("#demo2-a").click(function(){
        srole = "Professionel";
        gestionRolePro(srole);
      });
     // code jquery pour la gestion des cliques => b
      $("#demo2-b").click(function(){
        srole="Particulier";
        gestionRoleParticular(srole);
      });
});

// Cette fonction gère le contrôle des champs du formulaire
// 1# en fonction du rôle. 
function gestionRolePro(srole){
  //alert("Vous êtes un" + srole)
  if(srole="Professionnel"){
    document.getElementById("Inscription").addEventListener("submit", function(){
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
    });
  }
} 

function gestionRoleParticular(srole){
  if(srole="Particulier"){
    console.log("je suis un particulier");
  }
}
  
