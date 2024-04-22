import express from 'express'
import AdminRepository from '../../database/repository/admin-repository'
import AdminUseCase from '../../../useCase/useCases/adminUseCase'
import AdminController from '../../../controllers/adminController'  




const repository = new AdminRepository()
const useCase = new AdminUseCase(repository)
const controller = new AdminController(useCase)


const router = express.Router()

router.post('/adminlogin',(req ,res) => controller.adminLogin(req, res))
router.post('/logout',(req ,res) => controller.adminLogout(req, res))
router.get('/allusers',(req,res) => controller.getUsers(req,res))
router.patch('/blockuser/:id',(req,res) => controller.blockUser(req,res))

export default router