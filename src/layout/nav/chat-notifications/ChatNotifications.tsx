import React, { LegacyRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { MENU_PLACEMENT } from '../../../constants';
import CsLineIcons from '/src/cs-line-icons/CsLineIcons';
import { layoutShowingNavMenu } from '/src/layout/layoutSlice';
import { fetchNotifications } from './notificationSlice';
import { InterfaceState, LayoutState, MenuState, SettingsState } from '../../../types/Interface';
import { useQuery } from '@tanstack/react-query';
import { getAvatarByGender } from '../../../pages/PatientMenu/hooks/patientMenuStore';
import { ChatNotification, useChatNotification } from '../../../hooks/useChatNotification';

interface ChatNotificationsDropdownToggleProps {
  // eslint-disable-next-line no-unused-vars
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  expanded: boolean;
  count: number;
}

interface ChatNotificationsDropdownMenuProps {
  style?: React.CSSProperties;
  className?: string;
  labeledBy?: string;
  items: ChatNotification[];
}

interface ChatNotificationItem {
  item: ChatNotification;
}

const ChatNotificationsDropdownToggle = React.memo(
  React.forwardRef(({ onClick, expanded = false, count }: ChatNotificationsDropdownToggleProps, ref: LegacyRef<HTMLAnchorElement>) => (
    <a
      ref={ref}
      href="#/"
      className="notification-button"
      data-toggle="dropdown"
      aria-expanded={expanded}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
    >
      <div className="position-relative d-inline-flex">
        <CsLineIcons icon="message" size={18} />
        {count ? (
          <small
            className="position-absolute rounded-xl bg-primary ps-1"
            style={{
              fontSize: '.6rem',
              top: '-0.3rem',
              right: '-0.3rem',
            }}
          >
            {count > 9 ? '9+' : count}
          </small>
        ) : null}
      </div>
    </a>
  ))
);

function formatName(name: string) {
  return name
    .split(' ') // Divide o nome em partes
    .slice(0, 2) // Pega apenas as duas primeiras partes
    .map(part => part ? part[0].toUpperCase() + part.substring(1).toLowerCase() : '') // Capitaliza a primeira letra de cada parte, se existir
    .join(' '); // Junta as partes de volta com espaço
}

const ChatNotificationItem = ({ item }: ChatNotificationItem) => {
  return (
    <li className="mb-3 pb-3 border-bottom border-separator-light d-flex">
      <img
        src={item.patient?.photoLink ? item.patient?.photoLink : getAvatarByGender(item.patient?.gender ?? 1)}
        className="me-3 sw-4 sh-4 rounded-xl align-self-center"
        alt={item.patient?.name ?? 'notification'}
        title={item.patient?.name ?? 'notification'}
      />
      <div className="align-self-center">
        <NavLink
          to='/app/ferramentas/chat/'
          onClick={() => {
            layoutShowingNavMenu('');
          }}
        >
          <b>{item.patient?.name ? formatName(item.patient.name) : 'Paciente'}</b> <br /> {item.content}
        </NavLink>
      </div>
    </li>
  );
};

const ChatNotificationsDropdownMenu = React.memo(
  React.forwardRef(({ style, className, labeledBy, items }: ChatNotificationsDropdownMenuProps, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div ref={ref} style={style} className={classNames('wide notification-dropdown scroll-out ps-4 pe-2', className)} aria-labelledby={labeledBy}>
        <div className="override-native overflow-y-auto sh-40 mb-n2">
          <ul className="list-unstyled border-last-none">
            {items.map((item, itemIndex) => (
              <ChatNotificationItem key={`notificationItem.${itemIndex}`} item={item} />
            ))}
          </ul>
        </div>
      </div>
    );
  })
);
ChatNotificationsDropdownMenu.displayName = 'ChatNotificationsDropdownMenu';

const MENU_NAME = 'ChatNotifications';
const ChatNotifications = () => {
  const dispatch = useDispatch();

  const {
    placementStatus: { view: placement },
    behaviourStatus: { behaviourHtmlData },
    attrMobile,
    attrMenuAnimate,
  } = useSelector<InterfaceState, MenuState>((state) => state.menu);

  const { color } = useSelector<InterfaceState, SettingsState>((state) => state.settings);
  const { showingNavMenu } = useSelector<InterfaceState, LayoutState>((state) => state.layout);

  const { getNotifications } = useChatNotification();

  const onToggle = (status: boolean, event: { stopPropagation?: () => void; originalEvent?: { stopPropagation: () => void } }) => {
    if (event && event.stopPropagation) event.stopPropagation();
    else if (event && event.originalEvent && event.originalEvent.stopPropagation) event.originalEvent.stopPropagation();
    dispatch(layoutShowingNavMenu(status ? MENU_NAME : ''));
  };

  const getNotifications_ = async () => {
    try {
      const result = await getNotifications();

      if (result === false) throw new Error('Could not get notifications');

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const result = useQuery({ queryKey: ['unread-notifications'], queryFn: getNotifications_ });

  useEffect(() => {
    dispatch(fetchNotifications());
    return () => { };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(layoutShowingNavMenu(''));
    // eslint-disable-next-line
  }, [attrMenuAnimate, behaviourHtmlData, attrMobile, color]);

  if (result.data && result.data.length > 0) {
    return (
      <Dropdown
        as="li"
        bsPrefix="list-inline-item"
        onToggle={onToggle}
        show={showingNavMenu === MENU_NAME}
        align={placement === MENU_PLACEMENT.Horizontal ? 'end' : 'start'}
      >
        <Dropdown.Toggle count={result.data.length} expanded={false} as={ChatNotificationsDropdownToggle} />
        <Dropdown.Menu
          as={ChatNotificationsDropdownMenu}
          items={result.data}
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
export default React.memo(ChatNotifications);
