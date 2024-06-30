
const express = require('express');
const { adminAuth } = require('../controller/authentication');
const {addAdmin}=require('../middleware/Admin/addAdmin')
const {login}=require('../middleware/Admin/login')
const {verifyAdminToken}=require('../middleware/Admin/login')
const {adminLogout}=require('../middleware/Admin/logout')



const router = express.Router();

//****************************************************** GET REQUEST ********************************************************************* */

/**
 * Renders the login-admin page.
 */
router.get('/admin/login',login);

/**
 * Verifies admin token and sends back the ID.
 */
 router.get('/admin-verify-token', adminAuth, verifyAdminToken);

/**
 * Logout {admin user by removing the token from the tokens array.
 */
 router.get('/admin/logout', adminLogout);


//****************************************************** POST REQUEST ******************************************************************** */

/**
 * Admin log in request. Checks if credentials are correct {and grants a token.
 */
router.post('/admin/signUp',addAdmin );

module.exports = router;