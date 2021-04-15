/*!
    * Start Bootstrap - Agency v6.0.3 (https://startbootstrap.com/theme/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
$(document).ready(function () {

    $.ajax({
        url: "../guest/api/is-logged",
        type: "POST",
        success: function (msg) {
            if (msg == '') {
                $('div#navbarResponsive ul').append('<li class="nav-item"><a class="nav-link js-scroll-trigger" href="../guest/login">Connexion / Inscription</a></li>');
            }
            else {
                $('div#navbarResponsive ul').append(' ' +
                    '<li class="nav-item">' +
                        '<a id="" class="linkAccount nav-link js-scroll-trigger" href="../guest/accountNav">Mon compte</a>' +
                    '</li>' +
                    '<li class="nav-item">' +
                        '<a id="" class="linkLogout nav-link js-scroll-trigger" onclick="logOut()">Déconnexion</a>' +
                    '</li>');
            }
        },
        error: function(e){
            console.log(e);
        },
        cache: false,
        contentType: false,
        processData: false
    });

    //SendMessage
    $("#sendMessageButton").click(function () {
        
        // Convertir le contenu du formulaire en json
        const object = {};
        object["lastname"]=$("#contactForm #lastname").val();
        object["firstname"]=$("#contactForm #firstname").val();
        object["email"]=$("#contactForm #email").val();
        object["phone"]=$("#contactForm #phone").val();
        object["message"]=$("#contactForm #message").val();
       
        $("#contactForm #lastname").removeClass("border-red"); 
        $("#contactForm #firstname").removeClass("border-red");
        $("#contactForm #email").removeClass("border-red");
        $("#contactForm #message").removeClass("border-red");
        var error=false;
        if ( object["lastname"] == "") { console.log("test");
            error=true;
            $("#contactForm #lastname").addClass("border-red"); 
        }
        if ( object["firstname"] == "") {
            error=true;
            $("#contactForm #firstname").addClass("border-red"); 
        }
        if ( object["email"] == "") {
            error=true;
            $("#contactForm #email").addClass("border-red"); 
        }
        if ( object["message"] == "") {
            error=true;
            $("#contactForm #message").addClass("border-red"); 
        }
        if (!error) {
            var formJson = JSON.stringify(object);
            // Envoyer le contenu vers le controller
            
            $.ajax({
                url: "api/send-message",
                type: "POST",
                data: formJson,
                success: function (msg) {
                    //console.log(msg);
                    $("#contactForm #lastname").val("");
                    $("#contactForm #firstname").val("");
                    $("#contactForm #email").val("");
                    $("#contactForm #phone").val("");
                    $("#contactForm #message").val("");
                    $("div#divSendEmail").addClass("d-none");
                    $("div#emailSuccess").removeClass("d-none");
                },
                error: function(e){
                    console.log(e);
                    $("#contactForm #lastname").val("");
                    $("#contactForm #firstname").val("");
                    $("#contactForm #email").val("");
                    $("#contactForm #phone").val("");
                    $("#contactForm #message").val("");
                    $("div#divSendEmail").addClass("d-none");
                    $("div#emailSuccess").removeClass("d-none");
                },
                cache: false,
                contentType: false,
                processData: false
            });
        }
        
    });

    
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        //console.log($("#mainNav"));
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

}); // End of use strict


function logOut() {
    $.ajax({
        url: "../guest/api/logout",
        type: "POST",
        success: function (msg) {
            window.location.replace('../home');
        },
        error: function(e){
            console.log(e);
        },
        cache: false,
        contentType: false,
        processData: false
    });
}
