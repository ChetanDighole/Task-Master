import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'https://task-master-pi.vercel.app'

const Auth = () => {

    const navigate = useNavigate()


    //check if user wants to sign in or sign up
    const [newUser, setNewUser] = useState(false)

    //to store input values
    const [inputVal, setInputVal] = useState({
        name: '',
        email: '',
        password: '',
    })

    //function for new sign up
    const submitSignup = async (e) => {
        e.preventDefault()
        const { name, email, password } = inputVal
        const data = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        })

        const json = await data.json();
        setInputVal({
            name: '',
            email: '',
            password: '',
        })

        if (json.message === 'success') {
            setNewUser(false)
        } else if (json.message !== 'success'){
            alert(json.message)
        }
    }

    //function for log in
    const submitSignIn = async (e) => {
        e.preventDefault()
        const { email, password } = inputVal

        const data = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const json = await data.json();
        setInputVal({
            email: '',
            password: '',
        })
        if (json.message === 'success') {
            localStorage.setItem('token', json.token)
            navigate('/home')
        } else if(json.message !== 'success'){
            alert(json.message)
        }

    }

    //function to store input values
    const setValFunc = (e) => {
        const { name, value } = e.target;
        setInputVal(() => {
            return {
                ...inputVal, [name]: value
            }
        })
    }

    return (
        <div>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="max-w-[95%] w-full p-6 m-auto bg-white rounded-md  ring-2 ring-indigo-600 lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
                        {
                            (newUser) ? 'Sign UP' : "Sign In"
                        }
                    </h1>
                    <form className="mt-6" onSubmit={(newUser) ? submitSignup : submitSignIn}>

                        {
                            (newUser) ? <div className="mb-2">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Name
                                </label>
                                <input
                                    value={inputVal.name} onChange={setValFunc}

                                    type="text" autoComplete='off' name='name'
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div> : <></>
                        }

                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                value={inputVal.email} onChange={setValFunc}

                                type="email" autoComplete='off' name='email'
                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                value={inputVal.password} onChange={setValFunc}

                                type="password" name='password'
                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mt-6">
                            {
                                (newUser) ? <button type='submit' className="w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 border-b-4 border-indigo-800 hover:border-indigo-600 rounded">
                                    Sign Up
                                </button> : <button type='submit' className="w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 border-b-4 border-indigo-800 hover:border-indigo-600 rounded">
                                    Sign In
                                </button>
                            }
                        </div>
                    </form>
                    {
                        (newUser) ? <p className="mt-8 text-m font-light text-center text-gray-700" >

                            Already have an account? <span className='cursor-pointer text-indigo-700 font-bold' onClick={() => setNewUser(false)}>Sign in</span>
                        </p> : <p className="mt-8 text-m font-light text-center text-gray-700" >

                            Don't have an account? <span className='cursor-pointer text-indigo-700 font-bold' onClick={() => setNewUser(true)}>Sign Up</span>
                        </p>
                    }

                </div>
            </div>
        </div>
    )
}

export default Auth
