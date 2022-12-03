import mongoose from "mongoose";

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    department:{
        type: String,
        required: true
    },
    courseHeader:{
        type: String,
        required: true
    },
    courseDescription:{
        type: String,
        required: true
    }
})

const department = mongoose.model('User', userSchema)

export default department