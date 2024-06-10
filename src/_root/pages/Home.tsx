import PostCard from "@/components/shared/PostCard";
import Sidebar from "@/components/shared/Sidebar";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import HomePostsSkeleton from "@/components/skeletons/HomePostsSkeleton.tsx";

function Home() {
  const { data: posts, isLoading: isPostLoading } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>

          {isPostLoading && !posts ? (
            <HomePostsSkeleton />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          )}
        </div>
      </div>

      <Sidebar />
    </div>
  );
}

export default Home;
