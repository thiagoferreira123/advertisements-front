import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteAdvertisementConfirmationModalStore } from '../hooks/modals/DeleteAdvertisementConfirmationModalStore';
import CsLineIcons from '../../../cs-line-icons/CsLineIcons';
import { AppException } from '../../../helpers/ErrorHelpers';
import { notify } from '../../../components/toast/NotificationIcon';
import { useAdvertisement } from '@/pages/advertisement/hook';

const DeleteAdvertisementConfirmationModal = () => {
  const showModal = useDeleteAdvertisementConfirmationModalStore((state) => state.showModal);

  const selectedAdvertisement = useDeleteAdvertisementConfirmationModalStore((state) => state.selectedAdvertisement);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const validationSchema = Yup.object().shape({
    confirm: Yup.string().required('Digite "excluir".').oneOf(['excluir'], 'Digite "excluir" para confirmar.'),
  });

  const initialValues = { confirm: '' };

  const { hideModal } = useDeleteAdvertisementConfirmationModalStore();
  const { deleteAdvertisement } = useAdvertisement();

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      if (!selectedAdvertisement?.advertisement_id) throw new AppException('selectedAdvertisement is not defined');

      await deleteAdvertisement(selectedAdvertisement.advertisement_id, queryClient);

      resetForm();
      setIsLoading(false);

      hideModal();
    } catch (error) {
      error instanceof AppException && notify(error.message, 'Erro', 'close', 'danger');
      setIsLoading(false);
      console.error(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, resetForm, values, touched, errors } = formik;

  if (!showModal) return null;

  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmação de exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Você realmente deseja excluir o anúncio? Se sim, digite 'excluir'. Atenção: esta ação é irreversível.
        <Form onSubmit={handleSubmit} className="tooltip-end-top">
          <div className="filled mt-4">
            <CsLineIcons icon="bin" />
            <Form.Control type="text" name="confirm" value={values.confirm} onChange={handleChange} placeholder="Digite excluir para confirmar" />
            {errors.confirm && touched.confirm && <div className="error">{errors.confirm}</div>}
          </div>
          <div className="d-flex justify-content-center mt-3">
            {isLoading ? (
              <Button type="button" variant="primary" className="mb-1 btn btn-primary" disabled>
                <span className="spinner-border spinner-border-sm"></span> Excluindo...
              </Button>
            ) : (
              <Button type="submit" variant="primary" className="mb-1 btn btn-primary">
                Confirmar e excluir
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteAdvertisementConfirmationModal;
