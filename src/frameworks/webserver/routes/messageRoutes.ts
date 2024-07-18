import express from 'express'
import messageRepository from '../../database/repository/message-repository'
import messageUsecase from '../../../useCase/useCases/messageUseCase'
import messageController from '../../../controllers/messageController'
import conversationRepository from '../../database/repository/conversation-repository'

const conversationrepo = new conversationRepository

const repository = new messageRepository()
const usecase = new messageUsecase(conversationrepo,repository)
const controller = new messageController(usecase)



const router = express.Router()

router.post('/create-messages',(req ,res) => controller.createMessages(req,res))
router.get('/message-by-id/:conversationId',(req ,res) => controller.getMessageByConvId(req,res))
router.post('/get-messages',(req ,res) => controller.getMessages(req,res))




export default router