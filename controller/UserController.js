const jwt = require('jsonwebtoken'); 
require('dotenv').config();

const User = require('../model/UserModel');
const secretKey = process.env.SECRET_KEY || 'default_secret_key';
if (!secretKey) {
    console.error('No secret key provided. Please check your environment configuration.');
    process.exit(1);
  }
async function getUsers(req, res) {
    try {
        const data = await User.find();
        res.json(data);
    } catch (error) {
        console.error('Error finding users', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// async function addUser(req, res) {
//     try {
//         const { name, email, password, group } = req.body;
//         const newUser = await User.create({
//             name,
//             email,
//             password,
//             group,
//         });
//         await newUser.save();
//         console.log(newUser);
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error('Error adding user', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findById(userId);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.body.name) {
            updatedUser.name = req.body.name;
        }
        if (req.body.email) {
            updatedUser.email = req.body.email;
        }

        await updatedUser.save();
        res.status(201).json(updatedUser);
    } catch (error) {
        console.error('Error updating user', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getRegisteredUsers = async (req, res) =>{
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email, password });
        if (user) {
          const name=user.name;
          const token = jwt.sign({ name: user.name }, secretKey, { expiresIn: '1h' });
          
          res.json({ authenticated: true, token,name});
        } else {
          res.json({ authenticated: false });
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

const addNewUser=async(req,res)=>{
    try {
        
        const newUser = req.body;
        const existingUser = await User.findOne({ email: newUser.email });
    
        if (existingUser) {
          console.log('Email already exists');
          return res.status(400).json({ message: 'Email already exists' });
        }
    
        const result = await User.create(newUser);
        console.log('User added successfully');
        res.status(204).send(result);
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
module.exports = { getUsers, updateUser, deleteUser,getRegisteredUsers,addNewUser };
