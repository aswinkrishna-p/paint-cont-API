import express from 'express'
import userController from '../../../controllers/userController'
import userRepository from '../../database/repository/user-repository'
import Userusecase from '../../../useCase/useCases/userUseCase'


const repository = new userRepository()
const useCase = new Userusecase(repository)
const controller = new userController(useCase)



const router = express.Router()

router.post('/register',(req ,res) => controller.register(req,res))
router.post('/login',(req,res ) => controller.login(req,res))







export default router