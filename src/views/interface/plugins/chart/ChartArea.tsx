import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import CrosshairPlugin from 'chartjs-plugin-crosshair';

import { useSelector } from 'react-redux';

const ChartArea = () => {
  const { themeValues } = useSelector((state) => state.settings);
  const chartContainer = useRef(null);
  const ChartTooltipForCrosshair = React.useMemo(() => {
    return {
      enabled: true,
      position: 'nearest',
      backgroundColor: themeValues.foreground,
      titleColor: themeValues.primary,
      titleFont: themeValues.font,
      bodySpacing: 10,
      bodyColor: themeValues.body,
      bodyFont: themeValues.font,
      padding: 15,
      cornerRadius: parseInt(themeValues.borderRadiusMd, 10),
      displayColors: false,
      borderColor: themeValues.separator,
      borderWidth: 1,
      intersect: false,
      mode: 'index',
    };
  }, [themeValues]);
  const Crosshair = React.useMemo(() => {
    return {
      sync: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
      line: {
        color: themeValues.separator,
        width: 1,
      },
    };
  }, [themeValues]);

  const months = ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37']; // Substitua pelos meses corretos
  const P15Data = [14.4, 14.4, 14.4, 14.3, 14.3, 14.3, 14.3, 14.2, 14.2, 14.2, 14.2, 14.1, 14.1, 14.1];
  const P25Data = [14.8, 14.8, 14.8, 14.8, 14.7, 14.7, 14.7, 14.7, 14.6, 14.6, 14.6, 14.6, 14.5, 14.5];
  const P50Data = [15.7, 15.7, 15.6, 15.6, 15.6, 15.6, 15.5, 15.5, 15.5, 15.5, 15.4, 15.4, 15.4, 15.4];
  const P75Data = [16.6, 16.6, 16.6, 16.5, 16.5, 16.5, 16.5, 16.4, 16.4, 16.4, 16.4, 16.3, 16.3, 16.3];

  const data = React.useMemo(() => {
    return {
      labels: months,
      datasets: [
        {
          label: 'P15',
          data: P15Data,
          // Estilos para P15
        },
        {
          label: 'P25',
          data: P25Data,
          // Estilos para P25
        },
        {
          label: 'P50',
          data: P50Data,
          // Estilos para P50
        },
        {
          label: 'P75',
          data: P75Data,
          // Estilos para P75
        },
        // Adicione mais datasets conforme necessário
      ],
    };
  }, [themeValues]);
  const config = React.useMemo(() => {
    return {
      type: 'line',
      plugins: [CrosshairPlugin],
      options: {
        layout: {
          padding: 0,
        },
        showLine: true,
        plugins: {
          crosshair: Crosshair,
          datalabels: false,
          tooltip: ChartTooltipForCrosshair,
          legend: false,
          streaming: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            grid: {
              display: true,
              lineWidth: 1,
              color: themeValues.separatorLight,
              drawBorder: false,
              drawTicks: true,
            },
            ticks: {
              padding: 8,
              stepSize: 5,
              fontColor: themeValues.alternate,
            },
          },
          x: {
            type: 'category',
            grid: {
              display: false,
              drawTicks: true,
              drawBorder: false,
            },
            ticks: { fontColor: themeValues.alternate },
          },
        },
      },
      data,
    };
  }, [themeValues, data, ChartTooltipForCrosshair, Crosshair]);

  useEffect(() => {
    let myChart = null;
    if (chartContainer && chartContainer.current) {
      Chart.register(...registerables);

      myChart = new Chart(chartContainer.current, config);
    }
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [config]);

  return <canvas ref={chartContainer} />;
};

export default React.memo(ChartArea);
