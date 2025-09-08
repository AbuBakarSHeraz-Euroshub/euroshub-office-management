const {model, Schema} = require('mongoose');
const userSchema = new Schema({
    employee_id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    gender: {type: String, required: true, enum:['Male' , 'Female', 'Other']},
    role: {type: String, required: true, enum:['Admin' , 'Employee', 'Manager', 'HR', 'Finance','Intern', 'Developement' ]},
    contact: {type: String, required: true},
    dapartment: {type: String, required: true},
    position: {type: String, required: true},
    joining_date: {type: Date, required: true},
    leave_balance: {type: Number, default: 20}
},{ timestamps: true});

module.exports = model('User' , userSchema);
