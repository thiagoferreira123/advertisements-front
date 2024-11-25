import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { MENU_PLACEMENT } from '/src/constants';
import HtmlHead from '/src/components/html-head/HtmlHead';
import BreadcrumbList from '/src/components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from '/src/hooks/useCustomLayout';

const HorizontalMenuPage = () => {
  const title = 'Horizontal Menu';
  const description = 'Horizontal standard menu that turns into mobile menu for smaller screens.';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'interface', text: 'Interface' },
    { to: 'interface/content', text: 'Content' },
    { to: 'interface/content/menu', text: 'Menu' },
  ];
  useCustomLayout({ placement: MENU_PLACEMENT.Horizontal });

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Row>
        <Col>
          {/* Title Start */}
          <section className="scroll-section" id="title">
            <div className="page-title-container">
              <h1 className="mb-0 pb-0 display-4">{title}</h1>
              <BreadcrumbList items={breadcrumbs} />
            </div>
            <Card className="mb-5" body>
              <Card.Text>{description}</Card.Text>
            </Card>
          </section>
          {/* Title End */}
        </Col>
      </Row>
    </>
  );
};

export default HorizontalMenuPage;
