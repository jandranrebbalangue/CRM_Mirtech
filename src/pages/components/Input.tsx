import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormContext } from "react-hook-form";

interface InputProps {
  id: string,
  label: string,
  required?: boolean,
  type?: string,
  readOnly?: boolean,
  horizontal?: boolean,
  useFieldArrayError?: string,
  help?: string,
  isDisabled?: boolean,
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  required = false,
  type = "text",
  readOnly = false,
  horizontal = false,
  help = "",
  isDisabled = false,
  ...rest
}) => {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext();
  const { onChange, ...fieldRest } = register(id, { required });

  let groupClass = type === "hidden" ? "d-none" : "";
  if (horizontal) groupClass += " mb-4";

  const lbl = (
    <>
      {label} {required && <span className="text-danger">*</span>}
    </>
  );

  return (
    <Form.Group className={groupClass} as={horizontal ? Row : "div"}>
      <Form.Label htmlFor={id} column={horizontal} sm={4}>
        {horizontal ? lbl : <small className="text-muted">{lbl}</small>}
      </Form.Label>
      <Col sm={horizontal ? 8 : 12}>
        <Form.Control
          type={type}
          id={id}
          disabled={(Boolean(isSubmitting)) || isDisabled}
          readOnly={readOnly}
          {...rest}
          onChange={async (e) => {
            await onChange(e);
          }}
          {...fieldRest}
        />
        {(Boolean(help)) && <Form.Text muted>{help}</Form.Text>}
      </Col>
    </Form.Group>
  );
};

export default Input;

