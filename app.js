const cluster = require('cluster')
const os = require('os'); 
const express = require('express');

const cpuQuantity = os.cpus().length; 



if(cluster.isPrimary){
    console.log(`${process.pid} - Is primary? ${cluster.isPrimary}, starting a worker process`)
    for (let i = 0; i < cpuQuantity; i++) {
        cluster.fork()
    }

    // cluster.on('message', (worker, message)=>{
    //     console.log('---->', worker.process.pid, message)
    // })
    cluster.on('exit', (worker)=>{
        console.log(`I've been killed, ${worker.process.pid} `)
        cluster.fork()
    })
}else{
    console.log(`${process.pid} Is primary? ${cluster.isPrimary}, I'm a worker process`)
    //process.send({message:'I just started'})
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
}