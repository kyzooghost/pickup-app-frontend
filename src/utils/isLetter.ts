export const isLetter = function isLetter(char: string): boolean {
  return /^[A-Z]$/.test(char) || /^[a-z]$/.test(char);
};
