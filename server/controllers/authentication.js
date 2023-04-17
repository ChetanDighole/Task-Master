const users = require('../models/user.schema.js')


exports.signup = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if ((!name || !email || !password)) {
            // console.log("All fields are required")
            res.status(422).json({
                message : "All fields are required"
            })
            return
        }

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            // console.log("User already exist")
            res.status(422).json({
                status: 422,
                message: "User already exist"
            })
            return
        }

        const newUser = await users.create({
            name,
            email,
            password
        })

        const token = newUser.getJWTToken()
        newUser.token = token

        res.cookie('token', token)

        res.status(200).json({
            message: 'success',
            status: 200,
            newUser,
            token
        })

    } catch (error) {
        console.log("at sign up")
        console.log(error)
    }
}

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!(email || password)) {
            // console.log("All details are required")
            res.status(422).json({
                message: "All details are required"
            })
            return
        }

        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            // console.log("Invalid credentials")
            res.status(422).json({
                message: "Invalid credentials"
            })
            return
        }

        const isPasswordMatched = await existingUser.comparePassword(password)


        if (isPasswordMatched) {
            const token = await existingUser.getJWTToken();

            res.cookie('token', token, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true
            })

            res.status(200).json({
                message: "success",
                existingUser,
                token
            })
        } else {
            console.log("Invalid Credentials")
            res.status(422).json({
                message: "Invalid Credentials"
            })
        }


    } catch (error) {
        console.log(error)
        console.log("Error at login")
    }

}

exports.validUser = async (req, res) => {
    try {

        const validPerson = await users.findOne({ _id: req.user._id })
        // console.log(validPerson)
        res.status(200).json({ validPerson })

    } catch (error) {
        // console.log(error)
        // console.log('error at valid user')
        res.status(401).json({ status: 401, error })

    }
}

exports.logout = async (req, res) => {
    try {

        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(201).json({
            message: "successful"
        })

    } catch (error) {
        // console.log(error)
        res.status(401).json({
            message: "unsuccessful"
        })
    }
}

