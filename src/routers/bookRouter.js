require('../db/mongoose');
const express = require('express');
const { adminAuth  }= require('../controller/authentication');
const {getAllBooks }=require('../middleware/Book/getBooks')
const {getBookByName }=require('../middleware/Book/getBooks')
const {getBookByAuthorName }=require('../middleware/Book/getBooks')
const {getAllBooksBySpesficStart }=require('../middleware/Book/getBooks')
const {addBook} =require('../middleware/Book/addBook')
const {deleteBook }=require('../middleware/Book/deleteBook')
const {editBook }=require('../middleware/Book/editBook')

const router=express.Router()
//*****************************************************  GET REQUEST  ****************************************************************************/

/**
 * Sends all current existing books in the data base to the client.
 */
router.get('/books',getAllBooks);

 /* Searches a book by given name and sends it to the client.
 */
router.get('/books/name/:id',getBookByName);

/**
 * Searches a book by author name and sends it to the client.
 */
router.get('/books/author/:id', getBookByAuthorName);

/**
 * Sends to the client all the books that starts with the request value inserted.
 */
 router.get('/books/search/:id', getAllBooksBySpesficStart);



//*****************************************************  POST REQUEST  ****************************************************************************/

/**
 * Adds a book to the data base.
 */
 router.post('/books/add',adminAuth,addBook);

//*****************************************************  PATCH REQUEST  ****************************************************************************/

/**
 * Change the data of book
 */
router.patch('/books/edit/:id',adminAuth,editBook);


//*****************************************************  DELETE REQUEST  ****************************************************************************/

/**
 * Removes a book from the data base.
 */
 router.delete('/books/:id',adminAuth, deleteBook);

// For any other route
 router.get('*',async (req,res)=>{
    try{
        res.status('404').send({Message:"Unexpectd url"});
    }
    catch(e){
        res.status(500).send(e);
    }
});


module.exports= router;