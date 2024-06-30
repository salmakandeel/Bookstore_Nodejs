const Book = require('../../models/book');
const User = require('../../models/user');
const addBookToCart=async(req,res)=>{
    const bookName = req.params.id;
    const {token} = req.headers;
    try{
        const book = await Book.findOne( {name: bookName} );
        const user = await User.findUser( token );
        if( !user )
            return res.status(400).send({Message: 'User not logged in.'});
        await user.populate( 'cart.book' );
        for(let i = 0; i < user.cart.length; i++ )
            if( book.name === user.cart[0].book.name )
                return res.status(400).send( {Message: 'Book has been already added to the cart previously.'} );
        user.cart.push( {book} );
        await user.save();
        res.send( book );
    }
    catch(e){
        res.status(500).send(e);
    }
}
module.exports={addBookToCart}