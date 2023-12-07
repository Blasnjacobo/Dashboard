/* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs' //* bcript help us to encript our password
import jwt from 'jsonwebtoken' //* Give us a way to send a user a web token that they can use for authorization
import User from '../models/User.js'

/* REGISTER USER */

// ? The way this register function works its going to encrypt the password, save it, after save it, when the user try to log in they are going to send the password, we will make sure thats the correct one and give them a json web token

//* This has to be async because we are going to be calling a database, so when you call a dababase it has to be asynchronous, so  its essentially like an API call that you do from frontend to backend into a database.

//* req, res: req will provide us with the re request body that we get from the frontend and res is the response send back to the frontend
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation
    } = req.body
    //* So, in the frontend we will have to send an object that has these arguments

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const NewUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 5000)
    })

    const savedUser = await NewUser.save()
    res.status(201).json(savedUser)
    //* We are going to send the user a status of 201 meaning that something has been created, we are going to create a json version of the saved user so the frontend can receive this response, YOU ALWAYS WANT TO LOOK AT AND MAKE SURE THEYRE GETTING THE CORRECT RESPONSE, so  in this case we are sending back the exact save user in the correct format and the front end will use the same format as well.
  } catch (error) {
    res.status(500).json({ error: error.message })
    //* Send the front end a status code of 500 with an error message of whatever the mongodb database has returned
  }
}

/* LOGGIN IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    //* We are going to use mongoose to try to find the one that has that expecified email and it will bring back all the user information over here.
    if (!user) return res.status(400).json({ msg: 'User does not exist.' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({ token, user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
