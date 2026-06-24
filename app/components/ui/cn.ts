// joins truthy class fragments with a single space, dropping falsy values.
// no clsx / cva dependency in this project.
export function cn(...classes: Array<string | false | null | undefined>): string {
  let out = '';
  for (const c of classes) {
    if (!c) continue;
    out = out ? out + ' ' + c : c;
  }
  return out;
}
