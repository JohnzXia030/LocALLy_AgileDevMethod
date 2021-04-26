var totalPage;
var currentPage;
var numArticle;
var articleArr;

/* recherInput */
const searchinput1 = document.getElementById('searchInput1');
searchinput1.addEventListener('keyup', function() {
    const rechercheInput = searchinput1.value;
    const result = articleArr.filter(item => item.a_name.toLocaleLowerCase().includes(rechercheInput.toLocaleLowerCase()));

    let suggestions ='';

    if(rechercheInput !=''){
        result.forEach(resultItem => 
            suggestions += `
            <div class="suggestions"> ${resultItem.a_name}</div>
            `
            )
        }
        document.getElementById('suggestions').innerHTML = suggestions;

    })
/* END */

$(document).ready(function () {
    var sortArticle='';

    $('.shop-type-option').select2({
        theme: "classic",
        width: "resolve"
    });

    $("#ascending").click(function(){
        sortArticle="Up";
        articleSort(sortArticle);
        console.log("UP");
    });

    $("#descending").click(function(){
        sortArticle="Down";
        articleSort(sortArticle);
    });
});

function articleSort(sortArticle) {
    if(sortArticle=="Up"){
            articleArr.sort(function(a, b){
            return a.a_price - b.a_price;});
            console.log(articleArr);
            
    }else if(sortArticle=="Down") {
        articleArr.sort(function(a, b){
            return b.a_price - a.a_price ;});
            console.log(articleArr);
    }
    showArticleSorted(articleArr);
}

function showArticleSorted(articleArr){
    
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
    return false;
}


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
        let cardFooterDiv = document.createElement('div');
        cardFooterDiv.className = "card-footer";
        let smallPriceInitial = document.createElement('small');
        let smallPriceDiscount = document.createElement('small');
        smallPriceInitial.className = "text-muted";
        smallPriceDiscount.className = "text-muted";
        smallPriceInitial.style = "text-decoration:line-through;";
        smallPriceInitial.innerText = articleArr[i]['a_price'] + "€ ";
        if (articleArr[i]['a_discount'] !== 0) {
            let discount = articleArr[i]['a_price'] * articleArr[i]['a_discount'] / 100;
            let discountPrice = articleArr[i]['a_price'] - discount;
            smallPriceDiscount.innerText = discountPrice + "€";
            cardFooterDiv.appendChild(smallPriceDiscount);
        }
        cardBodyDiv.appendChild(cardTitleH5);
        cardFooterDiv.appendChild(smallPriceInitial);
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(cardFooterDiv);
        colDiv.appendChild(cardDiv);
        articlesContainer.append(colDiv);
    }
}