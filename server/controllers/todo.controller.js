const users = require("../models/user.schema");
const todo = require("../models/todo.schema")


exports.testHome = async (req, res) => {
    res.status(200).send("<h1>All Ok</h1>")
}

exports.getTodo = async (req, res) => {
    try {
        const { id } = req.params; //use params

        const todos = await todo.find({ users: id }).populate('users')

        res.status(200).json(todos)


    } catch (error) {
        console.log(error)
        // console.log("Error at getTodo")
    }
}

exports.createTodo = async (req, res) => {

    try {

        const { title, userId } = req.body;
        if ((!title || !userId)) {
            console.error("all fields are required to store title")

            return res.status(401).json({
                message : "All field are required"
            })

        }

        const user = await todo.find({ users: userId })

        if (!user) {
            console.log("user not found")
        }

        const newTitle = await todo.create({
            users: userId,
            title: title
        })

        // await todo.save()

        res.status(200).json({ newTitle })


    } catch (error) {
        console.log(error)
        console.log("Error at createTitle route")
    }

}

exports.createTask = async (req, res) => {

    try {
        const todoId = req.params.id

        // console.log("todoId for create Tack: ", todoId)

        const { task } = req.body
        // console.log("task for createTask: ", task)
        if (!task) {
            // console.log("Add task")
            return res.status(401).json({
                message : "All field are required"
            })
        }
        //finding by id
        const newToDoTask = await todo.findById({ _id: todoId })
        // console.log(newToDoTask);

        // newToDoTask.task.$push(task)
        newToDoTask.task.push(task)

        await newToDoTask.save()

        res.json(newToDoTask)


    } catch (error) {
        // console.log(error)
        console.log("Error at CreateTask")
    }

}

exports.deleteToDo = async (req, res) => {

    try {
        //geting Id from frontend
        const todoId = (req.params.id);
        // console.log(todoId);

        await todo.findByIdAndDelete({ _id: todoId })

        res.json({
            message: "deleted todo"
        })

    } catch (error) {
        // console.log(error);
        console.log("error at exports.deleteToDo");
    }

}

exports.deleteTask = async (req, res) => {
    try {

        //taking task from frontEnd
        const { task } = req.body;
        // console.log(task);
        // console.log(req.params.id)

        await todo.findByIdAndUpdate(req.params.id, {
            $pull: {
                task: task
            }
        })
        res.json({
            message: "task deleted successfully"
        })

    } catch (error) {
        // console.log(error);
        console.log("error at exports.deleteTask");
    }

}

exports.editTask = async (req, res) => {
    try {

        const { editedTask } = req.body
        const { curTask } = req.body
        // console.log(curTask);  //coming
        // console.log(editedTask); //coming
        const id = req.params.id
        // console.log(id)

        //udate current task to edited task
        const t = await todo.updateOne({ _id: id },
            { $set: { "task.$[element]": editedTask } },
            { arrayFilters: [{ element: curTask }] })

        res.json({
            message: "updated task"
        })

    } catch (error) {
        // console.log(error);
        console.log("error at editTask controller");
    }
}

exports.editTitle = async (req, res) => {
    try {

        //taking input from frontend
        const newTitle = req.body.title
        const id = req.params.id


        const temp = await todo.findByIdAndUpdate({ _id: id }, { title: newTitle })

        res.json({
            message: "updated"
        })

    } catch (error) {
        // console.log(error)
        console.log("error at editTitle controller")
    }
}


