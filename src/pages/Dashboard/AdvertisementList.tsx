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
import { convertIsoDateStringToBrDateString, parseIsoToDate } from '@/helpers/DateHelper';

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
    <Col md={8}>
      <h5 className="fw-bold">Lista de anúncios</h5>
      <Card>
        <Card.Body className="mb-n3 border-last-none">
          {result.isLoading ? (
            <div className="sh-20 d-flex align-items-center justify-content-center">
              <StaticLoading />
            </div>
          ) : result.isError ? (
            <div className="sh-20 d-flex align-items-center justify-content-center">Ocorreu um erro ao buscar os anúncios</div>
          ) : !result.data || result.data.length === 0 ? (
            <div className="sh-20 d-flex align-items-center justify-content-center">Nenhum anúncio encontrado</div>
          ) : (
            result.data?.map((advertisement) => (
              <div className="border-bottom border-separator-light mb-2 pb-2">
                <Row className="g-0 sh-12">
                  <Col xs="auto">
                    <img src={advertisement.photos[0]?.photo_url ?? '/img/profile/profile-6.webp'} className="card-img rounded-xl sh-12 sw-12" alt="thumb" />
                  </Col>
                  <Col>
                    <div className="d-flex flex-row pt-0 pb-0 ps-3 pe-0 h-100 align-items-center justify-content-between">
                      <div className="d-flex flex-column">
                        <div className="fw-bold">{advertisement.title}</div>
                        <div>
                          {' '}
                          <div>
                            <div>
                              <Badge className="me-1">Duração do anúncio: {AdvertisementSubscriptionCycleLabels[advertisement.cycle]}</Badge>
                            </div>
                            <div>
                              <Badge className="me-1">Data da criação: {convertIsoDateStringToBrDateString(advertisement.date_of_creation)}</Badge>
                            </div>
                            <div>
                              {!advertisement.payments.filter((payment) => payment.status === 'CONFIRMED').length ? (
                              <Button variant="warning" size="sm" className="me-1 btn-icon mt-1" as="a" href={advertisement.paymentLink} target="_blank">
                                Pagamento pendente clique para pagar
                                <CsLineIcons icon="clock" className="ms-1" size={12} />
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex">
                        <Link to={`${appRoot}/advertisement/edit/${advertisement.advertisement_id}`} className="btn btn-outline-secondary btn-sm ms-1">
                          Editar
                        </Link>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="btn-icon btn-icon-only ms-1"
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
          <div className="mb-2 mt-3 text-center">
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
