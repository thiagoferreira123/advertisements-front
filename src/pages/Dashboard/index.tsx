import { Badge, Button, Card, Col, Nav, Row } from 'react-bootstrap';
import CsLineIcons from '/src/cs-line-icons/CsLineIcons';
import AdvertisementForm from './AdvertisementForm';

const Dashboard = () => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Col md={8}>
          <h5 className="fw-bold">Lista de anúncios</h5>
          <Card>
            <Card.Body className="mb-n3 border-last-none">
              <div className="border-bottom border-separator-light mb-2 pb-2">
                <Row className="g-0 sh-6">
                  <Col xs="auto">
                    <img
                      src="/img/profile/profile-6.webp"
                      className="card-img rounded-xl sh-6 sw-6"
                      alt="thumb"
                    />
                  </Col>
                  <Col>
                    <div className="d-flex flex-row pt-0 pb-0 ps-3 pe-0 h-100 align-items-center justify-content-between">
                      <div className="d-flex flex-column">
                        <div className="fw-bold">Título do anúncio</div>
                        <div> <Badge>Anúncio mensal</Badge></div>
                       
                      </div>
                      <div className="d-flex">
                        <Button variant="outline-secondary" size="sm" className="ms-1">
                          Editar
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="btn-icon btn-icon-only ms-1"
                        >
                          <CsLineIcons icon="bin" />
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="mb-2 mt-3 text-center">
                <Button>
                  Criar um novo anúncio
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} className="mt-4">
          <AdvertisementForm />
        </Col>
      </div>
    </>
  );
};

export default Dashboard;
