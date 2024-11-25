import React from 'react';

interface EmptyProps {
  message?: string;
  classNames?: string;
  disableMargin?: boolean;
}

const Empty = (props: EmptyProps) => {
  return (
    <div
      className={`h-100 p-4 text-center align-items-center d-flex flex-column justify-content-center ${props.classNames ?? ''}`}
      style={{ marginTop: props.disableMargin ? '0' : '4rem' }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center sh-5 sw-5 rounded-xl bg-gradient-primary mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cs-icon cs-icon-radish text-primary"
        >
          <path d="M11.7851 15.4134C9.18163 18.0169 4.86137 17.9177 3.53555 16.5919C2.20973 15.2661 2.11056 10.9458 4.71406 8.34231C7.31755 5.73881 8.82903 4.91481 12.0208 8.10661C15.2126 11.2984 14.3886 12.8099 11.7851 15.4134Z"></path>
          <path d="M6.36395 8.1066 8.13172 9.87436M9 14 10.7678 15.7678M3 12 4.76777 13.7678M12.1778 7.94978V7.94978C13.4446 6.68295 15.3799 6.36889 16.9824 7.1701L17.1275 7.24268M12.1777 7.94975V7.94975C13.4445 6.68292 13.7586 4.74757 12.9573 3.14515L12.8848 3M14.1569 6.00003 15.5711 4.58582"></path>
        </svg>
      </div>
      <p className="mb-0 lh-1">{props.message ?? 'Área vazia...'}</p>
    </div>
  );
};

export default Empty;
