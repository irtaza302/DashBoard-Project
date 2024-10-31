export const TableLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 bg-gray-200 rounded w-full" />
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-16 bg-gray-100 rounded w-full" />
    ))}
  </div>
); 