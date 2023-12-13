import { Button } from '../ui/button';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { signOutAccount } from '../../lib/appwrite/api';
import { useSignOutAccount } from '../../lib/react-query/queriesAndMutations';
import { INITIAL_USER, useUserContext } from '../../context/AuthContext';

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();


  const handleSignOut = async ( e ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <section className="topbar">
      <div className="py-4 px-5 flex-between">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="../../../puplic/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            className="shad-button_ghost"
            variant="ghost"
            onClick={(e) => handleSignOut(e)}
          >
            <img src="../../../puplic/assets/icons/logout.svg" alt="" />
          </Button>

          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={
                user.imageUrl ||
                '../../../puplic/assets/icons/profile-placeholder.svg'
              }
              alt="profile"
              className="rounded-full h-8 w-8"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
