import React, { useEffect } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';

const Footer = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-footer', 'true');
    return () => {
      document.documentElement.removeAttribute('data-footer');
    };
  }, []);

  return (
    <footer>
      {/* <div className="footer-content">
        <Container>
          <Row>
            <Col xs="12" sm="6">
              <p className="mb-0 text-muted text-medium">OdontCloud Software Para  Cirurgiões-Dentistas | Versão 1.0 </p>
            </Col>
          </Row>
        </Container>
      </div> */}
    </footer>
  );
};

export default React.memo(Footer);
