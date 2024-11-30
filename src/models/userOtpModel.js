import UserOtp from "../schemas/userOtpSchema.js";

// Create User OTP
export const createUserOtp = async (data) => {
  console.log("Inside createUserOtp", data);
  const newOtp = new UserOtp({
    ...data,
    createdAt: new Date(), // Add a timestamp if required
  });
  const savedOtp = await newOtp.save();
  console.log("User OTP added:", savedOtp);
  return savedOtp;
};

// Get User OTP
export const getUserOtp = async (whereQuery) => {
  const otp = await UserOtp.findOne(whereQuery);
  return otp;
};

// Delete User OTP
export const deleteUserOtp = async (whereQuery) => {
  const result = await UserOtp.deleteOne(whereQuery);
  console.log("OTP deletion result:", result);
  return result;
};

// Update User OTP
export const updateUserOtp = async (matchQuery, updateQuery) => {
  const result = await UserOtp.updateOne(
    matchQuery, // Filter condition
    updateQuery // Update fields
  );
  console.log("OTP update result:", result);
  return result;
};
