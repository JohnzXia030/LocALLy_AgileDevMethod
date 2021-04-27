$(document).ready(function () {
    $('#orders').DataTable({
        ajax: 'api/get-orders',
        columns: [
            {data: 'o_id'},
            {data: 'o_date'},
            {data: 'o_statecode'},
            {data: 'u_firstname'},
            {data: 'u_lastname'},
            {data: 'u_email'},
            {
                data: 'u_city'
            },


        ],
        dataSrc: 'data',

    });

})