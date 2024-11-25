import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Col, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '../Login/hook';
import AsyncButton from '../../../components/AsyncButton';
import { AxiosError } from 'axios';
import { notify } from '../../../components/toast/NotificationIcon';
import CsLineIcons from '../../../cs-line-icons/CsLineIcons';
import HtmlHead from '../../../components/html-head/HtmlHead';
import LayoutFullpage from '../../../layout/LayoutFullpage';

interface FormValues {
  email: string;
}

const ForgotPassword = () => {
  const title = 'Forgot Password';
  const description = 'Forgot Password Page';

  const [isLoging, setIsLoging] = useState(false);
  const history = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
  });
  const initialValues: FormValues = { email: '' };

  const { forgotPassword } = useAuth();

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoging(true);
      await forgotPassword(values);

      setIsLoging(false);

      notify('Email enviado com sucesso', 'Success', 'check-circle', 'success');

      history('/reset-password');
    } catch (error) {
      setIsLoging(false);

      if (error instanceof AxiosError) notify(error.response?.data.message, 'Erro', 'close', 'danger');
      console.error(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        {/* <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Multiple Niches</h1>
            <h1 className="display-3 text-white">Ready for Your Project</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">
            Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before
            process-centric communities...
          </p>
          <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              Learn More
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <Col xs="12" sm={25} className='text-center'>
          <img src="/img/logo/logo.webp" className="img-fluid sh-20" alt="Fluid image" />
        </Col>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-alternate">A senha desapareceu?</h2>
          <h2 className="cta-1 text-alternate">Vamos redefini-la!</h2>
        </div>
        <div className="mb-5">
          <p className="h6 text-alternate" >Por favor, digite seu e-mail para receber um código de verificação, e redefinir sua senha.</p>
        </div>
        <div>
          <form id="forgotPasswordForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="text-center">
              <AsyncButton loadingText='Enviando...' isSaving={isLoging} size="lg" type="submit">
                Receber código de verificação
              </AsyncButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default ForgotPassword;
