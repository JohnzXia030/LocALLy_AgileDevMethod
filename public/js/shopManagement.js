var shopArr;

window.onload = function () {
    $.ajax({
        url: "api/get-shop-by-admin",
        type: "GET",
        success: function (data) {
            shopArr= data.data;
            console.log(shopArr);
            let shopList = document.getElementById('shop-list');
            while (shopList.lastElementChild) {
                shopList.removeChild(shopList.lastElementChild);
            }
            $('#pagination').twbsPagination('destroy');
            //Nombre total des magasins
            numShop = shopArr.length;
            if (numShop !== 0) {
                //Page
                totalPage = Math.ceil(numShop / 9);
                if (totalPage === 1) {
                    showCurrentPageShop(0, numShop - 1);
                } else {
                    $('#pagination').twbsPagination({
                        totalPages: totalPage,
                        visiblePages: 1,
                        next: 'Next',
                        prev: 'Prev',
                        onPageClick: function (event, page) {
                            //fetch content and render here
                            console.log('no items');
                            while (shopList.lastElementChild) {
                                shopList.removeChild(shopList.lastElementChild);
                            }
                            let startIndex = (page - 1) * 9;
                            let endIndex = (page === totalPage) ? numShop - 1 : page * 9 - 1;
                            showCurrentPageShop(startIndex, endIndex);
                            //$('#page-content').text('Page ' + page) + ' content here';
                        }
                    });
                }
            }


        },
        error: function (e) {
            console.log(e);
        },
        cache: false,
        contentType: false,
        processData: false
    });
};

$(document).ready(function () {
});


function showCurrentPageShop(startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
        let shopList = document.getElementById('shop-list');
        let colDiv = document.createElement('div');
        colDiv.className = "col";
        let cardDiv = document.createElement('div');
        cardDiv.className = "card h-80";
        let cardImg = document.createElement('img');
        cardImg.src = "data:image/gif;base64," + shopArr[i]['p_base64'];
        cardImg.className = 'card-img-top';
        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = "card-body";
        let cardTitleH5 = document.createElement('h5');
        if (shopArr[i]['sh_state']==='0'){
            cardTitleH5.innerHTML = shopArr[i]['sh_name'] + '</br>' + " <p>(Désactivé)</p>" ;
        } else if(shopArr[i]['sh_state']==='1'){
            cardTitleH5.innerHTML= shopArr[i]['sh_name'] + '</br>' + " <p>(Activé)</p>" ;
        }

        let cardFooterDiv = document.createElement('div');
        cardFooterDiv.className = "card-footer";

        // La ligne qui contient les trois boutons
        let buttonRow = document.createElement('div');
        buttonRow.className = 'row';
        let buttondivSus = document.createElement('div');
        let buttondivDele = document.createElement('div');
        let buttondivRea = document.createElement('div');
        buttondivSus.className = 'col';
        buttondivDele.className = 'col';
        buttondivRea.className = 'col';
        let suspButton = document.createElement('sh');
        let deleteButton = document.createElement('sh');
        let reactButton = document.createElement('sh');
        suspButton.className = 'btn btn-primary';
        deleteButton.className = 'btn btn-primary';
        reactButton.className = 'btn btn-primary';
        suspButton.innerHTML = "<i class=\"fas fa-ban\"></i>";
        deleteButton.innerHTML = "<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>";
        reactButton.innerHTML = "<i class=\"fas fa-check\"></i>";
        suspButton.onclick = function (){
            hangShop(shopArr[i]['sh_id']);
        }
        reactButton.onclick = function (){
            reactivateShop(shopArr[i]['sh_id'])
        }
        deleteButton.onclick = function () {
            deleteShop(shopArr[i]['sh_id']);
        };

        buttondivSus.appendChild(suspButton);
        buttondivDele.appendChild(deleteButton);
        buttondivRea.appendChild(reactButton);
        buttonRow.appendChild(buttondivSus);
        buttonRow.appendChild(buttondivDele);
        buttonRow.appendChild(buttondivRea);
        cardBodyDiv.appendChild(cardTitleH5);
        cardFooterDiv.appendChild(buttonRow);
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(cardFooterDiv);
        colDiv.appendChild(cardDiv);
        shopList.append(colDiv);
    }
}


function deleteShop(idShop) {
    $.ajax({
        url: "api/delete-shop/" + idShop,
        type: "POST",
        success: function (data) {
            console.log(data);
            window.location.reload();
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function hangShop(idShop){
    $.ajax({
        url: "api/suspend-shop/" + idShop,
        type: "POST",
        success: function (data) {
            console.log(data);
            window.location.reload();
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function reactivateShop(idShop){
    $.ajax({
        url: "api/activate-shop/" + idShop,
        type: "POST",
        success: function (data) {
            console.log(data);
            window.location.reload();
        },
        cache: false,
        contentType: false,
        processData: false
    });
}
