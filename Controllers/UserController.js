const User = require('../Models/Users');
const bcrypt = require('bcryptjs');
//create a user
exports.createUser = async (req, res) => {
    try {
        //request body validation
        const { name, email, password, gender, phone, role, HasAdminAccess } = req.body;

        // check if all required fields are provided
        if (!name || !email || !password || !gender || !phone) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        //email validation
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        //phone number validation
        const existingPhone = await User.findOne({ phone: req.body.phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user with hashed password
    const user =  User({ 
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
        phone: req.body.phone,
        role: req.body.role || 'salesperson', // default to 'salesperson' if not provided
        HasAdminAccess: req.body.HasAdminAccess || false // default to false if not provided
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user: user });
} catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
}   
};



//login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; 
        // check if all required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }  

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // verify password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // generate token
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: existingUser._id, email: existingUser.email, name: existingUser.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, role: existingUser.role, HasAdminAccess: existingUser.HasAdminAccess });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// get a user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// update a user
exports.updateUser = async (req, res) => {
    try {
        const updates = { ...req.body };
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};