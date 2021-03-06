/**
 * Param de URL: id d'article
 */
var paramId;
var article;
/**
 * Photos de la BDD
 */
var photo = [];
/**
 * Photos deposées par commerçant
  */
var imageArr = [];
window.onload = function () {
    // Obtenir l'id d'article
    const queryString = window.location.search;
    const urLParams = new URLSearchParams(queryString);
    paramId = urLParams.get('id');
    // Afficher l'info d'article
    let apiURL = "api/get-article/" + paramId;
    // Obtenir l'info d'article
    $.ajax({
        url: apiURL,
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
            article = data.data[0]['article'];
            photo = data.data[0]['pictures'];
            console.log(data.data[0]);
            document.getElementById("name-article").value = article['a_name'];
            document.getElementById("description-article").value = article['a_description'];
            document.getElementById("price-article").value = article['a_price'];
            document.getElementById("discount-article").value = article['a_discount'];
            document.getElementById("period-discount-article").value = article['a_discount_period'];
            document.getElementById("available-article").checked = (article['a_available'] === '1');
            document.getElementById("stock-article").value = article['a_quantity_stock'];
            //document.getElementById("photo-article ").value = article['a_name'];
            console.log(photo.length);
            for (let i = 0; i < photo.length; i++) {
                var img = document.createElement('img');
                img.onclick = function (){
                    deletePhoto(photo[i]);
                };
                img.src = "data:image/gif;base64," + photo[i]['p_base64'];
                var divCarouselItem = document.createElement("div");
                var button = document.createElement("button");
                button.setAttribute("data-bs-target","#carouselExampleIndicators");
                button.setAttribute("data-bs-slide-to", i.toString());
                button.className = (i === 0) ? "active" : ""
                divCarouselItem.className = (i === 0) ? "carousel-item active" : "carousel-item" ;
                img.height = 500
                img.width = 500
                divCarouselItem.appendChild(img);
                document.getElementById('button-list').append(button);
                document.getElementById('photo-list').append(divCarouselItem);
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
    console.log(article);
}


function submitUpdateArticleForm() {
    setTimeout(function () {
        // Assurer que les photos sont bien enregistrées, temps d'attente pour 1 min
    }, 1000);
    const form = document.getElementById('form-article');
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
    if (imageArr.length + photo.length >= 6) {
        alert("Un article ne peut que uniquement avoir 5 photos maximum");
        return;
    }
    object["photo-article"] = imageArr;
    var formJson = JSON.stringify(object);
    console.log(formJson);
    // Envoyer le contenu vers le controller
    $.ajax({
        url: "api/update-article/" + paramId ,
        type: "POST",
        data: formJson,
        success: function (msg) {
            console.log(JSON.stringify(msg));
            window.location.reload();
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function deletePhoto(e){
    const r = confirm("Veuillez confirmer votre supression défitive!!!!");
    if (r === false) {
        return;
    }
    console.log("test");
    $.ajax({
        url: "api/delete-photo/" + e.p_id,
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
            alert("Photo supprimée!");
            window.location.reload();
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

