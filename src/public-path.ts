import { existsSync } from 'fs';
import { join } from 'path';

export function resolvePublicPath(): string {
  const candidates = [
    join(process.cwd(), 'dist', 'public'),
    join(process.cwd(), 'public'),
    join(__dirname, 'public'),
    join(__dirname, '..', 'public'),
  ];

  return candidates.find((candidate) => existsSync(join(candidate, 'index.html'))) || candidates[0];
}
