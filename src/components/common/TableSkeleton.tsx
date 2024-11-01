export const TableSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-full mb-4" />
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded w-full mb-2" />
            ))}
        </div>
    );
}; 