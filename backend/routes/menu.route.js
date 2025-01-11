import express from 'express';
import getMenuItems from '../controllers/getMenuItems.controller.js';
import addMenuItem from '../controllers/addMenuItem.controller.js';
import updateMenuItem from '../controllers/updateMenuItem.controller.js';
import deleteMenuItem from '../controllers/deleteMenuItem.controller.js';
import auth from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/isAdmin.middleware.js';
import upload from '../config/multer.config.js';

const menuRouter = express.Router();

menuRouter.get('/', getMenuItems);
menuRouter.post('/', auth, isAdmin, upload.single('image'),addMenuItem);
menuRouter.patch('/:id', auth, isAdmin, updateMenuItem);
menuRouter.delete('/:id', auth, isAdmin, deleteMenuItem);

export default menuRouter;

