import { BookModel } from "../models/books-model.js";
import { validatePartialSchemaBook, validateSchemaBook } from "../schemas/books.js";

export class BooksController{

static async getAll(req,res){
  const {genre}= req.query;
  const data= await BookModel.getAll({genre});
  res.json(data);

}

static async getById(req,res){
  const{id}=req.params;
  const data= await BookModel.getById({id});
  res.json(data);
}

static async createBook(req, res) {
  try {
    
    const result = validateSchemaBook(req.body);
    
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    // Guardar en la base de datos
    const newBook = await BookModel.createBook({ input: result.data });

    res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ error: error.message, message: "Error creating the book" });
  }
}

static async deleteBook(req,res){
  try{
    const {id}= req.params;
    const result= await BookModel.deleteBook({id});
    if(result==false){
      return res.status(404).json({message:"Book not Found."})
    }
    res.json({message:"Book succesfully delete."})
  }catch(error){
    return res.status(500).json({message:error.message})
  }
  
}

static async updateBook(req,res){
  try{ const {id}= req.params;
  const result= validatePartialSchemaBook(req.body);
  if(!result.success){
  return res.status(400).json({error:JSON.parse(result.error.message)})
  }

  const updatedBook= await BookModel.updateBook({id:id, input:result.data});
  if(updatedBook===false){
  res.status(404).json({message:`Book with Id ${id} not found `})
  }
  return res.json(updatedBook)
  }catch(error){
  return res.status(500).json({error:error.message, message:`Error updating book with id ${req.params?.id}`})
  }


}

}