import CsLineIcons from '../../cs-line-icons/CsLineIcons';
import { Alert, Card, Col } from 'react-bootstrap';
import * as Yup from 'yup';

const PendingIdentityConfirmation = () => {
  return (
    <Col xs={12} md={8} className="my-4 mx-auto">
      <h5 className="fw-bold">Confirmação de identidade</h5>

      <Card>
        <Card.Body>
          <Alert className="text-center">
          <CsLineIcons icon="clock" className="ms-1 mb-2" size={30} /> <br></br>
            Aguarde, estamos validando o seu cadastro, mas você já pode criar seus anúncios, porém os anúncios criados não serão
            exibidos até que a validação seja concluída.
          </Alert>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PendingIdentityConfirmation;
