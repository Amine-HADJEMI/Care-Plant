const { Sequelize, DataTypes } = require('sequelize');

<<<<<<< HEAD
const Database = {};

Database.db = new sqlite3.Database(
  "database.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  }
);
=======
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
>>>>>>> d1b206e04c839c4b555dfb5f3de34f2fbd6a0899

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

<<<<<<< HEAD
Database.db.run(`CREATE TABLE users_backup AS SELECT * FROM users;`);

Database.db.run(`
    CREATE TABLE IF NOT EXISTS messages (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        user TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
Database.db.run(`
    CREATE TABLE IF NOT EXISTS password_reset_codes (
        email VARCHAR(255) NOT NULL,
        code VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (email)
    );`);

Database.db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image BLOB,
    userName TEXT,
    createdAt DATETIME NOT NULL,
    carePlant INTEGER NOT NULL DEFAULT 0 CHECK (carePlant IN (0, 1))
)`);

module.exports = Database;
=======
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
>>>>>>> d1b206e04c839c4b555dfb5f3de34f2fbd6a0899
