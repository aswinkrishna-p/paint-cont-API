import express from 'express'
import conversationRepository from '../../database/repository/conversation-repository'
import messageUsecase from '../../../useCase/useCases/messageUseCase'
import conversationController from '../../../controllers/conversationController'

const repository = new conversationRepository()
const usecase = new messageUsecase()
const controller = new conversationController(messageUsecase)



const router = express.Router()

router.post('/',(req ,res) => controller.createConversation(req,res))








export default router