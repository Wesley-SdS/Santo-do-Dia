import { describe, it, expect } from 'vitest';

// Test the utility functions directly
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

describe('slugify', () => {
  it('should convert saint names to URL-friendly slugs', () => {
    expect(slugify('São Francisco de Assis')).toBe('sao-francisco-de-assis');
    expect(slugify('Santa Teresa d\'Ávila')).toBe('santa-teresa-d-avila');
    expect(slugify('São João Paulo II')).toBe('sao-joao-paulo-ii');
  });

  it('should handle accented characters', () => {
    expect(slugify('São José')).toBe('sao-jose');
    expect(slugify('São Tomás de Aquino')).toBe('sao-tomas-de-aquino');
  });

  it('should handle special characters', () => {
    expect(slugify('Santa Catarina de Sena!')).toBe('santa-catarina-de-sena');
  });
});

describe('formatCurrency', () => {
  it('should format cents to BRL currency', () => {
    expect(formatCurrency(2500)).toContain('25');
    expect(formatCurrency(100)).toContain('1');
    expect(formatCurrency(1000000)).toContain('10.000');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0)).toContain('0');
  });
});

describe('getEasterDate', () => {
  it('should calculate Easter correctly for known years', () => {
    const easter2026 = getEasterDate(2026);
    expect(easter2026.getMonth()).toBe(3); // April (0-indexed)
    expect(easter2026.getDate()).toBe(5);

    const easter2025 = getEasterDate(2025);
    expect(easter2025.getMonth()).toBe(3); // April
    expect(easter2025.getDate()).toBe(20);
  });

  it('should always return a date in March or April', () => {
    for (let year = 2020; year <= 2030; year++) {
      const easter = getEasterDate(year);
      const month = easter.getMonth();
      expect(month).toBeGreaterThanOrEqual(2); // March = 2
      expect(month).toBeLessThanOrEqual(3); // April = 3
    }
  });
});
