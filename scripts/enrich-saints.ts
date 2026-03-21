/**
 * Script de enriquecimento de santos
 *
 * Busca dados reais da Wikipedia PT-BR, imagens do Wikimedia Commons
 * e vídeos do YouTube para cada santo no banco de dados.
 *
 * Uso: DATABASE_URL="..." npx tsx scripts/enrich-saints.ts
 *
 * Flags:
 *   --images-only    Buscar apenas imagens
 *   --bio-only       Buscar apenas biografias
 *   --videos-only    Buscar apenas vídeos
 *   --saint=slug     Enriquecer apenas um santo específico
 *   --dry-run        Mostrar o que seria feito sem alterar o banco
 *   --delay=ms       Delay entre requests (default: 1500ms)
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { searchWikipedia, getWikipediaSummary, splitIntoParagraphs } from '../src/lib/wikipedia';
import { getSaintImageFromCommons } from '../src/lib/wikimedia';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const args = process.argv.slice(2);
const imagesOnly = args.includes('--images-only');
const bioOnly = args.includes('--bio-only');
const videosOnly = args.includes('--videos-only');
const dryRun = args.includes('--dry-run');
const saintSlug = args.find((a) => a.startsWith('--saint='))?.split('=')[1];
const delay = parseInt(args.find((a) => a.startsWith('--delay='))?.split('=')[1] ?? '1500', 10);
const doAll = !imagesOnly && !bioOnly && !videosOnly;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Map of saint names to their Wikipedia article titles (for tricky cases)
const WIKIPEDIA_OVERRIDES: Record<string, string> = {
  'santa-maria-mae-de-deus': 'Maria (mãe de Jesus)',
  'santos-reis-magos': 'Reis Magos',
  'conversao-de-sao-paulo': 'Paulo de Tarso',
  'sao-timoteo-e-sao-tito': 'Timóteo (bispo)',
  'catadra-de-sao-pedro': 'Pedro (apóstolo)',
  'anunciacao-do-senhor': 'Anunciação',
  'sao-pedro-e-sao-paulo': 'Pedro (apóstolo)',
  'santos-primeiros-martires-de-roma': 'Primeiros Mártires da Igreja de Roma',
  'sao-joaquim-e-santa-ana': 'Sant\'Ana',
  'assuncao-de-nossa-senhora': 'Assunção de Nossa Senhora',
  'natividade-de-nossa-senhora': 'Natividade de Nossa Senhora',
  'exaltacao-da-santa-cruz': 'Festa da Exaltação da Santa Cruz',
  'todos-os-santos': 'Dia de Todos os Santos',
  'fieis-defuntos': 'Dia dos Fiéis Defuntos',
  'imaculada-conceicao': 'Imaculada Conceição',
  'natal-do-senhor': 'Natal',
  'sao-joao-paulo-ii': 'Papa João Paulo II',
  'sao-pio-x': 'Papa Pio X',
  'sao-joao-xxiii': 'Papa João XXIII',
  'nossa-senhora-de-fatima': 'Nossa Senhora de Fátima',
  'nossa-senhora-aparecida': 'Nossa Senhora Aparecida',
  'nossa-senhora-do-rosario': 'Nossa Senhora do Rosário',
  'nossa-senhora-de-lourdes': 'Nossa Senhora de Lourdes',
  'nossa-senhora-de-guadalupe': 'Nossa Senhora de Guadalupe',
  'nossa-senhora-das-dores': 'Nossa Senhora das Dores',
  'nossa-senhora-auxiliadora': 'Maria Auxiliadora',
  'nossa-senhora-das-gracas': 'Medalha Milagrosa',
  'nossa-senhora-do-carmo': 'Nossa Senhora do Carmo',
  'nossa-senhora-das-merces': 'Nossa Senhora das Mercês',
  'nossa-senhora-de-loreto': 'Santuário da Santa Casa de Loreto',
  'nossa-senhora-de-lujan': 'Nossa Senhora de Luján',
  'santo-estevao-protomartir': 'Estêvão (mártir)',
  'santos-inocentes': 'Massacre dos Inocentes',
  'sao-miguel-sao-rafael-sao-gabriel': 'Miguel (arcanjo)',
  'santos-anjos-da-guarda': 'Anjo da guarda',
  'transfiguracao-do-senhor': 'Transfiguração de Jesus',
  'visitacao-de-nossa-senhora': 'Visitação (cristianismo)',
  'apresentacao-do-senhor': 'Apresentação de Jesus no Templo',
  'apresentacao-de-nossa-senhora': 'Apresentação de Maria',
  'santissimo-nome-de-maria': 'Santíssimo Nome de Maria',
  'dedicacao-basilica-santa-maria-maior': 'Basílica de Santa Maria Maior',
  'dedicacao-basilica-de-sao-joao-de-latrao': 'Arquibasílica de São João de Latrão',
  'dedicacao-basilicas-sao-pedro-e-sao-paulo': 'Basílica de São Pedro',
  'sao-pio-de-pietrelcina': 'Padre Pio',
  'santa-teresa-de-calcuta': 'Madre Teresa',
  'sao-tomas-de-aquino': 'Tomás de Aquino',
  'santo-agostinho-de-hipona': 'Agostinho de Hipona',
  'sao-francisco-de-assis': 'Francisco de Assis',
  'santa-clara-de-assis': 'Clara de Assis',
  'sao-joao-bosco': 'João Bosco',
  'sao-jose': 'São José',
  'sao-sebastiao': 'São Sebastião',
  'santa-ines': 'Inês de Roma',
  'sao-jorge': 'São Jorge',
  'sao-bento-de-nursia': 'Bento de Núrsia',
  'santo-inacio-de-loyola': 'Inácio de Loyola',
  'santo-antonio-de-padua': 'António de Lisboa',
  'sao-joao-batista': 'João Batista',
  'sao-lucas-evangelista': 'Lucas (evangelista)',
  'sao-marcos-evangelista': 'Marcos (evangelista)',
  'sao-mateus-apostolo': 'Mateus (apóstolo)',
  'sao-tome-apostolo': 'Tomé (apóstolo)',
  'sao-tiago-apostolo': 'Tiago, filho de Zebedeu',
  'santo-andre-apostolo': 'André (apóstolo)',
  'sao-bartolomeu-apostolo': 'Bartolomeu (apóstolo)',
  'sao-matias-apostolo': 'Matias (apóstolo)',
  'sao-barnabe-apostolo': 'Barnabé',
  'sao-joao-evangelista': 'João (apóstolo)',
  'sao-filipe-e-sao-tiago': 'Filipe (apóstolo)',
  'sao-simao-e-sao-judas-tadeu': 'Judas Tadeu',
  'martírio-de-sao-joao-batista': 'Decapitação de São João Batista',
  'santa-maria-madalena': 'Maria Madalena',
  'santa-marta': 'Marta de Betânia',
  'sao-maximiliano-kolbe': 'Maximiliano Kolbe',
  'sao-francisco-xavier': 'Francisco Xavier',
  'sao-joao-da-cruz': 'João da Cruz',
  'santa-teresa-de-jesus': 'Teresa de Ávila',
  'santa-joana-d-arc': 'Joana d\'Arc',
  'santa-rita-de-cassia': 'Rita de Cássia',
  'santa-rosa-de-lima': 'Rosa de Lima',
  'santa-cecilia': 'Santa Cecília',
  'santa-luzia': 'Santa Lúcia',
  'sao-nicolau-de-mira': 'Nicolau de Mira',
  'santo-ambrosio-de-milao': 'Ambrósio de Milão',
  'sao-jeronimo': 'Jerônimo',
  'sao-gregorio-magno': 'Papa Gregório I',
  'sao-bernardo-de-claraval': 'Bernardo de Claraval',
  'sao-domingos-de-gusmao': 'Domingos de Gusmão',
  'sao-joao-maria-vianney': 'João Maria Vianney',
  'santa-monica': 'Mónica de Hipona',
  'santa-helena': 'Helena (imperatriz)',
  'sao-luis-ix': 'Luís IX de França',
  'sao-patricio': 'São Patrício',
  'sao-valentim': 'São Valentim',
  'sao-vicente-de-paulo': 'Vicente de Paulo',
  'santa-faustina-kowalska': 'Maria Faustina Kowalska',
  'sao-josemaria-escriva': 'Josemaría Escrivá',
  'sao-charbel-makhlouf': 'Charbel Makhlouf',
  'santa-josefina-bakhita': 'Josefina Bakhita',
  'santa-bernadette-soubirous': 'Bernadette Soubirous',
  'sao-oscar-romero': 'Óscar Romero',
  'sao-damiao-de-molokai': 'Padre Damião',
  'santa-teresa-benedita-da-cruz': 'Edith Stein',
  'santa-maria-goretti': 'Maria Goretti',
  'sao-carlos-de-foucauld': 'Charles de Foucauld',
  'sao-juan-diego': 'Juan Diego',
  'sao-tomas-becket': 'Thomas Becket',
};

async function enrichBiography(saint: { id: string; name: string; slug: string; biographyFull: string }) {
  const wikiTitle = WIKIPEDIA_OVERRIDES[saint.slug] ?? saint.name;

  console.log(`  📖 Buscando biografia: "${wikiTitle}"`);

  const wikiData = await searchWikipedia(wikiTitle);
  if (!wikiData || wikiData.extract.length < 200) {
    // Try REST API summary
    const summary = await getWikipediaSummary(wikiTitle);
    if (summary && summary.extract.length > 200) {
      return splitIntoParagraphs(summary.extract);
    }
    console.log(`     ⚠ Biografia não encontrada ou muito curta`);
    return null;
  }

  // Use full extract, limit to ~2000 chars
  let bio = wikiData.extract;
  if (bio.length > 2500) {
    bio = bio.substring(0, bio.lastIndexOf('.', 2500) + 1);
  }

  return splitIntoParagraphs(bio);
}

async function enrichImage(saint: { id: string; name: string; slug: string }) {
  const wikiTitle = WIKIPEDIA_OVERRIDES[saint.slug] ?? saint.name;

  console.log(`  🖼️  Buscando imagem: "${saint.name}"`);

  // First try Wikipedia page image
  const summary = await getWikipediaSummary(wikiTitle);
  if (summary?.image) {
    console.log(`     ✅ Imagem encontrada via Wikipedia`);
    return summary.image;
  }

  // Fallback to Wikimedia Commons search
  const commonsImage = await getSaintImageFromCommons(saint.name);
  if (commonsImage) {
    console.log(`     ✅ Imagem encontrada via Wikimedia Commons`);
    return commonsImage;
  }

  console.log(`     ⚠ Nenhuma imagem encontrada`);
  return null;
}

async function main() {
  console.log('🔄 Enriquecimento de Santos');
  console.log(`   Modo: ${dryRun ? 'DRY RUN' : 'PRODUÇÃO'}`);
  console.log(`   Foco: ${doAll ? 'Tudo' : [imagesOnly && 'Imagens', bioOnly && 'Biografias', videosOnly && 'Vídeos'].filter(Boolean).join(', ')}`);
  console.log(`   Delay: ${delay}ms entre requests\n`);

  const where = saintSlug ? { slug: saintSlug } : {};
  const saints = await prisma.saint.findMany({
    where,
    orderBy: [{ feastMonth: 'asc' }, { feastDay: 'asc' }],
  });

  console.log(`📊 ${saints.length} santos para processar\n`);

  let enrichedBio = 0;
  let enrichedImage = 0;
  let errors = 0;

  for (let i = 0; i < saints.length; i++) {
    const saint = saints[i];
    console.log(`[${i + 1}/${saints.length}] ${saint.name} (${saint.feastDay}/${saint.feastMonth})`);

    const updates: Record<string, unknown> = {};

    try {
      // Enrich biography
      if (doAll || bioOnly) {
        const currentBioLength = saint.biographyFull?.length ?? 0;
        if (currentBioLength < 1200) {
          const newBio = await enrichBiography(saint);
          if (newBio && newBio.length > currentBioLength) {
            updates.biographyFull = newBio;

            // Also update short bio (first 2 sentences)
            const firstSentences = newBio.split(/[.!?]\s+/).slice(0, 2).join('. ') + '.';
            if (firstSentences.length > 50) {
              updates.biographyShort = firstSentences;
            }

            enrichedBio++;
          }
          await sleep(delay);
        } else {
          console.log(`  📖 Biografia já rica (${currentBioLength} chars), pulando`);
        }
      }

      // Enrich image
      if (doAll || imagesOnly) {
        if (!saint.imageUrl) {
          const imageUrl = await enrichImage(saint);
          if (imageUrl) {
            updates.imageUrl = imageUrl;
            enrichedImage++;
          }
          await sleep(delay);
        } else {
          console.log(`  🖼️  Já tem imagem, pulando`);
        }
      }

      // Apply updates
      if (Object.keys(updates).length > 0 && !dryRun) {
        await prisma.saint.update({
          where: { id: saint.id },
          data: updates,
        });
        console.log(`  💾 Atualizado: ${Object.keys(updates).join(', ')}`);
      } else if (Object.keys(updates).length > 0 && dryRun) {
        console.log(`  🔍 [DRY RUN] Atualizaria: ${Object.keys(updates).join(', ')}`);
      }
    } catch (error) {
      errors++;
      console.error(`  ❌ Erro: ${error instanceof Error ? error.message : 'Desconhecido'}`);
    }

    console.log('');
  }

  console.log('═══════════════════════════════════════');
  console.log('📊 Resultado do Enriquecimento:');
  console.log(`   Biografias enriquecidas: ${enrichedBio}`);
  console.log(`   Imagens adicionadas: ${enrichedImage}`);
  console.log(`   Erros: ${errors}`);
  console.log(`   Total processados: ${saints.length}`);
  console.log('═══════════════════════════════════════');
}

main()
  .catch((error) => {
    console.error('❌ Enriquecimento falhou:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
