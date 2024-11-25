import { useAuth } from '../../pages/Auth/Login/hook';
import IdentityConfirmation from './IdentityConfirmation';
import PendingIdentityConfirmation from './PendingIdentityConfirmation';
import AdvertisementList from './AdvertisementList';

const Dashboard = () => {
  const user = useAuth((state) => state.user);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        {user && !user.checked && user.document_photo && user.document_selfie ? (
          <>
            <PendingIdentityConfirmation />
            <AdvertisementList />
          </>
        ) : !user?.checked ? (
          <IdentityConfirmation />
        ) : (
          <>
            <AdvertisementList />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
