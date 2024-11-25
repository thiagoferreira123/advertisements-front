import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

interface Props extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton = (props: Props) => {
  const { isLoading, disabled, ...rest } = props;
  return (
    <Button {...rest} disabled={isLoading || disabled}>
      {isLoading ? <span className="spinner-border spinner-border-sm"></span> : props.children}
    </Button>
  );
};

export default LoadingButton;
