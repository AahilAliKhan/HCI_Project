import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "@/components/shared/PostStats.tsx";
import { IUser } from "@/types";

type PostsListProps = {
  posts: Models.Document[];
  showStats: boolean;
  showUser: boolean;
  user: IUser;
  reference?: (node?: Element | null | undefined) => void;
};

function PostsList({
  posts,
  user,
  showUser,
  showStats,
  reference,
}: PostsListProps) {
  return posts.map((post: Models.Document, index: number) => (
    <li
      key={post.$id}
      className="w-full h-80 relative"
      ref={index === posts.length - 1 ? reference : null}
    >
      <Link to={`/posts/${post.$id}`} className="grid-post_link">
        <img
          src={post.imageUrl}
          alt="post"
          className="h-full w-full object-cover object-top"
        />
      </Link>

      <div className="grid-post_user">
        {showUser && (
          <Link
            to={`/profile/${post.creator.$id}`}
            className="flex items-center justify-start gap-2 flex-1"
          >
            <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="Creator"
              className="h-8 w-8 rounded-full"
            />
            <p className="line-clamp-1">{post.creator.name}</p>
          </Link>
        )}

        {showStats && <PostStats post={post} userId={user.id} />}
      </div>
    </li>
  ));
}

export default PostsList;
