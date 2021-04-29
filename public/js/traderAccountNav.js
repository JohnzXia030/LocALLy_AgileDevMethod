jQuery(document).ready(function(){
    $('div#navPersonalData').click(function(e) {
        e.preventDefault();
        window.location.assign("account");
    });

    $('div#navShopData').click(function(e) {
      e.preventDefault();
      window.location.assign("traderAccountShop");
    });

    $('div#navAddArticle').click(function(e) {
      e.preventDefault();
      window.location.assign("add-article");
    });

    $('div#navUpdateArticle').click(function(e) {
      e.preventDefault();
      window.location.assign("updateDeleteArticle");      /* update-article */
    });

    $('div#createShop').click(function(e) {
      e.preventDefault();
      window.location.assign("create-shop");
    });

    $('div#getOrders').click(function(e) {
        e.preventDefault();
        window.location.assign("orders");
    });
});
  