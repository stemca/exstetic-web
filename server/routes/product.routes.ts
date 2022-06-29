import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';

const router: Router = Router();

/**
 * GET
 * http://localhost:3001/api/products/get-products
 * Gets all products
 */
// prettier-ignore
router.get('/api/products/get-products', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * GET
 * http://localhost:3001/api/products/get-product/:id
 * Gets one product by id
 */
// prettier-ignore
router.get('/api/products/get-product/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) { 
      return res.status(400).send({ message: 'Product does not exist' });
    }
    res.status(200).send(product);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * POST
 * http://localhost:3001/api/products/create-product
 * Creates an product
 */
// prettier-ignore
router.post('/api/products/create-product', async (req: Request, res: Response) => {
  try {
    const product = new Product({
      name: req.body.name,
      sizes: req.body.sizes,
      price: req.body.price,
      totalQuantity: getTotalQuantity(req.body.sizes),
      description: req.body.description,
      typeOfApparel: req.body.typeOfApparel,
    });
    const newProduct = await product.save();
    res.status(201).send({ message: 'Product created', product: newProduct });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * DELETE
 * http://localhost:3001/api/products/delete-product/:id
 * Deletes a product
 */
// prettier-ignore
router.delete('/api/products/delete-product/:id', async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Product deleted' });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * PATCH
 * http://localhost:3001/api/products/update-product/:id
 * Updates a product
 */
router.patch('/api/products/update-product/:id', async (req: Request, res: Response) => {
  try {
    const product = req.body;
    product.totalQuantity = getTotalQuantity(req.body.sizes);
    console.log(product);
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product, {
      new: true,
    });
    res.status(200).send(updatedProduct);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * Calculates total quantity
 * @param sizes Passes in an object with type size: quantity
 * @returns The total quantity
 */
function getTotalQuantity(sizes: { string: number }): number {
  let quantity: number = 0;
  for (const [key, value] of Object.entries(sizes)) {
    quantity += value;
  }
  return quantity;
}

export { router as productRouter };
