import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import useLayout from '../hooks/useLayout';
import Nav from './nav/Nav';
import SidebarMenu from './nav/sidebar-menu/SidebarMenu';
import Footer from './footer/Footer';
import { useAuth } from '../pages/Auth/Login/hook';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  useLayout();

  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.click();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [pathname]);
  return (
    <>
      {isLoggedIn ? <Nav /> : null}
      <main className={isLoggedIn ? '' : 'container-fluid'}>
        <Container fluid="xxl">
          <Row className="h-100">
            {isLoggedIn ? <SidebarMenu /> : null}
            <Col className="h-100" id="contentArea">
              {children}
            </Col>
          </Row>
        </Container>
      </main>
      {isLoggedIn ? (
        <>
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default React.memo(Layout);
