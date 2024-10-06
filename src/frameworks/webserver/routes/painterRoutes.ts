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
router.get('/get-painter/:painterId',(req ,res) => controller.getPainter(req,res))
router.get('/get-dash/:painterId',(req ,res) => controller.getDashBoard(req,res))
router.post('/resend-otp',(req ,res) => controller.resendOTP(req,res))
router.post('/verify-resentotp',(req ,res) => controller.resendOtpVerification(req,res))
router.patch('/newpass',(req ,res) => controller.resetPassword(req,res))
router.patch('/profile-update',(req,res ) => controller.profileupdate(req,res))
router.post('/create-post',(req,res ) => controller.createPost(req,res))
router.post('/follow-painter',(req,res ) => controller.followPainter(req,res))
router.post('/create-slot/:painterId',(req,res ) => controller.createSlot(req,res))
router.patch('/edit-slot/:slotId',(req,res ) => controller.editSlots(req,res))
router.delete('/delete-slot/:slotId',(req,res ) => controller.deleteSlots(req,res))
router.get('/followers/:painterId',(req,res ) => controller.getFollowers(req,res))
router.post('/update-details',(req,res ) => controller.updateDetails(req,res))
router.post('/logout', (req,res) => controller.logout(req,res))

export default router