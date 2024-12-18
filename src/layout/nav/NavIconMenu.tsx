import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnknownAction } from '@reduxjs/toolkit';

import { settingsChangeColor } from '@/settings/settingsSlice';
import { InterfaceState, SettingsState } from '@/types/Interface';
import CsLineIcons from '@/cs-line-icons/CsLineIcons';

const NavIconMenu = () => {
  const { color } = useSelector<InterfaceState, SettingsState>((state) => state.settings);
  const dispatch = useDispatch();
  const onLightDarkModeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(settingsChangeColor(color.includes('light') ? color.replace('light', 'dark') : color.replace('dark', 'light')) as unknown as UnknownAction);
  };

  return (
    <>
      <ul className="list-unstyled list-inline text-center menu-icons">
        <li className="list-inline-item">
          <a href="#/" id="colorButton" onClick={onLightDarkModeClick}>
            <CsLineIcons icon="light-on" size={18} className="light" />
            <CsLineIcons icon="light-off" size={18} className="dark" />
          </a>
        </li>
      </ul>
    </>
  );
};

export default React.memo(NavIconMenu);
