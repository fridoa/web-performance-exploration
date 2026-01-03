import { Card, Skeleton } from "@heroui/react";

const ProductSkeleton = () => {
  return (
    <Card
      className="h-full w-full max-w-87.5 space-y-0 rounded-3xl border-none"
      shadow="sm"
    >
      <Skeleton className="rounded-t-3xl">
        <div className="bg-default-300 h-70 w-full"></div>
      </Skeleton>

      <div className="space-y-4 p-5">
        <Skeleton className="w-3/4 rounded-lg">
          <div className="bg-default-200 h-6 w-3/4 rounded-lg"></div>
        </Skeleton>

        <div className="flex gap-2">
          <Skeleton className="w-12 rounded-lg">
            <div className="bg-default-200 h-5 w-12 rounded-lg"></div>
          </Skeleton>
          <Skeleton className="w-16 rounded-lg">
            <div className="bg-default-200 h-5 w-16 rounded-lg"></div>
          </Skeleton>
        </div>

        <div className="space-y-2">
          <Skeleton className="w-full rounded-lg">
            <div className="bg-default-200 h-3 w-full rounded-lg"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="bg-default-200 h-3 w-4/5 rounded-lg"></div>
          </Skeleton>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <Skeleton className="w-8 rounded-lg">
              <div className="bg-default-200 h-3 w-8 rounded-lg"></div>
            </Skeleton>
            <Skeleton className="w-16 rounded-lg">
              <div className="bg-default-200 h-6 w-16 rounded-lg"></div>
            </Skeleton>
          </div>
          <Skeleton className="rounded-lg">
            <div className="bg-default-300 h-10 w-28 rounded-lg"></div>
          </Skeleton>
        </div>
      </div>
    </Card>
  );
};

export default ProductSkeleton;
