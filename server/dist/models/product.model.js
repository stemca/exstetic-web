"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
/**
 * Data type for an Item.
 */
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sizes: { type: Map },
    price: { type: Number, required: true },
    totalQuantity: { type: Number, min: 0 },
    description: { type: String, required: true },
    typeOfApparel: { type: String, required: true },
    imageUrls: [{ type: String }],
    group: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Group' }, // what group the item belongs to. ex: OG
});
// prettier-ignore
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.Product = Product;
