require('../db/mongoose');
const express = require('express');
const {  authenticateJWT  }= require('../middleware/authentication');
const { authorizeRole  }= require('../middleware/authorization');
const { editUser } = require('../Controller/User/editUser');
const { loginUser } = require('../Controller/User/userLogin');
const { userLogout } = require('../Controller/User/userLogout');
const { addUser } = require('../Controller/User/addUser');
const { addBookToCart } = require('../Controller/CartList/addBook');
const { clearCart } = require('../Controller/CartList/clearCart');
const { getBooks } = require('../Controller/CartList/getAllUsersBooks');


const router = express.Router();



//*************************************************** GET REQUEST************************************************************************* */
/**
 * Logouts user and destroys the user token.
 */
 router.get('/user/logout',authenticateJWT,authorizeRole('user'), userLogout);


/**
 * Sends to the client the existing books in the user cart.
 */
router.get('/user/cart',authenticateJWT,authorizeRole('user'),getBooks);



//*************************************************** POST REQUEST************************************************************************* */

/**
 * Creates a user and adds it to the mongo DB.
 */
router.post('/user/signup', addUser);

/**
 * Checks if user login credentials ( email,password ) are correct.
 */
router.post('/user/login', loginUser);


/**
 * Adds a book to the user cart list.
 */
router.post('/user/cart/add/:id',authenticateJWT,authorizeRole('user'), addBookToCart);

/**
 * Clears the user cart.
 */
router.get('/user/cart/clear',authenticateJWT,authorizeRole('user'), clearCart);

//*************************************************** PATCH REQUEST************************************************************************* */

/**
 * Edits a user information.
 */
router.post('/user/me/edit',authenticateJWT,authorizeRole('user'),editUser);

module.exports = router;