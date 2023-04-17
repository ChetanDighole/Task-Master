
const BASE_URL = 'https://task-master-pi.vercel.app'


export const editTitle = async (todo_id) => {
    const val= prompt("Enter todo")

    if(!val){
      return alert("Please enter valid todo")
      
    }

    await fetch(`${BASE_URL}/editTitle/${todo_id}`, {
        method: 'put',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: val
        })
    })

    return val

}

export const deleteToDo = async (todo_id) => {
    const req = await fetch(`${BASE_URL}/deleteToDo/${todo_id}`, {
        method: 'delete'
    })
    return req
}

export const editTaskFunc = async(e_id,curTask) =>{
    const cur = Object.values(curTask)

    const editedTask = prompt("Edit the task")
    
    if(!editedTask){
      alert("Please enter valid task")
    }else{
      
    await fetch(`${BASE_URL}/editTask/${e_id}/` , {
        method: 'put',
        headers: {
            "Content-Type":'application/json'
        },
        body : JSON.stringify({
            curTask:cur[0],
            editedTask
          })
    })


    }

}

export const deleteCurrentTask = async (e, task) => {
    const val = Object.values(task)

    const req = await fetch(`${BASE_URL}/deleteTask/${e}`, {
        method: 'put',
        headers: {
            "Content-Type":'application/json'
        },
        body: JSON.stringify({
            task: val[0]
          })
    })
    return req

}
