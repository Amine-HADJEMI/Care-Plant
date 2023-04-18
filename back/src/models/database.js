const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const User = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Message = sequelize.define('message', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

const PasswordResetCode = sequelize.define('password_reset_code', {
    email: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'password_reset_codes'
});

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.BLOB
  },
  userName: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  carePlant: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

sequelize.sync({ force: true }); 

module.exports = { User, Message, Post, PasswordResetCode }; 
