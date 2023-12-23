import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/AuthContext';
import { useDeletePost, useGetPostById, useGetUserPosts } from '../../lib/react-query/queriesAndMutations';

import { Button } from '../../components/ui/button';
import Loader from '../../components/shared/Loader';
import { formatRelativeTime } from '../../lib/utils';
import PostStats from '../../components/shared/PostStats';
import GridPosts from '../../components/shared/GridPosts';

import back from '../../../puplic/assets/icons/back.svg';
import edit from '../../../puplic/assets/icons/edit.svg';
import deletePostt from '../../../puplic/assets/icons/delete.svg';
import placeholder from "../../../puplic/assets/icons/profile-placeholder.svg"

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter((userPost)=>(
    userPost.$id !== id
  ))

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  return(
    <div className='post_details-container'>
     <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={back}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>
      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3" >
                  <img
                    src={
                      post?.creator.imageUrl || placeholder                      
                    }
                    alt="creator"
                    className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                  />

                  <div className="flex gap-1 flex-col">
                    <p className="base-medium lg:body-bold text-light-1">
                      {post?.creator.name}
                    </p>
                    <div className="flex-center gap-2 text-light-3">
                      <p className="subtle-semibold lg:small-regular ">
                        {formatRelativeTime(post?.$createdAt)}
                      </p>
                      •
                      <p className="subtle-semibold lg:small-regular">
                        {post?.location}
                      </p>
                    </div>
                  </div>
              </Link>

              <div className="flex-center gap-4">
                <Link 
                  to={`/edit-post/${post?.$id}`}
                  className={`${user.id !==post?.creator.$id && 'hidden'}`}
                >
                  <img
                    src={edit}
                    alt="edit"
                    width={24}
                    height={24}
                  />  
                </Link>

                <Button 
                  className={`ost_details-delete_btn ${user.id !==post?.creator.$id && 'hidden'}`}
                  variant='ghost'
                  onClick={handleDeletePost}
                >
                  <img
                    src={deletePostt}
                    alt="delete"
                    width={24}
                    height={24}
                  />  
                </Button>
              </div> 
            </div>

            <hr className="border w-full border-dark-4/80"/>

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className='flex mt-2 gap-1'>
                {post?.tags[0] !== '' && post?.tags.map((tag,index)=>(
                  <li 
                    key={`${tag}${index}`} 
                    className="text-light-3 small-regular"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>

        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPosts posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;
