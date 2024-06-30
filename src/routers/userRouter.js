require('../db/mongoose');
const express = require('express');
const { userAuth } = require('../controller/authentication');
const { editUser } = require('../middleware/User/editUser');
const { loginUser } = require('../middleware/User/userLogin');
const { userLogout } = require('../middleware/User/userLogout');
const { addUser } = require('../middleware/User/addUser');
const { addBookToCart } = require('../middleware/CartList/addBook');
const { clearCart } = require('../middleware/CartList/clearCart');
const { getBooks } = require('../middleware/CartList/getAllUsersBooks');





const router = express.Router();



//*************************************************** GET REQUEST************************************************************************* */
/**
 * Logouts user and destroys the user token.
 */
 router.get('/user/logout', userLogout);


/**
 * Sends to the client the existing books in the user cart.
 */
router.get('/user/cart',getBooks);



//*************************************************** POST REQUEST************************************************************************* */

/**
 * Creates a user and adds it to the mongo DB.
 */
router.post('/user/create', addUser);

/**
 * Checks if user login credentials ( email,password ) are correct.
 */
router.post('/user/login', loginUser);


/**
 * Adds a book to the user cart list.
 */
router.post('/user/cart/add/:id',userAuth, addBookToCart);

/**
 * Clears the user cart.
 */
router.get('/user/cart/buy',userAuth, clearCart);

//*************************************************** PATCH REQUEST************************************************************************* */

/**
 * Edits a user information.
 */
router.post('/user/me/edit',editUser);

module.exports = router;