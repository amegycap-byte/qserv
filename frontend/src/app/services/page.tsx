import { Suspense } from "react";
import ServicesContent from "./ServicesContent";

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="pt-40 flex items-center justify-center min-h-[60vh] bg-cream">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
