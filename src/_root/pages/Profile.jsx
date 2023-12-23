import React from 'react';
import { useGetUserById } from '../../lib/react-query/queriesAndMutations';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Loader from '../../components/shared/Loader';
import { useUserContext } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import GridPosts from '../../components/shared/GridPosts';
import LikedPosts from './LikedPosts';

import edit from '../../../puplic/assets/icons/edit.svg';
import posts from '../../../puplic/assets/icons/posts.svg';
import liked from '../../../puplic/assets/icons/like.svg';

const StatBlock = ({ value, label }) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const {id}= useParams();
  const { data: currentUser } = useGetUserById(id || "");
  const {user}= useUserContext();
  const {pathname} = useLocation(); 

  if (!currentUser)
  return (
    <div className="flex-center w-full h-full">
      <Loader />
    </div>
  );

  return(
  <div className='profile-container'>
    <div className="profile-inner_container">
      <div className="flex max-xl:items-center xl:flex-row flex-1 flex-col  gap-7">
        <img
          src= {
          currentUser?.imageUrl || '../../../puplic/assets/icons/profile-placeholder.svg'
        } 
          alt="profile"
          className='w-28 h-28 lg:h-36 lg:w-36 rounded-full'
        />

        <div className="flex flex-1 justify-between md:mt-2 flex-col">
          <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
          </div>

          <div className="flex-center xl:justify-start gap-10 mt-10 flex-wrap">
            <StatBlock value={currentUser.posts.length} label={'Posts'} />
            <StatBlock value={20} label={'Followers'} />
            <StatBlock value={20} label={'Following'} />
          </div>

          <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
          </p>
        </div>

        <div className="flex">
          <div className={`${user.id !== currentUser.$id && "hidden"}`}>
            <Link 
              to={`/update-profile/${currentUser.$id}`}
              className={`h-12 bg-dark-4 px-5 text-light-1 gap-2 rounded-lg ${
                user.id !== currentUser.$id && "hidden"} flex-center
              `}
            >
              <img 
                src={edit}
                alt="edit"
                width={20}
                height={20}
              />
              <p className="flex whitespace-nowrap small-medium">
                Edit Profile
              </p>
            </Link>
          </div>
          <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
          </div>
        </div>
      </div>
    </div>

    {currentUser.$id === user.id  && (
      <div className='flex w-full max-w-5xl'>
        <Link 
          to={`/profile/${id}`}
          className={`profile-tab rounded-l-lg ${
            pathname === `/profile/${id}` && 'bg-dark-3'
          }`}
        >
          <img 
            src={posts}
            alt="posts"
            width={20}
            height={20}
          />
          Posts
        </Link>

        <Link 
          to={`/profile/${id}/liked-posts`}
          className={`profile-tab rounded-l-lg ${
            pathname === `/profile/${id}` && 'bg-dark-3'
          }`}
        >
          <img 
            src={liked}
            alt="liked"
            width={20}
            height={20}
          />
          Posts
        </Link>
      </div>
    )}

    <Routes>
      <Route
        index
        element={<GridPosts posts={currentUser.posts} showUser={false} />}
      />
      {currentUser.$id === user.id && (
        <Route path="/liked-posts" element={<LikedPosts />} />
      )}
    </Routes>
  </div>);
};

export default Profile;
