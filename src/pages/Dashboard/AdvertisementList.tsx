import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import CsLineIcons from '../../cs-line-icons/CsLineIcons';
import { Link } from 'react-router-dom';
import { appRoot } from '@/routes';
import { useAdvertisement } from '../advertisement/hook';
import { useQuery } from '@tanstack/react-query';
import StaticLoading from '@/components/loading/StaticLoading';
import { useDeleteAdvertisementConfirmationModalStore } from './hooks/modals/DeleteAdvertisementConfirmationModalStore';
import DeleteAdvertisementConfirmationModal from './modals/DeleteAdvertisementConfirmationModal';
import { AdvertisementSubscriptionCycleLabels } from '../advertisement/hook/types';
import { convertIsoDateStringToBrDateString } from '@/helpers/DateHelper';

const AdvertisementList = () => {
  const { getAdvertisements } = useAdvertisement();
  const { handleSelectAdvertisementToRemove } = useDeleteAdvertisementConfirmationModalStore();

  const getAdvertisements_ = async () => {
    try {
      const response = await getAdvertisements();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const result = useQuery({ queryKey: ['advertisements'], queryFn: getAdvertisements_ });

  return (
    <Col xs={12} md={8} className="mx-auto">
      <Card className="mt-3">
        <Card.Body>
          <Row className="g-0 align-items-center mb-3">
            <Col xs="auto" className="pe-2">
              <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                <CsLineIcons icon="notification" className="text-white" />
              </div>
            </Col>
            <Col>
              <h5 className="fw-bold mb-0 text-md-start">Seus anúncios</h5>
            </Col>
          </Row>
          {result.isLoading ? (
            <div className="sh-20 d-flex align-items-center justify-content-center">
              <StaticLoading />
            </div>
          ) : result.isError ? (
            <div className="sh-20 d-flex align-items-center justify-content-center text-danger">
              Ocorreu um erro ao buscar os anúncios
            </div>
          ) : !result.data || result.data.length === 0 ? (
            <div className="sh-20 d-flex align-items-center justify-content-center text-muted">
              Você ainda não possui anúncios 🌶️
            </div>
          ) : (
            result.data?.map((advertisement) => (
              <div key={advertisement.advertisement_id} className="border-bottom border-separator-light mb-3 pb-3">
                <Row className="g-0">
                  <Col xs="auto" className="me-2">
                    <img
                      src={advertisement.photos[0]?.photo_url ?? '/img/profile/profile-6.webp'}
                      className="card-img rounded-xl sh-12 sw-12"
                      alt="thumb"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </Col>
                  <Col>
                    <div className="d-flex flex-column h-100">
                      <h6 className="fw-bold mb-1 text-alternative">
                        {advertisement.title}{' '}
                        <Badge className="me-1">{AdvertisementSubscriptionCycleLabels[advertisement.cycle]}</Badge>
                      </h6>
                      <small className="text-muted">
                        Data da criação: {convertIsoDateStringToBrDateString(advertisement.date_of_creation)}
                      </small>
                      {!advertisement.payments.filter((payment) => payment.status === 'CONFIRMED').length && (
                        <Button
                          variant="warning"
                          size="sm"
                          className="mt-2 w-50"
                          as="a"
                          href={advertisement.paymentLink}
                          target="_blank"
                        >
                          Pagar
                          <CsLineIcons icon="money" className="ms-1" size={12} />
                        </Button>
                      )}
                      <div className="d-flex mt-2">
                        <Link
                          to={`${appRoot}/advertisement/edit/${advertisement.advertisement_id}`}
                          className="btn btn-outline-secondary btn-sm me-2"
                        >
                          Editar
                        </Link>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="btn-icon btn-icon-only"
                          onClick={() => handleSelectAdvertisementToRemove(advertisement)}
                        >
                          <CsLineIcons icon="bin" />
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))
          )}
          <div className="text-center mt-3">
            <Link to={`${appRoot}/advertisement/create`} className="btn btn-primary">
              Criar um novo anúncio
            </Link>
          </div>
        </Card.Body>
      </Card>

      <DeleteAdvertisementConfirmationModal />
    </Col>
  );
};

export default AdvertisementList;
