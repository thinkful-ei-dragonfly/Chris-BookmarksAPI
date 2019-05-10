/* global store, api, $ */

// eslint-disable-next-line no-unused-vars

const eventHandler = (function(){

    function generateError(message) {
        return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
    }

    function generateBookmarkElement(bookmark) {
        
    }

    function renderError() {
        if (store.error) {
          const el = generateError(store.error);
          $('.error-container').html(el);
        } else {
          $('.error-container').empty();
        }
      }
    
    function render() {
        renderError();
    }

    function handleCloseError() {
        $('.error-container').on('click', '#cancel-error', () => {
          store.setError(null);
          renderError();
        });
    }

    function bindEventListeners() {
        handleCloseError();
    }

    return {
        render: render,
        bindEventListeners: bindEventListeners,
    };

}());