import { Router } from "express";
import UserController from "./Controllers/UserController";
import SessionController from "./Controllers/SessionController";
import auth from "./middlewares/auth";
import ImobiController from "./Controllers/Imobi/ImobiController";
import FilterController from "./Controllers/Imobi/FilterController";

import multer from "multer";
import uploadConfig from "./middlewares/upload";

const upload = multer(uploadConfig);

const router = Router();

router.post('/createusers', UserController.createUser);
router.get('/listusers', auth, UserController.findAllUser);
router.post('/session', SessionController.createSession);
router.post('/createimobi', auth, upload.single("thumb"), ImobiController.createImobi);
router.get('/listimobi', ImobiController.findAllImobi);
router.get('/listimobi/:id', ImobiController.findImobi);
router.get('/filterimobi/:title', FilterController.findByTitle);

export { router }