const fs = require('fs');
const filepath = "./tasks.json";

const loadTasks = () =>{
    try{
        const dataBuffer = fs.readFileSync(filepath) //convert databuffer intoa string
        const dataJson = dataBuffer.toString() //datajson is not json so we have to convert it
       return JSON.parse(dataJson)
    } catch (error){
        return[]
    }
}
const saveTask =(tasks) =>{
   const dataJSON = JSON.stringify(tasks)
   fs.writeFileSync(filepath,dataJSON)
}
const addTask = (task) =>{
 const tasks = loadTasks()
 tasks.push({task})
 saveTask(tasks)
 console.log("Task added")

}
const listTasks =() =>{
    const tasks = loadTasks()
    tasks.forEach((task,index) => console.log(`${index + 1} - ${task.task}`
    ));
}
const command = process .argv[2]
const argument = process.argv[3]

if(command === 'add'){
    addTask(argument)
}
else if( command === 'list'){
    listTasks()
}else if(command === 'remove'){
    removeTask(parseInt(argument))
}else{
    console.log("Command not found")
}