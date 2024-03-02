import userModel from "../../../../DB/models/userModel/user.model.js";
import jwt from 'jsonwebtoken'

// user register
export const UserRegister = async (req, res) => {
    try {
        const registeredUser = await userModel.findOne({ email: req.body.email });
        if (registeredUser) {
            res.json({ success: false, message: 'User is already Exists' });
        } else {
            const newUser = await userModel.create(req.body)
            res.json({ success: true, message: 'Registration Successfully' });
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false, message: `Register Controller ${error.message}`,
        });
    }
};

// user login
export const UserLogin = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email, password: req.body.password });
        if (!user) {
            res.json({ success: false, message: ' Invalid Email or Password' });
        } else {
            const JWT_SEC = 'XYZGHS123'
            const token = jwt.sign({ id: user._id }, JWT_SEC, { expiresIn: '1d' })
            res.json({ success: true, message: 'Login Successfully', result: { user: user, token: token } });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false, message: `Login Controller ${error}`
        });
    }
};

// user Details with headers => token
export const userDetails = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        if (!user) {
            return res.json({ success: false, message: 'user not found' })
        } else {
            return res.json({ success: true, message: 'user found successfully', result: user })
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: `authentication error : ${error}` })
    }
};


export const UpdatePass = async (req, res) => {
    try {
        // Find user by ID
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.json({ success: false, message: 'user not found' })
        } else {
            if (user.password !== req.body.oldPassword) {
                return res.json({ success: false, message: 'user password is not correct' });
            } else {
                // const newPass = await user.updateOne({ password: req.body.newPassword })
                const newPass = req.body.newPassword
                if (!newPass || newPass.length < 6) {
                    return res.json({ success: false, message: 'user password is not Updated & must be at least 6 numbers' })
                } else {
                    if (req.body.newPassword == req.body.oldPassword) {
                        return res.json({ success: false, message: 'The new password must be different' })
                    } else {
                        await user.updateOne({ password: req.body.newPassword })
                        await user.save()
                        return res.json({ success: true, message: 'user password is Update successfully' })
                    }
                };
            }
        }
    }
    // Validate old password using a comparison function
    catch (error) {
        console.error(error);
        return res.json({ success: false, message: `Internal server error ${error}` });
    }
};
