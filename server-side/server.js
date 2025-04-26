const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const app = express();
const PORT = 5000;
const USERS = path.join(__dirname , 'users.js');

app.use(cors());
app.use(bodyParser.json());

function loadUsers() {
    if(!fs.existsSync(USERS)) return[]

    const data = fs.readFileSync(USERS);
    return JSON.parse(data);
}

function saveUsers(use){
    fs.writeFileSync(USERS , JSON.stringify(use, null , 2));
}

app.post('/' , (req , res) => {
    const {email , password} = req.body;
    const users = loadUsers();

    const userExist = users.find((u) => u.email === email)
    if(userExist){
        return res.status(400).json({message: 'User already exists'})
    }

    const newUser = {email , password};
    users.push(newUser);
    saveUsers(users)

    res.status(200).json({message: 'User registered successfully'})

    
})

app.post('/login' , (req , res) => {
    const {email , password} = req.body

    const users = loadUsers();

    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if(!user){
        return res.status(400).json({message: 'Invalid credentials'});
    }

    res.status(200).json({message: 'Login succesfully'})
})


app.listen(PORT , () => {
    console.log(`Server is startin on ${PORT} `)
})
