import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Card } from 'react-bootstrap';
import { getIn, useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IFileWithMeta } from 'react-dropzone-uploader';
import InputMask from 'react-input-mask';

import CsLineIcons from '@/cs-line-icons/CsLineIcons';
import MultipleDropzoneComponent from '@/components/MultipleDropzoneComponent';
import AsyncButton from '@/components/AsyncButton';
import { useAdvertisement } from './hook';
import { notify } from '@/components/toast/NotificationIcon';
import { AxiosError } from 'axios';
import { AdvertisementFormValues, AdvertisementPhotosFormValues, AdvertisementVideosFormValues } from './hook/types';
import BasicSelect from '@/components/BasicSelect';
import { cities, states } from './constants/cities_and_states';
import { formatCurrency } from '@/helpers/GenericScripts';
import { parseBrValueToNumber } from '@/helpers/StringHelpers';
import { physical_characteristics } from './constants/physical_characteristics';
import { services_offered_and_not_offered } from './constants/services_offered_and_not_offered';
import { working_hours } from './constants/working_hours';
import { valueFieldOptions } from './constants/values';
import { payment_methods } from './constants/payment_methods';
import { useParams } from 'react-router-dom';
import { AppException } from '@/helpers/ErrorHelpers';
import StaticLoading from '@/components/loading/StaticLoading';

const EditAdvertisement: React.FC = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [isSaving, setIsSaving] = useState(false);
  const [imageFiles, setImageFiles] = useState<IFileWithMeta[]>([]);
  const [videoFiles, setVideoFiles] = useState<IFileWithMeta[]>([]);
  const [isRemovingPhotoUrls, setIsRemovingPhotoUrls] = useState<string[]>([]);
  const [isRemovingVideoUrls, setIsRemovingVideoUrls] = useState<string[]>([]);

  const { updateAdvertisement, getAdvertisement } = useAdvertisement();

  const getAdvertisement_ = async () => {
    try {
      if (!id) throw new AppException('ID do anúncio não encontrado');
      const advertisement = await getAdvertisement(id);
      return advertisement;
    } catch (error) {
      if (error instanceof AppException) notify(error.message, 'Erro', 'close', 'danger');
      console.error(error);
      throw error;
    }
  };

  const onSubmit = async (values: AdvertisementFormValues) => {
    try {
      if (!id) throw new AppException('ID do anúncio não encontrado');

      setIsSaving(true);
      await updateAdvertisement(id, values);

      notify('Anúncio atualizado com sucesso', 'Success', 'check-circle', 'success');
    } catch (error) {
      if (error instanceof AxiosError) notify(error.response?.data.message, 'Erro', 'close', 'danger');
      else if (error instanceof AppException) notify(error.message, 'Erro', 'close', 'danger');
      else notify('Ocorreu um erro ao atualizar o anúncio', 'Erro', 'close', 'danger');
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

      if (file) {
        file.remove();
        if (photoIndex <= 1)
          setFieldValue(
            'photos',
            values.photos.filter((photo) => photo.photo_url !== response)
          );
      } else if (photoIndex !== -1) {
        setIsRemovingPhotoUrls((prev) => [...prev, response]);

        formik.setFieldValue(
          'photos',
          values.photos.filter((photo) => photo.photo_url !== response)
        );
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
        if (videoIndex <= 1)
          setFieldValue(
            'videos',
            values.videos.filter((video) => video.video_url !== response)
          );
      } else if (videoIndex !== -1) {
        setIsRemovingVideoUrls((prev) => [...prev, response]);

        formik.setFieldValue(
          'videos',
          values.videos.filter((video) => video.video_url !== response)
        );
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

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue, setValues } = formik;

  const advertisementResult = useQuery({ queryKey: ['advertisement', id], queryFn: getAdvertisement_ });

  useEffect(() => {
    if (advertisementResult.data) {
      setValues(advertisementResult.data);
    }
  }, [advertisementResult.data]);

  if (advertisementResult.isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center sh-50">
        <StaticLoading />
      </div>
    );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
        <Col md="8">
          <Card className="mb-3">
            <Card.Body>
              <Row className="mb-3 g-3">
                {/* Título */}
                <Col md="12">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label className="fw-bold">Titulo do anúncio</Form.Label>
                    <Form.Control type="text" name="title" onChange={handleChange} value={values.title} isInvalid={!!errors.title && touched.title} />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Descrição */}
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

                {/* Estado */}
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

                {/* Cidade */}
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
              </Row>
            </Card.Body>
          </Card>

          {/* Características físicas */}
          <Card className="mb-3">
            <Card.Body>
              <h5 className="fw-bold">Características físicas</h5>
              {Object.entries(physical_characteristics).map(([characteristicName, options]) => (
                <Form.Group key={characteristicName}>
                  <Form.Label className="fw-bold">{characteristicName}</Form.Label>
                  {options.map((option) => (
                    <Form.Check
                      key={option}
                      label={option}
                      value={option}
                      checked={values.physical_characteristics[characteristicName]?.includes(option) || false}
                      onChange={() => {
                        const selectedOptions = values.physical_characteristics[characteristicName] || [];
                        if (selectedOptions.includes(option)) {
                          setFieldValue(
                            `physical_characteristics.${characteristicName}`,
                            selectedOptions.filter((item) => item !== option)
                          );
                        } else {
                          setFieldValue(`physical_characteristics.${characteristicName}`, [...selectedOptions, option]);
                        }
                      }}
                      className={errors.physical_characteristics && errors.physical_characteristics[characteristicName] ? 'is-invalid' : ''}
                    />
                  ))}
                  <Form.Control.Feedback type="invalid">
                    {errors.physical_characteristics && errors.physical_characteristics[characteristicName]}
                  </Form.Control.Feedback>
                </Form.Group>
              ))}
            </Card.Body>
          </Card>

          {/* Serviços oferecidos e não oferecidos */}
          <Card className="mb-3">
            <Card.Body>
              <h5 className="fw-bold">Serviços oferecidos e não oferecidos</h5>
              {Object.entries(services_offered_and_not_offered).map(([characteristicName, options]) => (
                <Form.Group key={characteristicName}>
                  <Form.Label className="fw-bold">{characteristicName}</Form.Label>
                  {options.map((option) => (
                    <Form.Check
                      key={option}
                      label={option}
                      value={option}
                      checked={values.services_offered_and_not_offered[characteristicName]?.includes(option) || false}
                      onChange={() => {
                        const selectedOptions = values.services_offered_and_not_offered[characteristicName] || [];
                        if (selectedOptions.includes(option)) {
                          setFieldValue(
                            `services_offered_and_not_offered.${characteristicName}`,
                            selectedOptions.filter((item) => item !== option)
                          );
                        } else {
                          setFieldValue(`services_offered_and_not_offered.${characteristicName}`, [...selectedOptions, option]);
                        }
                      }}
                      className={errors.services_offered_and_not_offered && errors.services_offered_and_not_offered[characteristicName] ? 'is-invalid' : ''}
                    />
                  ))}
                  <Form.Control.Feedback type="invalid">
                    {errors.services_offered_and_not_offered && errors.services_offered_and_not_offered[characteristicName]}
                  </Form.Control.Feedback>
                </Form.Group>
              ))}
            </Card.Body>
          </Card>

          {/* Horários de expediente */}
          <Card className="mb-3">
            <Card.Body>
              <h5 className="fw-bold">Horários de expediente</h5>
              {Object.entries(working_hours).map(([day, times]) => (
                <Form.Group key={day}>
                  <Form.Label className="fw-bold">{day}</Form.Label>
                  <div className="d-flex">
                    <div className="me-2">
                      <Form.Label>Início</Form.Label>
                      <InputMask
                        mask="99:99"
                        placeholder="HH:MM"
                        value={getIn(values, `working_hours.${day}.inicio`)}
                        onChange={(e) => {
                          setFieldValue(`working_hours.${day}.inicio`, e.target.value);
                        }}
                        onBlur={handleBlur}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <Form.Label>Fim</Form.Label>
                      <InputMask
                        mask="99:99"
                        placeholder="HH:MM"
                        value={getIn(values, `working_hours.${day}.fim`)}
                        onChange={(e) => setFieldValue(`working_hours.${day}.fim`, e.target.value)}
                        onBlur={handleBlur}
                        className="form-control"
                      />
                    </div>
                  </div>
                  {/* Exemplo de exibição de erros */}
                  {errors.working_hours && errors.working_hours[day] && touched.working_hours && touched.working_hours[day] && (
                    <div className="text-danger">{errors.working_hours[day].inicio || errors.working_hours[day].fim}</div>
                  )}
                </Form.Group>
              ))}
            </Card.Body>
          </Card>

          {/* Valores */}
          <Card className="mb-3">
            <Card.Body>
              <div className="mb-3">
                <h5 className="fw-bold">Valores</h5>
                {Object.entries(valueFieldOptions).map(([key, value]) => (
                  <Form.Group key={key}>
                    <Form.Label className="fw-bold">{key}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={value}
                      value={getIn(values, `values.${key}`)}
                      onChange={(e) => {
                        setFieldValue(`values.${key}`, formatCurrency(e.target.value));
                      }}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {/* Exemplo de exibição de erros */}
                    {errors.values && errors.values[key] && touched.values && touched.values[key] && <div className="text-danger">{errors.values[key]}</div>}
                  </Form.Group>
                ))}
              </div>

              <div>
                <h5 className="fw-bold">Formas de pagamento</h5>
                {payment_methods.map((option) => (
                  <Form.Check
                    type="checkbox"
                    key={option}
                    label={option}
                    value={option}
                    checked={values.payment_methods[option]}
                    onChange={() => {
                      const selectedOptions = values.payment_methods || {};
                      if (selectedOptions[option]) {
                        setFieldValue(`payment_methods.${option}`, false);
                      } else {
                        setFieldValue(`payment_methods.${option}`, true);
                      }
                    }}
                    className={errors.payment_methods ? 'is-invalid' : ''}
                  />
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Mídia */}
          <Card className="mb-3">
            <Card.Body>
              <h5 className="fw-bold">Mídia</h5>
              <Row className="mb-3 g-3">
                {/* Fotos */}
                <Col md="12">
                  <h5 className="fw-bold">Fotos</h5>
                  <MultipleDropzoneComponent
                    endpoint="/advertisements/image"
                    onChange={handleChangeMultiplePhotos}
                    onRemove={onDropzoneRemovePhoto}
                    maxFiles={
                      15 -
                      values.photos.filter((image) => image?.photo_url?.length && !imageFiles.find((file) => file.xhr?.response === image.photo_url)).length
                    }
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {getIn(errors, 'photos')}
                  </Form.Control.Feedback>

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

                {/* Vídeos */}
                <Col md="12">
                  <h5 className="fw-bold">Vídeos</h5>
                  <MultipleDropzoneComponent
                    endpoint="/advertisements/video"
                    onChange={handleChangeMultipleVideos}
                    onRemove={onDropzoneRemoveVideo}
                    accept="video/*"
                    maxSizeBytes={200 * 1024 * 1024} // 200 MB
                    maxFiles={
                      3 - values.videos.filter((video) => video?.video_url?.length && !videoFiles.find((file) => file.xhr?.response === video.video_url)).length
                    }
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {getIn(errors, 'videos')}
                  </Form.Control.Feedback>

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
                                  <a
                                    href={value.video_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-primary btn-icon btn-icon-only me-2"
                                  >
                                    <CsLineIcons icon="eye" />
                                  </a>
                                  <AsyncButton
                                    loadingText=" "
                                    isSaving={isRemovingVideoUrls.includes(value.video_url)}
                                    variant="outline-primary"
                                    onClickHandler={() => handleClickRemoveVideo(value.video_url)}
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
              </Row>
            </Card.Body>
          </Card>

          <div className="text-center">
            <AsyncButton type="submit" isSaving={isSaving}>
              Salvar anúncio
            </AsyncButton>
          </div>
        </Col>
      </Row>
    </Form>
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
  photos: [],
  videos: [],
  physical_characteristics: {},
  services_offered_and_not_offered: {},
  working_hours: {},
  values: {},
  payment_methods: {},
};

const validationSchema = Yup.object().shape({
  state: Yup.string().required('Estado é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  title: Yup.string().required('Título é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  availability: Yup.string().required('Disponibilidade é obrigatória'),
  // price: Yup.string()
  //   .test('is-positive', 'O valor deve ser maior que zero!', function (value) {
  //     const numValue = parseBrValueToNumber(value || '');
  //     return numValue > 0;
  //   })
  //   .required('O valor é obrigatório'),
  age: Yup.number().required('Idade é obrigatória').integer('A idade deve ser um número inteiro').positive('A idade deve ser positiva'),
  locations: Yup.array().min(1, 'Selecione pelo menos uma localização').required('Localização é obrigatória'),
  categories: Yup.array().min(1, 'Selecione pelo menos uma categoria').required('Categorias são obrigatórias'),
  public: Yup.array().min(1, 'Selecione pelo menos um público').required('Público é obrigatório'),
  photos: Yup.array().min(1, 'Fotos são obrigatórias'),
});

export default EditAdvertisement;
