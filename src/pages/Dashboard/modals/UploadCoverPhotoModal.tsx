import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { getIn, useFormik } from 'formik';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { useUploadCoverPhotoModalStore } from '../hooks/modals/UploadCoverPhotoModalStore';
import CsLineIcons from '../../../cs-line-icons/CsLineIcons';
import { AppException } from '../../../helpers/ErrorHelpers';
import { notify } from '../../../components/toast/NotificationIcon';
import { useAdvertisement } from '@/pages/advertisement/hook';
import { useAuth } from '@/pages/Auth/Login/hook';
import api from '@/services/useAxios';
import DropzoneComponent from '@/components/DropzoneComponent';
import AsyncButton from '@/components/AsyncButton';
import { AxiosError } from 'axios';

const UploadCoverPhotoModal = () => {
  const showModal = useUploadCoverPhotoModalStore((state) => state.showModal);

  const [isRemovingCoverPhoto, setIsRemovingCoverPhoto] = useState(false);

  const validationSchema = Yup.object().shape({
    cover: Yup.string().required('Foto de capa é obrigatório'),
  });

  const initialValues = { cover: '' };


  const user = useAuth((state) => state.user);

  const { updateCoverPhoto } = useAuth();
  const { hideModal } = useUploadCoverPhotoModalStore();

  const onSubmit = async (values: CoverPhotoFormikValues) => {
    try {
      const response = await updateCoverPhoto(values);

      if (!response) throw new Error('Erro ao atualizar a foto de perfil');

    } catch (error) {
      if (error instanceof AxiosError) notify(error.response?.data.message, 'Erro', 'close', 'danger');
      console.error(error);
    }
  };

  const handleRemoveFile = async (fieldName: keyof CoverPhotoFormikValues, setIsRemoving: (value: boolean) => void, endpoint: string) => {
    try {
      setIsRemoving(true);

      await api.delete(endpoint, { data: { url: values[fieldName] } });
      await setFieldValue(fieldName, '');
      onSubmit({ cover: '' });
      setIsRemoving(false);
    } catch (error) {
      setIsRemoving(false);
      console.error(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, setFieldValue, values, errors, touched } = formik;

  useEffect(() => {
    if (user) setFieldValue('cover', user.cover);
  }, [user]);

  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Upload de Foto de Capa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit}>
            {/* Profile Photo */}
            {!values.cover ? (
              <DropzoneComponent
                name="cover"
                endpoint="/advertiser/cover-photo"
                onChange={(name, value) => {
                  setFieldValue(name, value);
                  onSubmit({ cover: value });
                }}
              />
            ) : (
              <div className="position-relative">
                {/* Profile Image */}
                <img
                  className="w-100 sh-20 img-fluid"
                  src={values.cover}
                  alt="Avatar"
                />
                {/* Trash Button */}
                <AsyncButton
                  isSaving={isRemovingCoverPhoto}
                  type="button"
                  loadingText=" "
                  size="sm"
                  variant="outline-danger"
                  onClickHandler={() => handleRemoveFile('cover', setIsRemovingCoverPhoto, '/advertiser/cover-photo')}
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
            {getIn(errors, 'cover') && getIn(touched, 'cover') && (
              <div className="d-block invalid-tooltip">{getIn(errors, 'cover')}</div>
            )}
          </form>
      </Modal.Body>
    </Modal>
  );
};

const initialValues: CoverPhotoFormikValues = {
  cover: '',
};

const validationSchema = Yup.object().shape({
  cover: Yup.string().required('Foto de perfil é obrigatório'),
});

interface CoverPhotoFormikValues {
  cover: string;
}

export default UploadCoverPhotoModal;
