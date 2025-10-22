interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard = ({ className = '' }: SkeletonCardProps) => {
  return (
    <div className={`animate-pulse bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="px-4 py-5">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      </div>
      <div className="px-4 py-5 border-t border-gray-200">
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
