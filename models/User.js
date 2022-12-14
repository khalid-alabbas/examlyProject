import mongoose from "mongoose";

const Schema = mongoose.Schema;
const resultsSchema = new Schema({
        userId: {
                type: String,
                required: true
        },
        exam: {
                type: String,
                required: true
        },
        score: {
                type: String,
                required: true
        }
})
const userSchema = new Schema({
        firstname: {
                type: String,
        }
        , lastname: {
                type: String,
        }
        , email: {
                type: String,
        }
        , password: {
                type: String,
        },
        banned: {
                type: Boolean,
        },
        results: [resultsSchema]
})

const User = mongoose.model('User', userSchema)

export {User}