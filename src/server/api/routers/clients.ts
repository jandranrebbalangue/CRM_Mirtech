import { z } from "zod";
import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client'
import { createTRPCRouter, publicProcedure } from "../trpc";
import dayjs from "dayjs";

const prisma = new PrismaClient();
export const clientRouter = createTRPCRouter({
  createClient: publicProcedure.input(z.object({
    name: z.string(),
    contact: z.string(),
    organization: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    assignedUser: z.string().nullish()
  }))
    .mutation(async ({ input }) => {
      const client: Prisma.ClientsCreateInput = {
        name: input.name,
        contact: input.contact,
        organization: input.organization,
        status: input.status,
        createdAt: dayjs().format("MM/DD/YYYY"),
        updatedAt: dayjs().format("MM/DD/YYYY"),
        assignedUser: input.assignedUser || ""
      }
      const createUser = await prisma.clients.create({
        data: client
      })
      return createUser
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.clients.findMany();
  }),
  getClientDetailsById: publicProcedure.input(z.object({
    id: z.string(),
  }))
    .query(async ({ input }) => {
      const currentData = await prisma.clients.findFirst({
        where: {
          id: input.id
        }
      })
      return currentData;
    }),
  updateClient: publicProcedure.input(z.object({
    id: z.string(),
    name: z.string(),
    contact: z.string(),
    organization: z.string(),
    status: z.string(),
    updatedAt: z.string(),
    assignedUser: z.string().nullish()
  }))
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;
      const updateUser = await prisma.clients.update({
        where: {
          id
        },
        data: {
          ...rest,
          assignedUser: input.assignedUser || "",
          updatedAt: dayjs().format("MM/DD/YYYY")
        }
      })
      return {
        id: updateUser.id,
        name: updateUser.name,
        contact: updateUser.contact,
        status: updateUser.status,
        organization: updateUser.organization
      }
    }),
  fetchClientByStatus: publicProcedure.input(z.object({
    status: z.string(),
  }))
    .query(async ({ input }) => {
      const filterClients = await prisma.clients.findMany({
        where: {
          status: input.status
        }
      })
      return filterClients;
    }),
  fetchClientByCreationDate: publicProcedure.input(z.object({
    createdAt: z.string(),
  }))
    .query(async ({ input }) => {
      const filterClients = await prisma.clients.findMany({
        where: {
          createdAt: input.createdAt
        }
      })
      return filterClients;
    }),
  fetchClientByCreationDateAndStatus: publicProcedure.input(z.object({
    status: z.string(),
    createdAt: z.string(),
  }))
    .query(async ({ input }) => {
      const filterClients = await prisma.clients.findMany({
        where: {
          AND: [
            {
              status: {
                equals: input.status
              }
            },
            {
              createdAt: {
                equals: input.createdAt
              }
            },
          ],
        }
      })
      return filterClients;
    }),
});
