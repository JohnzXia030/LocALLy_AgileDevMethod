/*$("#form-add-article").on("submit", function(ev) {
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
img = new Image()


// If you are loading images from a remote server, be sure to configure “Access-Control-Allow-Origin”
// For example, the following image can be loaded from anywhere.
//var url = '//static.base64.guru/uploads/images/1x1.gif';
//img.src = url;

function convertImgB64(img) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);

    // Unfortunately, we cannot keep the original image type, so all images will be converted to PNG
    // For this reason, we cannot get the original Base64 string
    var uri = canvas.toDataURL('image/png'),
        b64 = uri.replace(/^data:image.+;base64,/, '');

    console.log(b64); //-> "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg=="
    return b64;
}

function submitAddArticleForm(){
    const form = document.getElementById('form-add-article');
    const formData = new FormData(form);
    // Convertir le contenu du formulaire en json
    if(formData.get('available-article')==null){
        formData.set('available-article',false);
    }
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var img = document.querySelector('img');
    img.crossOrigin = 'Anonymous';
    // The magic begins after the image is successfully loaded
    object["photo-article"] = convertImgB64(img);
    var formJson = JSON.stringify(object);
    console.log(formJson);
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