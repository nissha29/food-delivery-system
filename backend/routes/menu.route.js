import express from 'express';
import getMenuItems from '../controllers/getMenuItems.controller.js';
import addMenuItem from '../controllers/addMenuItem.controller.js';
import updateMenuItem from '../controllers/updateMenuItem.controller.js';
import deleteMenuItem from '../controllers/deleteMenuItem.controller.js';
import auth from '../middlewares/auth.middleware.js';

const menuRouter = express.Router();

menuRouter.get('/', getMenuItems);
menuRouter.post('/', auth, addMenuItem);
menuRouter.patch('/:id', auth, updateMenuItem);
menuRouter.delete('/:id', auth, deleteMenuItem);

export default menuRouter;

