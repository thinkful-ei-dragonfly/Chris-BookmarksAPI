// eslint-disable-next-line no-unused-vars
const api = (function() {
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Fiander/bookmarks'
   
    function apiFetch(...args) {
      let error = false;
      return fetch(...args)
        .then(response => {
          if (!response.ok) {
            
            error = { code: response.status };
          }
          
          return response.json();
        })
        .then(data => {
          
          if (error) {
            error.message = data.message;
            return Promise.reject(error);
          }
  
          
          return data;
        });
    }

const getBookmarks = function() {
    return apiFetch(BASE_URL);
  };

const createBookmark = function(obj) {
    const newBookmark = JSON.stringify(obj);
    const options ={
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: newBookmark
    };
    return apiFetch(`${BASE_URL}`, options);
 };


 const updateBookmark = function(id, updateData) {
    const newData = JSON.stringify(updateData);
    const options ={
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: newBookmark
      };
    return apiFetch(`${BASE_URL}/${id}`, options);

  };

  
  const deleteBookmark = function(id) {
    const options ={
      method: 'DELETE'
    };
    return apiFetch(`${BASE_URL}/${id}`, options);
  };

return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
};

}());