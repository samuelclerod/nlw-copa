import Fastfy, { fastify } from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

async function bootstrap() {
  const app = Fastfy({
    logger: true,
  });

  await app.register(cors, {
    origin: true,
  });

  app.get("/pools/count", async (request, reply) => {
    const count = await prisma.pool.count();

    return { count };
  });

  await app.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
