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
router.post('/update-liked',(req,res ) => controller.updateLike(req,res))
router.get('/getpainterpost/:id',(req,res ) => controller.getPainterPosts(req,res))
router.delete('/delete-post/:postId',(req,res ) => controller.deltePost(req,res))





export default router