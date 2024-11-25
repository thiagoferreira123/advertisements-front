import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Scrollspy from '/src/components/scrollspy/Scrollspy';
import HtmlHead from '/src/components/html-head/HtmlHead';
import BreadcrumbList from '/src/components/breadcrumb-list/BreadcrumbList';
import ListBasicItems from './ListBasicItems.tsx';
import ListAdditionalInfo from './ListAdditionalInfo.tsx';
import ListHorizontalThumbs from './ListHorizontalThumbs.tsx';
import ListSquareThumbs from './ListSquareThumbs.tsx';
import ListVerticalThumbs from './ListVerticalThumbs.tsx';
import ListLinks from './ListLinks.tsx';
import ListUsers from './ListUsers.tsx';
import ListUserButtons from './ListUserButtons.tsx';
import ListActivityLogs from './ListActivityLogs.tsx';
import ListTimeLogs from './ListTimeLogs.tsx';
import ListIcons from './ListIcons.tsx';
import ListIconsApart from './ListIconsApart.tsx';
import ListTasks from './ListTasks.tsx';
import ListTasksApart from './ListTasksApart.tsx';

const List = () => {
  const title = 'List';
  const description = 'Lists with and without scrollbars that contains icons, images and texts without breakpoint specific classes.';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'blocks', text: 'Blocks' },
  ];

  const scrollspyItems = [
    { id: 'title', text: 'Title' },
    { id: 'basicItems', text: 'Basic Items' },
    { id: 'additionalInfo', text: 'Additional Info' },
    { id: 'horizontalThumbs', text: 'Horizontal Thumbs' },
    { id: 'squareThumbs', text: 'Square Thumbs' },
    { id: 'verticalThumbs', text: 'Vertical Thumbs' },
    { id: 'users', text: 'Users' },
    { id: 'userButtons', text: 'User Buttons' },
    { id: 'activityLogs', text: 'Activity Logs' },
    { id: 'timeLogs', text: 'Time Logs' },
    { id: 'icons', text: 'Icons' },
    { id: 'iconsApart', text: 'Icons Apart' },
    { id: 'tasks', text: 'Tasks' },
    { id: 'tasksApart', text: 'Tasks Apart' },
    { id: 'progress', text: 'Progress' },
  ];

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

          {/* Basic Items Start */}
          <section className="scroll-section" id="basicItems">
            <h2 className="small-title">Basic Items</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListBasicItems />
              </Col>
            </Row>
          </section>
          {/* Basic Items End */}

          {/* Additional Info Start */}
          <section className="scroll-section" id="additionalInfo">
            <h2 className="small-title">Additional Info</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListAdditionalInfo />
              </Col>
            </Row>
          </section>
          {/* Additional Info End */}

          {/* Horizontal Thumbs Start */}
          <section className="scroll-section" id="horizontalThumbs">
            <h2 className="small-title">Horizontal Thumbs</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListHorizontalThumbs />
              </Col>
            </Row>
          </section>
          {/* Horizontal Thumbs End */}

          {/* Square Thumbs Start */}
          <section className="scroll-section" id="squareThumbs">
            <h2 className="small-title">Square Thumbs</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListSquareThumbs />
              </Col>
            </Row>
          </section>
          {/* Square Thumbs End */}

          {/* Vertical Thumbs Start */}
          <section className="scroll-section" id="verticalThumbs">
            <h2 className="small-title">Vertical Thumbs</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListVerticalThumbs />
              </Col>
            </Row>
          </section>
          {/* Vertical Thumbs End */}

          {/* Links Start */}
          <section className="scroll-section" id="links">
            <h2 className="small-title">Links</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListLinks />
              </Col>
            </Row>
          </section>
          {/* Links End */}

          {/* Users Start */}
          <section className="scroll-section" id="users">
            <h2 className="small-title">Users</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListUsers />
              </Col>
            </Row>
          </section>
          {/* Users End */}

          {/* User Buttons Start */}
          <section className="scroll-section" id="userButtons">
            <h2 className="small-title">User Buttons</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListUserButtons />
              </Col>
            </Row>
          </section>
          {/* User Buttons End */}

          {/* Activity Logs Start */}
          <section className="scroll-section" id="activityLogs">
            <h2 className="small-title">Activity Logs</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListActivityLogs />
              </Col>
            </Row>
          </section>
          {/* Activity Logs End */}

          {/* Time Logs Start */}
          <section className="scroll-section" id="timeLogs">
            <h2 className="small-title">Time Logs</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListTimeLogs />
              </Col>
            </Row>
          </section>
          {/* Time Logs End */}

          {/* Icons Start */}
          <section className="scroll-section" id="icons">
            <h2 className="small-title">Icons</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListIcons />
              </Col>
            </Row>
          </section>
          {/* Icons End */}

          {/* Icons Apart Start */}
          <section className="scroll-section" id="iconsApart">
            <h2 className="small-title">Icons Apart</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListIconsApart />
              </Col>
            </Row>
          </section>
          {/* Icons Apart End */}

          {/* Tasks Start */}
          <section className="scroll-section" id="tasks">
            <h2 className="small-title">Tasks</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListTasks />
              </Col>
            </Row>
          </section>
          {/* Tasks End */}

          {/* Tasks Apart Start */}
          <section className="scroll-section" id="tasksApart">
            <h2 className="small-title">Tasks Apart</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListTasksApart />
              </Col>
            </Row>
          </section>
          {/* Tasks Apart End */}

         
          {/* <section className="scroll-section" id="progress">
            <h2 className="small-title">Progress</h2>
            <Row>
              <Col xl="6" className="mb-5">
                <ListProgress />
              </Col>
            </Row>
          </section>
   x */}
        </Col>
        <Scrollspy items={scrollspyItems} />
      </Row>
    </>
  );
};

export default List;
