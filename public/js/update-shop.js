//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

/**
 * Param de URL: id d'article
 */
var paramId;

//
var photoUrl = '';

/**
 * Photos de la BDD
 */
var photo = [];
/**
 * Photos deposées par commerçant
 */
var imageArr = [];


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
    setTimeout(function () {
        // Assurer que les photos sont bien enregistrées, temps d'attente pour 1 min
    }, 1000);
    let form = document.getElementById('msform');
    let formData = new FormData(form);

    var monday = document.getElementById("monday").value;
    var tuesday = document.getElementById("tuesday").value;
    var wednesday = document.getElementById("wednesday").value;
    var thursday = document.getElementById("thursday").value;
    var friday = document.getElementById("friday").value;
    var saturday = document.getElementById("saturday").value;
    var sunday = document.getElementById("sunday").value;

    var jours = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    var days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
    var horairesObject = {};
    for (let i in days){
        horairesObject[jours[i]] = days[i]
    }

    var questionArray = $.map($('input[name="question"]'), function (val, _) {
        var newObj = {};
        newObj.question= val.value;
        newObj.id = val.id;
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
        line.id = questionArray[i]['id'];
        faq.push(line);
    }

    // Controle de nombre des photos
    if (imageArr.length >= 6) {
        alert("Veuillez uniquement joindre au maximum 5 photos ");
        return;
    }

    /*var picture = $.map($('input[name="picture"]'), function (val, index) {
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
        /!*console.log(photoUrl);
        newObj.base64 = photoUrl;*!/
        return newObj;
    });*/
    // Convertir le formulaire en json
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });

    console.log(horairesObject);
    object['horaires'] = horairesObject;
    object['faq'] = faq;
    object['photos-magasin'] = imageArr;
    console.log(formData.get('horaires'));
    const formJson = JSON.stringify(object);

    // Envoyer le contenu vers le controller
    const queryString = window.location.search;
    const urLParams = new URLSearchParams(queryString);
    paramId = urLParams.get('id');
    // Afficher l'info d'article
    let apiURL = "api/update-shop/" + paramId;
    $.ajax({
        url: apiURL,
        type: "POST",
        data: formJson,
        success: function (msg) {
            console.log(JSON.stringify(msg));
            //window.location.reload();
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
})

/*function getBase64(file, onLoadCallback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = onLoadCallback;/!*function () {
        console.log(reader.result);
        photoUrl = reader.result;
    }*!/
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

}*/



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
    var init_wrapper = $(".input_initial_wrap");

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

    $(init_wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
        //var idFaq = $(this).children('input')[0].id;
        /*console.log($(this));
        console.log($(this).parent)
        console.log($(this).parent.children('input')[0]);
        console.log($(this).parent.children('input')[0].id);*/
        //deleteFAQ(id);
    })
});

function deleteFAQ(id){
    console.log(id);
    let apiURLDeleteFaq = "api/delete-faq";
    $.ajax({
        url: "api/delete-faq/" + id,
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
            alert("FAQ supprimée!");

        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function deletePhoto(e){
    const r = confirm("Veuillez confirmer votre supression défitive!!!!");
    if (r === false) {
        return;
    }
    e.parent('div').remove();
    console.log("test");
    $.ajax({
        url: "api/delete-photo/" + e.p_id,
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
            alert("Photo supprimée!");
            //window.location.reload();
        },
        cache: false,
        contentType: false,
        processData: false
    });
}


window.onload = function () {

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

            // Initialisation des valeurs du premier FieldSet
            var villeId = shop['sh_city'];
            var shop_type = shop['sh_type'];
            var option_retrait = shop['sh_pick'];
            document.getElementById("nom-enseigne").value = shop['sh_name'];
            document.getElementById("numero-voie").value = shop['sh_num_street'];
            document.getElementById("nom-voie").value = shop['sh_name_street'];
            document.getElementById("complement-adresse").value = shop['sh_address_add'];
            //document.getElementById("nville").value = shop['c_name'];
            $("#nville").val(villeId).change();
            document.getElementById("num-tel").value = shop['sh_num_phone'];
            $("#type-magasin").val(shop_type).change();
            $("#option-retrait").val(option_retrait).change();
            document.getElementById("description").value = shop['sh_description'];


            // Charger et afficher les images sur la page
            for (let i = 0; i < photo.length; i++) {
                var img = document.createElement('img');
                img.onclick = function (){
                    deletePhoto(photo[i]);
                };
                img.src = "data:image/gif;base64," + photo[i]['p_base64'];
                var divCarouselItem = document.createElement("div");
                var button = document.createElement("button");
                button.setAttribute("data-bs-target","#carouselExampleIndicators");
                button.setAttribute("data-bs-slide-to", i.toString());
                button.className = (i === 0) ? "active" : ""
                divCarouselItem.className = (i === 0) ? "carousel-item active" : "carousel-item" ;
                img.height = 500
                img.width = 500
                divCarouselItem.appendChild(img);
                document.getElementById('button-list').append(button);
                document.getElementById('photo-list').append(divCarouselItem);
            }

            // // Initialisation des valeurs du deuxieme FieldSet
            var horaires = shop["sh_open_hours"];
            var jsonHoraires = JSON.parse(horaires);
            document.getElementById("monday").value = jsonHoraires['monday'];
            document.getElementById("tuesday").value = jsonHoraires['tuesday'];
            document.getElementById("wednesday").value = jsonHoraires['wednesday'];
            document.getElementById("thursday").value = jsonHoraires['thursday'];
            document.getElementById("friday").value = jsonHoraires['friday'];
            document.getElementById("saturday").value = jsonHoraires['saturday'];
            document.getElementById("sunday").value = jsonHoraires['sunday'];

            /*faq.forEach(function (unFAQ) {
                $('.faq-div').append('<div>' +              // TODO A corriger l'id, qui ne prend pas bien en valeur l'ID de faq
                    '<input type="text" name="question" id="faq[i]["faq_id"]" value="${unFAQ.faq_question}" placeholder="Question"/>\n' +
                    '<input type="text" name="reponse" value="${unFAQ.faq_reply}" placeholder="Réponse"/>' +
                    '<a href="#" class="remove_field" >Supprimer</a>' +
                    '</div>');
            });*/

            for (var i = 0 ; i < faq.length ; i++) {
                var idFaq = faq[i]["faq_id"];
                $('.faq-div').append('<div id="i">' +
                    '<input type="text" name="question" id="'+faq[i]["faq_id"]+'" value="'+faq[i]["faq_question"]+'" placeholder="Question"/>\n' +
                    '<input type="text" name="reponse" value="'+faq[i]["faq_reply"]+'" placeholder="Réponse"/>' +
                    '<a href="#" class="remove_field" onclick="deleteFAQ(\'' + idFaq + '\')" >Supprimer</a>' +
                    '</div>'
                );
                }


        },
        cache: false,
        contentType: false,
        processData: false
    });

}

/**
 * Convertir les photos en base64
 * @param imgFile
 */
function previewImage(imgFile) {
    var allFile = imgFile.files;
    imageArr = [];
    var dataURL;
    for (var i = 0; i < allFile.length; i++) {
        var file = allFile[i];
        var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
        if (!rFilter.test(file.type)) {
            alert("Veuillez inserer des photos!");
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        // Recharger les photos
        reader.onload = function (e) {
            var newObj = {};
            newObj.pictureURL = e.target.result.replace(/^data:image.+;base64,/, '');
            dataURL = e.target.result;
            imageArr.push(newObj);
        };
    }
}