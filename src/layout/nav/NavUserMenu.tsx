import React, { LegacyRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Col, Dropdown, Row } from 'react-bootstrap';

import { MENU_PLACEMENT } from '@/constants';
import { User } from '@/pages/Auth/Login/hook/types';
import CsLineIcons from '@/cs-line-icons/CsLineIcons';
import { useAuth } from '@/pages/Auth/Login/hook';

import { layoutShowingNavMenu } from '../layoutSlice';

interface NavUserMenuDropdownToggleProps {
  onClick: (e: React.MouseEvent) => void;
  expanded?: boolean;
  user: User;
}

interface NavUserMenuContentProps {
  logout: () => void;
}

const NavUserMenuContent = (props: NavUserMenuContentProps) => {
  return (
    <div>
      <Row className="mb-1 ms-0 me-0">

        <Col xs="6" className="pe-1 ps-1">
          <ul className="list-unstyled">
            <li>
              <a href="#/!" onClick={() => props.logout()}>
                <CsLineIcons icon="logout" className="me-2" size={17} /> <span className="align-middle">Sair</span>
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

const NavUserMenuDropdownToggle = React.memo(
  React.forwardRef(({ onClick, expanded = false, user }: NavUserMenuDropdownToggleProps, ref: LegacyRef<HTMLAnchorElement> | undefined) => (
    <a
      href="#/!"
      ref={ref}
      className="d-flex user position-relative"
      data-toggle="dropdown"
      aria-expanded={expanded}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
    >
      <img className="profile" alt={user.name} src={user?.profile_photo ? user?.profile_photo : '/img/profile/profile-11.webp'} />
      <div className="name">{user.name}</div>
    </a>
  ))
);

// Dropdown needs access to the DOM of the Menu to measure it
const NavUserMenuDropdownMenu = React.memo(
  React.forwardRef(({ style, className, logout }: { style: React.CSSProperties; className: string; logout: () => void }, ref: LegacyRef<HTMLDivElement> | undefined) => {
    return (
      <div ref={ref} style={style} className={classNames('dropdown-menu dropdown-menu-end user-menu wide', className)}>
        <NavUserMenuContent logout={logout} />
      </div>
    );
  })
);

NavUserMenuDropdownMenu.displayName = 'NavUserMenuDropdownMenu';

const MENU_NAME = 'NavUserMenu';

const NavUserMenu = () => {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const {
    placementStatus: { view: placement },
    behaviourStatus: { behaviourHtmlData },
    attrMobile,
    attrMenuAnimate,
  } = useSelector((state: any) => state.menu);

  const user = useAuth((state) => state.user);
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  const { color } = useSelector((state: any) => state.settings);
  const { showingNavMenu } = useSelector((state: any) => state.layout);

  const onToggle = (status: any, event: any) => {
    if (event && event.stopPropagation) event.stopPropagation();
    else if (event && event.originalEvent && event.originalEvent.stopPropagation) event.originalEvent.stopPropagation();
    dispatch(layoutShowingNavMenu(status ? MENU_NAME : ''));
  };

  useEffect(() => {
    dispatch(layoutShowingNavMenu(''));
    // eslint-disable-next-line
  }, [attrMenuAnimate, behaviourHtmlData, attrMobile, color]);

  if (!isLoggedIn || !user) {
    return <></>;
  }
  return (
    <Dropdown as="div" bsPrefix="user-container d-flex" onToggle={onToggle} show={showingNavMenu === MENU_NAME} drop="down">
      <Dropdown.Toggle as={NavUserMenuDropdownToggle} user={user} />
      <Dropdown.Menu
        as={NavUserMenuDropdownMenu}
        className="dropdown-menu dropdown-menu-end user-menu wide"
        logout={logout}
        popperConfig={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: () => {
                  if (placement === MENU_PLACEMENT.Horizontal) {
                    return [0, 7];
                  }
                  if (window.innerWidth < 768) {
                    return [-84, 7];
                  }

                  return [-78, 7];
                },
              },
            },
          ],
        }}
      />
    </Dropdown>
  );
};
export default React.memo(NavUserMenu);
