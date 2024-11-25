import React from 'react';
import { Button, Row, Col, Card, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LAYOUT } from '/src/constants';
import HtmlHead from '/src/components/html-head/HtmlHead';
import BreadcrumbList from '/src/components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from '/src/cs-line-icons/CsLineIcons';
import useCustomLayout from '/src/hooks/useCustomLayout';

const PortfolioDetail = () => {
  const title = 'Fórum nutricional';
  const description = 'Portfolio Detail';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'pages', text: 'Pages' },
    { to: 'pages/portfolio', text: 'Portfolio' },
  ];

  useCustomLayout({ layout: LAYOUT.Boxed });

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          {/* Title End */}

        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row className="g-5">
        {/* Content Start */}
        <Col xl="12">
          {/* Details Start */}
          <Card className="mb-5">
            <Card.Body className="pb-0">
            <Row className="g-0 sh-6 mb-3">
                <Col xs="auto">
                  <img src="/img/profile/profile-1.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                </Col>
                <Col>
                  <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                    <div className="d-flex flex-column">
                      <div>Cherish Kerr</div>
                      <div className="text-small text-muted">Available for freelance work</div>
                    </div>
                  </div>
                </Col>
              </Row>
              <h4 className="mb-3">Carrot Cake Gingerbread</h4>
              <div className="mb-4">
                <p>
                  Toffee croissant icing toffee. Sweet roll chupa chups marshmallow muffin liquorice chupa chups soufflé bonbon. Liquorice gummi bears cake
                  donut chocolate lollipop gummi bears. Cotton candy cupcake ice cream gummies dessert muffin chocolate jelly. Danish brownie chocolate bar
                  lollipop cookie tootsie roll candy canes. Jujubes lollipop cheesecake gummi bears cheesecake. Cake jujubes soufflé.
                </p>
                <p>
                  Cake chocolate bar biscuit sweet roll liquorice jelly jujubes. Gingerbread icing macaroon bear claw jelly toffee. Chocolate cake marshmallow
                  muffin wafer. Pastry cake tart apple pie bear claw sweet. Apple pie macaroon sesame snaps cotton candy jelly
                  <u>pudding lollipop caramels</u>
                  marshmallow. Powder halvah dessert ice cream. Carrot cake gingerbread chocolate cake tootsie roll. Oat cake jujubes jelly-o jelly chupa chups
                  lollipop jelly wafer soufflé.
                </p>
              </div>
            </Card.Body>
            <Card.Footer className="border-0 pt-0">
              <Row className="align-items-center">
                <Col xs="6">
                  <Row className="g-0">
                    <Col xs="auto" className="pe-3">
                      <CsLineIcons icon="message" width="15" height="15" className="cs-icon icon text-primary me-1" />
                      <span className="align-middle">17</span>
                    </Col>
                  </Row>
                </Col>
                <Col xs="6">
                  <div className="d-flex align-items-center justify-content-end">
                    <Button variant="outline-primary" size="sm" className="btn-icon btn-icon-only ms-1">
                      <CsLineIcons icon="edit" />
                    </Button>
                    <Button variant="outline-primary" size="sm" className="btn-icon btn-icon-only ms-1">
                      <CsLineIcons icon="bin" />
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
          {/* Details End */}

          {/* Comments Start */}
          <h2 className="small-title">Comentários da comunidade</h2>
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center border-bottom border-separator-light pb-3 mt-3">
                <Row className="g-0 w-100">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-5.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <NavLink to="#">Luna Wigglebutt</NavLink>
                    <div className="text-muted text-small mb-2">2 days ago</div>
                    <div className="text-medium text-alternate lh-1-25">Nice job!</div>
                  </Col>
                  <Col xs="auto" className="justify-self-end">
                    <div>
                      <span className="text-muted me-2">4</span>
                      <Button variant="foreground" size="sm" className="btn-icon btn-icon-only hover-outline mb-1">
                        <CsLineIcons icon="heart" />
                      </Button>
                      <Button variant="foreground" size="sm" className="btn-icon btn-icon-only hover-outline mb-1">
                        <CsLineIcons icon="bin" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="d-flex align-items-center border-bottom border-separator-light pb-3 mt-3">
                <Row className="g-0 w-100">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-2.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <NavLink to="#">Olli Hawkins</NavLink>
                    <div className="text-muted text-small mb-2">3 days ago</div>
                    <div className="text-medium text-alternate lh-1-25">Beautiful combination of colors!</div>
                  </Col>
                  <Col xs="auto" className="justify-self-end">
                    <div>
                      <span className="text-muted me-2">8</span>
                      <Button variant="foreground" size="sm" className="btn-icon btn-icon-only hover-outline mb-1">
                        <CsLineIcons icon="heart" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="d-flex align-items-center border-bottom border-separator-light pb-3 mt-3">
                <Row className="g-0 w-100">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-3.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <NavLink to="#">Kirby Peters</NavLink>
                    <div className="text-muted text-small mb-2">3 days ago</div>
                    <div className="text-medium text-alternate lh-1-25">Nice, clear design.</div>
                  </Col>
                  <Col xs="auto" className="justify-self-end">
                    <div>
                      <span className="text-muted me-2">14</span>
                      <Button variant="foreground" size="sm" className="btn-icon btn-icon-only hover-outline mb-1">
                        <CsLineIcons icon="heart" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="d-flex align-items-center border-bottom border-separator-light pb-3 mt-3">
                <Row className="g-0 w-100">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-8.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <NavLink to="#">Kerr Jackson</NavLink>
                    <div className="text-muted text-small mb-2">6 days ago</div>
                    <div className="text-medium text-alternate lh-1-25">Wow!</div>
                  </Col>
                  <Col xs="auto" className="justify-self-end">
                    <div>
                      <span className="text-muted me-2">2</span>
                      <Button variant="foreground" size="sm" className="btn-icon btn-icon-only hover-outline mb-1">
                        <CsLineIcons icon="heart" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="d-flex align-items-center pb-3 mt-3">
                <Row className="g-0 w-100">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-5.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <NavLink to="#">Luna Wigglebutt</NavLink>
                    <div className="text-muted text-small mb-2">1 week ago</div>
                    <div className="text-medium text-alternate lh-1-25">Loved the typography!</div>
                  </Col>
                  <Col xs="auto" className="justify-self-end">
                    <div>
                      <span className="text-muted me-2">6</span>
                      <Button variant="foreground" size="sm" className="btn-icon btn-icon-only hover-outline mb-1">
                        <CsLineIcons icon="heart" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
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
            </Card.Body>
          </Card>
          {/* Comments End */}
        </Col>
        {/* Content End */}

      </Row>
    </>
  );
};

export default PortfolioDetail;
