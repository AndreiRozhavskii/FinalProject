import { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { _getAllTasks, _createTask } from '../controllers/controllers.js';

const router = Router();
router.use(bodyParser.json());
router.use(cors());

router.get("/dashboard", _getAllTasks);
router.post("/dashboard", _createTask);


export default router;