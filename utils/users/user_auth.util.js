import UserModel from "../../models/users.model.js";


export const getUserData = async ({user_id}) => {
    if (!user_id) return null;

    try {
        const user = await UserModel.findById(user_id).select('firstname lastname email profilePicture');
        if (!user) return null;
        return user;
    } catch (error) {
        
    }
}

export const updateUser = async ({user_id, firstname, lastname, profilePicture}) => {
    if (!user_id) return null;

    try {
        const user = await UserModel.findByIdAndUpdate(user_id, {firstname, lastname,  profilePicture}, {new: true});
        if (!user) return null;
        return user;
    } catch (error) {

    }
}