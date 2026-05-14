export default function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="h-56 w-full bg-gray-200" />

      <div className="space-y-3 p-3">
        <div className="h-4 w-full rounded bg-gray-200" />

        <div className="h-4 w-2/3 rounded bg-gray-200" />

        <div className="h-10 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}