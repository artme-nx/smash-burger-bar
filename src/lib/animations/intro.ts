/**
 * Tiny pub/sub so the hero (and other first-paint animations) can wait for the
 * preloader to finish, while still animating on client-side navigation where the
 * preloader no longer runs (done === true → fire immediately).
 */
let done = false;
const subs = new Set<() => void>();

export const isIntroDone = () => done;

export function markIntroDone() {
  if (done) return;
  done = true;
  subs.forEach((cb) => cb());
  subs.clear();
}

export function onIntroDone(cb: () => void): () => void {
  if (done) {
    cb();
    return () => {};
  }
  subs.add(cb);
  return () => subs.delete(cb);
}
