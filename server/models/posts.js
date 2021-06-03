module.exports = (sequelize,DataTypes) => {

    const posts = sequelize.define("posts",{
        title:{
            type : DataTypes.STRING,
            allowNull: false,
        },
        postText:{
            type : DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type : DataTypes.STRING,
            allowNull: false,
        }

    });
    //hasMany - adds a foreign key to target and plural association mixins to the source.
    posts.associate = (models) =>{
        posts.hasMany(models.Comments,{
            onDelete:"cascade"
        })
    }
    return posts;
};