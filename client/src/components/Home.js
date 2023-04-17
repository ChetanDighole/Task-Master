
import React, { useEffect, useState } from 'react'
import { editTitle, deleteToDo, editTaskFunc, deleteCurrentTask } from '../utils/helperFunctions'
import { useNavigate } from 'react-router-dom'
import logout from "../assets/logout.png"


const BASE_URL = 'https://task-master-pi.vercel.app'

const Home = () => {

    const navigate = useNavigate()


    const [user, setUser] = useState({})
    const [getTodo, setGetTodo] = useState([])
    const [useValue, setUseValue] = useState("")
    const [editedTitle, setEditedTitle] = useState("")
    const [deleteTodo, setDeleteTodo] = useState("")
    const [editTaskTodo, setEditTaskTodo] = useState({})
    const [deleteTaskCurrent, setDeleteTaskCurrent] = useState({})
    const [task, setTask] = useState([""])


    useEffect(() => {

        const timer = setTimeout(() => {
            getUser()
        }, 500);

        return (() => {
            clearTimeout(timer)
        })

    }, [editedTitle, deleteTodo, useValue, editTaskTodo, deleteTaskCurrent, task])

    function getUser() {
        let token = localStorage.getItem('token')
        fetch(`${BASE_URL}/validUser`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(response => {
                return response
            })
            .then(response => response.json())
            .then(json => {
                if (json.status === 401 || !json) {
                    navigate('/')
                } else {

                    setUser(json.validPerson)
                    return json
                }
            })
            .then(fetchTodo => {
                return fetch(`${BASE_URL}/getTodo/` + fetchTodo.validPerson._id)
            })
            .then(response => {
                return response.json()
            }
            )
            .then(response => {
                return response
            })
            .then(get => setGetTodo(get))

    }

    const createNewTask = async (e, i) => {
        await fetch(`${BASE_URL}/createTask/${e}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task: task[i]
            })
        })

        const updatedTask = [...task]
        updatedTask[i] = ""

        setTask(updatedTask)

    }

    const handleCreateTodo = async (useValue, user_id) => {
        await fetch(`${BASE_URL}/createTodo`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: useValue,
                userId: user_id
            })
        })
        setUseValue("")
    }

    const logoutFun = async () => {
        const res = await fetch(`${BASE_URL}/logout`)
    
        const json = await res.json()
    
        if(json.message === 'successful'){
            localStorage.removeItem('token')
            navigate('/')
        }else{
            console.log("error in log out")
        }
    }


    return (
        <div className="font-sans">
            <div>
                <div className='flex items-center justify-between shadow-lg p-2'>

                    <div>
                        <h1 className='text-4xl font-black '>Hi, <span className='text-indigo-700  '>{user?.name}</span></h1>
                    </div>
                    <img alt='logout img' className='cursor-pointer	' src={logout} onClick={()=>logoutFun()} />

                </div>

                <div className="flex flex-col items-center gap-4 py-4">
                    <h1 className="text-4xl font-black text-center">Task Master</h1>
                    <div className="flex flex-col items-center gap-4 py-2">

                        <label>
                            <input type="text" name="name" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Add Title To List"
                                value={useValue}
                                onChange={(event) => setUseValue(event.target.value)}
                            />
                        </label>

                        <button onClick={() => handleCreateTodo(useValue, user._id)} className="w-[250px] bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                            Create List
                        </button>

                    </div>


                    <div className="flex w-[100vw] flex-wrap justify-center items-center gap-4 py-4">

                        {
                            getTodo.map((temp, i) => (
                                <div className='flex flex-col border-2 border-sky-500 py-2 px-4 font-bold rounded-lg gap-4' key={i}>
                                    <div className='flex justify-between gap-4'>
                                        <h1 className='text-2xl'>{temp.title}</h1>

                                        <div className='flex item-center gap-3'>
                                            <button className='bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 border-b-4 border-green-800 hover:border-green-800 rounded'
                                                onClick={() => setEditedTitle(editTitle(temp._id))}
                                            >Edit Title</button>

                                            <button className='bg-rose-600 hover:bg-rose-700 text-white font-bold py-1 px-2 border-b-4 border-rose-800 hover:border-rose-800 rounded'
                                                onClick={() => setDeleteTodo(deleteToDo(temp._id))}
                                            >Delete</button>
                                        </div>
                                    </div>

                                    {/*------------------------------------- adding all task------------------------------- */}
                                    <div className='flex item-center gap-4'>
                                        <label>
                                            <input type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Add Task"

                                                value={task[i] || ""}
                                                onChange={(event) => {
                                                    const updatedTask = [...task];
                                                    updatedTask[i] = event.target.value;
                                                    setTask(updatedTask);
                                                }}

                                            />
                                        </label>
                                        <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 border-b-4 border-blue-800 hover:border-blue-800 rounded'
                                            onClick={() => createNewTask(temp._id, i)}
                                        >Add Task</button>
                                    </div>

                                    {/*-------------------------------- displaying task ----------------------------------------*/}


                                    {temp.task && temp.task.map((iterate, index) => (
                                        <div key={index} className='flex justify-between'>
                                            <h1>{index + 1}. {iterate}</h1>
                                            <div className='flex item-center gap-3'>
                                                {/* -------------------------------edit task---------------------------------------- */}
                                                <button className="text-green-600 hover:text-green-700"
                                                    onClick={() => setEditTaskTodo(editTaskFunc(temp._id, { iterate }))}
                                                >Edit</button>
                                                {/* -------------------------------delete task---------------------------------------- */}
                                                <button className="text-red-600 hover:text-red-700"
                                                    onClick={() => setDeleteTaskCurrent(deleteCurrentTask(temp._id, { iterate }))}
                                                >Delete</button>
                                            </div>
                                        </div>

                                    ))}

                                </div>

                            ))}
                    </div>


                </div>


            </div>
        </div>
    )
}

export default Home
