import GridPosts from "./GridPosts";
import Loader from "./Loader";


const SearchResults = ({ isSearchFetching, searchedPosts }) => {
    if (isSearchFetching) {
      return <Loader />;
    } else if (searchedPosts && searchedPosts.documents.length > 0) {
      return <GridPosts posts={searchedPosts.documents} />;
    } else {
      return (
        <p className="text-light-4 mt-10 text-center w-full">No results found</p>
      );
    }
  };

  export default SearchResults;