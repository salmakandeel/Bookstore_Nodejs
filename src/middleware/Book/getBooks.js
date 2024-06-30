
const Book=require('../../models/book')

const SearchFilter = require('../../utils/searchFilter');
// Book limit per a page.
const limit = 12;
// get all books
const getAllBooks=async (req,res)=>{
    try{
        let books;
        if( req.headers.user )
            books = await Book.find().limit(limit); // User limit DB search.
        else
            books = await Book.find(); // Admin FULL DB Search
        if( !books )
            return res.status(400).send( {Message: 'There are no books in the data base.'} );
        res.send( books );
    }
    catch(e){
        res.status(500).send(e);
    }
}
// get book by name
const getBookByName=async (req,res)=>{
    const bookSearch = req.params.id;
    try{
        if( bookSearch.length < 2)
            return res.status(400).send( {Message: 'Book name is too short.'} );
        const book = await Book.findOne( { name: bookSearch } );
        if( !book )
            return res.status(400).send( {Message:'Book not found.'} );
        res.send( book );
    }
    catch(e){
        res.status(500).send(e);
    }
}
//get all the books by author name

const getBookByAuthorName=async (req,res)=>{
    const bookSearch = req.params.id;
    try{
        if( bookSearch.length < 2)
            return res.status(400).send( {Message: 'Book name is too short.'} );
        const book = await Book.find( { author: bookSearch } );
        if( !book || book.length === 0 )
            return res.status(400).send( {Message:'Book not found.'} );
        res.send(book);
    }
    catch(e){
        res.status(500).send(e);
    }
}
//get all the books that starts with the request value inserted
const getAllBooksBySpesficStart=async(req,res)=>{
    try{
        const searchValue = req.params.id;
        const books = await Book.find();
        if( searchValue === '*' ){
            let result = [];
            for(let i = 0; i < limit && i < books.length; i++)
                result[i] = books[i];
            return res.send(result);
        }
        const result = [];
        for(let i = 0; i < books.length; i++){
            if( SearchFilter(searchValue.toLowerCase(),books[i].name.toLowerCase()) )
                result.push(books[i]);
        }
        if(result.length==0)
            return res.status(400).send({Message: 'Invalid Search. There are no books start with search value:' + searchValue});
        res.send(result);
    }
    catch(e){
        res.status(500).send(e);
    }
}
// get spesfic page from book
// const getSpesficPage=async(req,res)=>{
//     try{
//         const page = req.params.id;
//         if( page < 1 || page > 1000 || isNaN(page) )
//             return res.status(400).send( {Message: 'Page out of boundaries.'} );
//         const result = await Book.find();
//         const books = [];
//         if(result.length==0)
//             return res.status(400).send( {Message: 'There are no Books in the store.'} );
//         let skip = (page-1) * limit;
//         for( let i = 0; skip < result.length && i < limit; skip++,i++)
//             books[i] = result[skip];
//         if( books.length === 0 )
//             return res.status(400).send( {Message: 'Page out of boundaries.'} );
//         res.send(books);
//     }
//     catch(e){
//         res.status(500).send(e);
//     }
// }
module.exports={getAllBooks,getBookByName,getBookByAuthorName,getAllBooksBySpesficStart}