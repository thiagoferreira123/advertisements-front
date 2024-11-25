import React, { useState } from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { getIn, useFormik } from 'formik';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { IFileWithMeta } from 'react-dropzone-uploader';

import { notEmpty } from '@/helpers/Utils';
import CsLineIcons from '@/cs-line-icons/CsLineIcons';
import MultipleDropzoneComponent from '@/components/MultipleDropzoneComponent';
import AsyncButton from '@/components/AsyncButton';
import { useAdvertisement } from './hook';
import { notify } from '@/components/toast/NotificationIcon';
import { AxiosError } from 'axios';
import { AdvertisementFormValues, AdvertisementPhotosFormValues, AdvertisementVideosFormValues } from './hook/types';
import BasicSelect from '@/components/BasicSelect';
import { cities, states } from './constants';
import { formatCurrency } from '@/helpers/GenericScripts';
import { parseBrValueToNumber } from '@/helpers/StringHelpers';

const CreateAdvertisement: React.FC = () => {
  const queryClient = useQueryClient();

  const [isSaving, setIsSaving] = useState(false);
  const [imageFiles, setImageFiles] = useState<IFileWithMeta[]>([]);
  const [videoFiles, setVideoFiles] = useState<IFileWithMeta[]>([]);
  const [isRemovingPhotoUrls, setIsRemovingPhotoUrls] = useState<string[]>([]);
  const [isRemovingVideoUrls, setIsRemovingVideoUrls] = useState<string[]>([]);

  const { createAdvertisement } = useAdvertisement();

  const onSubmit = async (values: AdvertisementFormValues) => {
    try {
      setIsSaving(true);
      await createAdvertisement(values);

      notify('Anúncio criado com sucesso', 'Success', 'check-circle', 'success');
    } catch (error) {
      if (error instanceof AxiosError) notify(error.response?.data.message, 'Erro', 'close', 'danger');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangeMultiplePhotos = (files: IFileWithMeta[]) => {
    setImageFiles(files);

    const fileUrls = files.map((file) => file.xhr?.response);

    const photoUrls = values.photos.map((photo) => photo.photo_url);

    const combinedUrls = [...photoUrls, ...fileUrls].reduce((acc: AdvertisementPhotosFormValues[], url) => {
      if (url && !acc.find((photo) => photo.photo_url === url)) acc.push({ photo_url: url });

      return acc;
    }, []);

    console.log('files', files.length, files);
    console.log('combinedUrls', combinedUrls.length, combinedUrls);

    formik.setFieldValue('photos', combinedUrls);
  };

  const handleChangeMultipleVideos = (files: IFileWithMeta[]) => {
    setVideoFiles(files);

    const filesUrls = files.map((file) => file.xhr?.response);

    const videoUrls = values.videos.map((video) => video.video_url);

    const combinedUrls = [...videoUrls, ...filesUrls].reduce((acc: AdvertisementVideosFormValues[], url) => {
      if (url && !acc.find((video) => video.video_url === url)) acc.push({ video_url: url });
      return acc;
    }, []);

    formik.setFieldValue(`videos`, combinedUrls);
  };

  const handleClickRemovePhoto = async (response: string) => {
    try {
      const photoIndex = values.photos.findIndex((photo) => photo.photo_url == response);

      const file = imageFiles.find((file) => file.xhr?.response == response);

      console.log('removed file', file, photoIndex);

      if (file) {
        file.remove();
        if (photoIndex <= 1)
          setFieldValue(
            'photos',
            values.photos.filter((photo) => photo.photo_url !== response)
          );
      } else if (photoIndex !== -1) {
        setIsRemovingPhotoUrls((prev) => [...prev, response]);

        console.log('photos', values.photos);

        formik.setFieldValue(`photos[${photoIndex}].photo_url`, '');
        setIsRemovingPhotoUrls((prev) => prev.filter((key) => key !== response));
      }
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  const handleClickRemoveVideo = async (response: string) => {
    try {
      const videoIndex = values.videos.findIndex((video) => video.video_url == response);

      const file = videoFiles.find((file) => file.xhr?.response == response);

      if (file) {
        file.remove();
      } else if (videoIndex !== -1) {
        setIsRemovingVideoUrls((prev) => [...prev, response]);

        formik.setFieldValue(`videos[${videoIndex}].video_url`, '');
        setIsRemovingVideoUrls((prev) => prev.filter((key) => key !== response));
      }
    } catch (error) {
      console.error('Error removing video:', error);
    }
  };

  const onDropzoneRemovePhoto = async (response: string) => {
    try {
      const photoIndex = values.photos.findIndex((photo) => photo.photo_url === response);

      if (photoIndex !== -1) {
        setIsRemovingPhotoUrls((prev) => [...prev, response]);

        // if (property?.additional_information?.id) {
        //   await updatePropertyAdditionalIinformation(
        //     property.additional_information.id,
        //     { photos: { ...values.photos, [photoKey]: '' } },
        //     queryClient
        //   );
        // }

        formik.setFieldValue(`photos[${photoIndex}].photo_url`, '');
        setIsRemovingPhotoUrls((prev) => prev.filter((key) => key !== response));
      }
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  const onDropzoneRemoveVideo = async (response: string) => {
    try {
      const videoIndex = values.videos.findIndex((video) => video.video_url === response);

      if (videoIndex !== -1) {
        setIsRemovingVideoUrls((prev) => [...prev, response]);

        formik.setFieldValue(`videos[${videoIndex}].video_url`, '');
        setIsRemovingVideoUrls((prev) => prev.filter((key) => key !== response));
      }
    } catch (error) {
      console.error('Error removing video:', error);
    }
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFieldValue(
      field,
      Array.isArray(values[field as keyof AdvertisementFormValues])
        ? (values[field as keyof AdvertisementFormValues] as string[]).includes(value)
          ? (values[field as keyof AdvertisementFormValues] as string[]).filter((v) => v !== value)
          : [...(values[field as keyof AdvertisementFormValues] as string[]), value]
        : values[field as keyof AdvertisementFormValues] === value
        ? ''
        : value
    );
  };

  const formik = useFormik<AdvertisementFormValues>({ initialValues, validationSchema, onSubmit });

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
                endpoint="/advertisements/image"
                onChange={handleChangeMultiplePhotos}
                onRemove={onDropzoneRemovePhoto}
                maxFiles={
                  15 - values.photos.filter((image) => image?.photo_url?.length && !imageFiles.find((file) => file.xhr?.response === image.photo_url)).length
                }
              />
              <Form.Control.Feedback type="invalid" className='d-block'>{getIn(errors, 'photos')}</Form.Control.Feedback>

              {/* Display uploaded photos */}
              <Row className="mt-3">
                {values.photos.map(
                  (value, index) =>
                    value && (
                      <Col md="3" key={index} className="mb-3">
                        <Card className="border">
                          <Card.Img variant="top" src={value.photo_url} className="img-fluid sh-20" />
                          <Card.Body className="d-flex justify-content-between align-items-center p-2">
                            <small>{`${index + 1} de ${Object.values(values.photos).filter(Boolean).length}`}</small>
                            <div>
                              <a
                                href={value.photo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-icon btn-icon-only me-2"
                              >
                                <CsLineIcons icon="eye" />
                              </a>
                              <AsyncButton
                                loadingText=" "
                                isSaving={isRemovingPhotoUrls.includes(value.photo_url)}
                                variant="outline-primary"
                                onClickHandler={() => handleClickRemovePhoto(value.photo_url)}
                                className="btn-icon btn-icon-only"
                                type="button"
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
                endpoint="/advertisements/video"
                onChange={handleChangeMultipleVideos}
                onRemove={onDropzoneRemoveVideo}
                accept="video/*"
                maxSizeBytes={200 * 1024 * 1024} // 200 MB
                maxFiles={3 - values.videos.filter((video) => video?.video_url?.length && !videoFiles.find((file) => file.xhr?.response === video.video_url)).length}
              />
              <Form.Control.Feedback type="invalid" className='d-block'>{getIn(errors, 'videos')}</Form.Control.Feedback>

              {/* Display uploaded photos */}
              <Row className="mt-3">
                {values.videos.map(
                  (value, index) =>
                    value && (
                      <Col md="3" key={index} className="mb-3">
                        <Card className="border">
                          {/* <Card.Img variant="top" src={value} className="img-fluid sh-20" /> */}
                          <video src={value.video_url} className="img-fluid sh-20" controls />
                          <Card.Body className="d-flex justify-content-between align-items-center p-2">
                            <small>{`${index + 1} de ${Object.values(values.videos).filter(Boolean).length}`}</small>
                            <div>
                              <a href={value.video_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-icon btn-icon-only me-2">
                                <CsLineIcons icon="eye" />
                              </a>
                              <AsyncButton
                                loadingText=" "
                                isSaving={isRemovingVideoUrls.includes(value.video_url)}
                                variant="outline-primary"
                                onClickHandler={() => handleClickRemoveVideo(value.video_url )}
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
                <BasicSelect
                  options={states.map((state) => ({ label: state.name, value: state.id.toString() }))}
                  value={values.state}
                  onChange={(option) => setFieldValue('state', option.value)}
                  className={!!errors.state ? 'is-invalid' : ''}
                />
                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className="fw-bold">Cidade</Form.Label>
                <BasicSelect
                  options={cities.filter((city) => city.state_id === Number(values.state)).map((city) => ({ label: city.name, value: city.id.toString() }))}
                  value={values.city}
                  onChange={(option) => setFieldValue('city', option.value)}
                  className={!!errors.city ? 'is-invalid' : ''}
                />
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
                <Form.Control
                  type="string"
                  name="price"
                  onChange={(e) => setFieldValue('price', formatCurrency(e.target.value))}
                  value={values.price}
                  isInvalid={!!errors.price && touched.price}
                  className={!!errors.price ? 'is-invalid' : ''}
                />
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
                    className={!!errors.locations ? 'is-invalid' : ''}
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
                    className={!!errors.categories ? 'is-invalid' : ''}
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
                    className={!!errors.public ? 'is-invalid' : ''}
                  />
                ))}
                <Form.Control.Feedback type="invalid">{errors.public}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="12">
              <Form.Group>
                <Form.Label className="fw-bold">Traços</Form.Label>
                {['L(o)', 'M(o)', 'R(o)', 'J(o)'].map((option) => (
                  <Form.Check
                    key={option}
                    label={option}
                    value={option}
                    checked={values.traits.includes(option)}
                    onChange={() => handleCheckboxChange('traits', option)}
                    isInvalid={!!errors.traits && touched.traits}
                    className={!!errors.traits ? 'is-invalid' : ''}
                  />
                ))}
                <Form.Control.Feedback type="invalid">{errors.traits}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center">
            <AsyncButton type="submit" isSaving={isSaving}>
              Salvar anúncio
            </AsyncButton>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

const initialValues: AdvertisementFormValues = {
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
  photos: [],
  videos: [],
};

const validationSchema = Yup.object().shape({
  state: Yup.string().required('Estado é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  title: Yup.string().required('Título é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  availability: Yup.string().required('Disponibilidade é obrigatória'),
  price: Yup.string()
    .test('is-positive', 'O valor deve ser maior que zero!', function (value) {
      const numValue = parseBrValueToNumber(value || '');
      return numValue > 0;
    })
    .required('O valor é obrigatório'),
  age: Yup.number().required('Idade é obrigatória').integer('A idade deve ser um número inteiro').positive('A idade deve ser positiva'),
  locations: Yup.array().min(1, 'Selecione pelo menos uma localização').required('Localização é obrigatória'),
  categories: Yup.array().min(1, 'Selecione pelo menos uma categoria').required('Categorias são obrigatórias'),
  public: Yup.array().min(1, 'Selecione pelo menos um público').required('Público é obrigatório'),
  traits: Yup.array().min(1, 'Selecione pelo menos um traço').required('Traços é obrigatório'),
  photos: Yup.array().min(1, 'Fotos são obrigatórias'),
});

export default CreateAdvertisement;
