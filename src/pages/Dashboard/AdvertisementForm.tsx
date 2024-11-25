import React, { useState } from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { IFileWithMeta } from 'react-dropzone-uploader';
import { notEmpty } from '../../helpers/Utils';
import CsLineIcons from '../../cs-line-icons/CsLineIcons';
import MultipleDropzoneComponent from '../../components/MultipleDropzoneComponent';
import AsyncButton from '../../components/AsyncButton';

interface FormValues {
  advertiser_id: string;
  name: string;
  state: string;
  city: string;
  title: string;
  description: string;
  availability: string;
  price: number;
  age: number;
  locations: string[];
  categories: string[];
  public: string[];
  traits: string[];
  photos: Record<string, string>;
  videos: Record<string, string>;
}

const AdvertisementForm: React.FC = () => {
  const queryClient = useQueryClient();

  const [isSaving, setIsSaving] = useState(false);
  const [imageFiles, setImageFiles] = useState<IFileWithMeta[]>([]);
  const [videoFiles, setVideoFiles] = useState<IFileWithMeta[]>([]);
  const [isRemovingPhotoUrls, setIsRemovingPhotoUrls] = useState<string[]>([]);
  const [isRemovingVideoUrls, setIsRemovingVideoUrls] = useState<string[]>([]);

  const initialValues: FormValues = {
    name: '',
    advertiser_id: '',
    state: '',
    city: '',
    title: '',
    description: '',
    availability: '',
    price: 0,
    age: 0,
    locations: [],
    categories: [],
    public: [],
    traits: [],
    photos: {
      photo1: '',
      photo2: '',
      photo3: '',
      photo4: '',
      photo5: '',
      photo6: '',
      photo7: '',
      photo8: '',
      photo9: '',
      photo10: '',
      photo11: '',
      photo12: '',
      photo13: '',
      photo14: '',
      photo15: '',
    },
    videos: {
      video1: '',
      video2: '',
      video3: '',
      video4: '',
      video5: '',
      video6: '',
      video7: '',
      video8: '',
      video9: '',
      video10: '',
      video11: '',
      video12: '',
      video13: '',
      video14: '',
      video15: '',
    },
  };

  const validationSchema = Yup.object().shape({
    state: Yup.string().required('Estado é obrigatório'),
    city: Yup.string().required('Cidade é obrigatória'),
    title: Yup.string().required('Título é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    availability: Yup.string().required('Disponibilidade é obrigatória'),
    price: Yup.number(),
    age: Yup.number().required('Idade é obrigatória').integer('A idade deve ser um número inteiro').positive('A idade deve ser positiva'),
    locations: Yup.array().required('Localização é obrigatória'),
    categories: Yup.array().required('Categorias são obrigatórias'),
    public: Yup.array().required('Público é obrigatório'),
    traits: Yup.array().required('Traços é obrigatório'),
    photos: Yup.object().required('Fotos são obrigatórias'),
  });

  const onSubmit = (values: FormValues) => {
    console.log('Form submitted', values);
  };

  const handleChangeMultiplePhotos = (files: IFileWithMeta[]) => {
    setImageFiles(files);

    const filesUrls = files.map((file) => file.xhr?.response).filter((url: string | undefined) => url?.length);

    const photoUrls = Object.values(values.photos).filter((url) => url?.length);

    const combinedUrls = [...photoUrls, ...filesUrls].filter(notEmpty).reduce((acc: string[], url) => {
      if (url && !acc.includes(url)) acc.push(url);
      return acc;
    }, []);

    Object.keys(values.photos).forEach((key, index) => {
      formik.setFieldValue(`photos.${key}`, combinedUrls[index] ?? '');
    });
  };

  const handleChangeMultipleVideos = (files: IFileWithMeta[]) => {
    setVideoFiles(files);

    const filesUrls = files.map((file) => file.xhr?.response).filter((url: string | undefined) => url?.length);

    const videoUrls = Object.values(values.videos).filter((url) => url?.length);

    const combinedUrls = [...videoUrls, ...filesUrls].filter(notEmpty).reduce((acc: string[], url) => {
      if (url && !acc.includes(url)) acc.push(url);
      return acc;
    }, []);

    Object.keys(values.videos).forEach((key, index) => {
      formik.setFieldValue(`videos.${key}`, combinedUrls[index] ?? '');
    });
  };

  const handleClickRemovePhoto = async (response: string) => {
    try {
      const photoKey = Object.keys(values.photos).find((key) => values.photos[key] == response);

      const file = imageFiles.find((file) => file.xhr?.response == response);

      if (file) {
        file.remove();
      } else if (photoKey) {
        setIsRemovingPhotoUrls((prev) => [...prev, response]);

        // if (property?.additional_information?.id) {
        //   await updatePropertyAdditionalIinformation(
        //     property.additional_information.id,
        //     { photos: { ...values.photos, [photoKey]: '' } },
        //     queryClient
        //   );
        // }

        formik.setFieldValue(`photos.${photoKey}`, '');
        setIsRemovingPhotoUrls((prev) => prev.filter((key) => key !== response));
      }
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  const handleClickRemoveVideo = async (response: string) => {
    try {
      const videoKey = Object.keys(values.videos).find((key) => values.videos[key] == response);

      const file = videoFiles.find((file) => file.xhr?.response == response);

      if (file) {
        file.remove();
      } else if (videoKey) {
        setIsRemovingVideoUrls((prev) => [...prev, response]);

        formik.setFieldValue(`videos.${videoKey}`, '');
        setIsRemovingVideoUrls((prev) => prev.filter((key) => key !== response));
      }
    } catch (error) {
      console.error('Error removing video:', error);
    }
  };

  const onDropzoneRemovePhoto = async (response: string) => {
    try {
      const photoKey = Object.keys(values.photos).find((key) => values.photos[key] === response);

      if (photoKey) {
        setIsRemovingPhotoUrls((prev) => [...prev, response]);

        // if (property?.additional_information?.id) {
        //   await updatePropertyAdditionalIinformation(
        //     property.additional_information.id,
        //     { photos: { ...values.photos, [photoKey]: '' } },
        //     queryClient
        //   );
        // }

        formik.setFieldValue(`photos.${photoKey}`, '');
        setIsRemovingPhotoUrls((prev) => prev.filter((key) => key !== response));
      }
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  const onDropzoneRemoveVideo = async (response: string) => {
    try {
      const videoKey = Object.keys(values.videos).find((key) => values.videos[key] === response);

      if (videoKey) {
        setIsRemovingVideoUrls((prev) => [...prev, response]);

        formik.setFieldValue(`videos.${videoKey}`, '');
        setIsRemovingVideoUrls((prev) => prev.filter((key) => key !== response));
      }
    } catch (error) {
      console.error('Error removing video:', error);
    }
  };

  const formik = useFormik<FormValues>({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 g-3">
            <Col md="12">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className="fw-bold">Titulo do anúncio</Form.Label>
                <Form.Control type="text" name="title" onChange={handleChange} value={values.title} isInvalid={!!errors.title && touched.title} />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md="12">
              <h5 className="fw-bold">Fotos</h5>
              <MultipleDropzoneComponent
                endpoint="/advertiser/image"
                onChange={handleChangeMultiplePhotos}
                onRemove={onDropzoneRemovePhoto}
                maxFiles={15 - Object.values(values.photos).filter((image) => image?.length && !imageFiles.find((file) => file.xhr?.response === image)).length}
              />

              {/* Display uploaded photos */}
              <Row className="mt-3">
                {Object.entries(values.photos).map(
                  ([key, value], index) =>
                    value && (
                      <Col md="3" key={key} className="mb-3">
                        <Card className="border">
                          <Card.Img variant="top" src={value} className="img-fluid sh-20" />
                          <Card.Body className="d-flex justify-content-between align-items-center p-2">
                            <small>{`${index + 1} de ${Object.values(values.photos).filter(Boolean).length}`}</small>
                            <div>
                              <a href={value} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-icon btn-icon-only me-2">
                                <CsLineIcons icon="eye" />
                              </a>
                              <AsyncButton
                                loadingText=" "
                                isSaving={isRemovingPhotoUrls.includes(value)}
                                variant="outline-primary"
                                onClickHandler={() => handleClickRemovePhoto(value)}
                                className="btn-icon btn-icon-only"
                              >
                                <CsLineIcons icon="bin" />
                              </AsyncButton>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                )}
              </Row>
            </Col>

            <Col md="12">
              <h5 className="fw-bold">Vídeos</h5>
              <MultipleDropzoneComponent
                endpoint="/advertiser/video"
                onChange={handleChangeMultipleVideos}
                onRemove={onDropzoneRemoveVideo}
                accept="video/*"
                maxSizeBytes={200 * 1024 * 1024} // 200 MB
                maxFiles={3 - Object.values(values.photos).filter((image) => image?.length && !imageFiles.find((file) => file.xhr?.response === image)).length}
              />

              {/* Display uploaded photos */}
              <Row className="mt-3">
                {Object.entries(values.videos).map(
                  ([key, value], index) =>
                    value && (
                      <Col md="3" key={key} className="mb-3">
                        <Card className="border">
                          {/* <Card.Img variant="top" src={value} className="img-fluid sh-20" /> */}
                          <video src={value} className="img-fluid sh-20" controls />
                          <Card.Body className="d-flex justify-content-between align-items-center p-2">
                            <small>{`${index + 1} de ${Object.values(values.videos).filter(Boolean).length}`}</small>
                            <div>
                              <a href={value} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-icon btn-icon-only me-2">
                                <CsLineIcons icon="eye" />
                              </a>
                              <AsyncButton
                                loadingText=" "
                                isSaving={isRemovingVideoUrls.includes(value)}
                                variant="outline-primary"
                                onClickHandler={() => handleClickRemoveVideo(value)}
                                className="btn-icon btn-icon-only"
                              >
                                <CsLineIcons icon="bin" />
                              </AsyncButton>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                )}
              </Row>
            </Col>

            <Col md="12">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className="fw-bold">Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  isInvalid={!!errors.description && touched.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className="fw-bold">Estado</Form.Label>
                <Form.Control type="text" name="state" onChange={handleChange} value={values.state} isInvalid={!!errors.state && touched.state} />
                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className="fw-bold">Cidade</Form.Label>
                <Form.Control type="text" name="city" onChange={handleChange} value={values.city} isInvalid={!!errors.city && touched.city} />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 g-3">
            <Col md="4">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className="fw-bold">Disponibilidade de horário</Form.Label>
                <Form.Control
                  type="text"
                  name="availability"
                  placeholder="Exemplo: das 10 ás 22 ou 24h"
                  onChange={handleChange}
                  value={values.availability}
                  isInvalid={!!errors.availability && touched.availability}
                />
                <Form.Control.Feedback type="invalid">{errors.availability}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className="fw-bold">Valor R$ (A combinar, deixe 0)</Form.Label>
                <Form.Control type="number" name="price" onChange={handleChange} value={values.price} isInvalid={!!errors.price && touched.price} />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className="fw-bold">Idade</Form.Label>
                <Form.Control type="number" name="age" onChange={handleChange} value={values.age} isInvalid={!!errors.age && touched.age} />
                <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 g-3">
            <Col md="12">
              <Form.Group>
                <Form.Label className="fw-bold">Locais de atendimento</Form.Label>
                {['Casa', 'Consultório', 'Meu local'].map((option) => (
                  <Form.Check
                    key={option}
                    label={option}
                    value={option}
                    checked={values.locations.includes(option)}
                    onChange={() => handleCheckboxChange('locations', option)}
                    isInvalid={!!errors.locations && touched.locations}
                  />
                ))}
                <Form.Control.Feedback type="invalid">{errors.locations}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="12">
              <Form.Group>
                <Form.Label className="fw-bold">Categoria</Form.Label>
                {['Homem', 'Mulher', 'Crianças'].map((option) => (
                  <Form.Check
                    key={option}
                    label={option}
                    value={option}
                    checked={values.categories.includes(option)}
                    onChange={() => handleCheckboxChange('categories', option)}
                    isInvalid={!!errors.categories && touched.categories}
                  />
                ))}
                <Form.Control.Feedback type="invalid">{errors.categories}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="12">
              <Form.Group>
                <Form.Label className="fw-bold">Público</Form.Label>
                {['Homens', 'Mulheres', 'Casal'].map((option) => (
                  <Form.Check
                    key={option}
                    label={option}
                    value={option}
                    checked={values.public.includes(option)}
                    onChange={() => handleCheckboxChange('public', option)}
                    isInvalid={!!errors.public && touched.public}
                  />
                ))}
                <Form.Control.Feedback type="invalid">{errors.public}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="12">
              <Form.Group>
                <Form.Label className="fw-bold">Traços</Form.Label>
                {['L(o)', 'M(o)', 'R(o)', 'M(o)', 'J(o)'].map((option) => (
                  <Form.Check
                    key={option}
                    label={option}
                    value={option}
                    checked={values.public.includes(option)}
                    onChange={() => handleCheckboxChange('traits', option)}
                    isInvalid={!!errors.public && touched.public}
                  />
                ))}
                <Form.Control.Feedback type="invalid">{errors.traits}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center">
            <Button type="submit">Salvar anúncio</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdvertisementForm;
