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
router.get('/allpainters',(req,res) => controller.getPainters(req,res))
router.get('/posts',(req,res) => controller.getDeletePosts(req,res))
router.delete('/delete-post/:id',(req,res) => controller.DeletePosts(req,res))
router.patch('/blockuser/:id',(req,res) => controller.blockUser(req,res))
router.patch('/blockpainter/:id',(req,res) => controller.blockPainter(req,res))
router.post('/dashboard',(req,res) => controller.dashBoard(req,res))
router.post('/graph',(req,res) => controller.getGraphs(req,res))

export default router