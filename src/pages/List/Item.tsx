import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Avatar from "../components/Avatar";
import Button from "react-bootstrap/Button";
import type { ClientsProps } from "../constants";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const Item: React.FC<ClientsProps> = ({ name, status, organization, id, contact, createdAt, assignedUser }) => {
  const router = useRouter();
  return (
    <Card className="mb-4" key={id}>
      <Card.Body className="d-flex align-items-start justify-content-start">
        <Avatar />
        <div className="flex-grow-1 ms-4">
          <Row className="mb-2">
            <Col className="d-flex align-items-center justify-content-between">
              <h4 className="mb-0">
                <strong>{name}</strong>
              </h4>
              <div className="d-flex align-items-center justify-content-end">
                <Badge
                  bg={
                    status === "Active" ? "success" : "danger"
                  }
                  className="me-2 text-capitalize"
                >
                  Status:{status}
                </Badge>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={async () => { await router.push(`/edit/${id}`); }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={async () => { await router.push(`/view/${id}`); }}
                >
                  View
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="list-unstyled">
                <li>
                  Contact: <strong>{contact}</strong>
                </li>
                <li>
                  Organization: <strong>{organization}</strong>
                </li>
                <li>
                  Creation Date: <strong>{dayjs(createdAt).format("MMMM DD YYYY")}</strong>
                </li>
              </ul>
            </Col>
            <Col>
              <ul className="list-unstyled">
                <li>
                  Assigned user: <strong>{assignedUser}</strong>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Item;

