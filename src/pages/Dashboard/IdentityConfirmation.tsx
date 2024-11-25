import { useState } from 'react';
import { Alert, Card, Col, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { getIn, useFormik } from 'formik';

import DropzoneComponent from '@/components/DropzoneComponent';
import CsLineIcons from '@/cs-line-icons/CsLineIcons';
import AsyncButton from '@/components/AsyncButton';
import api from '@/services/useAxios';
import { AxiosError } from 'axios';
import { notify } from '@/components/toast/NotificationIcon';
import { useAuth } from '../Auth/Login/hook';

const IdentityConfirmation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isRemovingIdentificationDocument, setIsRemovingIdentificationDocument] = useState(false);
  const [isRemovingSelfie, setIsRemovingSelfie] = useState(false);

  const { updateIdentificationImages } = useAuth();

  const onSubmit = async (values: IdentityConfirmationFormikValues) => {
    try {
      setIsCreating(true);

      const response = await updateIdentificationImages(values);

      if (!response) throw new Error('Erro ao atualizar as imagens de identificação');

      setIsCreating(false);
    } catch (error) {
      setIsCreating(false);

      if (error instanceof AxiosError) notify(error.response?.data.message, 'Erro', 'close', 'danger');
      console.error(error);
    }
  };

  const handleRemoveFile = async (fieldName: keyof IdentityConfirmationFormikValues, setIsRemoving: (value: boolean) => void, endpoint: string) => {
    try {
      setIsRemoving(true);

      await api.delete(endpoint, { data: { url: values[fieldName] } });
      await setFieldValue(fieldName, '');
      setIsRemoving(false);
    } catch (error) {
      setIsRemoving(false);
      console.error(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, setValues, setFieldValue, values, errors, touched } = formik;

  return (
    <Col md={8} className="mt-4">
      <h5 className="fw-bold">Confirmação de identidade</h5>
      <Card>
        <Card.Body>
          <Alert className="text-center">
            Para confirmar sua identidade, solicitamos que envie uma foto do seu documento e uma selfie segurando o mesmo. O processo de análise do seu cadastro
            pode levar até 1 dia útil.
          </Alert>

          <form onSubmit={handleSubmit}>
            {/* Identification document */}
            <Col md="12" className="mt-3">
              <div className="mb-3 top-label">
                {!values.document_photo ? (
                  <DropzoneComponent name="document_photo" endpoint="/advertiser/identification" onChange={setFieldValue} />
                ) : (
                  <Card className="border">
                    <Card.Body className="d-flex justify-content-between align-items-end p-3">
                      <p className="mb-0">{values.document_photo.split('/').pop()}</p>
                      <div>
                        <a
                          href={values.document_photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-icon btn-icon-only me-2"
                        >
                          <CsLineIcons icon="eye" />
                        </a>
                        <AsyncButton
                          loadingText=" "
                          isSaving={isRemovingIdentificationDocument}
                          variant="outline-primary"
                          onClickHandler={() =>
                            handleRemoveFile('document_photo', setIsRemovingIdentificationDocument, '/contracts/negotiation-contract-file')
                          }
                          className="btn-icon btn-icon-only"
                        >
                          <CsLineIcons icon="bin" />
                        </AsyncButton>
                      </div>
                    </Card.Body>
                  </Card>
                )}
                <Form.Label>Documento de identificação (upload)</Form.Label>
                {getIn(errors, 'document_photo') && getIn(touched, 'document_photo') && (
                  <div className="d-block invalid-tooltip">{getIn(errors, 'document_photo')}</div>
                )}
              </div>
            </Col>

            {/* Selfie */}
            <Col md="12" className="mt-3">
              <div className="mb-3 top-label">
                {!values.document_selfie ? (
                  <DropzoneComponent name="document_selfie" endpoint="/advertiser/identification" onChange={setFieldValue} />
                ) : (
                  <Card className="border">
                    <Card.Body className="d-flex justify-content-between align-items-end p-3">
                      <p className="mb-0">{values.document_selfie.split('/').pop()}</p>
                      <div>
                        <a href={values.document_selfie} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-icon btn-icon-only me-2">
                          <CsLineIcons icon="eye" />
                        </a>
                        <AsyncButton
                          loadingText=" "
                          isSaving={isRemovingSelfie}
                          variant="outline-primary"
                          onClickHandler={() => handleRemoveFile('document_selfie', setIsRemovingSelfie, '/contracts/negotiation-contract-file')}
                          className="btn-icon btn-icon-only"
                        >
                          <CsLineIcons icon="bin" />
                        </AsyncButton>
                      </div>
                    </Card.Body>
                  </Card>
                )}
                <Form.Label>Selfie (upload)</Form.Label>
                {getIn(errors, 'document_selfie') && getIn(touched, 'document_selfie') && <div className="d-block invalid-tooltip">{getIn(errors, 'document_selfie')}</div>}
              </div>
            </Col>

            <div className="d-flex justify-content-end mt-3">
              <AsyncButton type="submit" variant="primary" isSaving={isCreating}>
                Salvar
              </AsyncButton>
            </div>
          </form>
        </Card.Body>
      </Card>
    </Col>
  );
};

const initialValues: IdentityConfirmationFormikValues = {
  document_photo: '',
  document_selfie: '',
};

const validationSchema = Yup.object().shape({
  document_photo: Yup.string().required('Documento de identificação é obrigatório'),
  document_selfie: Yup.string().required('Selfie é obrigatório'),
});

interface IdentityConfirmationFormikValues {
  document_photo: string;
  document_selfie: string;
}

export default IdentityConfirmation;
