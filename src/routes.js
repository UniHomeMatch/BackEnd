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
router.get('/listusers/:userId', UserController.findUser);
router.post('/session', SessionController.createSession);
router.post('/createimobi', upload.single("thumb"), ImobiController.createImobi);
router.get('/listimobi', ImobiController.findAllImobi);
router.get('/listimobi/:slug', ImobiController.findImobi);
router.post('/createmessage', MessageController.createMessage);
router.get('/listmessage/:id', MessageController.findMessage);

router.get('/filtertitle/:title', FilterController.findByTitle);
router.get('/filterprice/:price', FilterController.findByPrice);
router.get('/filterarea/:area', FilterController.findByArea);
//router.get('/filterlocation/:location', FilterController.findByLocation);
router.get('/filtergender/:generoId', FilterController.findByGender);


export { router }