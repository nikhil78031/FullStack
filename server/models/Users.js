module.exports = (sequelize,DataTypes) => {

    const Users = sequelize.define("Users",{
        username:{
            type : DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type : DataTypes.STRING,
            allowNull: false,
        },

    });
    //hasMany - adds a foreign key to target and plural association mixins to the source.
    Users.associate = (models) =>{
        Users.hasMany(models.posts,{
            onDelete:"cascade"
        })
        Users.hasMany(models.Likes,{
            onDelete:"cascade"
        })
    }
    return Users;
};