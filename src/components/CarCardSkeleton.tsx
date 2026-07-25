export default function CarCardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      <div className="aspect-[16/10] bg-white/[0.04] animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 rounded bg-white/[0.06] animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-white/[0.05] animate-pulse" />
        <div className="h-3 w-2/3 rounded bg-white/[0.04] animate-pulse" />
        <div className="pt-5 mt-5 border-t border-border flex justify-between">
          <div className="h-6 w-20 rounded bg-white/[0.06] animate-pulse" />
          <div className="h-4 w-12 rounded bg-white/[0.05] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
