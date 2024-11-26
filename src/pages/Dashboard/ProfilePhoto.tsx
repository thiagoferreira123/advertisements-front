import { useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { getIn, useFormik } from 'formik';

import DropzoneComponent from '@/components/DropzoneComponent';
import CsLineIcons from '@/cs-line-icons/CsLineIcons';
import AsyncButton from '@/components/AsyncButton';
import api from '@/services/useAxios';
import { AxiosError } from 'axios';
import { notify } from '@/components/toast/NotificationIcon';
import { useAuth } from '../Auth/Login/hook';
import { useUploadCoverPhotoModalStore } from './hooks/modals/UploadCoverPhotoModalStore';
import UploadCoverPhotoModal from './modals/UploadCoverPhotoModal';

const ProfilePhoto = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isRemovingProfilePhoto, setIsRemovingProfilePhoto] = useState(false);

  const user = useAuth((state) => state.user);

  const { updateProfilePhoto } = useAuth();
  const { showUploadCoverPhotoModal } = useUploadCoverPhotoModalStore();

  const onSubmit = async (values: ProfilePhotoFormikValues) => {
    try {
      setIsCreating(true);

      const response = await updateProfilePhoto(values);

      if (!response) throw new Error('Erro ao atualizar a foto de perfil');

      setIsCreating(false);
    } catch (error) {
      setIsCreating(false);

      if (error instanceof AxiosError) notify(error.response?.data.message, 'Erro', 'close', 'danger');
      console.error(error);
    }
  };

  const handleRemoveFile = async (fieldName: keyof ProfilePhotoFormikValues, setIsRemoving: (value: boolean) => void, endpoint: string) => {
    try {
      setIsRemoving(true);

      await api.delete(endpoint, { data: { url: values[fieldName] } });
      await setFieldValue(fieldName, '');
      onSubmit({ profile_photo: '' });
      setIsRemoving(false);
    } catch (error) {
      setIsRemoving(false);
      console.error(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, setFieldValue, values, errors, touched } = formik;

  useEffect(() => {
    if (user) setFieldValue('profile_photo', user.profile_photo);
  }, [user]);

  return (
    <Col md={8} className="mt-4">
      <h5 className="fw-bold text-center">Foto de Perfil</h5>
      <Card className="text-center position-relative">
        <Card.Body className="sh-30 d-flex flex-column justify-content-end align-items-center">
          {user?.cover && <img className="w-100 h-100 img-fluid rounded" src={user.cover} alt="Avatar" />}
          <form onSubmit={handleSubmit} className="sw-16">
            {/* Profile Photo */}
            {!values.profile_photo ? (
              <DropzoneComponent
                name="profile_photo"
                endpoint="/advertiser/profile-photo"
                onChange={(name, value) => {
                  setFieldValue(name, value);
                  onSubmit({ profile_photo: value });
                }}
              />
            ) : (
              <div className="position-relative">
                {/* Profile Image */}
                <img
                  className="rounded-circle"
                  src={values.profile_photo}
                  alt="Avatar"
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    border: '3px solid #dee2e6',
                    position: 'absolute',
                    bottom: '-18px', // Half the height of the image to make it overlap the card
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />
                {/* Trash Button */}
                <AsyncButton
                  isSaving={isRemovingProfilePhoto}
                  type="button"
                  loadingText=" "
                  size="sm"
                  variant="outline-danger"
                  onClickHandler={() => handleRemoveFile('profile_photo', setIsRemovingProfilePhoto, '/advertiser/profile-photo')}
                  className="btn-icon btn-icon-only position-absolute"
                  style={{
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <CsLineIcons icon="bin" />
                </AsyncButton>
              </div>
            )}
            {getIn(errors, 'profile_photo') && getIn(touched, 'profile_photo') && (
              <div className="d-block invalid-tooltip">{getIn(errors, 'profile_photo')}</div>
            )}
          </form>
          <Button type="button" size="sm" variant="outline-primary" className="position-absolute end-0 bottom-0 m-2" onClick={showUploadCoverPhotoModal}>
            Adicionar foto de capa
          </Button>
        </Card.Body>
      </Card>

      <UploadCoverPhotoModal />
    </Col>
  );
};

const initialValues: ProfilePhotoFormikValues = {
  profile_photo: '',
};

const validationSchema = Yup.object().shape({
  profile_photo: Yup.string().required('Foto de perfil é obrigatório'),
});

interface ProfilePhotoFormikValues {
  profile_photo: string;
}

export default ProfilePhoto;
