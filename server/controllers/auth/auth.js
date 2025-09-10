const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const {genToken} = require('../../config/jwt');
exports.register = async(req, res) =>{
    try{
        const {employee_id, name, email, password, gender, role, contact, dapartment, position, joining_date,leave_balance} = req.body;
        if(!employee_id || !name || !email || !password || !gender || !role || !contact || !dapartment || !position || !joining_date || !leave_balance){
        return res.status(400).json({message: 'All fields are required'});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
            employee_id,
            name,
            email,
            password: hashedPassword,
            gender,
            role,
            contact,
            dapartment,
            position,
            joining_date,
            leave_balance
        });
        console.log('User Registered Successfully');        
        res.status(201).json({message:'User Registered Successfully'});


    }catch(error){
        res.status(500).json({message:'Server Error',error: error.message});
        console.error('Error in User Registration:', error);

    }
};

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if( !email || !password)
        {
            return res.status(400).json({message: 'All fields are required'});
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message:'Invalid Credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(400).json({message:'Invalid Credentials'});
        }
        const token = genToken(user._id);
        const { password: userPassword, ...userWithoutPassword } = user.toObject();
        res.status(200).json({message:'Login Successful', token, user: userWithoutPassword});
    }catch(error){
        res.status(500).json({message:'Server Error', error: error.message});
        console.error('Error in User Login:', error);
    }

};

exports.getProfile = async(req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({message: 'User not Found'});
        }
        const {password, ...userWithoutPassword} = user.toObject();
        res.status(200).json({user: userWithoutPassword});
    }catch(error){
        res.status(500).json({message: 'It is not you is is US', error: error.message});
        console.error('Error in Fetching user Profile: ' , error);
    }
};
