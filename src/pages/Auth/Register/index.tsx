import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import { RegisterValues } from '../Login/hook/types';
import { useAuth } from '../Login/hook';
import AsyncButton from '../../../components/AsyncButton';
import { AxiosError } from 'axios';
import { notify } from '../../../components/toast/NotificationIcon';
import CsLineIcons from '../../../cs-line-icons/CsLineIcons';
import HtmlHead from '../../../components/html-head/HtmlHead';
import LayoutFullpage from '../../../layout/LayoutFullpage';

const Register = () => {
  const title = 'Register';
  const description = 'Register Page';

  const [isLoging, setIsLoging] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Definindo o estado showPassword
  const history = useNavigate();

  const validationSchema = Yup.object().shape({
    clinic_full_name: Yup.string().required('Digite um nome valido.'),
    clinic_email: Yup.string().email().required('Digite um email valido.'),
    clinic_phone: Yup.string().required('Digite um WhatsApp válido.'),
    clinic_terms: Yup.bool().required().oneOf([true], 'Os termos devem ser aceitos!'),
    clinic_password: Yup.string()
      .min(6, 'Deve ter pelo menos 6 caracteres')
      .matches(/[a-z]/, 'Deve conter pelo menos uma letra')
      .matches(/[^a-zA-Z0-9]/, 'Deve conter pelo menos um símbolo.')
      .required('Digite uma senha válida.'),
    clinic_password_confirm: Yup.string()
      .oneOf([Yup.ref('clinic_password'), undefined], 'As senhas devem coincidir.')
      .required('Confirme a senha.'),
  });

  const initialValues: RegisterValues = {
    clinic_full_name: '',
    clinic_email: '',
    clinic_password: '',
    clinic_password_confirm: '',
    clinic_phone: '',
    clinic_terms: false,
  };

  const { register } = useAuth();

  const onSubmit = async (values: RegisterValues) => {
    try {
      setIsLoging(true);
      await register(values);

      setIsLoging(false);

      history('/app/');
    } catch (error) {
      setIsLoging(false);

      if (error instanceof AxiosError) notify(error.response?.data.message, 'Erro', 'close', 'danger');
      console.error(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordType = showPassword ? 'text' : 'password';
  const eyeIcon = showPassword ? 'eye-off' : 'eye';

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50"></div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <Col xs="12" sm={25} className="text-center">
          <img src="/img/logo/logo.webp" className="img-fluid sh-20" alt="Fluid image" />
        </Col>
        <div className="mb-2 mt-3">
          <h4 className="cta-1 mb-3 text-alternate">Boas-vindas ao OdontCloud!</h4>
        </div>
        <div className="mb-5">
          <p className="h6 text-alternate">Cadastre-se gratuitamente inserindo seus dados, a confirmação será feita via WhatsApp.</p>
        </div>
        <div>
          <form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control type="text" name="clinic_full_name" placeholder="Nome completo" value={values.clinic_full_name} onChange={handleChange} />
              {errors.clinic_full_name && touched.clinic_full_name && <div className="d-block invalid-tooltip">{errors.clinic_full_name}</div>}
            </div>

            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="clinic_email" placeholder="Email profissional" value={values.clinic_email} onChange={handleChange} />
              {errors.clinic_email && touched.clinic_email && <div className="d-block invalid-tooltip">{errors.clinic_email}</div>}
            </div>

            <div>
              <div className="mb-3 filled form-group tooltip-end-top">
                <CsLineIcons icon="phone" />
                <InputMask
                  mask="55 99 99999-9999"
                  value={values.clinic_phone}
                  onChange={handleChange}
                  className="form-control"
                  name="clinic_phone"
                  placeholder="WhatsApp"
                >
                </InputMask>
                {errors.clinic_phone && touched.clinic_phone && <div className="d-block invalid-tooltip">{errors.clinic_phone}</div>}
              </div>
            </div>

            <div className="mb-3 filled form-group tooltip-end-top position-relative">
              <CsLineIcons icon="lock-on" />
              <Form.Control
                type={passwordType}
                name="clinic_password"
                onChange={handleChange}
                value={values.clinic_password}
                placeholder="Senha (6 dígitos, símbolo e letra)"
              />
              <div
                className="position-absolute end-0 top-50 translate-middle-y"
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', paddingRight: '10px' }}
              >
                <CsLineIcons icon={eyeIcon} />
              </div>
              {errors.clinic_password && touched.clinic_password && <div className="d-block invalid-tooltip">{errors.clinic_password}</div>}
            </div>

            <div className="mb-3 filled form-group tooltip-end-top position-relative">
              <CsLineIcons icon="lock-on" />
              <Form.Control
                type={passwordType}
                name="clinic_password_confirm"
                onChange={handleChange}
                value={values.clinic_password_confirm}
                placeholder="Confirme sua senha"
              />
              <div
                className="position-absolute end-0 top-50 translate-middle-y"
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', paddingRight: '10px' }}
              >
                <CsLineIcons icon={eyeIcon} />
              </div>
              {errors.clinic_password_confirm && touched.clinic_password_confirm && (
                <div className="d-block invalid-tooltip">{errors.clinic_password_confirm}</div>
              )}
            </div>

            <div className="mb-3 position-relative form-group">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="clinic_terms"
                  onChange={handleChange}
                  value={values.clinic_terms ? 1 : 0}
                  checked={values.clinic_terms}
                />
                <label className="form-check-label">
                  Eu li e aceito os{' '}
                  <NavLink to="https://www.odontcloud.com.br/page-terms-of-use.html" target="_blank" className="text-alternate">
                    Termos de uso,
                  </NavLink>{' '}
                  <NavLink to="https://www.odontcloud.com.br/page-privacy.html" target="_blank" className="text-alternate">
                    Políticas de privacidade,
                  </NavLink>{' '}
                  <NavLink to="https://www.odontcloud.com.br/page-politic-payments.html" target="_blank" className="text-alternate">
                    Políticas de pagamentos e
                  </NavLink>{' '}
                  <NavLink to="https://www.odontcloud.com.br/page-politic-cookies.html" target="_blank" className="text-alternate">
                    Políticas de cookies
                  </NavLink>
                </label>

                {errors.clinic_terms && touched.clinic_terms && <div className="d-block invalid-tooltip">{errors.clinic_terms}</div>}
              </div>
            </div>

            <div className="text-center">
              <AsyncButton isSaving={isLoging} size="lg" type="submit">
                Criar conta gratuita
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

export default Register;
