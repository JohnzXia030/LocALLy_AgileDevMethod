jQuery(document).ready(function(){
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

    $('div#navViewArticles').click(function(e) {
      e.preventDefault();
      window.location.assign("viewArticles");
    });

  });
  