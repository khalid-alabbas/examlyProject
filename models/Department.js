import mongoose from "mongoose";

const Schema = mongoose.Schema;

const quesionSchema = new Schema({
        question:{
                type: String,
                required: true
        },

        answers: {
                type: [String],
                required: true
        }
        
})

const examSchema = new Schema({
        header:{
                type: String,
                required: true
        },

        description: {
                type: String,
                required: true
        },
        questions:[quesionSchema]
        
})

const courseSchema = new Schema({
        header:{
                type: String,
                required: true
        },

        description: {
                type: String,
                required: true
        },

        quizzes:[examSchema]


})

const departemntSchema = new Schema({
        departmentName: {
                type: String,
                required: true
        },

        courses:[courseSchema]

})

const Department = mongoose.model('Department', departemntSchema)
const Course = mongoose.model('Course', courseSchema)
const Exam = mongoose.model('Exam', examSchema)
const Question = mongoose.model('Question', quesionSchema)

export { Department, Course, Exam, Question }