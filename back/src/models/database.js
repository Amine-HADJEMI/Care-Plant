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

const Role = sequelize.define('role', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

// Un utilisateur peut avoir un seul rôle
User.belongsTo(Role);

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

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({ force: true }).then(() => {
  // Créer les rôles "Admin" et "User" si ils n'existent pas déjà
  console.log('Models synchronized with database');
  Role.findOrCreate({
    where: { name: 'Admin' },
    defaults: { name: 'Admin' }
  }).then(() => {
    Role.findOrCreate({
      where: { name: 'User' },
      defaults: { name: 'User' }
    });
  });
});


module.exports = { User, Message, Post, Role, PasswordResetCode , sequelize}; 
