const Product = require('../Models/Products');
const upload = require('../Middleware/upload');
const sendEmail = require('../Middleware/emailsender');
// create a new product
exports.createProduct = async (req, res) => {
    try {
        // check if all required fields are provided
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }
        const { name, image, size, description, price, quantity } = req.body;

        const product = new Product({ name, size, description, price, quantity });

        await product.save();

        //send email notification to admin when a new product is created
        const subject = 'New Product Created';
        const text = `A new product has been created:\n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}`;
        await sendEmail('jesson.emeribe@gmail.com', subject, text);

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

//create a product with image upload
exports.createProductWithImage = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading image', error: err.message });
        }

        try {
            if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
                return res.status(400).json({ message: 'All required fields must be provided' });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'Image file is required' });
            }

            const { name, size, description, price, quantity } = req.body;
            const product = new Product({
                name,
                image: req.file.path,
                size,
                description,
                price,
                quantity
            });

            await product.save();
            res.status(201).json({ message: 'Product created successfully', product });
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error: error.message });
        }
    });
};

//update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; //where id is the product id to be updated
        const { name, size, description, price, quantity } = req.body;

        const product = await Product.findByIdAndUpdate(id, { name, size, description, price, quantity }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

//get a product by id
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product found', product });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Products fetched successfully', products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

//delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};


