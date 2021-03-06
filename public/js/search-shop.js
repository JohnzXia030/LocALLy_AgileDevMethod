var totalPage;
var currentPage;
var numShop;
var shopArr;
var staticShopArr;
$(document).ready(function () {
    $('.shop-type-option').select2({
        theme: "classic",
        width: "resolve"
    });
    $(".shop-sort").click(function () {
        sortShop = $(this).attr('id');
        shopSort(sortShop);
    });
});

/* recherInput */
const searchinput2 = document.getElementById('searchInput2');
searchinput2.addEventListener('keyup', function () {
    let rechercheInput = searchinput2.value;
    let result = shopArr.filter(item => item.sh_name.toLocaleLowerCase().includes(rechercheInput.toLocaleLowerCase()));
    let suggestions = '';
    if (rechercheInput != '') {
        result.forEach(resultItem =>
            suggestions += `
            <div class="suggestions">${resultItem.sh_name}</div>
            `
        );
        document.getElementById('suggestions').innerHTML = suggestions;
        shopArr = result;
        showShopSorted(shopArr);
    } else if (rechercheInput === '' && rechercheInput.length === 0) {
        shopArr = staticShopArr;
        showShopSorted(shopArr);
    }

    // Ecouteur quand on clique sur les suggestions
    $('div.suggestions').click(function () {
        console.log($(this).html());
        $('#searchInput2').val($(this).html());
        $('#suggestions').html("");
        result = result.filter(item => item.sh_name.toLocaleLowerCase().includes($(this).html()));
        shopArr = result;
        showShopSorted(shopArr);
    });
})

function shopSort(sortShop) {
    if (sortShop === "sort-a-to-z") {
        shopArr.sort(function (a, b) {
            return (b.sh_name.toLowerCase() < a.sh_name.toLowerCase()) ? 1 : -1;
        });
    } else if (sortShop === "sort-z-to-a") {
        shopArr.sort(function (a, b) {
            return (a.sh_name.toLowerCase() < b.sh_name.toLowerCase()) ? 1 : -1;
        });
    }
    showShopSorted(shopArr);
}

function showShopSorted(shopArr) {
    let shopContainer = document.getElementById('shop-container');
    while (shopContainer.lastElementChild) {
        shopContainer.removeChild(shopContainer.lastElementChild);
    }
    $('#pagination').twbsPagination('destroy');
    // Nombre total des shops
    numShop = shopArr.length;
    if (numShop !== 0) {
        // Page
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
                    while (shopContainer.lastElementChild) {
                        shopContainer.removeChild(shopContainer.lastElementChild);
                    }
                    let startIndex = (page - 1) * 9;
                    let endIndex = (page === totalPage) ? numShop - 1 : page * 9 - 1;
                    showCurrentPageShop(startIndex, endIndex);
                    //$('#page-content').text('Page ' + page) + ' content here';
                }
            });
        }
    }
    return false;
}



/* END */
/**
 * Appliquer les filters et obtenir les resultats sur la page
 * @returns {boolean}
 */
function applyFilters() {
    let filters = {};
    filters.city = $('#city').val();
    filters.type = $('#shop-type-option').val();
    filters.pick = $('input[name=shop-filter-pick]:checked').val();
    let filtersJson = JSON.stringify(filters);
    $.ajax({
        url: "api/get-filtered-shop",
        type: "POST",
        data: filtersJson,
        success: function (data) {
            shopArr = data.data;
            staticShopArr = data.data;
            console.log(shopArr);
            let shopContainer = document.getElementById('shop-container');
            while (shopContainer.lastElementChild) {
                shopContainer.removeChild(shopContainer.lastElementChild);
            }
            $('#pagination').twbsPagination('destroy');
            // Nombre total des magasins
            numShop = shopArr.length;
            if (numShop !== 0) {
                // Page
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
                            while (shopContainer.lastElementChild) {
                                shopContainer.removeChild(shopContainer.lastElementChild);
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
        cache: false,
        contentType: false,
        processData: false
    });
    return false;
}

function showCurrentPageShop(startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {

        let shopContainer = document.getElementById('shop-container');
        let colDiv = document.createElement('div');
        colDiv.className = "col";
        var shopId = shopArr[i]['sh_id'];
        colDiv.onclick =  function (){
            location.href='http://localhost/locally/public/view/view-shop?id=' + shopId;
        };
        let cardDiv = document.createElement('div');
        cardDiv.className = "card h-100";
        /* image shop*/
        let cardImg = document.createElement('img');
        cardImg.src = "data:image/gif;base64," + shopArr[i]['p_base64'];
        cardImg.className = 'card-img-top';
        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = "card-body";
        /* nom shop */
        let cardTitleH5 = document.createElement('h5');
        cardTitleH5.innerText = shopArr[i]['sh_name'];
        /* description */
        let cardFooterDiv = document.createElement('div');
        cardFooterDiv.className = "card-footer";
        let descriptionShop = document.createElement('small');
        descriptionShop.innerText = shopArr[i]['sh_description'];

        cardBodyDiv.appendChild(cardTitleH5);
        cardFooterDiv.appendChild(descriptionShop);
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(cardFooterDiv);
        colDiv.appendChild(cardDiv);
        shopContainer.append(colDiv);
    }
}