import { Document, Schema, Model, model } from 'mongoose';
interface ProductInterface extends Document {
  name: string;
  sizes: [string: number];
  totalQuantity: number;
  description: string;
  typeOfApparel: string;
  imageUrls: [string];
  group: string;
}

/**
 * Data type for an Item.
 */
const productSchema: Schema = new Schema({
  name: { type: String, required: true }, // name of the item
  sizes: { type: Map },
  price: { type: Number, required: true }, // price of item
  totalQuantity: { type: Number, min: 0 }, // total quantity of item. updated whenever an item is purchased or added
  description: { type: String, required: true }, // description of item
  typeOfApparel: { type: String, required: true }, // ex. shirt, hoodie, accessory. Will be used for slug
  imageUrls: [{ type: String }], // array of URLs generated from AWS s3
  group: { type: Schema.Types.ObjectId, ref: 'Group' }, // what group the item belongs to. ex: OG
});

// prettier-ignore
const Product: Model<ProductInterface> = model<ProductInterface>('Product', productSchema);

export { Product };
