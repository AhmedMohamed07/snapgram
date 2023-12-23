import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useSignOutAccount } from '../../lib/react-query/queriesAndMutations';
import { INITIAL_USER, useUserContext } from '../../context/AuthContext';
import { useEffect } from 'react';

import logo from '../../../puplic/assets/images/logo.svg';
import logout from '../../../puplic/assets/icons/logout.svg';
import placeholder from '../../../puplic/assets/icons/profile-placeholder.svg';


const Topbar = () => {
  const { mutate: signOut , isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  const { user, setUser, setIsAuthenticated } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  // const handleSignOut = async ( e ) => {
  //   e.preventDefault();
  //   signOut();
  //   setIsAuthenticated(false);
  //   setUser(INITIAL_USER);
  //   navigate("/sign-in");
  // };

  return (
    <section className="topbar">
      <div className="py-4 px-5 flex-between">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={logo}
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            className="shad-button_ghost"
            variant="ghost"
            onClick={() => signOut()}
          >
            <img src={logout} alt="" />
          </Button>

          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={
                user.imageUrl || placeholder
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
