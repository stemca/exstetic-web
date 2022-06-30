"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_model_1 = require("../models/product.model");
const router = (0, express_1.Router)();
exports.productRouter = router;
/**
 * GET
 * http://localhost:3001/api/products/get-products
 * Gets all products
 */
// prettier-ignore
router.get('/api/products/get-products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find();
        res.status(200).send(products);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
/**
 * GET
 * http://localhost:3001/api/products/get-product/:id
 * Gets one product by id
 */
// prettier-ignore
router.get('/api/products/get-product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Product.findById(req.params.id);
        if (!product) {
            return res.status(400).send({ message: 'Product does not exist' });
        }
        res.status(200).send(product);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
/**
 * POST
 * http://localhost:3001/api/products/create-product
 * Creates an product
 */
// prettier-ignore
router.post('/api/products/create-product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new product_model_1.Product({
            name: req.body.name,
            sizes: req.body.sizes,
            price: req.body.price,
            totalQuantity: getTotalQuantity(req.body.sizes),
            description: req.body.description,
            typeOfApparel: req.body.typeOfApparel,
        });
        const newProduct = yield product.save();
        res.status(201).send({ message: 'Product created', product: newProduct });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
/**
 * DELETE
 * http://localhost:3001/api/products/delete-product/:id
 * Deletes a product
 */
// prettier-ignore
router.delete('/api/products/delete-product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_model_1.Product.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Product deleted' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
/**
 * PATCH
 * http://localhost:3001/api/products/update-product/:id
 * Updates a product
 */
router.patch('/api/products/update-product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        product.totalQuantity = getTotalQuantity(req.body.sizes);
        console.log(product);
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(req.params.id, product, {
            new: true,
        });
        res.status(200).send(updatedProduct);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
/**
 * Calculates total quantity
 * @param sizes Passes in an object with type size: quantity
 * @returns The total quantity
 */
function getTotalQuantity(sizes) {
    let quantity = 0;
    for (const [key, value] of Object.entries(sizes)) {
        quantity += value;
    }
    return quantity;
}
