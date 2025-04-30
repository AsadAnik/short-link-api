import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

/**
 * 🛠️ Option 2: Manually pass URL in code (not recommended for production)
  const prisma = new PrismaClient({
   datasources: {
     db: {
      url: "mysql://root:yourpassword@localhost:3306/urlshortener"
     }
   }
 });
 */