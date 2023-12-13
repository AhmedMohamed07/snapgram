import React from 'react';
import PostForm from '../../components/forms/PostForm';
import { useParams } from 'react-router-dom';
import { useGetPostById } from '../../lib/react-query/queriesAndMutations';
import Loader from '../../components/shared/Loader';


const EditPost = () => {
 const { id } = useParams();
 console.log(id)
 const {data : post , isLoading} = useGetPostById(id);

 if (isLoading) 
  return (
  <div className="flex-center w-full h-full">
    <Loader />
  </div>
);


  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 w-full">
          <img
            src="../../../puplic/assets/icons/edit.svg"
            alt="edit"
            width={36}
            height={36}
            className='invert-white'
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit post</h2>
        </div>

       {isLoading ? <Loader/> : <PostForm action = 'Update' post={post}/>} 

     
      </div>
    </div>
  );
};

export default EditPost;
