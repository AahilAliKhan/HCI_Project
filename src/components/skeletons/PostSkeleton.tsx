import Skeleton from "@/components/shared/Skeleton.tsx";
import classNames from "classnames";

type PostSkeletonProps = {
  showStats: boolean;
  showUser: boolean;
};

function PostSkeleton({ showStats, showUser }: PostSkeletonProps) {
  return (
    <div className={"rounded-3xl relative h-80"}>
      <Skeleton className={"w-full h-full"} />

      <div className={"flex items-center absolute w-full left-0 bottom-0 p-5 "}>
        {showUser && (
          <div className={"flex flex-1 gap-2.5"}>
            <Skeleton
              className={"h-8 w-8"}
              circle={true}
              bgColor={"bg-dark-6"}
            />
            <Skeleton className={"flex-1"} bgColor={"bg-dark-6"} />
          </div>
        )}

        {showStats && (
          <div
            className={classNames("flex flex-1 gap-2.5", {
              "justify-end": showUser,
              "justify-between": !showUser,
            })}
          >
            <Skeleton
              className={"h-8 w-8"}
              circle={true}
              bgColor={"bg-dark-6"}
            />
            <Skeleton
              className={"h-8 w-8"}
              circle={true}
              bgColor={"bg-dark-6"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostSkeleton;
