import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { BootstrapBackgroundVariant } from '../types/Interface';

interface AsyncButtonProps {
  isSaving: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClickHandler?: () => void;
  children?: React.ReactNode;
  loadingText?: string;
  variant?: BootstrapBackgroundVariant;
  size?: 'sm' | 'lg';
  id?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const defaultAction = () => {};

function AsyncButton(props: AsyncButtonProps) {
  return (
    <>
      {props.isSaving ? (
        <Button
          id={props.id}
          variant={props.variant ?? 'primary'}
          size={props.size}
          type={props.type}
          className={`btn ${props.className}`}
          style={props.style}
          disabled
        >
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          {props.loadingText ? props.loadingText : 'Salvando, não feche a janela ...'}
        </Button>
      ) : (
        <Button
          id={props.id}
          variant={props.variant ?? 'primary'}
          size={props.size}
          type={props.type}
          className={`btn ${props.className}`}
          onClick={props.onClickHandler ?? defaultAction}
          style={props.style}
          disabled={props.disabled}
        >
          {props.children}
        </Button>
      )}
    </>
  );
}

export default AsyncButton;
