/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 5
    },
    picturePath: {
      type: String,
      default: ''
    },
    friends: {
      type: Array,
      default: []
    },
    location: String,
    occupation: String,
    viewProfile: Number,
    impressions: Number
  },
  { timestamps: true } //* timestamps will give us authomatic dates for when it is created, updated, etc
)

const User = mongoose.model('User', UserSchema)
//* So when you create an mongoose model you want to create a mongoose schema first and then we pass it into mongoose.model, and then pass it into User

export default User
