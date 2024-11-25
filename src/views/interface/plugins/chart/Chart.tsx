import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Scrollspy from '/src/components/scrollspy/Scrollspy';
import HtmlHead from '/src/components/html-head/HtmlHead';
import BreadcrumbList from '/src/components/breadcrumb-list/BreadcrumbList';
// import ChartLine from './ChartLine';

// Gráficos aplicáveis a pacientes de 0 a 5 anos
import ChartBMI0a2Fem from '../../../../pages/AnthropometricAssessment/Children0To5Years/charts/ChartBMI0a2Fem';
import ChartBMI0a2Mas from '../../../../pages/AnthropometricAssessment/Children0To5Years/charts/ChartBMI0a2Mas';

import Height0a2anosFem from '../../../../pages/AnthropometricAssessment/Children0To5Years/charts/Height0a2anosFem';
import Height0a2anosMas from '../../../../pages/AnthropometricAssessment/Children0To5Years/charts/Height0a2anosMas';

import Weight0a5anosFem from '../../../../pages/AnthropometricAssessment/Children0To5Years/charts/Weight0a5anosFem';
import Weight0a5anosMas from '../../../../pages/AnthropometricAssessment/Children0To5Years/charts/Weight0a5anosMas';


import ChartBMI2a5Fem from '../../../../pages/AnthropometricAssessment/Children0To5Years/charts/ChartBMI2a5Fem';
import ChartBMI2a5Mas from '../../../../pages/AnthropometricAssessment/Children0To5Years/charts/ChartBMI2a5Mas';

import Height2a5anosFem from '../../../../pages/AnthropometricAssessment/Children0To5Years/charts/Height2a5anosFem';
import Height2a5anosMas from '../../../../pages/AnthropometricAssessment/Children0To5Years/charts/Height2a5anosMas';

// Gráficos aplicáveis a pacientes de 5 a 19 anos
import Weight5a10anosMas from '../../../../pages/AnthropometricAssessment/Children5To19Years/charts/Weight5a10anosMas';
import Weight5a10anosFem from '../../../../pages/AnthropometricAssessment/Children5To19Years/charts/Weight5a10anosFem';

import Height5a19anosMas from '../../../../pages/AnthropometricAssessment/Children5To19Years/charts/Height5a19anosMas';
import Height5a19anosFem from '../../../../pages/AnthropometricAssessment/Children5To19Years/charts/Height5a19anosFem';

import ChartBMI5a19Mas from '../../../../pages/AnthropometricAssessment/Children5To19Years/charts/ChartBMI5a19Mas';
import ChartBMI5a19Fem from '../../../../pages/AnthropometricAssessment/Children5To19Years/charts/ChartBMI5a19Fem';




import ChartDoughnut from './ChartDoughnut';
import ChartPie from './ChartPie';
import ChartBar from './ChartBar';
import ChartRoundedBar from './ChartRoundedBar';
import ChartHorizontalBar from './ChartHorizontalBar';
import ChartRoundedHorizontalBar from './ChartRoundedHorizontalBar';
import ChartRadar from './ChartRadar';
import ChartPolar from './ChartPolar';
import ChartScatter from './ChartScatter';
import ChartBubble from './ChartBubble';
import ChartStreamingLine from './ChartStreamingLine';
import ChartStreamingBar from './ChartStreamingBar';
import ChartCustomVerticalTooltip from './ChartCustomVerticalTooltip';
import ChartCustomHorizontalTooltip from './ChartCustomHorizontalTooltip';
import ChartCustomLegendDoughnut from './ChartCustomLegendDoughnut';
import ChartCustomLegendBar from './ChartCustomLegendBar';
import ChartSmallLine1 from './ChartSmallLine1';
import ChartSmallLine2 from './ChartSmallLine2';
import ChartSmallLine3 from './ChartSmallLine3';
import ChartSmallLine4 from './ChartSmallLine4';
import ChartSmallDoughnutChart1 from './ChartSmallDoughnutChart1';
import ChartSmallDoughnutChart2 from './ChartSmallDoughnutChart2';
import ChartSmallDoughnutChart3 from './ChartSmallDoughnutChart3';
import ChartSmallDoughnutChart4 from './ChartSmallDoughnutChart4';
import ChartSmallDoughnutChart5 from './ChartSmallDoughnutChart5';
import ChartSmallDoughnutChart6 from './ChartSmallDoughnutChart6';
import ChartSmallDoughnutChart7 from './ChartSmallDoughnutChart7';
import ChartSmallDoughnutChart8 from './ChartSmallDoughnutChart8';
import ChartLargeLineSales from './ChartLargeLineSales';
import ChartLargeLineStock from './ChartLargeLineStock';

const ChartPage = () => {
  const title = 'Charts';
  const description = 'Chart.js provides simple yet flexible JavaScript charting for designers & developers.';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'interface', title: 'Interface' },
    { to: 'interface/plugins', title: 'Plugins' },
  ];
  const scrollspyItems = [
    { id: 'title', text: 'Title' },
    { id: 'lineChart', text: 'Line Chart' },
    { id: 'areaChart', text: 'Area Chart' },
    { id: 'doughnutChart', text: 'Doughnut Chart' },
    { id: 'pieChart', text: 'Pie Chart' },
    { id: 'barChart', text: 'Bar Chart' },
    { id: 'roundedBarChart', text: 'Rounded Bar Chart' },
    { id: 'horizontalBarChart', text: 'Horizontal Bar Chart' },
    { id: 'horizontalRoundedBarChart', text: 'Horizontal Rounded Bar Chart' },
    { id: 'radarChart', text: 'Radar Chart' },
    { id: 'polarChart', text: 'Polar Chart' },
    { id: 'scatterChart', text: 'Scatter Chart' },
    { id: 'bubbleChart', text: 'Bubble Chart' },
    { id: 'streamingLineChart', text: 'Streaming Line Chart' },
    { id: 'streamingBarChart', text: 'Streaming Bar Chart' },
    { id: 'customVerticalTooltip', text: 'Custom Vertical Tooltip' },
    { id: 'customHorizontalTooltip', text: 'Custom Horizontal Tooltip' },
    { id: 'customLegendDoughnut', text: 'Custom Legend Doughnut' },
    { id: 'customLegendBar', text: 'Custom Legend Bar' },
    { id: 'smallDoughnutCharts', text: 'Small Doughnut Charts' },
    { id: 'smallLineCharts', text: 'Small Line Charts' },
    { id: 'largeLineCharts', text: 'Large Line Charts' },
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

          <Row>
            {/* <Col xs="12" xl="6">
              <section className="scroll-section" id="lineChart">
                <h2 className="small-title">Line Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartLine />
                  </div>
                </Card>
              </section>
            </Col> */}

            {/* Area ChartBMI5a19Fem Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">IMC por idade (Meninas de 5 a 19 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <ChartBMI5a19Fem />
                  </div>
                </Card>
              </section>
            </Col>
            {/* ChartBMI5a19Fem End */}

            {/* Area ChartBMI5a19Mas Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">IMC por idade (Meninos de 5 a 19 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <ChartBMI5a19Mas />
                  </div>
                </Card>
              </section>
            </Col>
            {/* ChartBMI5a19Mas End */}

            {/* Area Height5a19anosFem Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">Altura por idade (Meninas de 5 a 19 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <Height5a19anosFem />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Height5a19anosFem End */}

            {/* Area Height5a19anosMas Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">Altura por idade (Meninos de 5 a 19 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <Height5a19anosMas />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Height5a19anosMas End */}

            {/* Area Weight5a10anosFem Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">Peso por idade (Meninas de 5 a 10 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <Weight5a10anosFem />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Weight5a10anosFem End */}

            {/* Area Weight5a10anosMas Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">Peso por idade (Meninos de 5 a 10 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <Weight5a10anosMas />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Weight5a10anosMas End */}

            {/* Area Height2a5anosFem Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">Comprimento por idade (Meninas de 2 a 5 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <Height2a5anosFem />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Height2a5anosFem End */}

            {/* Area Height2a5anosMas Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">Comprimento por idade (Meninos de 2 a 5 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <Height2a5anosMas />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Height2a5anosMas End */}

            {/* Area Height0a2anosFem Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">Comprimento por idade (Meninas de 0 a 2 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <Height0a2anosFem />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Height0a2anosFem End */}

            {/* Area Height0a2anosMas Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">Comprimento por idade (Meninos de 0 a 2 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <Height0a2anosMas />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Height0a2anosMas End */}

            {/* Area Weight0a5anosMas Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">Peso por idade (Meninos de 0 a 5 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <Weight0a5anosMas />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Weight0a5anosMas End */}

            {/* Area Weight0a5anosFem Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">Peso por idade (Meninas de 0 a 5 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <Weight0a5anosFem />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Weight0a5anosFem End */}


            {/* Area ChartBMI0a2Mas Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">IMC por idade (Meninos de 0 a 2 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <ChartBMI0a2Mas />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Area Chart End */}

            {/* Area ChartBMI0a2Fem Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">IMC por idade (Meninos de 0 a 2 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <ChartBMI0a2Fem />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Area Chart End */}

            {/* Area ChartBMI2a5Fem Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">IMC por idade (Meninas de 2 a 5 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <ChartBMI2a5Fem />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Area Chart End */}

            {/* Area ChartBMI2a5Mas Start */}
            <Col xs="12" xl="12">
              <section className="scroll-section" id="areaChart">
                <h2 className="small-title">IMC por idade (Meninos de 2 a 5 anos) - OMS</h2>
                <Card body className="mb-5">
                  <div className="sh-50">
                    <ChartBMI2a5Mas />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Area Chart End */}

            {/* Doughnut Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="doughnutChart">
                <h2 className="small-title">Doughnut Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartDoughnut />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Doughnut Chart End */}

            {/* Pie Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="pieChart">
                <h2 className="small-title">Pie Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartPie />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Pie Chart End */}

            {/* Bar Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="barChart">
                <h2 className="small-title">Bar Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartBar />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Bar Chart End */}

            {/* Rounded Bar Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="roundedBarChart">
                <h2 className="small-title">Rounded Bar Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartRoundedBar />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Rounded Bar Chart End */}

            {/* Horizontal Bar Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="horizontalBarChart">
                <h2 className="small-title">Horizontal Bar Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartHorizontalBar />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Horizontal Bar Chart End */}

            {/* Horizontal Rounded Bar Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="horizontalRoundedBarChart">
                <h2 className="small-title">Horizontal Rounded Bar Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartRoundedHorizontalBar />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Horizontal Rounded Bar Chart End */}

            {/* Radar Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="radarChart">
                <h2 className="small-title">Radar Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartRadar />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Radar Chart End */}

            {/* Polar Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="polarChart">
                <h2 className="small-title">Polar Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartPolar />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Polar Chart End */}

            {/* Scatter Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="scatterChart">
                <h2 className="small-title">Scatter Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartScatter />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Scatter Chart End */}

            {/* Bubble Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="bubbleChart">
                <h2 className="small-title">Bubble Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartBubble />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Bubble Chart End */}

            {/* Streaming Line Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="streamingLineChart">
                <h2 className="small-title">Streaming Line Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartStreamingLine />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Streaming Line Chart End */}

            {/* Streaming Bar Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="streamingBarChart">
                <h2 className="small-title">Streaming Bar Chart</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartStreamingBar />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Streaming Bar Chart End */}

            {/* Custom Tooltip Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="customVerticalTooltip">
                <h2 className="small-title">Custom Vertical Tooltip</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartCustomVerticalTooltip />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Custom Tooltip Chart End */}

            {/* Custom Tooltip Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="customHorizontalTooltip">
                <h2 className="small-title">Custom Horizontal Tooltip</h2>
                <Card body className="mb-5">
                  <div className="sh-35">
                    <ChartCustomHorizontalTooltip />
                  </div>
                </Card>
              </section>
            </Col>
            {/* Custom Tooltip Chart End */}

            {/* Custom Legend Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="customLegendDoughnut">
                <h2 className="small-title">Custom Legend Doughnut</h2>
                <Card body className="mb-5">
                  <ChartCustomLegendDoughnut />
                </Card>
              </section>
            </Col>
            {/* Custom Legend Chart End */}

            {/* Custom Legend Chart Start */}
            <Col xs="12" xl="6">
              <section className="scroll-section" id="customLegendBar">
                <h2 className="small-title">Custom Legend Bar</h2>
                <Card body className="mb-5">
                  <ChartCustomLegendBar />
                </Card>
              </section>
            </Col>
            {/* Custom Legend Chart End */}

            {/* Small Doughnut Charts Start */}
            <Col xs="12" xxl="6">
              <section className="scroll-section" id="smallDoughnutCharts">
                <h2 className="small-title">Small Doughnut Charts</h2>
                <Row className="row g-2 mb-5">
                  <Col xs="12" md="6" xl="6" xxl="6">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallDoughnutChart1 />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" md="6" xl="6" xxl="6">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallDoughnutChart2 />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" md="6" xl="6" xxl="6">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallDoughnutChart3 />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" md="6" xl="6" xxl="6">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallDoughnutChart4 />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" md="6" xl="6" xxl="6">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallDoughnutChart5 />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" md="6" xl="6" xxl="6">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallDoughnutChart6 />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" md="6" xl="6" xxl="6">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallDoughnutChart7 />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" md="6" xl="6" xxl="6">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallDoughnutChart8 />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>
            </Col>
            {/* Small Doughnut Charts End */}

            {/* Small Line Charts Start */}
            <Col xs="12" xxl="6">
              <section className="scroll-section" id="smallLineCharts">
                <h2 className="small-title">Small Line Charts</h2>
                <Row className="g-2 mb-5">
                  <Col xs="12" lg="6" xxl="12">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallLine1 />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" lg="6" xxl="12">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallLine2 />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" lg="6" xxl="12">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallLine3 />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" lg="6" xxl="12">
                    <Card className="sh-13">
                      <Card.Body className="py-0 d-flex align-items-center">
                        <ChartSmallLine4 />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>
            </Col>
            {/* Small Line Charts End */}

            {/* Large Line Charts Start */}
            <Col xs="12">
              <section className="scroll-section" id="largeLineCharts">
                <h2 className="small-title">Large Line Charts</h2>
                <Row className="g-2">
                  <Col xs="12" lg="12" xxl="6">
                    <Card className="mb-2 h-auto sh-xl-24" id="introFirst">
                      <Card.Body>
                        <Row className="g-0 h-100">
                          <ChartLargeLineSales />
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="12" lg="12" xxl="6">
                    <Card className="mb-2 h-auto sh-xl-24" id="introFirst">
                      <Card.Body>
                        <Row className="g-0 h-100">
                          <ChartLargeLineStock />
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>
            </Col>
            {/* Large Line Charts End */}
          </Row>
        </Col>
        <Scrollspy items={scrollspyItems} />
      </Row>
    </>
  );
};

export default ChartPage;
