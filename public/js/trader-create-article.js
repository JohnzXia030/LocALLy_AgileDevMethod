/*$("#add-article").on("submit", function(ev) {
    ev.preventDefault(); // Prevent browser default submit.

    var formData = new FormData(this);
    console.log(formData);
    /!*$.ajax({
        url: "page.php",
        type: "POST",
        data: formData,
        success: function (msg) {
            alert(msg)
        },
        cache: false,
        contentType: false,
        processData: false
    });*!/
});*/

function submitAddArticleForm(){
    const form = document.getElementById('add-article');
    const formData = new FormData(form);
    // Convertir le contenu du formulaire en json
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var img = document.querySelector('img');
    object["photo-article"] = img.src;
    var formJson = JSON.stringify(object);
    // Envoyer le contenu vers le controller
    $.ajax({
        url: "api/create-article",
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

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }

            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
});