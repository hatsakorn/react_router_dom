const Joi = require('joi')
const {Todo} = require('../models')

const createTodoSchema = Joi.object({
    title:Joi.string().required().trim(),
    completed:Joi.boolean().default(false)
})

const updateTodoSchema = Joi.object({
    title: Joi.string().trim(),
    completed: Joi.boolean()
}).min(1)

exports.createTodo = async (req,res,next)=>{
    try{
        //1. validate data(req.body)
        const {value,error} = createTodoSchema.validate(req.body)
        if(error)
        return next(error)
        //2. save data to database
        value.userId = req.user.id
        await Todo.create(value)
         //3.sent response
        res.status(201).json({msg:'create todo success'})
    }catch(err){
        next(err)
    }
}
exports.getAllTodo = async (req,res,next)=>{
    try{
        const todos = await Todo.findAll({
            where:{
                userId: req.user.id
            },
            order:[['createdAt','DESC']]
        })
        res.status(201).json({todos})
    }catch(err){
        next(err)
    }
}
exports.updateTodo = async (req,res,next)=>{
    try{
        const {value,error} = updateTodoSchema.validate(req.body)
        if(error)
        return next(error)

        await Todo.update(value,{
            where:{id: req.params.id, userId:req.user.id}})

        res.status(200).json({msg:'update todo success'})
    }catch(err){
        next(err)
    }
}
exports.deleteTodo = async (req,res,next)=>{
    try{
        //DELETE FROM todos WHERE id = req.params.id AND user_id = req.user.id
        await Todo.destroy({where:{id: req.params.id, userId:req.user.id}})
        res.status(204).json()
    }catch(err){
        next(err)
    }
}