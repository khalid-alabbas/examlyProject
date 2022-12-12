import mongoose from "mongoose";

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    departmentName:{
        type: String,
    },
    courses:[
        {
        courseHeader:{
        type: String,
        },
        courseDescription:
        {
        type: String,
        }
        ,quizzes:[{
            header:{type: String},
            description:{type: String},
        }]
        ,majors:[{
            header:{type: String},
            description:{type: String},
        }]
        ,midterms:[{
            header:{type: String},
            description:{type: String},
        }]
    }]
    
})

const department = mongoose.model('department', departmentSchema)

export {department ,departmentSchema}