import { Router} from "express";
import { HorariosController } from "../controllers/horarios.controller.js";
    
const router = Router()

router.get('/buscap', HorariosController.buscaprofesor)
router.get('/buscac', HorariosController.buscacarrera)
router.get('/buscad', HorariosController.buscamateriadia)
router.get('/buscadyh', HorariosController.buscamateriadiayhora)
router.get('/horariodepersona', HorariosController.buscahorariodepersona)

export default router;



