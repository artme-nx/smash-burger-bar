import { PageTransition } from "@/components/ui/PageTransition";

// template.tsx re-mounts on every navigation, so it drives the per-route
// transition (layout.tsx persists and must not).
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
