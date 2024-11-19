const Admin = require('../../models/admin');
const adminLogout=async(req,res)=>{
    const {token} = req.headers;
    try{
        const admin = await Admin.findOne({token});
        for(let i = 0; i < admin.tokens.length; i++){
            if( token === admin.tokens[i].token ){
                admin.tokens[i].token += 'Im gonna ruin this token';
                break;
            }
        }
        await admin.save();
        res.send({ Message:"You logout successfully!" });
   
    } 
    catch(e){
        res.status(500).send(e);
    }
}
module.exports={adminLogout}