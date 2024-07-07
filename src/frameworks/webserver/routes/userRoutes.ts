import express from 'express'
import userController from '../../../controllers/userController'
import userRepository from '../../database/repository/user-repository'
import Userusecase from '../../../useCase/useCases/userUseCase'
import OtpRepository from '../../database/repository/otp-repository'
import OtpUsecases from '../../../useCase/useCases/OtpUseCase'
import stripeRepository from '../../database/repository/stripe_repository'

const otpRepository = new OtpRepository()
const otpusecase = new OtpUsecases(otpRepository)
const StripeRepository = new stripeRepository()

const repository = new userRepository()
const useCase = new Userusecase(repository,StripeRepository)
const controller = new userController(useCase,otpusecase)



const router = express.Router()

router.post('/register',(req ,res) => controller.register(req,res))
router.post('/otp',(req ,res) => controller.otpVerification(req,res))
router.post('/resend-otp',(req ,res) => controller.resendOTP(req,res))
router.post('/login',(req,res ) => controller.login(req,res))
router.post('/logout',(req,res ) => controller.logout(req,res))
router.post('/make-payment',(req,res ) => controller.makePayment(req,res))
router.put('/add-address',(req,res ) => controller.add_address(req,res))
router.patch('/profile-update',(req,res ) => controller.profileupdate(req,res))
router.post('/search',(req,res ) => controller.searchPainter(req,res))







export default router