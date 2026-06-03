import { Handler } from "express";
import { prisma } from "../database/prisma";
import { HttpError } from "../errors/HttpError";
import { Prisma } from "../generated/prisma/client";
import {
  CreateLeadRequestSchema,
  MetaLeadsRequestSchema,
  UpdateLeadRequestSchema,
} from "../controllers/schemas/LeadRequestSchema";

export class LeadsController {
  index: Handler = async (req, res, next) => {
    try {
      //Pegando os parâmetros de consulta e validando com zod
      const query = MetaLeadsRequestSchema.parse(req.query);

      //Desestruturando os parâmetros de consulta e definindo valores padrão
      const {
        page = "1",
        pageSize = "10",
        name,
        status,
        sortBy = "name",
        order = "asc",
      } = query;

      const pageNumber = Number(page);
      const pageSizeNumber = Number(pageSize);

      const where: Prisma.LeadWhereInput = {};

      //Adicionando condições de filtro com base nos parâmetros de consulta
      if (name) where.name = { contains: name, mode: "insensitive" };
      if (status) where.status = status;

      const leads = await prisma.lead.findMany({
        where,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        orderBy: { [sortBy]: order },
      });

      const total = await prisma.lead.count({ where });

      //Retornando os leads encontrados junto com metadados de paginação e total de resultados
      res.json({
        data: leads,
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          total,
          totalPages: Math.ceil(total / pageSizeNumber),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateLeadRequestSchema.parse(req.body);
      const newLead = await prisma.lead.create({
        data: body,
      });
      res.status(201).json(newLead);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id: Number(req.params.id) },
        include: {
          groups: true,
          campaigns: true,
        },
      });

      if (!lead) throw new HttpError(404, "lead não encontrado");

      res.json(lead);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id: Number(req.params.id) },
      });

      if (!lead) throw new HttpError(404, "lead não encontrado");

      const deletedLead = await prisma.lead.delete({
        where: { id: Number(req.params.id) },
      });

      res.json({ deletedLead });
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const body = UpdateLeadRequestSchema.parse(req.body);
      const lead = await prisma.lead.findUnique({
        where: { id: Number(req.params.id) },
      });

      if (!lead) throw new HttpError(404, "lead não encontrado");

      const updatedLead = await prisma.lead.update({
        where: { id: Number(req.params.id) },
        data: body,
      });

      res.json(updatedLead);
    } catch (error) {
      next(error);
    }
  };
}
