import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Card, Button, Badge } from 'react-bootstrap';
import { getIn, useFormik } from 'formik';
import { AxiosError } from 'axios';
import * as Yup from 'yup';
import { IFileWithMeta } from 'react-dropzone-uploader';
import InputMask from 'react-input-mask';
import { useReactMediaRecorder } from 'react-media-recorder';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import CsLineIcons from '@/cs-line-icons/CsLineIcons';
import MultipleDropzoneComponent from '@/components/MultipleDropzoneComponent';
import AsyncButton from '@/components/AsyncButton';
import { useAdvertisement } from '../hook';
import { notify } from '@/components/toast/NotificationIcon';
import BasicSelect from '@/components/BasicSelect';
import DropzoneComponent from '@/components/DropzoneComponent';
import { formatCurrency } from '@/helpers/GenericScripts';
import api from '@/services/useAxios';

import {
  Advertisement,
  AdvertisementFormValues,
  AdvertisementPhotosFormValues,
  AdvertisementSubscriptionCycle,
  AdvertisementSubscriptionCycleLabels,
  AdvertisementVideosFormValues,
} from '../hook/types';
import { cities, states } from './constants/cities_and_states';
import { physical_characteristics } from './constants/physical_characteristics';
import { services_offered_and_not_offered } from './constants/services_offered_and_not_offered';
import { working_hours } from './constants/working_hours';
import { valueFieldOptions } from './constants/values';
import { payment_methods } from './constants/payment_methods';
import { formatDecimal } from '@/helpers/InputHelpers';
import { convertIsoDateStringToBrDateString } from '@/helpers/DateHelper';
import { Link } from 'react-router-dom';
import { appRoot } from '@/routes';

const CreateAdvertisement: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingAudio, setIsSendingAudio] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [imageFiles, setImageFiles] = useState<IFileWithMeta[]>([]);
  const [videoFiles, setVideoFiles] = useState<IFileWithMeta[]>([]);
  const [isRemovingPhotoUrls, setIsRemovingPhotoUrls] = useState<string[]>([]);
  const [isRemovingVideoUrls, setIsRemovingVideoUrls] = useState<string[]>([]);
  const [isRemovingAudioUrls, setIsRemovingAudioUrls] = useState<string[]>([]);

  const [createdAdvertisement, setCreatedAdvertisement] = useState<Advertisement | null>();
  const { createAdvertisement } = useAdvertisement();

  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStop: async (blobUrl, blob) => {
      try {
        setIsSendingAudio(true);

        const file = new File([blob], 'file.' + blob.type.split('/')[1], { type: blob.type });

        const formData = new FormData();
        formData.append('file', file);

        const { data } = await api.post<{ url: string }>('audio/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setFieldValue('audio_url', data.url);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSendingAudio(false);
        setIsRecordingAudio(false);
      }
    },
  });

  const onSubmit = async (values: AdvertisementFormValues) => {
    try {
      setIsSaving(true);
      const createdAdvertisement = await createAdvertisement(values);
      console.log(createdAdvertisement);

      setCreatedAdvertisement(createdAdvertisement);

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

  const handleClickRemoveMainPhoto = async () => {
    try {
      setIsRemovingPhotoUrls((prev) => [...prev, values.main_photo ?? '']);

      await api.delete('advertisements/main-photo', {
        data: {
          url: values.main_photo,
        },
      });

      setFieldValue('main_photo', '');
    } catch (error) {
      console.error('Error removing main photo:', error);
    } finally {
      setIsRemovingPhotoUrls((prev) => prev.filter((key) => key !== values.main_photo));
    }
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

  const handleToggleRecording = async () => {
    if (status === 'recording') {
      stopRecording();
      setIsRecordingAudio(false);
    } else {
      startRecording();
      setIsRecordingAudio(true);
    }
  };

  const handleClickRemoveAudio = async (audioUrl: string) => {
    try {
      setIsRemovingAudioUrls((prev) => [...prev, audioUrl]);

      await api.delete('audio', {
        data: {
          url: audioUrl,
        },
      });

      setFieldValue('audio_url', '');
    } catch (error) {
      console.error('Error removing audio:', error);
    } finally {
      setIsRemovingAudioUrls((prev) => prev.filter((key) => key !== audioUrl));
    }
  };

  const handleClickRemoveComparisonVideo = async (comparisonVideoUrl: string) => {
    try {
      setIsRemovingVideoUrls((prev) => [...prev, comparisonVideoUrl]);

      await api.delete('advertisements/comparison-video', {
        data: {
          url: comparisonVideoUrl,
        },
      });

      setFieldValue('comparison_video', '');
    } catch (error) {
      console.error('Error removing comparison video:', error);
    } finally {
      setIsRemovingVideoUrls((prev) => prev.filter((key) => key !== comparisonVideoUrl));
    }
  };

  const handleChangeHeight = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = formatDecimal(event.target.value);
    setFieldValue('physical_characteristics.Altura', value);
  };

  const formik = useFormik<AdvertisementFormValues>({ initialValues, validationSchema, onSubmit });

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue, resetForm } = formik;

  useEffect(() => {
    resetForm();
    setCreatedAdvertisement(null);
  }, []);

  if (createdAdvertisement) {
    return (
      <Col xs={12} md={8} className="mx-auto">
        <Card className="mt-3">
          <Card.Body>
            <div className="border-bottom border-separator-light">
              <Row className="g-0">
                <Col xs="auto" className="me-2">
                  <img
                    src={createdAdvertisement.photos[0]?.photo_url ?? '/img/profile/profile-6.webp'}
                    className="card-img rounded-xl sh-10 sw-10"
                    alt="thumb"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Col>
                <Col>
                  <div className="d-flex flex-column h-100">
                    <h6 className="fw-bold mb-1 text-alternative">
                      {createdAdvertisement.title} <Badge className="me-1">{AdvertisementSubscriptionCycleLabels[createdAdvertisement.cycle]}</Badge>
                    </h6>
                    <small className="text-muted">Data da criação: {convertIsoDateStringToBrDateString(createdAdvertisement.date_of_creation)}</small>

                    <div className="d-flex mt-2">
                      <Button variant="warning" size="sm" className="w-100 me-2" as="a" href={createdAdvertisement.paymentLink} target="_blank">
                        Pagar
                        <CsLineIcons icon="money" className="ms-1" size={12} />
                      </Button>

                      <Link to={appRoot} className="btn btn-outline-secondary btn-sm me-2 w-100">
                        Voltar ao início
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  }

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
                    <Form.Label className="fw-bold text-alternate">Titulo do anúncio</Form.Label>
                    <Form.Control type="text" name="title" onChange={handleChange} value={values.title} isInvalid={!!errors.title && touched.title} />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Duração do anúncio */}
                <Col md="12">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label className="fw-bold text-alternate">Duração do anúncio</Form.Label>
                    <BasicSelect
                      options={Object.values(AdvertisementSubscriptionCycle).map((cycle) => ({
                        label: AdvertisementSubscriptionCycleLabels[cycle],
                        value: cycle,
                      }))}
                      value={values.cycle}
                      onChange={(option) => setFieldValue('cycle', option.value)}
                      className={!!errors.cycle ? 'is-invalid' : ''}
                    />
                    <Form.Control.Feedback type="invalid">{errors.cycle}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Descrição */}
                <Col md="12">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label className="fw-bold text-alternate">Descrição</Form.Label>
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
                    <Form.Label className="fw-bold text-alternate">Estado</Form.Label>
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
                    <Form.Label className="fw-bold text-alternate">Cidade</Form.Label>
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
                <Col md="12">
                  <Form.Group>
                    <Form.Label className="fw-bold text-alternate">Locais de atendimento</Form.Label>
                    <div className="d-flex flex-wrap">
                      {['Casa', 'Consultório', 'Meu local'].map((option) => (
                        <Button
                          key={option}
                          variant={values.locations.includes(option) ? 'primary' : 'outline-primary'}
                          onClick={() => handleCheckboxChange('locations', option)}
                          className="me-2 mb-2"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    {errors.locations && touched.locations && <div className="text-danger">{errors.locations}</div>}
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <Form.Label className="fw-bold text-alternate">Categoria</Form.Label>
                    <div className="d-flex flex-wrap">
                      {['Homem', 'Mulher', 'Crianças'].map((option) => (
                        <Button
                          key={option}
                          variant={values.categories.includes(option) ? 'primary' : 'outline-primary'}
                          onClick={() => handleCheckboxChange('categories', option)}
                          className="me-2 mb-2"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    {errors.categories && touched.categories && <div className="text-danger">{errors.categories}</div>}
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <Form.Label className="fw-bold text-alternate">Público</Form.Label>
                    <div className="d-flex flex-wrap">
                      {['Homens', 'Mulheres', 'Casal'].map((option) => (
                        <Button
                          key={option}
                          variant={values.public.includes(option) ? 'primary' : 'outline-primary'}
                          onClick={() => handleCheckboxChange('public', option)}
                          className="me-2 mb-2"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    {errors.public && touched.public && <div className="text-danger">{errors.public}</div>}
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Mídia */}
          <Card className="mb-3">
            <Card.Body>
              <h5 className="fw-bold text-alternate">Mídia</h5>
              <Row className="mb-3 g-3">
                {/* Foto principal */}
                <Col md="12">
                  <h5 className="fw-bold text-alternate">Foto principal</h5>
                  {!values.main_photo ? (
                    <>
                      <DropzoneComponent endpoint="/advertisements/main-photo" onChange={setFieldValue} name="main_photo" />
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {getIn(errors, 'main_photo')}
                      </Form.Control.Feedback>
                    </>
                  ) : (
                    <Row className="mt-3">
                      <Col md="3" className="mb-3">
                        <Card className="border">
                          <Card.Img variant="top" src={values.main_photo} className="img-fluid sh-20" />
                          <Card.Body className="d-flex justify-content-between align-items-center p-2">
                            <div>
                              <a
                                href={values.main_photo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-icon btn-icon-only me-2"
                              >
                                <CsLineIcons icon="eye" />
                              </a>
                              <AsyncButton
                                loadingText=" "
                                isSaving={isRemovingPhotoUrls.includes(values.main_photo)}
                                variant="outline-primary"
                                onClickHandler={handleClickRemoveMainPhoto}
                                className="btn-icon btn-icon-only"
                                type="button"
                              >
                                <CsLineIcons icon="bin" />
                              </AsyncButton>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  )}
                </Col>

                {/* Outras fotos */}
                <Col md="12">
                  <h5 className="fw-bold text-alternate">Outras fotos</h5>
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
                  <h5 className="fw-bold text-alternate">Vídeos</h5>
                  <MultipleDropzoneComponent
                    endpoint="/advertisements/video"
                    onChange={handleChangeMultipleVideos}
                    onRemove={onDropzoneRemoveVideo}
                    accept="video/*"
                    maxSizeBytes={200 * 1024 * 1024} // 200 MB
                    maxFiles={
                      3 - values.videos.filter((video) => video?.video_url?.length && !videoFiles.find((file) => file.xhr?.response === video.video_url)).length
                    }
                    placeholder="Enviar videos"
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

                {/* Audio */}
                <Col md="12">
                  <h5 className="fw-bold text-alternate">Audio</h5>
                  {!values.audio_url ? (
                    <>
                      <AsyncButton
                        isSaving={isSendingAudio}
                        loadingText=" "
                        variant={isRecordingAudio ? 'primary' : 'outline-primary'}
                        className={`btn-icon btn-icon-only mb-1 rounded-xl ms-1 ${isRecordingAudio ? 'pulse-button' : null}`}
                        onClickHandler={handleToggleRecording}
                        type="button"
                      >
                        <CsLineIcons icon="mic" />
                      </AsyncButton>
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {getIn(errors, 'videos')}
                      </Form.Control.Feedback>
                    </>
                  ) : (
                    <Row className="mt-3">
                      <Col md="4" className="mb-3">
                        <Card className="border">
                          <AudioPlayer
                            src={values.audio_url}
                            customAdditionalControls={[]}
                            customVolumeControls={[]}
                            showJumpControls={false}
                            autoPlayAfterSrcChange={false}
                          />
                          <Card.Body className="d-flex justify-content-between align-items-center p-2">
                            <div>
                              <a
                                href={values.audio_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-icon btn-icon-only me-2"
                              >
                                <CsLineIcons icon="eye" />
                              </a>
                              <AsyncButton
                                loadingText=" "
                                isSaving={isRemovingAudioUrls.includes(values.audio_url)}
                                variant="outline-primary"
                                onClickHandler={() => handleClickRemoveAudio(values.audio_url)}
                                className="btn-icon btn-icon-only"
                              >
                                <CsLineIcons icon="bin" />
                              </AsyncButton>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Características físicas */}
          <Card className="mb-3">
            <Card.Body>
              <h5 className="fw-bold text-alternate">Características físicas</h5>
              {Object.entries(physical_characteristics).map(([characteristicName, options]) => (
                <Form.Group key={characteristicName}>
                  <Form.Label className="fw-bold text-alternate">{characteristicName}</Form.Label>
                  <div>
                    {['Altura', 'Peso'].includes(characteristicName) ? (
                      <Form.Control
                        type="text"
                        name={`physical_characteristics.${characteristicName}`}
                        placeholder={characteristicName}
                        value={getIn(values, `physical_characteristics.${characteristicName}`)}
                        onChange={(e) =>
                          characteristicName === 'Altura'
                            ? handleChangeHeight(e)
                            : setFieldValue(`physical_characteristics.${characteristicName}`, e.target.value)
                        }
                        onBlur={handleBlur}
                        className="form-control w-50"
                      />
                    ) : (
                      options.map((option) => {
                        const isSelected = values.physical_characteristics[characteristicName]?.includes(option);
                        return (
                          <Button
                            key={option}
                            variant={isSelected ? 'primary' : 'outline-primary'}
                            onClick={() => {
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
                            style={{ margin: '0 5px 5px 0' }}
                          >
                            {option}
                          </Button>
                        );
                      })
                    )}
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.physical_characteristics && errors.physical_characteristics[characteristicName]}
                  </Form.Control.Feedback>
                </Form.Group>
              ))}

              {/* Video de comparação */}
              <Col md="12" className="mt-3">
                <h5 className="fw-bold text-alternate">Video de comparação</h5>
                {!values.comparison_video ? (
                  <>
                    <DropzoneComponent
                      endpoint="/advertisements/comparison-video"
                      accept="video/*"
                      maxSizeBytes={200 * 1024 * 1024} // 200 MB
                      name="comparison_video"
                      onChange={setFieldValue}
                      placeholder="Enviar video de comparação"
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {getIn(errors, 'videos')}
                    </Form.Control.Feedback>
                  </>
                ) : (
                  /* Display uploaded photos */
                  <Row className="mt-3">
                    {values.comparison_video && (
                      <Col md="3" className="mb-3">
                        <Card className="border">
                          {/* <Card.Img variant="top" src={value} className="img-fluid sh-20" /> */}
                          <video src={values.comparison_video} className="img-fluid sh-20" controls />
                          <Card.Body className="d-flex justify-content-between align-items-center p-2">
                            <div>
                              <a
                                href={values.comparison_video}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-icon btn-icon-only me-2"
                              >
                                <CsLineIcons icon="eye" />
                              </a>
                              <AsyncButton
                                loadingText=" "
                                isSaving={isRemovingVideoUrls.includes(values.comparison_video)}
                                variant="outline-primary"
                                onClickHandler={() => values.comparison_video && handleClickRemoveComparisonVideo(values.comparison_video)}
                                className="btn-icon btn-icon-only"
                              >
                                <CsLineIcons icon="bin" />
                              </AsyncButton>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                  </Row>
                )}
              </Col>
            </Card.Body>
          </Card>

          {/* Serviços oferecidos */}
          <Card className="mb-3">
            <Card.Body>
              <h5 className="fw-bold text-alternate">Serviços oferecidos</h5>
              <div className="d-flex flex-wrap">
                {Object.entries(values.services_offered_and_not_offered).map(([key, service]) => (
                  <Button
                    key={key}
                    variant={service.offered === 'Yes' ? 'primary' : 'outline-primary'}
                    onClick={() => {
                      // Atualizamos apenas o campo `offered` do serviço correspondente
                      setFieldValue(`services_offered_and_not_offered.${key}.offered`, service.offered === 'Yes' ? '' : 'Yes');
                    }}
                    className="me-2 mb-2" // Adiciona espaçamento entre botões
                  >
                    {service.service}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Horários de expediente */}
          <Card className="mb-3">
            <Card.Body>
              <h5 className="fw-bold text-alternate">Horários de expediente</h5>
              {Object.entries(working_hours).map(([day]) => (
                <Form.Group key={day}>
                  <Form.Label className="fw-bold text-alternate">{day}</Form.Label>
                  <div className="d-flex">
                    <div className="me-2 mt-3 mb-3">
                      <Form.Label className="text-alternate">Início</Form.Label>
                      <InputMask
                        mask="99:99"
                        placeholder="00:00"
                        value={getIn(values, `working_hours.${day}.inicio`)}
                        onChange={(e) => {
                          setFieldValue(`working_hours.${day}.inicio`, e.target.value);
                        }}
                        onBlur={handleBlur}
                        className="form-control"
                      />
                    </div>
                    <div className="mt-3">
                      <Form.Label className="text-alternate">Fim</Form.Label>
                      <InputMask
                        mask="99:99"
                        placeholder="00:00"
                        value={getIn(values, `working_hours.${day}.fim`)}
                        onChange={(e) => setFieldValue(`working_hours.${day}.fim`, e.target.value)}
                        onBlur={handleBlur}
                        className="form-control"
                      />
                    </div>
                  </div>
                  {/* Exemplo de exibição de erros */}
                  {getIn(errors, `working_hours.${day}.inicio`) && getIn(touched, `working_hours.${day}.inicio`) && (
                    <div className="text-danger">{getIn(errors, `working_hours.${day}.inicio`)}</div>
                  )}
                </Form.Group>
              ))}
            </Card.Body>
          </Card>

          {/* Valores */}
          <Card className="mb-3">
            <Card.Body>
              <div className="mb-3">
                <h5 className="fw-bold text-alternate">Valores</h5>
                <div className="d-flex flex-wrap align-items-center">
                  {Object.entries(valueFieldOptions).map(([key, value]) => (
                    <div key={key} className="me-3 mb-3">
                      <Form.Group>
                        <Form.Label className="fw-bold text-alternate">{key}</Form.Label>
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
                        {errors.values && errors.values[key] && touched.values && touched.values[key] && (
                          <div className="text-danger">{errors.values[key]}</div>
                        )}
                      </Form.Group>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="fw-bold text-alternate">Formas de pagamento</h5>
                <div>
                  {payment_methods.map((option) => (
                    <Button
                      key={option}
                      variant={values.payment_methods[option] ? 'primary' : 'outline-primary'}
                      onClick={() => {
                        const selectedOptions = values.payment_methods || {};
                        setFieldValue(`payment_methods.${option}`, !selectedOptions[option]);
                      }}
                      className={errors.payment_methods ? 'is-invalid mb-2' : 'mb-2'}
                      style={{ marginRight: '5px' }}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {errors.payment_methods && Object.keys(errors.payment_methods).length > 0 && (
                  <div className="invalid-feedback d-block">{errors.payment_methods[Object.keys(errors.payment_methods)[0]]}</div>
                )}
              </div>
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
  cycle: AdvertisementSubscriptionCycle.WEEKLY,
  advertiser_id: '',
  state: '',
  city: '',
  title: '',
  description: '',
  availability: '',
  age: 0,
  locations: [],
  categories: [],
  public: [],
  physical_characteristics: {},
  services_offered_and_not_offered: services_offered_and_not_offered.reduce((acc, service) => {
    acc[service.service] = service;
    return acc;
  }, {} as { [key: string]: { service: string; offered: string; description: string } }),
  working_hours: {},
  values: {},
  payment_methods: {},

  photos: [],
  videos: [],
  audio_url: '',
  comparison_video: '',
  main_photo: '',
};

const validationSchema = Yup.object().shape({
  state: Yup.string().required('Estado é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  title: Yup.string().required('Título é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  // availability: Yup.string().required('Disponibilidade é obrigatória'),
  // age: Yup.number().required('Idade é obrigatória').integer('A idade deve ser um número inteiro').positive('A idade deve ser positiva'),
  locations: Yup.array().min(1, 'Selecione pelo menos uma localização').required('Localização é obrigatória'),
  categories: Yup.array().min(1, 'Selecione pelo menos uma categoria').required('Categorias são obrigatórias'),
  public: Yup.array().min(1, 'Selecione pelo menos um público').required('Público é obrigatório'),
  photos: Yup.array().min(1, 'Fotos são obrigatórias'),
});

export default CreateAdvertisement;
