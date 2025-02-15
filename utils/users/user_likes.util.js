

export const getUserBookMarks = ({user_id, group}) => {

    if (!user_id) return null;

    try {
        const user = UserModel.findById(user_id).select('bookmarks');
        if (!user) return null;
        
        const bookmarks = user.bookmarks.filter((bookmark) => bookmark.group === group);
        return bookmarks;
    
    } catch (error) {
        console.error(error);
        return null;
    }

}

export const addToUsersBookmarks = ({user_id, group, item_id}) => {
    if (!user_id) return null;

    try {
        const user = UserModel.findByIdAndUpdate(user_id, {$push: {bookmarks: {group, item_id}}}, {new: true});
        if (!user) return null;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}