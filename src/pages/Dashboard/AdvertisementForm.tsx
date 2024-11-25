import React from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
}

const AdvertisementForm: React.FC = () => {
  const initialValues: FormValues = {
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
    traits: []
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
  });

  const onSubmit = (values: FormValues) => {
    console.log('Form submitted', values);
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
                <Form.Label className='fw-bold'>Titulo do anúncio</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                  isInvalid={!!errors.title && touched.title}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md="12">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className='fw-bold'>Fotos</Form.Label>
                <p>Dropzone do broker aqui</p>
              </Form.Group>
            </Col>

            <Col md="12">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className='fw-bold'>Vídeos</Form.Label>
                <p>Dropzone do broker aqui</p>
              </Form.Group>
            </Col>

            <Col md="12">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className='fw-bold'>Descrição</Form.Label>
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
                <Form.Label className='fw-bold'>Estado</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  onChange={handleChange}
                  value={values.state}
                  isInvalid={!!errors.state && touched.state}
                />
                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className='fw-bold'>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={values.city}
                  isInvalid={!!errors.city && touched.city}
                />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 g-3">
            <Col md="4">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className='fw-bold'>Disponibilidade de horário</Form.Label>
                <Form.Control
                  type="text"
                  name="availability"
                  placeholder='Exemplo: das 10 ás 22 ou 24h'
                  onChange={handleChange}
                  value={values.availability}
                  isInvalid={!!errors.availability && touched.availability}
                />
                <Form.Control.Feedback type="invalid">{errors.availability}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className='fw-bold'>Valor R$ (A combinar, deixe 0)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={values.price}
                  isInvalid={!!errors.price && touched.price}
                />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group className="form-group position-relative tooltip-end-top">
                <Form.Label className='fw-bold'>Idade</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  onChange={handleChange}
                  value={values.age}
                  isInvalid={!!errors.age && touched.age}
                />
                <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 g-3">
            <Col md="12">
              <Form.Group>
                <Form.Label className='fw-bold'>Locais de atendimento</Form.Label>
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
                <Form.Label className='fw-bold'>Categoria</Form.Label>
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
                <Form.Label className='fw-bold'>Público</Form.Label>
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
                <Form.Label className='fw-bold'>Traços</Form.Label>
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

          <div className='text-center'>
            <Button type="submit">Salvar anúncio</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdvertisementForm;
