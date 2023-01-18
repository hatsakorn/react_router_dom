
module.exports = (sequelize,DataTypes)=>{
const Todo = sequelize.define('Todo',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
    }
},{
    underscored:true
})

Todo.associate = models => {
    Todo.belongsTo(models.User)
}

return Todo;
}