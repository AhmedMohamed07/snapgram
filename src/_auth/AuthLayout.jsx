import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';

const AuthLayout = () => {
  const {isAuthenticated} = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            src="../../puplic/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block object-cover bg-no-repeat h-screen w-1/2"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
