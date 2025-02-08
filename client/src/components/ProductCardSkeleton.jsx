import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import styles

const ProductCardSkeleton = () => {
    return (
        <div className="text-gray-700 cursor-pointer relative z-10 space-y-1">
            {/* Image Skeleton */}
            <div className="w-full aspect-square rounded-md border-[0.5px] overflow-hidden flex items-center justify-center">
                <Skeleton height={1000} width={1000}/>
            </div>

            {/* Title Skeleton */}
            <p className="pt-1 pb-1 text-sm">
                <Skeleton width="100%" height={16} />
            </p>

            {/* Price Skeleton */}
            <p className="text-sm font-medium">
                <Skeleton width="100%" height={16} />
            </p>
        </div>
    );
};

export default ProductCardSkeleton;
