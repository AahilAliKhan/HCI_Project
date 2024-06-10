import GridPostList from "@/components/shared/GridPostList";
import { Button } from "@/components/ui/button";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { LikedPosts } from ".";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";

function StatsBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center xl:text-left">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  );
}

const Profile = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: currentUser, isPending: isFetchingCurrentUser } =
    useGetUserById(id || "");

  if (isFetchingCurrentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-12 items-center p-5 md:p-8 lg:p-12 flex-1 custom-scrollbar overflow-auto">
      <div className="flex flex-col items-center xl:flex-row xl:items-start gap-6">
        <img
          src={currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt=""
          className="w-40 h-40 rounded-full"
        />
        <div className="space-y-5 max-w-prose">
          <div>
            <div className="flex gap-10 items-center">
              <h2 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h2>
            </div>

            <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
              @{currentUser.username}
            </p>
          </div>

          <div className="flex gap-10 justify-center xl:justify-start">
            <StatsBlock value={currentUser.posts.length} label="Posts" />
            <StatsBlock value={147} label="Followers" />
            <StatsBlock value={151} label="Following" />
          </div>

          {currentUser.bio && (
            <p className=" text-center xl:text-left">{currentUser.bio}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={`/update-profile/${currentUser.$id}`}
            className={`flex-center gap-2 py-3 px-6 bg-dark-4 rounded-md ${
              currentUser.$id !== user.id && "!hidden"
            }`}
          >
            <img src="/assets/icons/edit.svg" className="h-5 w-5" />
            <p className="flex whitespace-nowrap small-medium">Edit Profile</p>
          </Link>

          <Button
            type="button"
            className={`shad-button_primary px-8 ${currentUser.$id === user.id && "!hidden"}  `}
          >
            Follow
          </Button>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg w-48 ${
              pathname === `/profile/${id}` && "!bg-dark-4"
            }`}
          >
            <img src="/assets/icons/posts.svg" alt="" />
            <p>Posts</p>
          </Link>

          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab w-48 border border-transparent rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-4"
            }`}
          >
            <img src="/assets/icons/like.svg" alt="" />
            <p>Liked Posts</p>
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>

      <Outlet />
    </div>
  );
};
export default Profile;
