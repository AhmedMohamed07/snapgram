import React, { useState } from 'react'
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '../../lib/react-query/queriesAndMutations'
import { checkIsLiked } from '../../lib/utils';
import { useEffect } from 'react';
import Loader from './Loader';

import liked from '../../../puplic/assets/icons/liked.svg';
import like from '../../../puplic/assets/icons/like.svg';
import save from '../../../puplic/assets/icons/save.svg';
import saved from '../../../puplic/assets/icons/saved.svg';


const PostStats = ({ post, userId}) => {
    const likesList = post.likes.map((user)=> user.$id);

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const {mutate : likePost} = useLikePost();
    const {mutate : savePost , isPending : isSaving} = useSavePost();
    const {mutate : deleteSavedPost , isPending : isDeleting} = useDeleteSavedPost();

    const {data : currentUser} = useGetCurrentUser();

    const savedPostRecord = currentUser?.save.find((record=> record.post.$id === post.$id)) 
   
    useEffect(()=>{
        setIsSaved(!!savedPostRecord)
    },[currentUser])
    
    const handleLikePost = (e)=>{
        e.stopPropagation();
        
        let newLikes = [...likes];
        const hasLiked = newLikes.includes(userId);
        if (hasLiked) {
           newLikes = newLikes.filter((id)=> id !== userId)
        }else{
            newLikes.push(userId)
        }
        
        setLikes(newLikes);
        likePost({ postId:post.$id , likesArray : newLikes})
    }
    
    const handleSavePost = (e)=>{
        e.stopPropagation();
        
        if(savedPostRecord) {
            setIsSaved(false)
            deleteSavedPost(savedPostRecord.$id)
        }else{
            savePost({ userId: userId, postId: post.$id });
            setIsSaved(true) 
            }
    }



  return (
    <div className='flex justify-between items-center z-20'>
        <div className="flex gap-2 mr-5">
            <img 
                className='cursor-pointer'
                src={checkIsLiked(likes,userId)? liked : like} 
                alt="like"
                width={20}
                height={20}
                onClick={handleLikePost}
            />
            <p className='small-medium lg:base-medium'>
            {likes.length}
            </p>
        </div>

        <div>
            { isSaving || isDeleting ? <Loader/> :
            <img 
                className='cursor-pointer'
                src={isSaved? saved : save}  
                alt="save"
                width={20}
                height={20}
                onClick={handleSavePost}

            />}
        </div>
    </div>
  )
}

export default PostStats