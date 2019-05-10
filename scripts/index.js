/* global shoppingList, store, api */

api.getBookmarks()
    .then((item) => {
      console.log(item);
    })
    .catch(err => console.log(err.message))