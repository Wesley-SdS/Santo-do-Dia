/**
 * Cria um usuário de teste para desenvolvimento local
 *
 * Uso: DATABASE_URL="..." npx tsx scripts/create-test-user.ts
 *
 * Credenciais:
 *   Email: teste@santododia.com
 *   Senha: 123456
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'teste@santododia.com';
  const password = '123456';
  const name = 'Usuário de Teste';

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword, name },
    create: {
      email,
      password: hashedPassword,
      name,
      emailVerified: new Date(),
    },
  });

  console.log('✅ Usuário de teste criado/atualizado:');
  console.log(`   Email: ${email}`);
  console.log(`   Senha: ${password}`);
  console.log(`   ID: ${user.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
