import React from "react";
import { Spinner } from "react-bootstrap";

export default (props: { className?: string }) => (
  <div className={`w-100 text-center ${props.className ?? ''}`}>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);
