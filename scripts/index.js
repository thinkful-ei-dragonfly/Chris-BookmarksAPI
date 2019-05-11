/* global shoppingList, store, api */

$(() => {
    eventHandler.bindEventListeners();
    eventHandler.render();
    eventHandler.renderForm();
    api.getBookmarks()
      .then((items) => {
        console.log(items);
        items.forEach((item) => store.addItem(item));
        eventHandler.render();
      });
  
  });