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
exports.itemRouter = void 0;
const express_1 = require("express");
const item_model_1 = require("../models/item.model");
const router = (0, express_1.Router)();
exports.itemRouter = router;
/**
 * GET
 * http://localhost:3001/api/items
 * Gets all items
 */
router.get('/api/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield item_model_1.Item.find();
        res.status(200).send(items);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
/**
 * GET
 * http://localhost:3001/api/items/:id
 * Gets one item
 */
router.get('/api/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield item_model_1.Item.findById(req.params.id);
        if (!item)
            return res.status(400).send({ message: 'Item does not exist' });
        res.status(200).send(item);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
/**
 * POST
 * http://localhost:3001/api/items
 * Creates an item
 */
router.post('/api/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new item_model_1.Item({
            name: req.body.name,
            sizes: req.body.sizes,
            price: req.body.price,
            totalQuantity: getTotalQuantity(req.body.sizes),
            description: req.body.description,
            typeOfApparel: req.body.typeOfApparel,
        });
        const newItem = yield item.save();
        res.status(201).send({ message: 'Item created', item: newItem });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
/**
 * DELETE
 * http://localhost:3001/api/items/:id
 * Deletes an item
 */
router.delete('/api/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield item_model_1.Item.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Item deleted' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
router.patch('/api/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = req.body;
        item.totalQuantity = getTotalQuantity(req.body.sizes);
        console.log(item);
        const updatedItem = yield item_model_1.Item.findByIdAndUpdate(req.params.id, item, {
            new: true,
        });
        res.status(200).send(updatedItem);
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
