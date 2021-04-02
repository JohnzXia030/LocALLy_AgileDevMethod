jQuery(document).ready(function(){
    //console.log("jQuery est prêt !");
      var srole = '';

      $("#demo2-a").click(function(){
        srole = 'Professionel';
        gestionRole(srole);
      });

      $("#demo2-b").click(function(){
        srole='Particulier';
        gestionRole(srole);
      });

     /* if(srole="Professionnel"){
          alert('Vous êtes un ' + srole);
      }

      if(srole="Particulier"){
          alert('Vous êtes un ' + srole);
      }*/

});

function gestionRole(srole){
    alert("Vous êtes un" + srole); 
}