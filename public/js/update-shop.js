//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

//
var photoUrl = '';





$(document).ready(function () {
    var max_fields = 10; //maximum input boxes allowed
    var photos = $(".input_fields_photos"); //Fields photos
    var add_button2 = $(".add_field_button2"); //Add button ID

    var y = 1; //initlal photo box count
    $(add_button2).click(function (e) { //on add input button click
        e.preventDefault();
        if (y < max_fields) { //max input box allowed
            y++; //text box increment
            $(photos).append('<div><input type="file" name="picture"/><a href="#" class="remove_field"  >Supprimer</a></div>'); //add input box
        }
    });

    $(photos).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        y--;
    })
});

$(".next").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({'left': left, 'opacity': opacity});
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(function () {
    $('#profile-piece_jointe1').on('click', function () {
        $('#profile-piece_jointe-upload').click();
    });
});

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
};

$("#piece").change(function () {
    readURL(this);
});


$(".submit").click(function () {
    let form = document.getElementById('msform');
    let formData = new FormData(form);
    var horairesArray = $.map($('select[name="horaires"]'), function (val, _) {
        var newObj = {};
        newObj.horaires = val.value;
        return newObj;
    });
    var fromArray = $.map($('input[name="from"]'), function (val, _) {
        var newObj = {};
        newObj.from = val.value;
        return newObj;
    });
    var toArray = $.map($('input[name="to"]'), function (val, _) {
        var newObj = {};
        newObj.to = val.value;
        return newObj;
    });
    var horaires = [];
    for (let i = 0; i < horairesArray.length; i++) {
        let line = {};
        line.date = horairesArray[i]['horaires'];
        line.from = fromArray[i]['from'];
        line.to = toArray[i]['to'];
        horaires.push(line);
    }
    var questionArray = $.map($('input[name="question"]'), function (val, _) {
        var newObj = {};
        newObj.question= val.value;
        return newObj;
    });
    var reponseArray = $.map($('input[name="reponse"]'), function (val, _) {
        var newObj = {};
        newObj.reponse = val.value;
        return newObj;
    });
    var faq = [];
    for (let i = 0; i < reponseArray.length; i++) {
        let line = {};
        line.question = questionArray[i]['question'];
        line.reponse = reponseArray[i]['reponse'];
        faq.push(line);
    }
    var picture = $.map($('input[name="picture"]'), function (val, index) {
        var newObj = {};
        newObj.picture = val.value;
        const file = document.querySelector('input[type="file"]').files[index];
        newObj.base64 = 'test';
        let base64;
        getBase64(file, function (e) {
            console.log(e.target.result);
            console.log(newObj);
            base64 = e.target.result;
            //newObj.base64 = String(e.target.result);
        });
        //newObj.base64 = ;
        /*console.log(photoUrl);
        newObj.base64 = photoUrl;*/
        return newObj;
    });
    // Convertir le formulaire en json
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    object['horaires'] = horaires;
    object['faq'] = faq;
    object['picture'] = picture;

    console.log(formData.get('horaires'));
    const formJson = JSON.stringify(object);
    // Envoyer le contenu vers le controller
    $.ajax({
        url: "api/create-shop",
        type: "POST",
        data: formJson,
        success: function (msg) {
            console.log(JSON.stringify(msg));
        },
        cache: false,
        contentType: false,
        processData: false
    });
    for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
    return false;
})

function getBase64(file, onLoadCallback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = onLoadCallback;/*function () {
        console.log(reader.result);
        photoUrl = reader.result;
    }*/
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

}



// JS pour le tableau des horaires

function findDate(oEvent){
    var oDebutTime     = document.getElementById("timedebut"),
        oFin       = document.getElementById("fin"),
        oFinTime   = document.getElementById("timefin"),
        oDateStart = null,
        oDateEnd   = null,
        bDisabled  = true;
    //valueAsNumber si vide = NaN
    if(Number.isNaN(oDebut.valueAsNumber) == false){
        //Calcul des dates
        oDateStart = new Date(oDebut.valueAsNumber);
        oDateEnd   = new Date(oDebut.valueAsNumber);
        //Ajoute 3 jour
        oDateEnd.setDate(oDateEnd.getDate() + 3);
        bDisabled = false;
    } else{
        //Reset de valeur
        oFin.value = "";
        oFinTime.value = "";
    }//esle
    //Bloque ou debloque les champs après "au"
    oFin.disabled = bDisabled;
    oFinTime.disabled = bDisabled;
    //Assigne date min et max
    setDateMinMax(oFin, oDateStart);
    setDateMinMax(oFin, oDateEnd, false);
}


function setDateMinMax(oCible, oDate, bMin){
    if(typeof bMin != 'boolean' || bMin == true){
        oCible.min = formatDate(oDate);
    }else{
        oCible.max = formatDate(oDate);
    }
    return true;
}

/**
 2016-6-20  ou 2016-06-2 semble ne pas fonctionner
 getMonth() commence à 0, 0 = janvier
 @param Date  Objet date ou null
 @return      une chaine vide ou xxxx-xx-xx
 */
function formatDate(oDate){
    var sMin = '',iMois = null,iDate = null;
    if(oDate instanceof Date){
        iMois = (oDate.getMonth()+1);
        iDate = oDate.getDate();
        sMin  = oDate.getFullYear()+'-'+(iMois<10? "0":'')+iMois+'-'+(iDate<10? "0":'')+iDate;
    }//if
    return sMin;
}

$(document).ready(function () {
    var y = 1;

    $('.add').click(function () {
        y++;
        $(".list").append(
            '<div class="mb-2 row justify-content-between px-3">' +
                '<select class="mb-2 mob" name="horaires">' +
                    '<option value="lundi">Lundi</option>' +
                    '<option value="mardi">Mardi</option>' +
                    '<option value="mercredi">Mercredi</option>' +
                    '<option value="jeudi">Jeudi</option>' +
                    '<option value="vendredi">Vendredi</option>' +
                    '<option value="samedi">Samedi</option>' +
                    '<option value="dimanche">Dimanche</option>' +
                    '<option value="lundi-vendredi">Lundi-Vendredi</option>' +
                    '<option value="samedi-dimanche">Samedi-Dimanche</option>' +
                '</select>' +
                '<div class="mob">' +
                    '<label class="text-grey mr-1">De</label>' +
                    '<input class="ml-1" type="time" name="from">' +
                '</div>' +
                '<div class="mob mb-2">' +
                    '<label class="text-grey mr-4">A</label>' +
                    '<input class="ml-1" type="time" name="to">' +
                '</div><br>' +
                '<a href="#" class="cancel action-button">Supprimer</a>'+
            '</div>');

    });

    $(".list").on('click', '.cancel', function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        y--;
        //console.log($(this));
    });

});

$(document).ready(function () {
    var max_fields = 10; //maximum input boxes allowed
    var wrapper = $(".input_fields_wrap"); //Fields wrapper
    var add_button = $(".add_field_button"); //Add button ID

    var x = 1; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div><input type="text" name="question" placeholder="Question"/>\n' +
                '        <input type="text" name="reponse" placeholder="Réponse"/><a href="#" class="remove_field"  >Supprimer</a></div>'); //add input box
        }
    });

    $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })
});


window.onload = function () {

    //Requete pour obtenir les infos du magasin avec son id
    // Obtenir l'id de shop
    const queryString = window.location.search;
    const urLParams = new URLSearchParams(queryString);
    paramId = urLParams.get('id');
    let apiURL = "api/get-shop/" + paramId;
    // Obtenir l'info du magasin
    $.ajax({
        url: apiURL,
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
            faq = data.data[0]['faq'];
            photo = data.data[0]['pictures'];
            shop = data.data[0]['shop'];
            console.log(data.data[0]);

            document.getElementById("nom-enseigne").value = shop['sh_name'];
            document.getElementById("numero-voie").value = shop['sh_num_street'];
            document.getElementById("nom-voie").value = shop['sh_name_street'];
            document.getElementById("complement-adresse").value = shop['sh_address_add'];
            document.getElementById("nville").value = shop['sh_city'];
            document.getElementById("num-tel").value = shop['sh_num_phone'];
            document.getElementById("type-magasin").value = shop['sh_type'];
            document.getElementById("option-retrait").value = shop['sh_pick'];
            document.getElementById("description").value = shop['sh_description'];


        },
        cache: false,
        contentType: false,
        processData: false
    });

    //Requete pour obtenir les villes
    let apiURLCities = "api/get-cities";
    // Obtenir toutes les villes
    $.ajax({
        url: apiURLCities,
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
            cities = data.data;
            console.log(data.data);
            console.log(data.data[0]);

            // Ajouter des options dans le "select" du html avec la valeur de l'id de la ville, et y afficher le nom de la ville.
            data.data.forEach(function (city) {
                $('#nville').append(`<option value="${city.c_id}">
                                       ${city.c_name}
                                  </option>`);
            });
        },
        cache: false,
        contentType: false,
        processData: false
    });

}
