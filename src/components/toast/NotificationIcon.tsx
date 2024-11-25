import CsLineIcons from '/src/cs-line-icons/CsLineIcons';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Id, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BootstrapBackgroundVariant } from '../../types/Interface';

export const notify = (message: string, title: string, icon: string, status?: BootstrapBackgroundVariant, isLoading?: boolean) =>
  toast(<NotificationIcon message={message} title={title} icon={icon} status={status} isLoading={isLoading} />, { autoClose: isLoading ? false : 5000 });

export const updateNotify = (toastId: Id, message: string, title: string, icon: string, status?: BootstrapBackgroundVariant) => {
  toast.update(toastId, {
    render: <NotificationIcon message={message} title={title} icon={icon} status={status} />,
    autoClose: 5000,
  });
}

const NotificationIcon = (props: { message: string; title: string; icon: string; status?: BootstrapBackgroundVariant; isLoading?: boolean }) => (
  <>
    <div className="mb-2">
      {props.isLoading && props.isLoading != undefined ? (
        <>
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span className="text-muted mb-2">{props.message}</span>
        </>
      ) : (
        <>
          <CsLineIcons icon={props.icon} width={20} height={20} className={`cs-icon icon text-${props.status ?? 'primary'} me-3 align-middle`} />
          <span className={`align-middle text-${props.status ?? 'primary'} heading font-heading`}>{props.title}</span>
          <div className="text-muted mb-2">{props.message}</div>
        </>
      )}
    </div>
  </>
);

export default NotificationIcon;
