import express from "express"
import postRepository from "../../database/repository/post-repository"
import PostUseCase from "../../../useCase/useCases/postUseCase"
import postController from "../../../controllers/postController"


const repository = new postRepository
const useCase = new PostUseCase(repository)
const controller = new postController(useCase)


const router = express.Router()

router.get('/get-all-posts',(req,res ) => controller.getAllPosts(req,res))
router.post('/report-post',(req,res ) => controller.reportPost(req,res))





export default router