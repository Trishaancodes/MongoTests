require('dotenv').config();
const MONGODB_URI=`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/?retryWrites=true&w=majority`
const {MongoClient} = require('mongodb');
const express = require('express');
const app = express();

const client = new MongoClient(MONGODB_URI);
const port = process.env.PORT || 8000;

app.set('view engine', 'ejs');

async function main(){
    try{
        await client.connect();
        const db = client.db('users');
        const collection = db.collection('users');

        app.get('/', async (requestAnimationFrame,res) => {
            const data = await collection.find().toArray();
            res.render('index', {data});
        });
        app.listen(port, () =>{
            console.log(`Server is running at http://localhost:${port}`);
        })
    } catch (err){
        console.error(err);
    }
}
main();