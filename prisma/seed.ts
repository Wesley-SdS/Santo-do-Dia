import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import type { SaintSeedData } from './seeds/types';

// Import saints from each month
import { januarySaints } from './seeds/january';
import { februarySaints } from './seeds/february';
import { marchSaints } from './seeds/march';
import { aprilSaints } from './seeds/april';
import { maySaints } from './seeds/may';
import { juneSaints } from './seeds/june';
import { julySaints } from './seeds/july';
import { augustSaints } from './seeds/august';
import { septemberSaints } from './seeds/september';
import { octoberSaints } from './seeds/october';
import { novemberSaints } from './seeds/november';
import { decemberSaints } from './seeds/december';

const allSaints: SaintSeedData[] = [
  ...januarySaints,
  ...februarySaints,
  ...marchSaints,
  ...aprilSaints,
  ...maySaints,
  ...juneSaints,
  ...julySaints,
  ...augustSaints,
  ...septemberSaints,
  ...octoberSaints,
  ...novemberSaints,
  ...decemberSaints,
];

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed de santos...');
  console.log(`📊 Total de santos para inserir: ${allSaints.length}\n`);

  // Validate uniqueness of slugs
  const slugSet = new Set<string>();
  const duplicates: string[] = [];
  for (const saint of allSaints) {
    if (slugSet.has(saint.slug)) {
      duplicates.push(saint.slug);
    }
    slugSet.add(saint.slug);
  }

  if (duplicates.length > 0) {
    console.error(`❌ Slugs duplicados encontrados: ${duplicates.join(', ')}`);
    process.exit(1);
  }

  // Validate that every day of the year has at least one saint
  const daysCovered = new Set<string>();
  for (const saint of allSaints) {
    daysCovered.add(`${saint.feastMonth}-${saint.feastDay}`);
  }
  console.log(`📅 Dias cobertos: ${daysCovered.size}/365\n`);

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const saint of allSaints) {
    try {
      const data = {
        name: saint.name,
        slug: saint.slug,
        feastMonth: saint.feastMonth,
        feastDay: saint.feastDay,
        birthDate: saint.birthDate,
        deathDate: saint.deathDate,
        birthPlace: saint.birthPlace,
        deathPlace: saint.deathPlace,
        country: saint.country,
        century: saint.century,
        category: saint.category,
        gender: saint.gender,
        patronage: saint.patronage,
        biographyShort: saint.biographyShort,
        biographyFull: saint.biographyFull,
        biographyKids: saint.biographyKids,
        quotes: saint.quotes,
        prayer: saint.prayer,
        imageUrl: saint.imageUrl,
        latitude: saint.latitude ? new Intl.NumberFormat('en', { maximumFractionDigits: 6, useGrouping: false }).format(saint.latitude) : null,
        longitude: saint.longitude ? new Intl.NumberFormat('en', { maximumFractionDigits: 6, useGrouping: false }).format(saint.longitude) : null,
      };

      const existing = await prisma.saint.findUnique({ where: { slug: saint.slug } });

      if (existing) {
        await prisma.saint.update({ where: { slug: saint.slug }, data });
        updated++;
        process.stdout.write(`  ↻ ${saint.name}\n`);
      } else {
        await prisma.saint.create({ data });
        created++;
        process.stdout.write(`  ✓ ${saint.name}\n`);
      }
    } catch (error) {
      errors++;
      console.error(`  ✗ ${saint.name}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  console.log(`\n✅ Seed de santos concluído!`);
  console.log(`   Criados: ${created}`);
  console.log(`   Atualizados: ${updated}`);
  if (errors > 0) {
    console.log(`   Erros: ${errors}`);
  }
  console.log(`   Total: ${allSaints.length} santos`);

  // Seed admin user
  console.log('\n👤 Criando usuário admin...');
  const adminEmail = 'admin@santododia.com.br';
  const adminPassword = await bcrypt.hash('admin123', 12);

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existingAdmin) {
    console.log('   ↻ Admin já existe, atualizando...');
    await prisma.user.update({
      where: { email: adminEmail },
      data: { name: 'Admin', password: adminPassword, emailVerified: new Date() },
    });
  } else {
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        emailVerified: new Date(),
      },
    });
    console.log('   ✓ Admin criado');
  }
  console.log(`   Email: ${adminEmail}`);
  console.log('   Senha: admin123');
}

main()
  .catch((error) => {
    console.error('❌ Seed falhou:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
