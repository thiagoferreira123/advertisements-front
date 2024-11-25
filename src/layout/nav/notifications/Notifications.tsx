import React, { LegacyRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { MENU_PLACEMENT } from '../../../constants';
import CsLineIcons from '/src/cs-line-icons/CsLineIcons';
import { layoutShowingNavMenu } from '/src/layout/layoutSlice';
import { fetchNotifications } from './notificationSlice';
import { InterfaceState, LayoutState, MenuState, Notification, NotificationState, SettingsState } from '../../../types/Interface';

interface NotificationsDropdownToggleProps {
  // eslint-disable-next-line no-unused-vars
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  expanded: boolean;
}

interface NotificationsDropdownMenuProps {
  style?: React.CSSProperties;
  className?: string;
  labeledBy?: string;
  items: Notification[];
}

// const NotificationsDropdownToggle = React.memo(
//   React.forwardRef(({ onClick, expanded = false }: NotificationsDropdownToggleProps, ref: LegacyRef<HTMLAnchorElement>) => (
//     <a
//       ref={ref}
//       href="#/"
//       className="notification-button"
//       data-toggle="dropdown"
//       aria-expanded={expanded}
//       onClick={(e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         onClick(e);
//       }}
//     >
//       <div className="position-relative d-inline-flex">
//         <CsLineIcons icon="bell" size={18} />
//         <span className="position-absolute notification-dot rounded-xl" />
//       </div>
//     </a>
//   ))
// );
const NotificationItem = ({ img = '', link = '', detail = '' }) => (
  <li className="mb-3 pb-3 border-bottom border-separator-light d-flex">
    <img src={img} className="me-3 sw-4 sh-4 rounded-xl align-self-center" alt="notification" />
    <div className="align-self-center">
      <NavLink to={link}>{detail}</NavLink>
    </div>
  </li>
);

const NotificationsDropdownMenu = React.memo(
  React.forwardRef(({ style, className, labeledBy, items }: NotificationsDropdownMenuProps, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div ref={ref} style={style} className={classNames('wide notification-dropdown scroll-out', className)} aria-labelledby={labeledBy}>
        <div className="override-native overflow-y-auto sh-40 mb-n2">
          <ul className="list-unstyled border-last-none">
            {items.map((item, itemIndex) => (
              <NotificationItem key={`notificationItem.${itemIndex}`} detail={item.detail} link={item.link} img={item.img} />
            ))}
          </ul>
        </div>
      </div>
    );
  })
);
NotificationsDropdownMenu.displayName = 'NotificationsDropdownMenu';

const MENU_NAME = 'Notifications';
const Notifications = () => {
  const dispatch = useDispatch();

  const {
    placementStatus: { view: placement },
    behaviourStatus: { behaviourHtmlData },
    attrMobile,
    attrMenuAnimate,
  } = useSelector<InterfaceState, MenuState>((state) => state.menu);

  const { color } = useSelector<InterfaceState, SettingsState>((state) => state.settings);
  const { items } = useSelector<InterfaceState, NotificationState>((state) => state.notification);
  const { showingNavMenu } = useSelector<InterfaceState, LayoutState>((state) => state.layout);

  const onToggle = (status: boolean, event: { stopPropagation?: () => void; originalEvent?: { stopPropagation: () => void } }) => {
    if (event && event.stopPropagation) event.stopPropagation();
    else if (event && event.originalEvent && event.originalEvent.stopPropagation) event.originalEvent.stopPropagation();
    dispatch(layoutShowingNavMenu(status ? MENU_NAME : ''));
  };

  // useEffect(() => {
  //   dispatch(fetchNotifications());
  //   return () => {};
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    dispatch(layoutShowingNavMenu(''));
    // eslint-disable-next-line
  }, [attrMenuAnimate, behaviourHtmlData, attrMobile, color]);

  if (items && items.length > 0) {
    return (
      <Dropdown
        as="li"
        bsPrefix="list-inline-item"
        onToggle={onToggle}
        show={showingNavMenu === MENU_NAME}
        align={placement === MENU_PLACEMENT.Horizontal ? 'end' : 'start'}
      >
        {/* <Dropdown.Toggle expanded={false} as={NotificationsDropdownToggle} /> */}
        <Dropdown.Menu
          as={NotificationsDropdownMenu}
          items={items}
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
                      return [-168, 7];
                    }
                    return [-162, 7];
                  },
                },
              },
            ],
          }}
        />
      </Dropdown>
    );
  }
  return <></>;
};
export default React.memo(Notifications);
