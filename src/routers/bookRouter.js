require('../db/mongoose');
const express = require('express');
const {  authenticateJWT  }= require('../middleware/authentication');
const { authorizeRole  }= require('../middleware/authorization');
const {getAllBooks }=require('../Controller/Book/getBooks')
const {getBookByName }=require('../Controller/Book/getBooks')
const {getBookByAuthorName }=require('../Controller/Book/getBooks')
const {getAllBooksBySpesficStart }=require('../Controller/Book/getBooks')
const {addBook} =require('../Controller/Book/addBook')
const {deleteBook }=require('../Controller/Book/deleteBook')
const {editBook }=require('../Controller/Book/editBook')

const router=express.Router()
//*****************************************************  GET REQUEST  ****************************************************************************/

/**
 * Sends all current existing books in the data base to the client.
 */
router.get('/books',authenticateJWT,getAllBooks);

 /* Searches a book by given name and sends it to the client.
 */
router.get('/books/name/:id',authenticateJWT,getBookByName);

/**
 * Searches a book by author name and sends it to the client.
 */
router.get('/books/author/:id',authenticateJWT, getBookByAuthorName);

/**
 * Sends to the client all the books that starts with the request value inserted.
 */
 router.get('/books/search/:id',authenticateJWT, getAllBooksBySpesficStart);



//*****************************************************  POST REQUEST  ****************************************************************************/

/**
 * Adds a book to the data base.
 */
 router.post('/books/add',authenticateJWT,authorizeRole('admin'),addBook);

//*****************************************************  PATCH REQUEST  ****************************************************************************/

/**
 * Change the data of book
 */
router.patch('/books/edit/:id',authenticateJWT,authorizeRole('admin'),editBook);


//*****************************************************  DELETE REQUEST  ****************************************************************************/

/**
 * Removes a book from the data base.
 */
 router.delete('/books/:id',authenticateJWT,authorizeRole('admin'),deleteBook);

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