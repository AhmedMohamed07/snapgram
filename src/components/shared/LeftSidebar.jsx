import React, { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext ,INITIAL_USER} from '../../context/AuthContext';
import { useSignOutAccount } from '../../lib/react-query/queriesAndMutations';
import { sidebarLinks } from '../../constants';
import { Button } from '../ui/button';

import logo from '../../../puplic/assets/images/logo.svg'
import placeholder from '../../../puplic/assets/icons/profile-placeholder.svg';
import logout from '../../../puplic/assets/icons/logout.svg'
import Loader from './Loader';


const LeftSidebar = () => {
  const { mutate: signOut } = useSignOutAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();


  const handleSignOut = async ( e ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };
 
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={logo}
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
        
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={
              user.imageUrl || placeholder
            }
            alt="profile"
            className="rounded-full h-14 w-14"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="smaall-regular text-light-3">@${user.username}</p>
          </div>
        </Link>
        )}
        
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname == link.route;
           
            return (
              <li
                key={link.label}
                style={{ borderRadius: 0.5 + 'rem' }}
                className={` leftsidebar-link group   ${
                  isActive && ' bg-primary-500'
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex items-center gap-4 p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        className="shad-button_ghost"
        variant="ghost"
        onClick={ e=> handleSignOut(e) }
      >
        <img src={logout} alt="logout" />

        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
