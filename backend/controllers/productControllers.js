import Product from "../models/productModel";
import ErrorResponse from "../helpers/errorHandler";
import asyncHandler from "../middlewares/catchAsyncErrors";

//get all products
//public route
export const allProducts = asyncHandler(async (req, res) => {
        const products = await Product.find();
        res.status(200).json({success: true, count: products.length, products})
})

//@desc create new products
//@route admin only POST-->/products
export const newProduct = asyncHandler(async (req, res) => {
        const product = await Product.create(req.body);
        res.status(200).json({success: true, product});
});

// @desc get a single product
// @route public /api/products/:id
export const singleProduct = asyncHandler(async (req, res, next) => {
        const product = await Product.findById(req.query.id);
        if (!product) return next(new ErrorResponse(`Product not found with the  ID ${req.query.id}`, 404))
        res.status(200).json({success: true, product});
});

// @desc update a product
// @route private admin only /api/products/:id
export const updateProduct = asyncHandler(async (req, res, next) => {
        const product = await Product.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        if (!product) return next(new ErrorResponse(`Product not found with the  ID ${req.query.id}`, 404))

        res.status(200).json({success: true, product});
})

// @desc delete a product
// @route private admin only /api/products/:id
export const deleteProduct = asyncHandler(async (req, res, next) => {
        const product = await Product.findByIdAndRemove(req.query.id);
        if (!product) return next(new ErrorResponse(`Product ${req.query.id} not found`, 404))
        res.status(200).json({success: true, message: "Product deleted successfully."});

})