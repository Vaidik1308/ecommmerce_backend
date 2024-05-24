import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
export const newUser = TryCatch(async (req, res, next) => {
    throw new Error("lag gye lode");
    const { name, email, photo, gender, dob, _id } = req.body;
    const user = await User.create({
        name,
        email,
        photo,
        gender,
        dob: new Date(dob),
        _id,
    });
    return res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`
    });
});
