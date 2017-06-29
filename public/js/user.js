var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var sequelize = new Sequelize('postgres://postgres@localhost:5432/src');

var User = sequelize.define('users',
{
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
	hooks: {
		beforeCreate: function(user){
			const salt = bcrypt.genSaltSync();
			user.password = bcrypt.hashSync(user.password, salt);
		}
	},
	instanceMethods: {
		validPassword: function(password){
			return bcrypt.compareSync(password, this.password);
		}
	}
});


sequelize.sync()
    .then(function(){ 
    	console.log('users table has been successfully created, if one doesn\'t exist')
    })
    .catch(function(error){
    	console.log('This error occured', error)
    });

// export User model for use in other files.
module.exports = User;



