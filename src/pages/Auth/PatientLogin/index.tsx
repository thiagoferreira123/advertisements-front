import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { AxiosError } from 'axios';
import { notify } from '../../../components/toast/NotificationIcon';
import CsLineIcons from '../../../cs-line-icons/CsLineIcons';
import AsyncButton from '../../../components/AsyncButton';
import HtmlHead from '../../../components/html-head/HtmlHead';
import LayoutFullpage from '../../../layout/LayoutFullpage';
import { usePatientAuthStore } from './hook/PatientAuthStore';

interface LoginValues {
  passwordMobileAndWeb: string;
}

const PatientLogin = () => {
  const title = 'Login';
  const description = 'Login Page';

  const [isLoging, setIsLoging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = usePatientAuthStore();

  const validationSchema = Yup.object().shape({
    passwordMobileAndWeb: Yup.string().required('Digite uma senha valida'),
  });

  const initialValues: LoginValues = { passwordMobileAndWeb: '' };
  const onSubmit = async (values: LoginValues) => {
    try {
      setIsLoging(true);
      await login(values.passwordMobileAndWeb);

      setIsLoging(false);

      history('/painel-paciente');
    } catch (error) {
      setIsLoging(false);

      if (error instanceof AxiosError) notify(error.response?.data.message, 'Erro', 'close', 'danger');
      console.error(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const history = useNavigate();

  const passwordType = showPassword ? 'text' : 'password';
  const eyeIcon = showPassword ? 'eye-off' : 'eye';

  const savePasswordToLocalStorage = (passwordMobileAndWeb: string): void => {
    try {
      localStorage.setItem('senha', passwordMobileAndWeb);
    } catch (error) {
      console.error('Erro ao salvar a senha no localStorage:', error);
    }
  };

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <Col xs="12" sm={25} className='text-center'>
          <img src="/img/logo/logo.webp" className="img-fluid sh-20" alt="Fluid image" />
        </Col>
        <div className="mb-1 mt-5">
          <h2 className="cta-1 mb-0 text-alternate">Área de login </h2>
        </div>
        <div className="mb-5">
          <p className="h6 text-alternate">Por favor, use suas credenciais para fazer login.</p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-1 filled form-group tooltip-end-top position-relative">
                <CsLineIcons icon="lock-on" />
                <Form.Control
                  type={passwordType}
                  name="passwordMobileAndWeb"
                  onChange={handleChange}
                  value={values.passwordMobileAndWeb}
                  placeholder="Senha"
                />
                <div
                  className="position-absolute end-0 top-50 translate-middle-y"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer', paddingRight: '10px' }}
                >
                  <CsLineIcons icon={eyeIcon} />
                </div>
                {errors.passwordMobileAndWeb && touched.passwordMobileAndWeb && <div className="d-block invalid-tooltip">{errors.passwordMobileAndWeb}</div>}
              </div>

            <div className='d-flex justify-content-center'>
              <AsyncButton type="submit" loadingText="Entrando" className="btn btn-primary btn-lg btn-block" isSaving={isLoging}>
                Login
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

export default PatientLogin;
