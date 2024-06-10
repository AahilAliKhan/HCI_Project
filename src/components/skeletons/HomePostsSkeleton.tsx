import Skeleton from "@/components/shared/Skeleton.tsx";

function HomePostsSkeleton() {
  return Array.from({ length: 5 }).map((_, index: number) => {
    return (
      <div key={`skeleton-${index}`} className="post-card space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton circle={true} className={"w-12 aspect-square lg:w-12"} />

          <div className="flex flex-col flex-1 space-y-2">
            <Skeleton className={"base-medium lg:body-bold"} />
            <div className="flex gap-2">
              <Skeleton
                className={"subtle-semibold lg:small-regular"}
                count={0.2}
              />
              <Skeleton
                className={"subtle-semibold lg:small-regular"}
                count={0.2}
              />
            </div>
          </div>
        </div>

        <Skeleton />
        <Skeleton className={"aspect-video"} />
      </div>
    );
  });
}

export default HomePostsSkeleton;
