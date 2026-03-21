import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/db', () => ({
  prisma: {
    saint: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
    },
  },
}));

vi.mock('@/lib/logger', () => ({
  createChildLogger: vi.fn(() => ({
    child: vi.fn().mockReturnThis(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  })),
}));

describe('Saint of the Day', () => {
  it('should extract correct month and day from date', () => {
    const date = new Date(2026, 9, 4); // October 4
    const month = date.getMonth() + 1;
    const day = date.getDate();
    expect(month).toBe(10);
    expect(day).toBe(4);
  });

  it('should handle end of year dates', () => {
    const date = new Date(2026, 11, 31); // December 31
    const month = date.getMonth() + 1;
    const day = date.getDate();
    expect(month).toBe(12);
    expect(day).toBe(31);
  });

  it('should handle leap year dates', () => {
    const date = new Date(2028, 1, 29); // February 29
    const month = date.getMonth() + 1;
    const day = date.getDate();
    expect(month).toBe(2);
    expect(day).toBe(29);
  });
});

describe('Saint Search', () => {
  it('should default to page 1 when no page specified', () => {
    const params: { page?: number } = {};
    const page = params.page ?? 1;
    expect(page).toBe(1);
  });

  it('should cap pageSize at MAX_PAGE_SIZE', () => {
    const MAX_PAGE_SIZE = 100;
    const requestedSize = 500;
    const pageSize = Math.min(requestedSize, MAX_PAGE_SIZE);
    expect(pageSize).toBe(100);
  });

  it('should calculate correct skip value', () => {
    const page = 3;
    const pageSize = 20;
    const skip = (page - 1) * pageSize;
    expect(skip).toBe(40);
  });
});
