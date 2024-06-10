import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import UserCard from "./UserCard";
import UserCardListSkeleton from "@/components/skeletons/UserCardListSkeleton.tsx";

function Sidebar() {
  const { data: users, isPending: isFetchingUser } = useGetUsers(10);

  return (
    <div className="home-creators">
      <h2 className="h3-bold text-light-1">Top Creators</h2>

      <div className="grid 2xl:grid-cols-2 gap-6 mt-4">
        {isFetchingUser && !users ? (
          <UserCardListSkeleton />
        ) : (
          <>
            {users?.documents.map((user) => (
              <UserCard key={user.$id} user={user} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
