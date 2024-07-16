import express from 'express'
import conversationRepository from '../../database/repository/conversation-repository'
import messageUsecase from '../../../useCase/useCases/messageUseCase'
import conversationController from '../../../controllers/conversationController'
import messageRepository from '../../database/repository/message-repository'

const messagerepo = new messageRepository

const repository = new conversationRepository()
const usecase = new messageUsecase(repository,messagerepo)
const controller = new conversationController(usecase)



const router = express.Router()

router.post('/create-conversation',(req ,res) => controller.createConversation(req,res))
router.get('/get-conversation/:userId',(req ,res) => controller.getConversationByUserId(req,res))








export default router