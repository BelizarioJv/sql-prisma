import type { Request, Response } from "express";
import { prisma } from "../database";

export const postController = {
  getAllPosts: async (req: Request, res: Response) => {
    // Primeiro, obtemos os parâmetros da URL para paginação
    const page = +(req.query.page ?? 1); // Página atual, padrão 1
    const pageSize = +(req.query.pageSize ?? 10); // Número de posts por página, padrão 10

    // Depois, calculamos o número de posts a pular (skip) e o número de posts a obter (take)
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    try {
      const posts = await prisma.post.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
        },
      });
      // Podemos ainda obter o total de posts para calcular a quantidade total de páginas
      const totalPosts = await prisma.post.count();
      const totalPages = Math.ceil(totalPosts / pageSize);

      res.json({
        posts,
        pagination: {
          page,
          pageSize,
          totalPosts,
          totalPages,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar posts" });
    }
  },

  getPostById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: { author: true },
      });
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "Post não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar post" });
    }
  },

  getPostsByAuthor: async (req: Request, res: Response) => {
    const { title, content, published, authorId } = req.body;
    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          published,
          authorId,
        },
      });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar post" });
    }
  },

  filterPosts: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, published } = req.body;
    try {
      const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: {
          title,
          content,
          published,
        },
        include: { author: true },
      });
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar post" });
    }
  },

  deletePost: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.post.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar post" });
    }
  },
};
