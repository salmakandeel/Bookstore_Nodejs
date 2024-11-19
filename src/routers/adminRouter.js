
const express = require('express');
const {  authenticateJWT  }= require('../middleware/authentication');
const { authorizeRole  }= require('../middleware/authorization');
const {addAdmin}=require('../Controller/Admin/addAdmin')
const {login}=require('../Controller/Admin/login')
const {verifyAdminToken}=require('../Controller/Admin/login')
const {adminLogout}=require('../Controller/Admin/logout')



const router = express.Router();

//****************************************************** GET REQUEST ********************************************************************* */

/**
 * Renders the login-admin page.
 */
router.get('/admin/login',login);

/**
 * Verifies admin token and sends back the token.
 */
 router.get('/admin/verify-token', authenticateJWT,authorizeRole('admin'), verifyAdminToken);

/**
 * Logout {admin user by removing the token from the tokens array.
 */
 router.get('/admin/logout',authenticateJWT,authorizeRole('admin'), adminLogout);


//****************************************************** POST REQUEST ******************************************************************** */

/**
 * Admin log in request. Checks if credentials are correct {and grants a token.
 */
router.post('/admin/signUp',addAdmin );

module.exports = router;