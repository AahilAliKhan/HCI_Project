import UserCardSkeleton from "@/components/skeletons/UserCardSkeleton.tsx";

function UserCardListSkeleton() {
  return Array.from({ length: 5 }).map((_, index: number) => (
    <UserCardSkeleton key={`usercard-skeleton-${index}`} />
  ));
}

export default UserCardListSkeleton;
