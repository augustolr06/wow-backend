const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Consulta todos os usuários no banco de dados
    const log_tipo_logr = await prisma.log_tipo_logr.findMany();

    // Exibe os usuários na console
    console.log(log_tipo_logr);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect(); // Fecha a conexão com o banco de dados
  }
}

main();
