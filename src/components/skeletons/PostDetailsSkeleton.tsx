import Skeleton from "@/components/shared/Skeleton.tsx";

function PostDetailsSkeleton() {
  return (
    <div className={"post_details-card"}>
      <Skeleton className={"post_details-img"} />

      <div className={"post_details-info"}>
        <div className={"flex items-center w-full gap-4"}>
          <Skeleton circle={true} className={"w-12 h-12"} />

          <div className={"flex-1 space-y-1"}>
            <Skeleton count={0.7} />
            <Skeleton count={0.4} />
          </div>
        </div>

        <Skeleton className={"h-px w-full"} />

        <div className={"w-full space-y-1"}>
          <Skeleton count={1.5} />
        </div>
      </div>
    </div>
  );
}

export default PostDetailsSkeleton;
