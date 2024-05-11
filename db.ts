import { ENV } from "./env";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    // transactionOptions: {
    //   timeout: 30000, // 30 secs
    //   maxWait: 15000, // 15 secs
    // },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (ENV !== "production") globalThis.prisma = prisma;
