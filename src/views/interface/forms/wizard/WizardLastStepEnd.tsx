/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Wizard, Steps, Step, WithWizard } from 'react-albus';
import { Button, Form, Row, Col, Alert, Accordion, Table } from 'react-bootstrap';
import CsLineIcons from '/src/cs-line-icons/CsLineIcons';
import SelectBasic from 'views/interface/forms/controls/select/SelectBasic';
import DropzoneImages from 'views/interface/forms/controls/dropzone/DropzoneImages';

const WizardLastStepEnd = () => {
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      setBottomNavHidden(true);
      setTopNavDisabled(true);
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  // const onClickPrev = (goToPrev, steps, step) => {
  //   if (steps.indexOf(step) <= 0) {
  //     return;
  //   }
  //   goToPrev();
  // };

  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    push(stepItem.id);
  };

  const getClassName = (steps, step, index, stepItem) => {
    if (steps.indexOf(step) === index) {
      return 'step-doing';
    }
    if (steps.indexOf(step) > index || stepItem.isDone) {
      stepItem.isDone = true;
      return 'step-done';
    }
    return 'step';
  };

  return (
    <div className="wizard wizard-default">
      <Wizard>
        <WithWizard
          render={({ step, steps, push }) => (
            <ul className="nav nav-tabs justify-content-center">
              {steps.map((stepItem, index) => {
                if (!stepItem.hideTopNav) {
                  return (
                    <li key={`topNavStep_${index}`} className={`nav-item ${getClassName(steps, step, index, stepItem)}`}>
                      <Button variant="link" className={`nav-link ${topNavDisabled ? 'pe-none' : ''}`} onClick={() => topNavClick(stepItem, push)}>
                        <span>{stepItem.name}</span>
                        <small>{stepItem.desc}</small>
                      </Button>
                    </li>
                  );
                }
                return <span key={`topNavStep_${index}`} />;
              })}
            </ul>
          )}
        />
        <Steps>
          <Step id="step1" name="1º Passo" desc="Upload de arquivo">
            <div className="sh-30">
              <div className="top-label mb-3">
                <SelectBasic options={[]} />
                <span>SELECIONE UM LOCAL DE ATENDIMENTO</span>
              </div>
              <div className="top-label">
                <DropzoneImages />
                <span>INSIRA O ARQUIVO CSV OU XLSX</span>
              </div>
            </div>
          </Step>
          <Step id="step2" name="2º Passo" desc="Relacioar colunas">

            <Row className="align-items-center">
              {/* Coluna para o input de texto */}
              <Col>
                <div className="top-label mb-3">
                  <Form.Control type="text" readOnly />
                  <Form.Label>NOME COMPLETO</Form.Label>
                </div>
              </Col>

              {/* Coluna para o select */}
              <Col>
                <div className="top-label mb-3">
                  <SelectBasic options={[]} />
                  <span>DADO CORRESPONDENTE</span>
                </div>
              </Col>
            </Row>

            <Row className="align-items-center">
              {/* Coluna para o input de texto */}
              <Col>
                <div className="top-label mb-3">
                  <Form.Control type="text" readOnly />
                  <Form.Label>E-MAIL</Form.Label>
                </div>
              </Col>

              {/* Coluna para o select */}
              <Col>
                <div className="top-label mb-3">
                  <SelectBasic options={[]} />
                  <span>DADO CORRESPONDENTE</span>
                </div>
              </Col>
            </Row>


            <Row className="align-items-center">
              {/* Coluna para o input de texto */}
              <Col>
                <div className="top-label mb-3">
                  <Form.Control type="text" readOnly />
                  <Form.Label>SEXO</Form.Label>
                </div>
              </Col>

              {/* Coluna para o select */}
              <Col>
                <div className="top-label mb-3">
                  <SelectBasic options={[]} />
                  <span>DADO CORRESPONDENTE</span>
                </div>
              </Col>
            </Row>


            <Row className="align-items-center">
              {/* Coluna para o input de texto */}
              <Col>
                <div className="top-label mb-3">
                  <Form.Control type="text" readOnly />
                  <Form.Label>GÊNERO</Form.Label>
                </div>
              </Col>

              {/* Coluna para o select */}
              <Col>
                <div className="top-label mb-3">
                  <SelectBasic options={[]} />
                  <span>DADO CORRESPONDENTE</span>
                </div>
              </Col>
            </Row>


          </Step>
          <Step className="top-label mb-3" id="step3" hideTopNav >
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h3 className="mb-3 mt-3 text-center">Bom trabalho!</h3>
              <p>Não feche! Estamos quase terminando de processar.. Um relatório será gerado 😎</p>
              <Alert variant="primary">100 pacientes foram cadastrados com sucesso.</Alert>
              <Alert variant="danger"> <span>10 pacientes foram ignorados</span> </Alert>
            </div>

            <div>
              <Accordion flush>
                <Accordion.Item eventKey="1">
                  <Accordion.Header as="div">Visualizar relatório completo</Accordion.Header>
                  <Accordion.Body>

                    <Table>
                      <thead>
                        <tr>
                          <th scope="col">Linha</th>
                          <th scope="col">Dado</th>
                          <th scope="col">Motivo</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Email</td>
                          <td>E-mail já existe no OdontCloud.</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Nome</td>
                          <td>Formato inválido</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Sexo</td>
                          <td>Campo em branco</td>
                        </tr>
                      </tbody>
                    </Table>

                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Step>
        </Steps>
        <WithWizard
          render={({ next, step, steps }) => (
            <div className={`wizard-buttons d-flex justify-content-center ${bottomNavHidden && 'invisible'}`}>
              {/* <Button
                variant="outline-primary"
                className={`btn-icon btn-icon-start me-1 ${steps.indexOf(step) <= 0 ? 'disabled' : ''}`}
                onClick={() => {
                  onClickPrev(previous, steps, step);
                }}
              >
                <CsLineIcons icon="chevron-left" /> <span>Back</span>
              </Button> */}
              <Button
                variant="outline-primary"
                className={`btn-icon btn-icon-end ${steps.indexOf(step) >= steps.length - 1 ? 'disabled' : ''}`}
                onClick={() => {
                  onClickNext(next, steps, step);
                }}
              >
                <span>Avançar</span> <CsLineIcons icon="chevron-right" />
              </Button>
            </div>
          )}
        />
      </Wizard>
    </div>
  );
};

export default WizardLastStepEnd;
