import express from 'express'
import messageRepository from '../../database/repository/message-repository'
import messageUsecase from '../../../useCase/useCases/messageUseCase'
import messageController from '../../../controllers/messageController'

const repository = new messageRepository()
const usecase = new messageUsecase()
const controller = new messageController()



const router = express.Router()

// router.post('/register',(req ,res) => controller.register(req,res))








export default router