import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
  useGetUserPosts,
} from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import GridPostList from "@/components/shared/GridPostList.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import PostDetailsSkeleton from "@/components/skeletons/PostDetailsSkeleton.tsx";
import GridPostSkeleton from "@/components/skeletons/GridPostSkeleton.tsx";

const PostDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { data: post, isPending } = useGetPostById(id || "");
  const { data: userPosts, isPending: isLoadingUserPosts } = useGetUserPosts(
    post?.creator.$id || "",
  );

  const { mutateAsync: deletePost, error: deletePostError } = useDeletePost();

  async function handleDeletePost(e: React.MouseEvent) {
    e.stopPropagation();

    await deletePost({ postId: id, imageId: post?.imageId });

    if (deletePostError) {
      toast({ title: "Post delete successfully", variant: "destructive" });
    } else {
      toast({
        title: "Post deleted successfully",
        className: "ring-offset-0 ring-primary-500",
      });
    }
    return navigate("/");
  }

  return (
    <div className="post_details-container">
      {isPending ? (
        <PostDetailsSkeleton />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />

          <div className="post_details-info bg-dark-2">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full aspect-square w-8 lg:w-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.id}`}
                  className={`${user.id !== post?.creator?.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.creator?.$id && "hidden"
                  }`}
                  onClick={handleDeletePost}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delte post"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border border-dark-4/80 w-full" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular ">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className={"max-w-5xl flex flex-col gap-10 w-full"}>
        <hr className={"border border-dark-4/80 w-full"} />
        <h2 className="h3-bold md:h2-bold w-full">Related Posts</h2>

        {/*  showing related posts */}
        {isLoadingUserPosts ? (
          <GridPostSkeleton />
        ) : (
          <GridPostList posts={userPosts?.documents} showStats={false} />
        )}
      </div>
    </div>
  );
};
export default PostDetails;
