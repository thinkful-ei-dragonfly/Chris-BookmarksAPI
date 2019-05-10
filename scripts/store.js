const store = (function() {
    
    const setError = function(error) {
        this.error = error;
      };

    const addItem = function(bookmark) {
        this.bookmarks.push(bookmark);
    };

    const setAdding = function() {
        store.adding = !store.adding;
    }

    const setIsExpanding = function(id, isExpanding) {
        const bookmark= this.findById(id);
        bookmark.expanded = expanded;
    }

    const findById = function(id) {
        return this.bookmarks.find(bookmark => bookmark.id === id);
    };

    const findAndDelete = function(id) {
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    };

    const findAndUpdate = function(id, newData) {
        const bookmark = this.findById(id);
        Object.assign(item, newData);
    };

    

    return {
        bookmarks: [],
        error: null,
        adding: false,
        
        addItem,
        findById,
        findAndDelete,
        findAndUpdate,
        setError,
        setAdding,
        setIsExpanding
    }

}());