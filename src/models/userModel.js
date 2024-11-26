import User from "../schemas/userSchema.js";


//create user
export const createUser = async(data)=>{
    console.log("inside model",data);
    const newUser = new User({
        ...data,
        isVerified:false
    });
    const savedUser = await newUser.save();
    console.log("User added:", savedUser);
    return savedUser
}


//get user
export const getUser = async({whereQuery})=>{
    const user = await User.findOne(whereQuery);
    return user
}


//delete user
export const deleteUser = async({whereQuery})=>{
    const result = await User.deleteOne(whereQuery);
    return result
}


//update user
export const updateUser = async(matchQuery,updateQuery)=>{
    const result = await User.updateOne(
         matchQuery ,  // Filter condition
        updateQuery )
        console.log(result,'query')
    return result
}