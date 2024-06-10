import PostSkeleton from "@/components/skeletons/PostSkeleton.tsx";

type PostSkeletonList = {
  showStats: boolean;
  showUser: boolean;
};

function PostSkeletonList({ showStats, showUser }: PostSkeletonList) {
  return Array.from({ length: 9 }).map((_, index: number) => (
    <PostSkeleton
      key={`post-skeleton-${index}`}
      showStats={showStats}
      showUser={showUser}
    />
  ));
}

export default PostSkeletonList;
