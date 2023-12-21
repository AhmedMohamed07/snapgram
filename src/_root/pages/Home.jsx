import  Loader  from '../../components/shared/Loader';
import React, { useEffect } from 'react';
import { useGetPosts, useGetRecentPosts, useGetUsers } from '../../lib/react-query/queriesAndMutations';
import PostCard from '../../components/shared/PostCard';
import { useInView } from 'react-intersection-observer';
import UserCard from '../../components/shared/UserCard';

const Home = () => {
  const {ref, inView} = useInView();

  const {
    data : posts,
    isPending : isPostLoading,
    isError : isErrorPosts,
  } = useGetRecentPosts();

  const { data: fetchedPosts, fetchNextPage, hasNextPage } = useGetPosts();

  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }


  useEffect(() => {
    if (inView){
      fetchNextPage();    
    }
    
  }, [inView]);

  return ( 
  <div className='flex flex-1'>
    <div className="home-container">
      <div className="home-posts">
        <h2 className='h3-bold md:h2-bold w-full text-left'>Home Feed</h2>

        {isPostLoading && !posts ? (
          <Loader/> 
        ) :
        <ul className='flex flex-1 flex-col gap-9 w-full'>
         {posts?.documents.map((post)=><li key={post.$id}> <PostCard post={post}/></li>)}
        </ul>
        }
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />          
        </div>
    )}
    </div>

    <div className="home-creators">
          <h3 className="h3-bold text-light-1">Top Creators</h3>
          {isUserLoading && !creators ? (
            <Loader />
          ) : (
            <ul className="grid 2xl:grid-cols-2 gap-6">
              {creators?.documents.map((creator) => (
                <li key={creator?.$id}>
                  <UserCard user={creator} />
                </li>
              ))}
            </ul>
          )}
        </div>
  </div>
)};

export default Home;
