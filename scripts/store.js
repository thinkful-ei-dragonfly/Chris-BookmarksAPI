const store = (function() {

    const addItem = function(bookmark) {
        bookmark.expanded = false;
        bookmark.isEditing = false;
        this.bookmarks.push(bookmark);
    };

    const setAdding = function() {
        this.adding = !this.adding;
    }

    const findById = function(id) {
        return this.bookmarks.find(bookmark => bookmark.id === id);
    };

    const findAndDelete = function(id) {
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    };

    const setError = function(error) {
        this.error = error;
      };

    const setFilter = function(filter) {
        this.filter = filter;
    };


    

    return {
        bookmarks: [],
        error: null,
        adding: false,
        filter: `none`,

        
        addItem,
        findById,
        findAndDelete,
        setError,
        setAdding,
        setFilter
    }

}());