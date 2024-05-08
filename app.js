const express = require('express');

const port = 8080; 
const app = express();

app.get('/operation/simple',(req, res)=>{
    let sum = 0; 
    for (let i = 0; i < 1_000_000; i++) {
        sum+=i; 
    }

    console.log(`${process.pid} - sum: ${sum}`)

    res.send({
        status:'success',
        payload: sum
    })
})

app.get('/operation/complex',(req, res)=>{
    let sum = 0; 
    for (let i = 0; i < 500_000_000; i++) {
        sum+=i; 
    }
    console.log(`${process.pid} - sum: ${sum}`)

    res.send({
        status:'success',
        payload: sum
    })
})    

app.listen(port, ()=>console.log(`up and running on port ${port} pid ${process.pid}`))
