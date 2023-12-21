import React from 'react';
import { useGetCurrentUser } from '../../lib/react-query/queriesAndMutations';
import Loader from '../../components/shared/Loader';
import GridPosts from '../../components/shared/GridPosts';

const LikedPosts = () => {
  const {data: currentUser } = useGetCurrentUser();

  if (!currentUser) {
    return (
      <div className='w-full flex h-full'>
        <Loader />
      </div>
    )
  }

  return(
  <>
    {currentUser.liked.length === 0 && (
      <p className="text-light-4">No liked posts</p>      
    )}

    <GridPosts posts={currentUser.liked} showStats={false} />
    
  </>);
};

export default LikedPosts;
