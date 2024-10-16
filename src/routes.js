import { Router } from "express";
import UserController from "./Controllers/UserController";
import SessionController from "./Controllers/SessionController";
import ImobiController from "./Controllers/Imobi/ImobiController.js";
import MessageController from "./Controllers/MessageController.js";

import multer from "multer";
import uploadConfig from "./middlewares/upload";
import FilterController from "./Controllers/Imobi/FilterController.js";


const upload = multer(uploadConfig);

const router = Router();

router.post('/createusers', UserController.createUser);
router.get('/listusers', UserController.findAllUser);
router.get('/listusers/:id', UserController.findUser);
router.get('/updateuser/:id', UserController.updateUser);

router.post('/session', SessionController.createSession);
router.post('/createimobi',  upload.fields([
    { name: 'thumb', maxCount: 1 },    
    { name: 'images', maxCount: 10 }]), ImobiController.createImobi);
router.get('/listimobi', ImobiController.findAllImobi);
router.get('/listimobi/:slug', ImobiController.findImobi);
router.get('/deleteimobi/:id', ImobiController.deleteImobi);
router.post('/createmessage', MessageController.createMessage);
router.get('/listmessage/:id', MessageController.findMessage);

router.get('/filterpredio/:predio', FilterController.findByPredio);
router.get('/filterprice/:price', FilterController.findByPrice);
router.get('/filterarea/:area', FilterController.findByArea);
router.get('/filtergender/:generoId', FilterController.findByGender);
router.get('/filteruf/:uf', FilterController.findByUF);
router.get('/filtercidade/:cidade', FilterController.findByCidade);
router.get('/filterbedrooms/:bedrooms', FilterController.findByQuartos);
router.get('/filterbathrooms/:bathrooms', FilterController.findByBanheiros);

router.get('/searchbar/:query', FilterController.searchBar);



export { router }