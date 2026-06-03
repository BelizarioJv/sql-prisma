import { Handler } from "express";
import { prisma } from "../database/prisma";
import { HttpError } from "../errors/HttpError";
import { Prisma } from "../generated/prisma/client";
import {
  CreateCampaingRequestSchema,
  UpdateCampaingRequestSchema,
  MetaCampaingsRequestSchema,
} from "./schemas/CampaingRequestSchema";

export class CampaignsController {
  index: Handler = async (req, res, next) => {
    try {
      const query = MetaCampaingsRequestSchema.parse(req.query);

      const {
        page = "1",
        pageSize = "10",
        name,
        sortBy = "name",
        order = "asc",
      } = query;

      const pageNumber = Number(page);
      const pageSizeNumber = Number(pageSize);

      const where: Prisma.CampaignWhereInput = {};
      if (name) where.name = { contains: name, mode: "insensitive" };

      const campaigns = await prisma.campaign.findMany({
        where,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        orderBy: { [sortBy]: order },
      });

      const total = await prisma.campaign.count({ where });
      res.json({
        data: campaigns,
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
      const body = CreateCampaingRequestSchema.parse(req.body);
      if (!body) throw new HttpError(400, "O nome da campanha é obrigatório");

      const newCampaign = await prisma.campaign.create({
        data: body,
      });

      res.status(201).json(newCampaign);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: Number(req.params.id) },
        include: {
          leads: true,
        },
      });

      if (!campaign) throw new HttpError(404, "campanha não encontrada");

      res.json(campaign);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: Number(req.params.id) },
      });

      if (!campaign) throw new HttpError(404, "campanha não encontrada");

      const deletedCampaign = await prisma.campaign.delete({
        where: { id: Number(req.params.id) },
      });
      res.json({ deletedCampaign });
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const body = UpdateCampaingRequestSchema.parse(req.body);

      const campaign = await prisma.campaign.findUnique({
        where: { id: Number(req.params.id) },
      });

      if (!campaign) throw new HttpError(404, "campanha não encontrada");

      const updatedCampaign = await prisma.campaign.update({
        where: { id: Number(req.params.id) },
        data: body,
      });

      res.json(updatedCampaign);
    } catch (error) {
      next(error);
    }
  };
}
