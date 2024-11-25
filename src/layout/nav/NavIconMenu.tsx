import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingsChangeColor } from '../../settings/settingsSlice';
import IconMenuNotifications from './notifications/Notifications';
import IconMenuChatNotifications from './chat-notifications/ChatNotifications';
import SearchModal from './search/SearchModal';
import { InterfaceState, SettingsState } from '../../types/Interface';
import CsLineIcons from '../../cs-line-icons/CsLineIcons';
import { UnknownAction } from '@reduxjs/toolkit';
import { useAuth } from '../../pages/Auth/Login/hook';
import { Role } from '../../pages/Auth/Login/hook/types';

const NavIconMenu = () => {
  const user = useAuth((state) => state.user);

  const { color } = useSelector<InterfaceState, SettingsState>((state) => state.settings);
  const dispatch = useDispatch();
  const onLightDarkModeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(settingsChangeColor(color.includes('light') ? color.replace('light', 'dark') : color.replace('dark', 'light')) as unknown as UnknownAction);
  };
  const [showSearchModal, setShowSearchModal] = useState(false);

  const onSearchIconClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShowSearchModal(true);
  };

  return (
    <>
      <ul className="list-unstyled list-inline text-center menu-icons">
        <li className="list-inline-item">
          <a href="#/" onClick={onSearchIconClick}>
            <CsLineIcons icon="search" size={18} />
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#/" id="colorButton" onClick={onLightDarkModeClick}>
            <CsLineIcons icon="light-on" size={18} className="light" />
            <CsLineIcons icon="light-off" size={18} className="dark" />
          </a>
        </li>
        <IconMenuNotifications />
        {/* <IconMenuChatNotifications /> */}
      </ul>
      <SearchModal show={showSearchModal} setShow={setShowSearchModal} />
    </>
  );
};

export default React.memo(NavIconMenu);
