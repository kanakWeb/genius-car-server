const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${
    process.env.DB_USER
}:${
    process.env.DB_PASS
}@cluster0.sfzcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});


async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('geniusCarService').collection('service')
        const orderCollection=client.db('geniusCarService').collection('order')
       
        //Auth 
        app.post('/login',async(req,res)=>{
            const user=req.body;
            const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
                expiresIn:'1d'
            })
            res.send({accessToken})
        })
        
        
        
        //services Api
        app.get('/service', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray();
            res.send(services)
        });

        app.get("/service/:id",async(req,res)=>{
            const id=req.params.id;
            const query={_id: ObjectId(id)}
            const service= await serviceCollection.findOne(query)
            res.send(service)
        })


        //POST
        app.post('/service',async(req,res)=>{
            const newService=req.body

            const result= await serviceCollection.insertOne(newService)
            res.send(result);
        })

        //delete
        app.delete('/service/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)}
            const result=await serviceCollection.deleteOne(query)
            res.send(result)
        })
        //order collection api

        app.get('/orders',async(req,res)=>{
            const email=req.query.email
            const query={email:email}
            const cursor=orderCollection.find(query)
            const orders=await cursor.toArray()
            res.send(orders)
        })

        app.post('/order',async(req,res)=>{
            const order=req.body
            const result= await orderCollection.insertOne(order)
            res.send(result)
        })

    } finally { // cath error
    }

}
run().catch(console.dir);


// GeniusUser
// 545MR7tYP2s5FrMR


app.get('/', (req, res) => {
    res.send('running genius server..')
})

app.listen(port, () => {
    console.log('genius car...', port);
})
