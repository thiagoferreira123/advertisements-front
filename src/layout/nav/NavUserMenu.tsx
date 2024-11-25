import React, { LegacyRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { MENU_PLACEMENT } from '../../constants';
import { Role, User } from '../../pages/Auth/Login/hook/types';
import { Link } from 'react-router-dom';
import CsLineIcons from '../../cs-line-icons/CsLineIcons';
import SettingsModal from '../right-buttons/SettingsModal';
import { useAuth } from '../../pages/Auth/Login/hook';
import { layoutShowingNavMenu } from '../layoutSlice';
import api from '../../services/useAxios';
import { AppException } from '../../helpers/ErrorHelpers';
import { notify } from '../../components/toast/NotificationIcon';
import { useQuery } from '@tanstack/react-query';

interface NavUserMenuDropdownToggleProps {
  onClick: (e: React.MouseEvent) => void;
  expanded?: boolean;
  user: User;
}

interface NavUserMenuContentProps {
  logout: () => void;
}

const NavUserMenuContent = (props: NavUserMenuContentProps) => {
  const user = useAuth((state) => state.user);

  const [isShowSettingsModal, setIsShowSettingsModal] = useState(false);

  const showSettingsModal = () => {
    setIsShowSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setIsShowSettingsModal(false);
    document.documentElement.click();
  };

  const getBillingPortal = async () => {
    try {
      const response = await api.get('/payments/get-portal-link'); // Add this line

      return response.data.url; // Add this line
    } catch (error) {
      console.error(error);
      error instanceof AppException && notify(error.message, 'Erro', 'close', 'danger');
      throw error;
    }
  };

  const result = useQuery({
    queryKey: ['portal-link'],
    queryFn: getBillingPortal,
    enabled: !!user?.clinic_stripe_customer_id,
  });

  return (
    <div>
      <Row className="mb-3 ms-0 me-0">
        <Col xs="12" className="pe-1 ps-1 mb-2">
          <ul className="list-unstyled">
            <li>
              <Link to={'/app/meus-dados'}>
                <CsLineIcons icon="gear" className="me-2" size={17} /> <span className="align-middle">Meus dados</span>
              </Link>
            </li>
          </ul>
        </Col>
        {result.data && <Col xs="12" className="pe-1 ps-1 mb-2">
          <ul className="list-unstyled">
            <li>
              <Link to={result.data}>
                <CsLineIcons icon="money" className="me-2" size={17} /> <span className="align-middle">Gerenciar assinatura</span>
              </Link>
            </li>
          </ul>
        </Col>}
        <Col xs="12" className="pe-1 ps-1 mb-1">
          <ul className="list-unstyled">
            <li>
              <a href="#/!" onClick={showSettingsModal}>
                <CsLineIcons icon="brush" className="me-2" size={17} /> <span className="align-middle">Preferências de desing</span>
              </a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="mb-1 ms-0 me-0">
        <Col xs="12" className="p-1 mb-1 pt-1">
          <div className="separator-light" />
        </Col>

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

      <SettingsModal show={isShowSettingsModal} handleClose={closeSettingsModal} />
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
      <img className="profile" alt={user.clinic_full_name} src={user?.clinic_logo_link ? user?.clinic_logo_link : '/img/profile/profile-11.webp'} />
      <div className="name">{user.clinic_full_name}</div>
    </a>
  ))
);

// Dropdown needs access to the DOM of the Menu to measure it
const NavUserMenuDropdownMenu = React.memo(
  React.forwardRef(({ style, className, logout }, ref) => {
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
  } = useSelector((state) => state.menu);

  const user = useAuth((state) => state.user);
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  const { color } = useSelector((state) => state.settings);
  const { showingNavMenu } = useSelector((state) => state.layout);

  const onToggle = (status, event) => {
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
