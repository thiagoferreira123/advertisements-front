import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ResetPasswordValues } from '../Login/hook/types';
import AsyncButton from '../../../components/AsyncButton';
import { useAuth } from '../Login/hook';
import { notify } from '../../../components/toast/NotificationIcon';
import { AxiosError } from 'axios';
import CsLineIcons from '../../../cs-line-icons/CsLineIcons';
import HtmlHead from '../../../components/html-head/HtmlHead';
import LayoutFullpage from '../../../layout/LayoutFullpage';

const ResetPassword = () => {
  const title = 'Reset Password';
  const description = 'Reset Password Page';
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Deve ter pelo menos 6 caracteres')
      .matches(/[a-z]/, 'Deve conter pelo menos uma letra')
      .matches(/[^a-zA-Z0-9]/, 'Deve conter pelo menos um símbolo.')
      .required('Digite uma senha válida.'),
    passwordConfirm: Yup.string()
      .min(6, 'Deve ter pelo menos 6 caracteres')
      .matches(/[a-z]/, 'Deve conter pelo menos uma letra')
      .matches(/[^a-zA-Z0-9]/, 'Deve conter pelo menos um símbolo.')
      .required('Digite uma senha válida.'),
    token: Yup.string()
      .matches(/^\d{5}$/, 'Deve conter apenas 5 dígitos.')
      .required('O token é obrigatório.'),
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();

  const initialValues: ResetPasswordValues = { password: '', passwordConfirm: '', token: '' };

  const { resetPassword } = useAuth();

  const onSubmit = async (values: ResetPasswordValues) => {
    try {
      setIsSaving(true);
      await resetPassword(values);

      setIsSaving(false);

      notify('Senha alterada com sucesso', 'Success', 'check-circle', 'success');

      history('/login');
    } catch (error) {
      setIsSaving(false);

      if (error instanceof AxiosError) notify(error.response?.data.message, 'Erro', 'close', 'danger');
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const passwordType = showPassword ? 'text' : 'password';
  const eyeIcon = showPassword ? 'eye-off' : 'eye';

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
          <h2 className="cta-1 mb-0 text-alternate">Vamos redefinir sua senha!</h2>
        </div>
        <div className="mb-5">
          <p className="h6 mb-2 text-alternate">Utilize o formulário abaixo para redefinir sua senha.</p>
        </div>
        <div>
          <form id="resetForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled">
              <CsLineIcons icon="key" />
              <Form.Control type="text" name="token" onChange={handleChange} value={values.token} placeholder="Insira o token de 5 números" />
              {errors.token && touched.token && <div className="d-block invalid-tooltip">{errors.token}</div>}
            </div>

            <div className="mb-3 filled position-relative">
              <div className="position-absolute end-0 top-50 translate-middle-y" onClick={togglePasswordVisibility} style={{ cursor: 'pointer', paddingRight: '10px' }}>
                <CsLineIcons icon={eyeIcon} />
              </div>
              <CsLineIcons icon="lock-on" />
              <Form.Control type={passwordType} name="password" onChange={handleChange} value={values.password} placeholder="Senha (6 dígitos, simbolo e letra)" />
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>

            <div className="mb-3 filled position-relative">
              <div className="position-absolute end-0 top-50 translate-middle-y" onClick={togglePasswordVisibility} style={{ cursor: 'pointer', paddingRight: '10px' }}>
                <CsLineIcons icon={eyeIcon} />
              </div>
              <CsLineIcons icon="lock-on" />
              <Form.Control type={passwordType} name="passwordConfirm" onChange={handleChange} value={values.passwordConfirm} placeholder="Confirme sua senha" />
              {errors.passwordConfirm && touched.passwordConfirm && <div className="d-block invalid-tooltip">{errors.passwordConfirm}</div>}
            </div>


            <div className="text-center">
              <AsyncButton isSaving={isSaving} size="lg" type="submit">
                Redefinir senha
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

export default ResetPassword;
