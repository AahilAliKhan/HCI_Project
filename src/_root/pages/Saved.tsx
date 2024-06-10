import GridPostList from "@/components/shared/GridPostList";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import GridPostSkeleton from "@/components/skeletons/GridPostSkeleton.tsx";

const Saved = () => {
  const { data: currentUser, isPending: isFetchingCurrentUser } =
    useGetCurrentUser();

  const savedPosts = currentUser?.save.map((savedPost: Models.Document) => ({
    ...savedPost.post,
    creator: {
      imageUrl: currentUser.imageUrl,
      name: currentUser.name,
      $id: currentUser.$id,
    },
  }));

  return (
    <div className="flex flex-col flex-1 items-center gap-10 p-5 md:p-8 lg:p-12 overflow-auto custom-scrollbar">
      <div className="flex items-center gap-2 max-w-5xl w-full">
        <img src="/assets/icons/save.svg" alt="" className="h-9 w-9" />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {isFetchingCurrentUser && !currentUser ? (
        <GridPostSkeleton showStats={false} />
      ) : (
        <GridPostList posts={savedPosts} showStats={false} />
      )}
    </div>
  );
};
export default Saved;
