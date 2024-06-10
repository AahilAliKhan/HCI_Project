import GridPostList from "@/components/shared/GridPostList";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetInfinitePosts,
  useSearchPost,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import GridPostSkeleton from "@/components/skeletons/GridPostSkeleton.tsx";
import { Models } from "appwrite";

const Explore = () => {
  const { ref, inView } = useInView({ rootMargin: "-300px" });
  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfinitePosts();
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query, 500);

  const { data: searchedPosts, isFetching: isFetchingSearchedPosts } =
    useSearchPost(debouncedValue);

  useEffect(() => {
    if (inView && !query && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, query, hasNextPage]);

  const shouldShowSearchResults = query !== "";

  const flatPosts = useMemo(
    () =>
      posts?.pages
        .map(
          (item: Models.DocumentList<Models.Document> | undefined) =>
            item!.documents,
        )
        .flat(),
    [posts],
  );

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>

        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="Search"
          />

          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popluar Today</h3>

        <div className="flex-center gap-3 bg-dark-4 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>

          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isFetchingSearchedPosts={isFetchingSearchedPosts}
            searchedPosts={searchedPosts!}
          />
        ) : !flatPosts ? (
          <GridPostSkeleton />
        ) : (
          <GridPostList
            posts={flatPosts}
            reference={ref}
            isFetchingMorePosts={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  );
};
export default Explore;
