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

    function renderError() {
        if (store.error) {
          const el = generateError(store.error);
          $('.error-container').html(el);
        } else {
          $('.error-container').empty();
        }
      }
    
    function handleCloseError() {
        $('.error-container').on('click', '#cancel-error', () => {
          store.setError(null);
          renderError();
        });
      }

    function render() {

        let bookmarks = [...store.bookmarks];
        let bookmarkString = generateBookmarkString(bookmarks);

        $('.js-articles').html(bookmarkString);
    }



    function generateRatingString(rating) {
        if (rating === 5) {
            return `
            &#9733;
            &#9733;
            &#9733;
            &#9733;
            &#9733;`
        }
        else if (rating === 4) {
            return `
            &#9733;
            &#9733;
            &#9733;
            &#9733;
            &#9734;`
        } 
        else if (rating === 3) {
            return `
            &#9733;
            &#9733;
            &#9733;
            &#9734;
            &#9734;`
        } else if (rating === 2) {
            return `
            &#9733;
            &#9733;
            &#9734;
            &#9734;
            &#9734;`
        } else if (rating === 1) {
            return `
            &#9733;
            &#9734;
            &#9734;
            &#9734;
            &#9734;`
        } else {
            return `
            &#9734;
            &#9734;
            &#9734;
            &#9734;
            &#9734;`
        } 
    }

    function generateBookmarkElement(bookmark) {
        const checkedClass = (bookmark.rating < store.filter) ? 'hidden' : '';

        let innerInfo = '';
            if (bookmark.expanded) {
                innerInfo = `
                <div>
                    <p class="article-description">${bookmark.desc}</p>
                    <a href=${bookmark.url}><button>Visit Site</button></a>
                    <button class="delete-bookmark">Delete</button>
                </div>
                `;
            } else {
                innerInfo = `<button class="more-info">More Info</button>`;
            }
        
        if (bookmark.rating < store.filter) {
            return ``;
        } 
            
        return `
        <li class="article js-article ${checkedClass}" data-item-id="${bookmark.id}">
        <p class="article-title">${bookmark.title}</p>
            <div class="rating">
                ${generateRatingString(bookmark.rating)}
            </div>
            ${innerInfo}
        </li>`;
        
    }

    function generateBookmarkString(bookmarks) {
        const list = bookmarks.map(bookmark => generateBookmarkElement(bookmark));
        return list.join('');
    }

    function renderForm() {
     let bookmarkHTML = '';
     if (store.adding === true)
        bookmarkHTML =  `
                <h2 class="Create-Title">Create Bookmark</h2>
                <label for ="Bookmark-Title">Title</label>
                <input type="text" placeholder="Title" name="Bookmark-Title" class="title-creator" required>
                <label for ="Bookmark-URL">URL</label>
                <input type="text" placeholder="URL" name="Bookmark-URL" class="URL-creator" required>
                <label for="Bookmark-Description"></label>
                <textarea type="text"  placeholder="Longer Description" name="Bookmark-Description" class="description-box" required></textarea>
                <label for="rating">Rating</label>
                <input type="radio" name="rating" value="1">1</input>
                <input type="radio" name="rating" value="2">2</input>
                <input type="radio" name="rating" value="3">3</input>
                <input type="radio" name="rating" value="4">4</input>
                <input type="radio" name="rating" value="5">5</input>
                <button type="submit" class="submit-button">Add Bookmark</button>
        </form>
            `;
            else {
        bookmarkHTML = `
                    <button class="add-bookmark js-add-bookmark">Add Bookmark</button>
                    <select>
                        <option value="" selected disabled hidden>Filter Results</option>
                        <option value="1">One Star</option>  
                        <option value="2">Two Star</option>
                        <option value="3">Three Star</option>
                        <option value="4">Four Star</option>
                        <option value="5">Five Star</option>
                    </select>
                `
            }
        $('#js-add-bookmark').html(bookmarkHTML);
 }




    function expandCreateBookmark() {
        $('#js-add-bookmark').on('click', '.js-add-bookmark', e => {
            store.setAdding();
            renderForm();
        })
    }

    function getIdFromElement(bookmark){
        return $(bookmark)
        .closest('.js-article')
        .data('item-id');
    }

    function expandBookmark() {
        $('.js-articles').on('click', '.more-info', event => {
            let id = getIdFromElement(event.currentTarget);
            console.log(id);
            const thisBookmark = store.findById(id);
            thisBookmark.expanded = !thisBookmark.expanded;
            render();


        })
    }

    function deleteBookmark() {
        $('.js-articles').on('click', '.delete-bookmark', event => {
            let id = getIdFromElement(event.currentTarget);
            api.deleteBookmark(id)
            .then(() => {
                store.findAndDelete(id);
                render();
            })
            .catch((error) => {
            store.setError(error);
            renderError();
            });
        });
    }

    
    function createNewBookmark() {
        $('#js-add-bookmark').submit(event => {
            event.preventDefault();
            const bookMarkDesc = $('.description-box').val();
            const bookMarkRating = $('input:radio[name=rating]:checked').val();
            let obj = {};
            obj.title = $('.title-creator').val();
            obj.url = $('.URL-creator').val();
            if (bookMarkDesc) { obj.desc = bookMarkDesc}
            if (bookMarkRating) { obj.rating = bookMarkRating}
            $('.title-creator').val('');
            $('.URL-creator').val('');
            $('.description-box').val('');
            $('input:radio[name=rating]:checked').prop("checked", false)
            api.createBookmark(obj)
            .then((newBookmark) => {
            store.addItem(newBookmark);
            render();
            })
            .catch(error => {
                store.setError(error.message);
                renderError();
            });
        });

    }

    const filterChange= function() {
        $('#js-add-bookmark').on('change', 'select', (e) => {
          let filter = parseInt($(e.target).val());
          store.setFilter(filter);
          render();
        });
      }

   

    function bindEventListeners() {
        render();
        expandCreateBookmark();
        createNewBookmark();
        renderForm();
        expandBookmark();
        deleteBookmark();
        handleCloseError();
        filterChange();
    }

    return {
        render,
        renderForm,
        bindEventListeners,
    };

}());