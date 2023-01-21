import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormContext, Controller } from "react-hook-form";
import type { SingleValue } from "react-select";
import ReactSelect, { NonceProvider } from "react-select";

export interface SelectOptionsProps {
  label: string,
  value: string,
}


interface SelectProps {
  id: string,
  label: string,
  options: SelectOptionsProps[],
  value: string,
  required?: boolean,
  type?: string,
  readOnly?: boolean,
  horizontal?: boolean,
  loading?: boolean,
  isDisabled?: boolean,
  isClearable?: boolean,
  callback?: (e: SingleValue<SelectOptionsProps>) => void,
  placeholder?: string
}
const Select: React.FC<SelectProps> = ({
  id,
  label,
  options = [],
  required = false,
  isDisabled = false,
  callback = () => null,
  loading = false,
  value = "",
  horizontal = false,
  isClearable = false,
  placeholder
}) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  let groupClass = "";
  if (horizontal) groupClass += " mb-4";

  const lbl = (
    <>
      {label} {required && <span className="text-danger">*</span>}
    </>
  );

  return (
    <Form.Group className={groupClass} as={horizontal ? Row : "div"}>
      {(Boolean(label)) && (
        <Form.Label htmlFor={id} column={horizontal} sm={4}>
          {horizontal ? lbl : <small className="text-muted">{lbl}</small>}
        </Form.Label>
      )}
      <Col sm={horizontal ? 8 : 12}>
        <Controller
          name={id}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <NonceProvider cacheKey={id.toLowerCase()} nonce="react-select">
              <ReactSelect
                {...field}
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                className={`${(Boolean(errors[id])) && "is-invalid"}`}
                id={id}
                instanceId={id}
                options={options}
                isDisabled={isDisabled || isSubmitting}
                isLoading={loading}
                isClearable={isClearable}
                value={options?.find((option) => option.value === value)}
                onChange={(e: SelectOptionsProps | null) => {
                  const getValue = e === null ? "" : e.value;
                  field.onChange(getValue);
                  callback(e);
                }}
                placeholder={placeholder}
              />
            </NonceProvider>
          )}
        />
        {(Boolean(errors[id])) && (
          <Form.Control.Feedback type="invalid">
            This field is required.
          </Form.Control.Feedback>
        )}
      </Col>
    </Form.Group>
  );
};

export default Select;
