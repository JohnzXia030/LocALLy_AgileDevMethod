$(document).ready(function () {
  $('button.cartPayment').click(function() {

    $.ajax({
      url: "api/clear",
      type: "GET",
      dataType: 'JSON',
      success: function (data){ console.log(data);
        $('div#paymentInfo').addClass('d-none');
        $('div#paymentValidation').removeClass('d-none');
      }
    });

    



  })


});
