import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import PostsList from "@/components/shared/PostsList.tsx";
import PostSkeletonList from "@/components/skeletons/PostSkeletonList.tsx";

type GridPostListProps = {
  posts?: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
  reference?: (node?: Element | null | undefined) => void;
  isFetchingMorePosts?: boolean;
};

function GridPostList({
  posts,
  showUser = true,
  showStats = true,
  reference,
  isFetchingMorePosts,
}: GridPostListProps) {
  const { user } = useUserContext();

  if (!posts) return <p className={"text-primary-600"}>No posts</p>;

  return (
    <ul className="grid-container">
      <PostsList
        posts={posts}
        showStats={showStats}
        showUser={showUser}
        user={user}
        reference={reference}
      />

      {isFetchingMorePosts && (
        <PostSkeletonList showStats={showStats} showUser={showUser} />
      )}
    </ul>
  );
}

export default GridPostList;
