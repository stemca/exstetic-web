import { Router, Request, Response } from 'express';
import { Item } from '../models/Item.model';

const router: Router = Router();

/**
 * GET
 * http://localhost:3001/api/items
 * Gets all items
 */
router.get('/api/items', async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * GET
 * http://localhost:3001/api/items/:id
 * Gets one item
 */
router.get('/api/items/:id', async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(400).send({ message: 'Item does not exist' });
    res.status(200).send(item);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * POST
 * http://localhost:3001/api/items
 * Creates an item
 */
router.post('/api/items', async (req: Request, res: Response) => {
  try {
    const item = new Item({
      name: req.body.name,
      sizes: req.body.sizes,
      price: req.body.price,
      totalQuantity: getTotalQuantity(req.body.sizes),
      description: req.body.description,
      typeOfApparel: req.body.typeOfApparel,
    });
    const newItem = await item.save();
    res.status(201).send({ message: 'Item created', item: newItem });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * DELETE
 * http://localhost:3001/api/items/:id
 * Deletes an item
 */
router.delete('/api/items/:id', async (req: Request, res: Response) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Item deleted' });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

router.patch('/api/items/:id', async (req: Request, res: Response) => {
  try {
    const item = req.body;
    item.totalQuantity = getTotalQuantity(req.body.sizes);
    console.log(item)
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {
      new: true,
    });
    res.status(200).send(updatedItem);
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

export { router as itemRouter };
