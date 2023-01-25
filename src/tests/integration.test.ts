import { expect } from "@jest/globals"
import type { AppRouter } from "../server/api/root";
import { appRouter } from "../server/api/root"
import { prisma } from "../server/db"
import type { inferProcedureInput } from "@trpc/server"
import testData from "./testdata.json"
import type { Clients } from "@prisma/client";

const items: Clients[] = [];

describe("CRUD operations", () => {
  beforeAll(async () => {
    await prisma.$connect();
    await prisma.clients.deleteMany();
  })

  afterAll(async () => {
    await prisma.$disconnect();
  })

  const caller = appRouter.createCaller({ prisma });

  testData.forEach((item) => {
    it(`should create ${item.name}`, async () => {
      const result = await caller.client.createClient(item);
      expect(result.name).toEqual(item.name)
      expect(result.status).toEqual(item.status)
      expect(result.organization).toEqual(item.organization)
      expect(result.contact).toEqual(item.contact)
      expect(result.createdAt).toEqual(item.createdAt)

      items.push({ ...result })
    })
  })

  it("should list items", async () => {
    const caller = appRouter.createCaller({ prisma });
    const result = await caller.client.getAll();
    expect(result).toHaveLength(items.length)
  })

  it("should read item", async () => {
    const item = items[0];
    const id = item?.id as string
    const caller = appRouter.createCaller({ prisma });
    const result = await caller.client.getClientDetailsById({ id })
    expect(result?.name).toBe(item?.name)
    expect(result?.status).toBe(item?.status)
    expect(result?.contact).toBe(item?.contact)
    expect(result?.organization).toBe(item?.organization)
  })

  it("should update item", async () => {
    type Input = inferProcedureInput<AppRouter["client"]["updateClient"]>
    const item = items[1];
    const id = item?.id as string
    const caller = appRouter.createCaller({ prisma });
    const input: Input = {
      id,
      name: "Test name update",
      status: item?.status as string,
      organization: "Test organization update",
      contact: item?.contact as string,
    }
    const result = await caller.client.updateClient({
      id, name: input.name, contact: input?.contact,
      status: input.status,
      organization: input.organization,
    })

    expect(result.name).toBe(input.name)
    expect(result.status).toBe(input.status)
    expect(result.contact).toBe(input.contact)
    expect(result.organization).toBe(input.organization)
  })

  it("should delete item", async () => {
    const item = items[0];
    const id = item?.id as string
    const caller = appRouter.createCaller({ prisma });
    await caller.client.deleteById({ id })
    const res = await caller.client.getClientDetailsById({ id })
    expect(res).toBe(null)

  })

})
