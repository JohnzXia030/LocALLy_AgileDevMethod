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

// les photos des articles
var imageArr;

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

function submitAddArticleForm() {
    setTimeout(function () {
        // Assurer que les photos sont bien enregistrées, temps d'attente pour 1 min
    }, 1000);
    const form = document.getElementById('form-add-article');
    const formData = new FormData(form);
    // Convertir le contenu du formulaire en json
    if (formData.get('available-article') == null) {
        formData.set('available-article', false);
    }
    const object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    // Controle de nombre des photos
    if (imageArr.length >= 6) {
        alert("Veuillez uniquement joindre au maximum 5 photos ");
        return;
    }
    object["photo-article"] = imageArr;
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


/**
 * Convertir les photos en base64
 * @param imgFile
 */
function previewImage(imgFile) {
    var allFile = imgFile.files;
    imageArr = [];
    var dataURL;
    for (var i = 0; i < allFile.length; i++) {
        var file = allFile[i];
        var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
        if (!rFilter.test(file.type)) {
            alert("Veuillez inserer des photos!");
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        // Recharger les photos
        reader.onload = function (e) {
            var newObj = {};
            newObj.pictureURL = e.target.result.replace(/^data:image.+;base64,/, '');
            dataURL = e.target.result;
            imageArr.push(newObj);
        };
    }
}