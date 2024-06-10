import PostSkeletonList from "@/components/skeletons/PostSkeletonList.tsx";

type GridPostSkeleton = {
  showStats?: boolean;
  showUser?: boolean;
};

function GridPostSkeleton({
  showStats = true,
  showUser = true,
}: GridPostSkeleton) {
  return (
    <div className={"grid-container"}>
      <PostSkeletonList showStats={showStats} showUser={showUser} />
    </div>
  );
}

export default GridPostSkeleton;
