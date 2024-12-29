const express = require('express')
const cors = require('cors');
const {connectionDb , getDb} = require('./databse_conn')

const app = express()
app.use(cors());
app.use(express.json())
let dbData


const books = []

connectionDb (err => {
    if(!err) {
        app.listen(3000 , () => {
            console.log("the port is listning")
        })
        dbData = getDb()
    }else {
        console.error(`Database connection failed: ${err.message}`);
      }
})


app.get('/books' , (req,res) => {
    dbData.collection('books')
    .find()
    .sort({year: 1})
    .forEach(element => {
        books.push(element)
    })
    .then(() => {
        res.status(200).json(books)
    })
    .catch(err => {
        res.status(500).json({err:`unable to fetch ${err}`})
    })
})

app.post('/add' , (req,res) => {
     let data = req.body.data
     
    dbData.collection('books')
    .insertOne(data)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error:`error ${err}`})

    })

})


