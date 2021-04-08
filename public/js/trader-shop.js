//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

// les photos des magasins
var imageArr;

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


$(document).ready(function () {

    $('.add').click(function () {
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
            '</div>' +
            '<div class="mt-1 cancel fa fa-times text-danger">' +
            '</div>' +
            '</div>');
    });

    $(".list").on('click', '.cancel', function () {
        $(this).parent().remove();
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
    // Convertir l'objet du formulaire en json
    const object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    // Convertir le formulaire en object
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
        newObj.question = val.value;
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
    // Controle de nombre des photos
    if (imageArr.length >= 6) {
        alert("Veuillez uniquement joindre au maximum 5 photos ");
        return;
    }
    var picture = imageArr;
    // Assurer que les photos sont bien enregistrées
    setTimeout(function () {
        object["horaires"] = horaires;
        object["faq"] = faq;
        object["picture"] = picture;
        const formJson = JSON.stringify(object);
        // Envoyer le contenu vers le controller
        submitForm(formJson);
        return false;
    }, 2500);
    return false;
})

function submitForm(formJson) {
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
}

/**
 * Convertir les photos en base64
 * @param imgFile
 */
function previewImage(imgFile) {
    var allFile = imgFile.files;
    imageArr = [];
    var dataURL;
    for(var i=0;i<allFile.length;i++){
        var file = allFile[i];
        var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
        if(!rFilter.test(file.type)) {
            alert("Veuillez inserer des photos!");
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        // Recharger les photos
        reader.onload = function(e) {
            var newObj = {};
            newObj.pictureURL = e.target.result.replace(/^data:image.+;base64,/,'');
            dataURL = e.target.result;
            imageArr.push(newObj);
        };
    }
}

