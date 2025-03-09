export const $id = (...args: string[]): string => Array.from(args).filter(Boolean).join('.');
