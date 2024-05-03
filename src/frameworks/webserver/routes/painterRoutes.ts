import express from 'express'
import PainterController from '../../../controllers/painterController'
import PainterUseCase from '../../../useCase/useCases/painterUseCase'
import painterRepository from '../../database/repository/painter-repository'


const  repository = new painterRepository()
const  useCase = new PainterUseCase(repository)
const  controller = new PainterController(useCase)



const router = express.Router()

router.post('/register',(req ,res) => controller.register(req,res))
router.post('/login',(req ,res) => controller.login(req,res))

export default router