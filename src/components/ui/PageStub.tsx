/**
 * Temporary placeholder for routes whose full layout arrives in a later
 * Faza 2 step. Clears the fixed header and shows the page title.
 */
export function PageStub({ title }: { title: string }) {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center gap-4 pt-28 text-center">
      <span className="label text-primary">Smash Burger Bar</span>
      <h1
        className="display text-foreground"
        style={{ fontSize: "var(--type-display1-size)" }}
      >
        {title}
      </h1>
      <p className="text-muted-foreground">
        {/* PLACEHOLDER: stranica u izradi */}
        Uskoro.
      </p>
    </section>
  );
}
