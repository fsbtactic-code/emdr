/**
 * cn - tiny className joiner.
 *
 * Joins truthy class fragments with a single space. No dependencies
 * (no clsx / cva in this project). Falsy values (false / null / undefined)
 * are dropped so conditional classes read cleanly:
 *
 *   cn('px-3', active && 'bg-white/10', disabled ? 'opacity-40' : null)
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  let out = '';
  for (const c of classes) {
    if (!c) continue;
    out = out ? out + ' ' + c : c;
  }
  return out;
}
