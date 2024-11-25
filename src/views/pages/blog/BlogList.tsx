import React from 'react';
import { Button, Card, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LAYOUT } from '/src/constants';
import HtmlHead from '/src/components/html-head/HtmlHead';
import BreadcrumbList from '/src/components/breadcrumb-list/BreadcrumbList';
import Clamp from '/src/components/clamp';
import CsLineIcons from '/src/cs-line-icons/CsLineIcons';
import useCustomLayout from '/src/hooks/useCustomLayout';
import DatepickerFloatingLabel from '/src/views/interface/forms/controls/datepicker/DatepickerFloatingLabel';
import SelectBasic from '/src/views/interface/forms/controls/select/SelectBasic';

const BlogList = () => {
  const title = 'Diário alimentar';
  const description = 'Blog List';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'pages', text: 'Pages' },
    { to: 'pages/blog', text: 'Blog' },
  ];
  useCustomLayout({ layout: LAYOUT.Boxed });

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <h1 className="mb-0 pb-0 display-4">{title}</h1>
        <BreadcrumbList items={breadcrumbs} />
      </div>
      {/* Title End */}

      <Row className="g-5">
        <Col md={8} className="mb-5">
          {/* List Start */}
          <Card className="mb-5">
            <NavLink to="/pages/blog/detail">
              <img src="/img/product/large/product-1.webp" className="card-img-top sh-50" alt="card image" />
            </NavLink>
            <Card.Body>
              <h4 className="mb-3">
                <NavLink to="/pages/blog/detail">Café da manhã</NavLink>
              </h4>
              <Clamp clamp="2" className="text-alternate mb-0">
                Jujubes brownie marshmallow apple pie donut ice cream jelly-o jelly-o gummi bears. Tootsie roll chocolate bar dragée bonbon cheesecake icing.
                Danish wafer donut cookie caramels gummies topping.
              </Clamp>
            </Card.Body>
            <Card.Footer className="border-0 pt-0">
              <Row className="align-items-center">
                <Col xs="6">
                  <div className="d-flex align-items-center">
                    <div className="sw-5 d-inline-block position-relative me-3">
                      <img src="/img/profile/avatar_paciente_fem.png" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                    <div className="d-inline-block">
                      <NavLink to="#">Olli Hawkins</NavLink>
                    </div>
                  </div>
                </Col>
                <Col xs="6">
                  <Row className="g-0 justify-content-end">
                    <Col xs="auto" className="ps-3">
                      <CsLineIcons icon="clock" size="15" className="text-primary me-1" />
                      <span className="align-middle">07:00</span>
                    </Col>
                    <Col xs="auto" className="ps-3">
                      <CsLineIcons icon="calendar" size="15" className="text-primary me-1" />
                      <span className="align-middle">19/01/2024</span>

                    </Col>
                    <Col xs="auto" className="ps-3">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="button-tooltip">Faça o download da imagem no seu dispositivo</Tooltip>}
                      >
                        <Button variant="primary" size="sm" className="ms-1 btn-icon btn-icon-only mb-1">
                          <CsLineIcons icon="cloud-download" />
                        </Button>
                      </OverlayTrigger>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="align-items-start">
                <Col md={12}>
                  <Form.Control as="textarea" rows={2} name="textObservation" className="mt-3" placeholder='Digite um comentário...' />
                </Col>
              </Row>
              <Row className="text-center">
                <Col md={12}>
                  <Button variant="outline-primary" size="sm" className="mt-2">
                    Enviar comentário
                  </Button>{' '}
                </Col>
              </Row>
            </Card.Footer>
          </Card>

          <Card className="mb-5">
            <NavLink to="/pages/blog/detail">
              <img src="/img/product/large/product-1.webp" className="card-img-top sh-50" alt="card image" />
            </NavLink>
            <Card.Body>
              <h4 className="mb-3">
                <NavLink to="/pages/blog/detail">Café da manhã</NavLink>
              </h4>
              <Clamp clamp="2" className="text-alternate mb-0">
                Jujubes brownie marshmallow apple pie donut ice cream jelly-o jelly-o gummi bears. Tootsie roll chocolate bar dragée bonbon cheesecake icing.
                Danish wafer donut cookie caramels gummies topping.
              </Clamp>
            </Card.Body>
            <Card.Footer className="border-0 pt-0">
              <Row className="align-items-center">
                <Col xs="6">
                  <div className="d-flex align-items-center">
                    <div className="sw-5 d-inline-block position-relative me-3">
                      <img src="/img/profile/profile-1.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                    <div className="d-inline-block">
                      <NavLink to="#">Olli Hawkins</NavLink>
                    </div>
                  </div>
                </Col>
                <Col xs="6">
                  <Row className="g-0 justify-content-end">
                    <Col xs="auto" className="ps-3">
                      <CsLineIcons icon="clock" size="15" className="text-primary me-1" />
                      <span className="align-middle">07:00</span>
                    </Col>
                    <Col xs="auto" className="ps-3">
                      <CsLineIcons icon="calendar" size="15" className="text-primary me-1" />
                      <span className="align-middle">19/01/2024</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="align-items-start">
                <Col md={12}>
                  <Form.Control as="textarea" rows={2} name="textObservation" className="mt-3" readOnly />
                </Col>
              </Row>
              <Row className="text-center">
                <Col md={12}>
                  <Button variant="outline-primary" size="sm" className="mt-2">
                    Remover comentário
                  </Button>{' '}
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={4}>
          <Row>
            <Col xs="12" className="mb-5">
              <Card>
                <Card.Body>
                  <div className="cta-3">Filtre por data</div>
                  <div>
                    <Button variant="outline-primary" className="w-100 mb-1 mt-2">
                      Últimos 7 dias
                    </Button>
                  </div>
                  <div>
                    <Button variant="outline-primary" className="w-100 mb-1">
                      Últimos 15 dias
                    </Button>
                  </div>
                  <div>
                    <Button variant="outline-primary" className="w-100 mb-2">
                      Últimos 30 dias
                    </Button>
                  </div>

                  <Row className="d-flex mt-3 text-center">
                    <Col xs="6">
                      <DatepickerFloatingLabel label="Data inicio" />
                    </Col>
                    <Col xs="6">
                      <DatepickerFloatingLabel label="Data fim" />
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button variant="outline-primary" className="w-80 mb-1 mt-3">
                      Filtrar
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              <Card className="mt-4">
                <Card.Body>
                  <div className="cta-3 mb-3">Filtre por paciente</div>
                  <SelectBasic />

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BlogList;
