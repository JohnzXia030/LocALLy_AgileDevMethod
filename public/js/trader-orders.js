var stateArr = [];
$(document).ready(function () {
    $.ajax({
        url: "api/get-states",
        type: "POST",
        async: false,
        success: function (data) {
            stateArr = data.states;
        },
        cache: false,
        contentType: false,
        processData: false
    });

    var table = $('#orders').DataTable({
        ajax: 'api/get-orders',
        columns: [
            {data: 'o_id'},
            {data: 'o_date'},
            {
                data: 's_name', render: function (data, type, row, meta) {
                    let optionString = '';
                    for (var i = 0; i < stateArr.length; i++) {
                        if (stateArr[i]['s_code'] === row.s_code){
                            optionString += '<option selected value="' + stateArr[i]['s_code'] + '">' + stateArr[i]['s_name'] + '</option>\n';
                        }else {
                            optionString += '<option value="' + stateArr[i]['s_code'] + '">' + stateArr[i]['s_name'] + '</option>\n';
                        }
                    }

                    return '<select tag="' + row.o_id + '" id="select-state">\n' +
                        optionString +
                        '</select>';
                }
            },
            {data: 'u_firstname'},
            {data: 'u_lastname'},
            {data: 'u_email'},
            {
                data: 'u_city'
            }
        ],
        dataSrc: 'data',
    });

    $("#orders").on('change', '#select-state' , function () {
        const r = confirm("Veuillez confirmer votre modification de l'état des commandes");
        if (r === false) {
            return;
        }
        let tag = document.getElementById('select-state').getAttribute('tag');
        console.log(tag);
        console.log($(this).val());
        let jsonObject = {};
        jsonObject.idOrder = tag;
        jsonObject.stateCode = $(this).val();
        $.ajax({
            url: "api/update-order-state",
            type: "POST",
            data: JSON.stringify(jsonObject),
            dataType: 'JSON',
            success: function (data) {
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
})

function deleteOrder(idOrder){
    $.ajax({
        url: "api/delete-order/" + idOrder,
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
        },
        cache: false,
        contentType: false,
        processData: false
    });
}





