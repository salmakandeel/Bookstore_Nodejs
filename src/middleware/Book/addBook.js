
const Book=require('../../models/book')
const addBook=async (req,res)=>{
try{
  const book=new Book(req.body)
  const duplicatedBook=await Book.findOne({name:book.name})
  if(duplicatedBook)
    return res.status(400).send({Message: 'Duplicate book name.'} )
await book.save()
res.send({book})
}
catch(error){
  if(error.name="ValidationError")
    {
      res.status(400).send({"name":error.name,"message":error.message})
    }
    else{
      res.status(500).send(error)
    }
    
}


}
module.exports={addBook}