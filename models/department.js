import mongoose from "mongoose";

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    departmentName:{
        type: String,
    },
    courses:[
        {
        header:{
        type: String,
        },
        description:
        {
        type: String,
        }
        ,quizzes:[{
            header:{type: String},
            description:{type: String},
            questions : [{
                question: {type: String},
                answers: [{type: String}]
            }]
        }]
        ,majors:[{
            header:{type: String},
            description:{type: String},
            questions : [{
                question: {type: String},
                answers: [{type: String}]
            }]
        }]
        ,midterms:[{
            header:{type: String},
            description:{type: String},
            questions : [{
                question: {type: String},
                answers: [{type: String}]
            }]
        }]
    }]
    
})

const department = mongoose.model('department', departmentSchema)

export {department}