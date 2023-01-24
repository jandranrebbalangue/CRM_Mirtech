import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import type { SelectOptionsProps } from "../constants";
import { STATUS_OPTIONS } from "../constants";
import Select from "./Select";
import Date from "./Date";


interface StatusFilterProps {
  onSelectStatus: (value: SelectOptionsProps | null) => void
  onSelectDate: (value: Date | null) => void
}

const Filters: React.FC<StatusFilterProps> = ({ onSelectStatus, onSelectDate }): JSX.Element => {
  const methods = useForm();
  const { watch } = methods;
  const status = watch("status") as string
  const createdAt = watch("createdAt") as string


  return (
    <FormProvider {...methods}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>
            <h4 className="font-weight-bold">Filter by</h4>
          </Card.Title>
          <Form>
            <Row className="mb-2">
              <Col>
                <Select
                  id="status"
                  label="Status"
                  options={STATUS_OPTIONS}
                  isClearable={true}
                  value={status}
                  placeholder="Select status"
                  callback={onSelectStatus}
                />
              </Col>
              <Col>
                <Date id="createdAt" label="Created At" name="createdAt" value={createdAt} callback={onSelectDate} />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </FormProvider>
  );
};

export default Filters;

