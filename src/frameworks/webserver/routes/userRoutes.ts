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
router.post('/logout',(req,res ) => controller.logout(req,res))
router.put('/add-address',(req,res ) => controller.add_address(req,res))
router.patch('/profile-update',(req,res ) => controller.profileupdate(req,res))
router.get('/get-all-posts',(req,res ) => controller.getAllPosts(req,res))







export default router