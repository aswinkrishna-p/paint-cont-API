import express from 'express'
import PainterController from '../../../controllers/painterController'
import PainterUseCase from '../../../useCase/useCases/painterUseCase'
import painterRepository from '../../database/repository/painter-repository'
import OtpRepository from '../../database/repository/otp-repository'
import OtpUsecases from '../../../useCase/useCases/OtpUseCase'

const otpRepository = new OtpRepository()
const otpusecase = new OtpUsecases(otpRepository)


const  repository = new painterRepository()
const  useCase = new PainterUseCase(repository)
const  controller = new PainterController(useCase,otpusecase)



const router = express.Router()

router.post('/register',(req ,res) => controller.register(req,res))
router.post('/login',(req ,res) => controller.login(req,res))
router.post('/otp',(req ,res) => controller.otpVerification(req,res))

export default router