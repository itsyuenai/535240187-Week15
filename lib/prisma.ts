import { PrismaClient } from '@prisma/client';
import path from 'path';

declare global {
    var cachedPrisma: PrismaClient;
}

// Workaround to find the db file in production
const filePath = path.join(process.cwd(), 'prisma/dev.db');
const config = {
    datasources: {
        db: {
            url: 'file:' + filePath,
        },
    },
};

let prismaInstance: PrismaClient;
if (process.env.NODE_ENV === 'production') {
    prismaInstance = new PrismaClient(config);
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient(config);
    }
    prismaInstance = global.cachedPrisma;
}

export const prisma = prismaInstance;