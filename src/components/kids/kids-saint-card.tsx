'use client';

import { HelpCircle, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface KidsSaintCardProps {
  saint: {
    name: string;
    slug: string;
    imageUrl: string | null;
    biographyKids: string | null;
    category: string;
  };
}

const QUIZ_QUESTIONS = [
  {
    question: 'O que é um santo?',
    answer: 'Uma pessoa que amou muito a Deus e as outras pessoas!',
  },
  {
    question: 'Como posso rezar?',
    answer: 'Falando com Deus como você fala com um amigo. Ele sempre escuta!',
  },
  {
    question: 'O que é uma festa do santo?',
    answer: 'O dia especial para lembrar e celebrar a vida de um santo!',
  },
];

export function KidsSaintCard({ saint }: KidsSaintCardProps) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="space-y-4">
      <Link
        href={`/santo/${saint.slug}`}
        className="block rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-5 shadow-sm dark:from-pink-900/20 dark:to-purple-900/20"
      >
        <div className="flex items-center gap-4">
          {saint.imageUrl && (
            <img
              src={saint.imageUrl}
              alt={saint.name}
              className="h-20 w-20 rounded-xl object-cover object-top"
            />
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-pink-400" />
              <span className="text-xs font-medium text-pink-500">Santo do Dia</span>
            </div>
            <h2 className="mt-1 font-[family-name:var(--font-dm-serif)] text-xl text-foreground">
              {saint.name}
            </h2>
          </div>
        </div>
        {saint.biographyKids && (
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">{saint.biographyKids}</p>
        )}
      </Link>

      <div className="rounded-2xl bg-yellow-50 p-5 dark:bg-yellow-900/20">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-yellow-500" />
          <h3 className="text-sm font-medium text-foreground">Quiz da Fé</h3>
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">
          {QUIZ_QUESTIONS[quizIndex].question}
        </p>
        {showAnswer ? (
          <>
            <p className="mt-2 rounded-lg bg-white/50 p-3 text-sm text-foreground dark:bg-black/10">
              <Star className="mr-1 inline h-4 w-4 text-yellow-500" />
              {QUIZ_QUESTIONS[quizIndex].answer}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuizIndex((i) => (i + 1) % QUIZ_QUESTIONS.length);
                setShowAnswer(false);
              }}
              className="mt-3 rounded-lg bg-yellow-400 px-4 py-2 text-xs font-medium text-yellow-900"
            >
              Próxima pergunta
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className="mt-3 rounded-lg bg-yellow-400 px-4 py-2 text-xs font-medium text-yellow-900"
          >
            Ver resposta
          </button>
        )}
      </div>
    </div>
  );
}
