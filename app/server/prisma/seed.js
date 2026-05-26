
import * as data from "./testData.js"
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';


const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5
});
const prisma = new PrismaClient({adapter});

async function init() {
    for (const key in data) {
        if (!data.hasOwnProperty(key)) continue;

        const el = data[key];
        for (const v of el) {
            await prisma[key].create({
                data: v
            })
        }
    }

}

init()