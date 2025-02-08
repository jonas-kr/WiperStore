import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailsSkeleton = () => {
    return (
        <div className="flex items-start gap-12 sm:gap-6 flex-col sm:flex-row">
            {/* Image Skeleton Section */}
            <div className="w-full sm:w-1/2 flex flex-col-reverse md:flex-row gap-2 p-2">
                <div className="w-full aspect-square rounded-md border border-gray-300 overflow-hidden flex items-center justify-center">
                    <Skeleton height={10000} width={10000} />
                </div>
            </div>

            {/* Product Details Skeleton Section */}
            <div className="flex-1 w-full">
                {/* Small Description */}
                <p className="text-center sm:text-left text-sm text-gray-600 font-light mb-2">
                    <Skeleton width="100%" height={16} />
                </p>

                {/* Title */}
                <h1 className="font-medium text-2xl text-center sm:text-left">
                    <Skeleton width="80%" height={24} />
                </h1>

                {/* Price */}
                <div className="text-3xl font-medium mt-2 flex justify-center sm:justify-start">
                    <Skeleton width="50px" height={32} />
                </div>

                {/* Description */}
                <p className="mt-5 text-gray-500 md:w-4/5 text-center sm:text-right font-['Cairo']">
                    <Skeleton count={5} />
                </p>

                {/* Divider */}
                <hr className="mt-8 sm:w-4/5 border-gray-300" />
                <p className="mt-5 text-gray-500 md:w-4/5 text-center sm:text-right font-['Cairo']">
                    <Skeleton count={5} />
                </p>
                {/* Extra Info */}
                <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1 text-right font-['Cairo']">
                    <p>منتج ذو جودة عالية .</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;
