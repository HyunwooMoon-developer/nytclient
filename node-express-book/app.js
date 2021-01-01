/* eslint-disable no-undef */
const express= require('express');
const morgan = require('morgan');
const books = require('./book');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('common'));

app.get('/books', (req, res) =>{
    const {search= "", sort} = req.query;
    if(sort){
        if(!['title', 'rank'].includes(sort)){
            return res.status(400).send('sort must be one of title or rank');
        }
    }

    let results = books
                .filter(book =>
                    book.title
                    .toLowerCase()
                    .includes(search.toLowerCase()));
    if(sort){
        results
        .sort((currentBook, nextBook)=>{
            return currentBook[sort] > nextBook[sort] ? 1:
            currentBook[sort] < nextBook[sort] ? -1 : 0;
        })
    }

   
res.json(results);
})

module.exports = app;