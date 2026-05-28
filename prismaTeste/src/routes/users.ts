import { Router } from "express";
import { prisma } from "../database";
import { userController } from "../controllers/userController";

export const userRouter = Router();

//Rota para pegar todos os usuários
userRouter.get("/", userController.getAllUsers);

//Rota para pegar um usuário por ID
userRouter.get("/:id", userController.getUserById);

// Rota para pesquisar posts através de filtragem
userRouter.get("/search", userController.searchPosts);

//Rota para criar um novo usuário
userRouter.post("/", userController.createUser);

//Rota para atualizar um usuário
userRouter.put("/:id", userController.updateUser);

//Rota para deletar um usuário
userRouter.delete("/:id", userController.deleteUser);
