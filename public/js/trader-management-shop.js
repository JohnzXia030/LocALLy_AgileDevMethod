var articleArr;

window.onload = function () {
    $.ajax({
        url: "../trader/api/get-article-from-shop",
        type: "GET",
        success: function (data) {
            articleArr = data.data;
            console.log(articleArr);
            let articlesContainer = document.getElementById('articles-container');
            while (articlesContainer.lastElementChild) {
                articlesContainer.removeChild(articlesContainer.lastElementChild);
            }
            $('#pagination').twbsPagination('destroy');
            // Nombre total des articles
            numArticle = articleArr.length;
            if (numArticle !== 0) {
                // Page
                totalPage = Math.ceil(numArticle / 9);
                if (totalPage === 1) {
                    showCurrentPageArticles(0, numArticle - 1);
                } else {
                    $('#pagination').twbsPagination({
                        totalPages: totalPage,
                        visiblePages: 1,
                        next: 'Next',
                        prev: 'Prev',
                        onPageClick: function (event, page) {
                            //fetch content and render here
                            console.log('no items');
                            while (articlesContainer.lastElementChild) {
                                articlesContainer.removeChild(articlesContainer.lastElementChild);
                            }
                            let startIndex = (page - 1) * 9;
                            let endIndex = (page === totalPage) ? numArticle - 1 : page * 9 - 1;
                            showCurrentPageArticles(startIndex, endIndex);
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


/**
 * Appliquer les filters et obtenir les resultats sur la page
 * @returns {boolean}
 */
function applyFilters() {
    let filters = {};
    filters.city = $('#city').val();
    filters.price = $('input[name=shop-filter__price]:checked').val();
    filters.promotion = $('input[name=shop-filter-promo]:checked').val();
    filters.type = $('#shop-type-option').val();
    filters.pick = $('input[name=shop-filter-pick]:checked').val();
    let filtersJson = JSON.stringify(filters);
    $.ajax({
        url: "api/get-filtered-articles",
        type: "POST",
        data: filtersJson,
        success: function (data) {
            articleArr = data.data;
            console.log(articleArr);
            let articlesContainer = document.getElementById('articles-container');
            while (articlesContainer.lastElementChild) {
                articlesContainer.removeChild(articlesContainer.lastElementChild);
            }
            $('#pagination').twbsPagination('destroy');
            // Nombre total des articles
            numArticle = articleArr.length;
            if (numArticle !== 0) {
                // Page
                totalPage = Math.ceil(numArticle / 9);
                if (totalPage === 1) {
                    showCurrentPageArticles(0, numArticle - 1);
                } else {
                    $('#pagination').twbsPagination({
                        totalPages: totalPage,
                        visiblePages: 1,
                        next: 'Next',
                        prev: 'Prev',
                        onPageClick: function (event, page) {
                            //fetch content and render here
                            console.log('no items');
                            while (articlesContainer.lastElementChild) {
                                articlesContainer.removeChild(articlesContainer.lastElementChild);
                            }
                            let startIndex = (page - 1) * 9;
                            let endIndex = (page === totalPage) ? numArticle - 1 : page * 9 - 1;
                            showCurrentPageArticles(startIndex, endIndex);
                            //$('#page-content').text('Page ' + page) + ' content here';
                        }
                    });
                }
            }


        },
        cache: false,
        contentType: false,
        processData: false
    });
    return false;
}

function showCurrentPageArticles(startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
        // Modules d'affichage des articles a ajouter dans le div avec id "articles-container"
        /*<div class="col">
            <div class="card h-100">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
        <div class="smallDiv">
            <small class="text-muted">Last updated 3 mins ago</small>
        </div>
        </div>
        </div>
        </div>*/
        let articlesContainer = document.getElementById('articles-container');
        let colDiv = document.createElement('div');
        colDiv.className = "col";
        let cardDiv = document.createElement('div');
        cardDiv.className = "card h-100";
        let cardImg = document.createElement('img');
        cardImg.src = "data:image/gif;base64," + articleArr[i]['p_base64'];
        cardImg.className = 'card-img-top';
        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = "card-body";
        let cardTitleH5 = document.createElement('h5');
        cardTitleH5.innerText = articleArr[i]['a_name'];
        /*if (articleArr[i]['a_available'] === "1") {
            cardTitleH5.innerText = articleArr[i]['a_name'] + "- stock:" + articleArr[i]['a_quantity_stock'];
        } else if (articleArr[i]['a_available'] === "0") {
            cardTitleH5.innerText = articleArr[i]['a_name'] + "(- Désactivé)";
        }*/

        let cardFooterDiv = document.createElement('div');
        cardFooterDiv.className = "card-footer";
        let smallDiv = document.createElement('div');
        smallDiv.className = "smallDiv";
        let smallPriceInitial = document.createElement('small');
        let smallPriceDiscount = document.createElement('small');
        /*smallPriceInitial.className = "text-muted";
        smallPriceDiscount.className = "text-muted";*/
        smallPriceInitial.style = "text-decoration:line-through;";
        smallPriceInitial.innerText = articleArr[i]['a_price'] + "€ ";
        // La ligne des prix
        if (articleArr[i]['a_discount'] !== 0) {
            let discount = articleArr[i]['a_price'] * articleArr[i]['a_discount'] / 100;
            let discountPrice = articleArr[i]['a_price'] - discount;
            smallPriceDiscount.innerText = discountPrice + "€";
            smallDiv.appendChild(smallPriceDiscount);
            //cardFooterDiv.appendChild(smallPriceDiscount);
        }
        // La ligne etat
        let stateDiv = document.createElement('div');
        stateDiv.className = "smallDiv";
        let stateSmall = document.createElement('small');
        if (articleArr[i]['a_available'] === "1") {
            stateSmall.innerText = "(stock:" + articleArr[i]['a_quantity_stock'] + ")";
        } else if (articleArr[i]['a_available'] === "0") {
            stateSmall.innerText = "(Article désactivé)";
        }
        // La ligne qui contient les deux boutons
        let buttonRow = document.createElement('div');
        buttonRow.className = 'row';
        let buttondivModi = document.createElement('div');
        let buttondivDele = document.createElement('div');
        let buttondivCons = document.createElement('div');
        buttondivModi.className = 'col';
        buttondivDele.className = 'col';
        buttondivCons.className = 'col';
        let modifyButton = document.createElement('a');
        let deleteButton = document.createElement('a');
        let consultButton = document.createElement('a');
        modifyButton.className = 'btn btn-primary';
        deleteButton.className = 'btn btn-primary';
        consultButton.className = 'btn btn-primary';
        modifyButton.innerHTML = "<i class=\"fas fa-edit\"></i>";
        deleteButton.innerHTML = "<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>";
        consultButton.innerHTML = "<i class=\"fas fa-search\"></i>";
        modifyButton.href = "../trader/update-article/?id=" + articleArr[i]['a_id'];
        deleteButton.onclick = function () {
            deleteArticle(articleArr[i]['a_id']);
        };

        buttondivModi.appendChild(modifyButton);
        buttondivDele.appendChild(deleteButton);
        buttondivCons.appendChild(consultButton);
        buttonRow.appendChild(buttondivModi);
        buttonRow.appendChild(buttondivDele);
        buttonRow.appendChild(buttondivCons);
        cardBodyDiv.appendChild(cardTitleH5);
        smallDiv.appendChild(smallPriceInitial);
        stateDiv.appendChild(stateSmall);
        cardFooterDiv.appendChild(smallDiv);
        cardFooterDiv.appendChild(stateDiv);
        cardFooterDiv.appendChild(buttonRow);
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(cardFooterDiv);
        colDiv.appendChild(cardDiv);
        articlesContainer.append(colDiv);
    }
}

function deleteArticle(idArticle) {
    $.ajax({
        url: "api/delete-article/" + idArticle,
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