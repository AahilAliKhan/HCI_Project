import Skeleton from "@/components/shared/Skeleton.tsx";

function UserCardSkeleton() {
  return (
    <div className="user-card">
      <Skeleton circle={true} className={"w-14 h-14"} />
      <div className="space-y-2 w-full">
        <Skeleton className={"base-medium"} />
        <Skeleton className={"small-regular"} />
      </div>

      <Skeleton className={"h-10 rounded-md"} count={0.5} />
    </div>
  );
}

export default UserCardSkeleton;
