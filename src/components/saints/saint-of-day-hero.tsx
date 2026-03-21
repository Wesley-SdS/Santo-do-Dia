import { prisma } from '@/lib/db';
import { SaintCard } from './saint-card';

async function getSaintOfTheDay() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const saints = await prisma.saint.findMany({
    where: { feastMonth: month, feastDay: day },
    take: 1,
  });

  if (saints.length === 0) {
    // Fallback: get any saint
    const count = await prisma.saint.count();
    if (count === 0) return null;
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000,
    );
    const skip = dayOfYear % count;
    const fallback = await prisma.saint.findMany({ skip, take: 1 });
    return fallback[0] ?? null;
  }

  return saints[0];
}

export async function SaintOfDayHero() {
  const saint = await getSaintOfTheDay();

  if (!saint) {
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
        <p className="font-[family-name:var(--font-dm-serif)] text-xl text-muted-foreground">
          Nenhum santo encontrado para hoje
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Configure o banco de dados e execute o seed.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-muted-foreground">Santo do Dia</p>
      <SaintCard
        id={saint.id}
        name={saint.name}
        slug={saint.slug}
        feastMonth={saint.feastMonth}
        feastDay={saint.feastDay}
        category={saint.category}
        biographyShort={saint.biographyShort}
        imageUrl={saint.imageUrl}
        country={saint.country}
        variant="hero"
      />
    </div>
  );
}
