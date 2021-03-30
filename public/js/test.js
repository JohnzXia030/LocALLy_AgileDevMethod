window.onload = function () {
    console.log('123')
    let data = {};
    data.id = 123;
    data = JSON.stringify(data)
    $.ajax({
            method: 'post',
            url: 'treat',
            data: data,
            success: function () {
                console.log('123');
            },
            error: function (data) {
                console.log(data)
            }

        }
    );
}

function click(){
    console.log('123')
    $.ajax({
            method: 'post',
            url: 'treat',
            data: {"test": 123},
            success: function () {
                console.log('123');
            },
            error: function (data) {
                console.log(data)
            }

        }
    );
}