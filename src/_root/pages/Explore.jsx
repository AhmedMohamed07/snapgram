import { Input } from '../../components/ui/input';
import React, { useEffect, useState } from 'react';
import { useGetPosts, useSearchPosts } from '../../lib/react-query/queriesAndMutations';
import useDebounce from '../../hooks/useDebounce'
import Loader from '../../components/shared/Loader';
import GridPosts from '../../components/shared/GridPosts';
import SearchResults from '../../components/shared/SearchResults';
import { useInView } from 'react-intersection-observer';
import search from '../../../puplic/assets/icons/search.svg'
import filter from '../../../puplic/assets/icons/filter.svg'


const Explore = () => {
  const {ref, inView} = useInView();
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);
  
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  useEffect(() => {
    if (inView && !searchValue){
      fetchNextPage();    
    }
    
  }, [inView, searchValue]);


  if (!posts)
  return (
    <div className="flex-center w-full h-full">
      <Loader />
    </div>
  );

  const shouldShowResults = searchValue !== '';
  const shouldShowPosts = !shouldShowResults &&
  posts?.pages.every(item=> item.documents.length === 0);

  console.log(inView)


  return (
  <div className='explore-container'>
    <div className="explore-inner_container">
      <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>

      <div className="flex bg-dark-4 gap-1 px-4 w-full rounded-lg">
        <img 
          src={search} 
          alt="search"
          width={24}
          height={24} 
        />

        <Input 
          type='text'
          className='explore-search'
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}
          placeholder = 'Search'
        />
      </div>
    </div>

    <div className="flex-between w-full max-w-5xl mt-16 mb-7">
      <h3 className="body-bold md:h3-bold">Popular Today</h3>

      <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
        <p className="small-medium md:base-medium text-light-2">All</p>
        <img
          src={filter}
          width={20}
          height={20}
          alt="filter"
        />
      </div>
    </div>

    <div className="flex flex-wrap gap-9 w-full max-w-5xl">
      {shouldShowResults? (
       <SearchResults
       isSearchFetching={isSearchFetching}
       searchedPosts={searchedPosts}
       /> ) : shouldShowPosts? (
        <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
       ) : (
        posts.pages.map((item, index) => (
          <GridPosts key={`page-${index}`} posts={item.documents} />
        ))
       )     
    }
    </div>

    {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
    )}
  </div>
)};

export default Explore;
