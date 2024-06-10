import UserCard from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import UserCardListSkeleton from "@/components/skeletons/UserCardListSkeleton.tsx";

const AllUsers = () => {
  const { data: users, isPending: isFetchingUser } = useGetUsers();

  return (
    <div className="common-container">
      <div className="flex items-center w-full max-w-5xl">
        <img
          src="/assets/icons/people.svg"
          alt=""
          className="h-9 w-9 invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">All User</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-6 max-w-5xl">
        {isFetchingUser && !users ? (
          <UserCardListSkeleton />
        ) : (
          <>
            {users?.documents.map((user) => (
              <UserCard user={user} key={user.$id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default AllUsers;
