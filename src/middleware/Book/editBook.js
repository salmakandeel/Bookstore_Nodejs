const Book = require("../../models/book")
const editBook = async (req, res) => {
    const bookName = req.params.id;
    const bookInfo = req.body;
    try {
        const book = await Book.findOne({ name: bookName });
        if (book == null) return res.status(400).send({ Message: 'Book is not Found' }) 

       for (const [key,value] of Object.entries(bookInfo)){
             if(value.length<2)
                return  res.status(400).send({ Message: `Invalid edit. ${key} field is too short.`});
             if(book[key]===value)
             return  res.status(400).send({ Message: `Invalid edit. ${key} field is the same value.`});
            
             book[key]=value
       }     
            await book.save();
            res.send(book);

        }
    
    catch (e) {
        res.status(500).send(e);
    }
}
module.exports = { editBook }