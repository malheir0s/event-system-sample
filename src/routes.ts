import {Router} from "express";
import { UserController } from "./controllers/user";
import {EventController} from "./controllers/event";
import {auth} from "./middlewares/auth";
import {eventPermission} from "./middlewares/auth";
const routes = Router();
const userController = new UserController();
const eventController = new EventController();

const multerconfig = require ('./config/multer');
import multer from 'multer';


routes.post('/signup', userController.create);
routes.post('/signin', userController.login);

routes.use(auth);

routes.get('/search', eventController.listAll);
routes.get('/search/:title', eventController.listByTitle);

routes.use(eventPermission);
routes.post('/newEvent', multer(multerconfig).single("file"), eventController.create);

export {routes};