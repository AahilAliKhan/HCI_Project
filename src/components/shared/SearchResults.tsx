import { Models } from "appwrite";
import { Loader } from "lucide-react";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isFetchingSearchedPosts: boolean;
  searchedPosts: Models.DocumentList<Models.Document>;
};

function SearchResults({
  isFetchingSearchedPosts,
  searchedPosts,
}: SearchResultsProps) {
  if (isFetchingSearchedPosts) return <Loader />;

  if (searchedPosts && searchedPosts?.documents?.length > 0)
    return <GridPostList posts={searchedPosts.documents} />;

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  );
}

export default SearchResults;
