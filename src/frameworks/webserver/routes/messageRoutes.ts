import express from 'express'
import messageRepository from '../../database/repository/message-repository'
import messageUsecase from '../../../useCase/useCases/messageUseCase'
import messageController from '../../../controllers/messageController'
import conversationRepository from '../../database/repository/conversation-repository'

const conversationrepo = new conversationRepository

const repository = new messageRepository()
const usecase = new messageUsecase(conversationrepo,repository)
const controller = new messageController()



const router = express.Router()

router.post('/message/get-messages',(req ,res) => controller.createMessages(req,res))




export default router