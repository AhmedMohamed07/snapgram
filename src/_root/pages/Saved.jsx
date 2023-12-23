import React from 'react';
import { useGetCurrentUser } from '../../lib/react-query/queriesAndMutations';
import Loader from '../../components/shared/Loader';
import GridPosts from '../../components/shared/GridPosts';

import save from '../../../puplic/assets/icons/save.svg';

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savedPosts = currentUser?.save.map((savePost)=>({
    ...savePost.post,
    creator: {
      imageUrl: currentUser.imageUrl
    }
  })).reverse();


  return(
  <div className='saved-container'>
    <div className="flex gap-2 w-full max-w-5xl">
      <img
          src={save}
          width={36}
          height={36}
          alt="save"
          className="invert-white"
        />
      <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>    
    </div>

    {!currentUser ? (
      <Loader /> ): (
        <ul className='flex-center gap-9 w-full max-w-5xl'>
          {savedPosts.length ===0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPosts posts={savedPosts} showStats={false} />
          )}
        </ul>
      )
    }
    
  </div>);
};

export default Saved;
