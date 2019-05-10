/* global shoppingList, store, api */

$(document).ready(function() {
    eventHandler.bindEventListeners();
  
  

api.createBookmark('Youtube', 'https://youtube.com', 'Watch and upload videos', 4, 'true')
    .then((item) => {
      console.log(item);
    })
    .catch(err => console.log(err.message))

});