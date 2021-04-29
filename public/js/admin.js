$(document).ready(function () {

    var trader = $('#traders-management').DataTable({
        ajax: 'api/get-all-traders',
        columns: [
            {data: 'u_lastname'},
            {data: 'u_firstname'},
            {data: 'u_email'},
            {
                data: 'u_id', render: function (data, type, row, meta) {
                    return '<a onclick="deleteUser(' + row.u_id + ')" class="btn btn-danger" title="ban"><i class="fas fa-times"></i></a> ';
                }
            },


        ],
        dataSrc: 'data',
        "dom": 'p',
        "language": {
            "paginate": {
                "previous": "Précedent",
                "next": "Suivant"
            }
        }
    });

    var clients = $('#clients-management').DataTable({
        ajax: 'api/get-all-clients',
        columns: [
            {data: 'u_lastname'},
            {data: 'u_firstname'},
            {data: 'u_email'},
            {
                data: 'u_id', render: function (data, type, row, meta) {
                    return '<a onclick="deleteUser(' + row.u_id  + ')" class="btn btn-danger" title="delete"><i class="fa fa-trash"></i></a>';
                }
            },


        ],
        dataSrc: 'data',
        "dom": 'p',
        "language": {
            "paginate": {
                "previous": "Précedent",
                "next": "Suivant"
            }
        }
    });

})

function deleteUser(idUser) {
    $.ajax({
        url: "api/delete-user/" + idUser,
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
        },
        cache: false,
        contentType: false,
        processData: false
    });
}





