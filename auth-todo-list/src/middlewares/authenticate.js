const CustomError = require('../utils/customError')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

module.exports = async (req,res,next)=>{
    try{
        //Bearer +jwt token key
        const { authorization } = req.headers
        if(!authorization || !authorization.startsWith('Bearer ')){
            return next(new CustomError('you are unauthorized',401))
        }
        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({where:{id:payload.id}})
        if(!user){
            return next(new CustomError('you are unauthorized1',401))
        }
        req.user = user
        next();
    }catch(err){
        next(err)
    }
}