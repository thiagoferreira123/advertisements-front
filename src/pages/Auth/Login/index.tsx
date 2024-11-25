import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Col, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { AxiosError } from 'axios';
import { notify } from '../../../components/toast/NotificationIcon';
import { useAuth } from './hook';
import { LoginValues, Role } from './hook/types';
import CsLineIcons from '../../../cs-line-icons/CsLineIcons';
import AsyncButton from '../../../components/AsyncButton';
import HtmlHead from '../../../components/html-head/HtmlHead';
import LayoutFullpage from '../../../layout/LayoutFullpage';

const Login = () => {
  const title = 'Login';
  const description = 'Login Page';

  const [isLoging, setIsLoging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Digite um e-mail valido'),
    password: Yup.string().required('Digite uma senha valida'),
  });

  const initialValues: LoginValues = { email: '', password: '' };
  const onSubmit = async (values: LoginValues) => {
    try {
      setIsLoging(true);
      const user = await login(values);

      setIsLoging(false);

      history('/app/');
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
        <div className="mb-1 mt-5">
          <h2 className="cta-1 mb-0 text-alternate">Área de login </h2>
        </div>
        <div className="mb-5">
          <p className="h6 text-alternate">Por favor, use suas credenciais para fazer login.</p>
          <p className="h6 text-alternate">
            Se você não é membro,  registre-se <NavLink to="/register">clicando aqui.</NavLink>
          </p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>

            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>

            <div className="mb-1 filled form-group tooltip-end-top position-relative">
              <CsLineIcons icon="lock-on" />
              <Form.Control
                type={passwordType}
                name="password"
                onChange={handleChange}
                value={values.password}
                placeholder="Senha"
              />
              <div
                className="position-absolute end-0 top-50 translate-middle-y"
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', paddingRight: '10px' }}
              >
                <CsLineIcons icon={eyeIcon} />
              </div>
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <div className="forgot-password-link text-end mb-2">
              <NavLink className="text-medium" to="/forgot-password">
                Esqueceu a senha?
              </NavLink>
            </div>

            <div className='d-flex justify-content-center'>
              <AsyncButton type="submit" loadingText="Entrando" className="btn btn-primary btn-lg btn-block" isSaving={isLoging}>
                Login
              </AsyncButton>
              <Button size="lg" className="ms-3" type="submit" onClick={() => history('/register')}>
                Experimente grátis
              </Button>
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

export default Login;
