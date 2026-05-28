import { prisma } from "../database";
import type { Request, Response } from "express";

export const userController = {
  // Método para buscar todos os usuários
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  },

  // Método para buscar um usuário por ID
  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          posts: true,
        },
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  },

  // Método para pesquisar posts através de filtragem
  async searchPosts(req: Request, res: Response) {
    const { title, authorId, published, startDate, endDate } = req.query;

    // Construímos o objeto de filtragem dinamicamente
    const filter: any = {};

    if (title) {
      filter.title = {
        contains: title,
        // Buscar sem diferenciar maiúsculas e minúsculas
        mode: "insensitive",
      };
    }

    if (authorId) {
      filter.authorId = +authorId;
    }

    if (published) {
      filter.published = published === "true";
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.gte = new Date(String(startDate));
      }
      if (endDate) {
        filter.createdAt.lte = new Date(String(endDate));
      }
    }

    try {
      const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        where: filter,
        include: { author: true },
      });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar posts" });
    }
  },

  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    } finally {
      await prisma.$disconnect();
    }
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
        },
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedPost = await prisma.user.delete({
        where: { id: Number(id) },
      });
      res.json(deletedPost);
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  },
};
