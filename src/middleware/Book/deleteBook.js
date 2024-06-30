const Book=require("../../models/book")
const deleteBook=async (req,res)=>{
    const bookName = req.params.id;
    try{
        const deletedBook = await Book.findOneAndDelete( {name: bookName} );
        if( !deletedBook )
            return res.status(400).send( {Message: 'Book not found.'});
        res.send( {deletedBook});
    }
    catch(e){
        res.status(500).send(e);
    }
}
module.exports={deleteBook}