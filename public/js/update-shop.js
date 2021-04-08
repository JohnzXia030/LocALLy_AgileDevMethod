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

var $TABLE = $('#table');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');

$(function() {
    $(".datepicker").timepicker({defaultTime:'00:00', minuteStep: 1, showMeridian: false,  icons: {
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down'
        }});
});

$(function() {
    $('.time').click(function() {
        $(this).find('.datepicker').focus();
    });
});
data = [
    {
        day: 'Monday',
        amstart: "11:30",
        amend: "12:30",
        pmstart: "13:31",
        pmend: "14:55"
    },
    {
        day: 'Tuesday',
        amstart: "09:30",
        amend: "11:21",
        pmstart: "13:35",
        pmend: "16:55"
}
];

drawTable(data);
function drawTable(data) {

    for (var i = 0; i < data.length; i++) {
        drawRow(data[i],i);
    }
}

function drawRow(rowData,i) {
    var row = $("<tr />");
    $("#personDataTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it


    row.append($('<td contenteditable="true"><select name="daySelected" class="form-control"  id='+rowData.day+'>' +
        '<option value="Monday">Monday</option>' +
        '<option value="Tuesday">Tuesday</option>' +
        '<option value="Wednesday">Wednesday</option>' +
        '<option value="Thursday">Thursday</option>' +
        '<option value="Friday">Friday</option>' +
        '<option value="Saturday">Saturday</option>' +
        '<option value="Sunday">Sunday</option>' +
        '</select>' +
        '</td>'));
    $("#"+rowData.day).val(rowData.day);
    row.append($('<td contenteditable="true" class="time" ><input type="text" class="datepicker" value="'+rowData.amstart+'" type="text" /></td>'));
    row.append($('<td contenteditable="true" class="time"><input type="text" class="datepicker" value="'+rowData.amend+'" type="text" /></td>'));
    row.append($('<td contenteditable="true" class="time""><input type="text" class="datepicker" value="'+rowData.pmstart+'" type="text" /></td>'));
    row.append($('<td contenteditable="true" class="time"><input type="text" class="datepicker" value="'+rowData.pmend+'" type="text" /></td>'));
    row.append($('<td></td><td><span class="table-remove fa fa-trash fa-2x"></span>' +
        '</td></tr></table>'));
}



$('.table-add').click(function () {
    var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
    $clone.find("input.datepicker").each(function(){
        $(this).attr("id", "").removeData().off();
        $(this).find('.add-on').removeData().off();
        $(this).find('input').removeData().off();
        $(this).timepicker({defaultTime:'00:00', minuteStep: 1, showMeridian: false});
    });

    $TABLE.find('table').append($clone).find("input.datepicker").addClass('datepicker');

});

$('.table-remove').click(function () {
    $(this).parents('tr').detach();
});

$('.table-up').click(function () {
    var $row = $(this).parents('tr');
    if ($row.index() === 1) return; // Don't go above the header
    $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
    var $row = $(this).parents('tr');
    $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
    var $rows = $TABLE.find('tr:not(:hidden)');
    var $tds = $TABLE.find('td:not(:hidden)');
    var headers = [];
    var data = [];


    // Get the headers (add special header logic here)
    $($rows.shift()).find('th:not(:empty)').each(function () {
        headers.push($(this).text().toLowerCase());
    });

    // Turn all existing rows into a loopable array

    $rows.each(function () {
        var $td = $(this).find('td');
        var $td2 = $td.find('input');
        var $td3 = $td.find('select');
        var h2 = {};
        // Use the headers from earlier to name our hash keys
        headers.forEach(function (header, i) {


            h2[header] = $td.eq(i).find('input,select').val() || $td.eq(i).text();
            console.log(h2[header]);

        });
//check if the day exists in json here
        data.push(h2);
    });

    // Output the result
    $EXPORT.text(JSON.stringify(data));
});
