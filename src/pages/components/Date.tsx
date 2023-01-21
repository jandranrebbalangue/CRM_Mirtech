import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormContext, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DateFilterProps {
  id: string,
  label: string,
  name: string,
  value: string,
  horizontal?: boolean,
  required?: boolean,
  groupClass?: string,
  help?: string
}

const Date: React.FC<DateFilterProps> = ({ id, label, name, value, horizontal, required, help }) => {

  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  let groupClass = "";
  if (horizontal ?? false) groupClass += " mb-4";
  return (
    <Form.Group className={groupClass} as={(horizontal ?? false) ? Row : "div"}>
      <Form.Label htmlFor={id} column={horizontal} sm={4}>
        {label} {(Boolean(required)) && <span className="text-danger">*</span>}
      </Form.Label>
      <Col sm={(horizontal ?? false) ? 8 : 12}>
        <Controller
          name={id}
          control={control}
          rules={{ required }}
          defaultValue={value}
          render={({ field }) => (
            <ReactDatePicker
              onChange={(d) => {
                field.onChange(d);
              }}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              selected={field.value}
              disabled={isSubmitting}
              name={name}
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              className={`${(errors[id] != null) && "is-invalid"} form-control`}
              dropdownMode="select"
              placeholderText="Select Date"
              isClearable
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          This field is required.
        </Form.Control.Feedback>
        {(Boolean(help)) && <Form.Text muted>{help}</Form.Text>}
      </Col>
    </Form.Group>
  );
};

export default Date;


