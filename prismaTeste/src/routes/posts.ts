import { Router } from "express";
import { prisma } from "../database";
import { postController } from "../controllers/postController";

export const postRouter = Router();

//Rota para pegar todos os posts
postRouter.get("/", postController.getAllPosts);

//Rota para pegar um post por ID
postRouter.get("/:id", postController.getPostById);

//Rota para criar um novo post
postRouter.post("/", postController.getPostsByAuthor);

//Rota para atualizar um post
postRouter.put("/:id", postController.filterPosts);

//Rota para deletar um post
postRouter.delete("/:id", postController.deletePost);
