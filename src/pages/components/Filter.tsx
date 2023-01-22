import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import { STATUS_OPTIONS } from "../constants";
import Select from "./Select";
import Date from "./Date";
import dayjs from "dayjs";


interface StatusFilterProps {
  setStatusFilter: (value: string | undefined) => void;
  setDateFilter: (value: string) => void;
}

const Filters: React.FC<StatusFilterProps> = ({ setStatusFilter, setDateFilter }): JSX.Element => {
  const methods = useForm();
  const { watch } = methods;
  const status = watch("status") as string
  const createdBy = watch("createdAt") as string

  useEffect(() => {
    if (status !== "") {
      setStatusFilter(status)
    } else {
      setStatusFilter(undefined)
    }
    if (createdBy !== null && createdBy !== "" && createdBy !== undefined) {
      const formatDate = dayjs(createdBy).format("MM/DD/YYYY")
      setDateFilter(formatDate)
    } else {
      setDateFilter("")
    }
  }, [createdBy, setDateFilter, setStatusFilter, status])

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
                />
              </Col>
              <Col>
                <Date id="createdAt" label="Created By" name="createdBy" value={createdBy} />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </FormProvider>
  );
};

export default Filters;

