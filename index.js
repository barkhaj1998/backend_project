import express from 'express'


const app = express()
const port = 3000

app.use(express.json())

let teaData =[]
let nextId = 1

app.post("/teas",(req,res) =>{
   const {name, price} = req.body
   const newTea = {id:nextId++,name,price}  //creating object
   teaData.push(newTea)
   return res.status(201).send(newTea)
})

app.get("/teas",(req,res)=> {
   
   res.status(200).send(teaData)
   
  
})

//now how do we get any single id
app.get('/teas/:id',(req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id)) 
    //parse int to convert since whatever we get from url is in string
 if(!tea){
    return res.status(404).send("tea not found")
 }
 res.status(200).send(tea)
})

//Update
app.put('/teas/:id',(req,res) => {
    const teaId = req.params.id
    const tea = teaData.find(t => t.id === parseInt(req.params.id)) 
    if(!tea){
        return res.status(404).send("tea not found")
    }  
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)

})
//delete
app.delete('/teas/:id',(req,res) =>{
    teaData.findIndex(t =>t.id === parseInt(req.params.id) )
    if(index === -1){
        return res.status(404).send('tea not found')

    }
    teaData.splice(index,1)
    return res.status(204).send('tea deleted')
})


app.listen(port , () => {
    console.log (`server is running at port : ${port}`)

})