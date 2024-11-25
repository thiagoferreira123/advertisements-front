import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PATHS } from '../../config';
import { useAuth } from '../../pages/Auth/Login/hook';
import { Role } from '../../pages/Auth/Login/hook/types';
import { appRoot } from '../../routes';

const NavLogo = () => {
  const user = useAuth(state => state.user);

  return (
    <div className="logo position-relative">
      <Link to={DEFAULT_PATHS.APP}>
          <img src="/img/logo/logo-light.webp" alt="logo"/>
      </Link>
    </div>
  );
};
export default React.memo(NavLogo);
