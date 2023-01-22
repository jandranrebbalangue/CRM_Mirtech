import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Back from "../components/Back";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "../components/Avatar";

const View = () => {
  const router = useRouter();
  const { id } = router.query;
  const clientId = parseInt(id as string, 10);
  const readMutation = api.client.getClientDetailsById.useQuery({ id: clientId })
  return (
    <div className="w-100">
      <div className="mb-4">
        <Back />
      </div>
      <Card className="mb-4" key={readMutation.data?.id}>
        <Card.Body className="d-flex align-items-start justify-content-start">
          <Avatar />
          <div className="flex-grow-1 ms-4">
            <Row className="mb-2">
              <Col className="d-flex align-items-center justify-content-between">
                <h4 className="mb-0">
                  <strong>{readMutation.data?.name}</strong>
                </h4>
                <div className="d-flex align-items-center justify-content-end">
                  <Badge
                    bg={
                      readMutation.data?.status === "Active" ? "success" : "danger"
                    }
                    className="me-2 text-capitalize"
                  >
                    Status:{readMutation.data?.status}
                  </Badge>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <ul className="list-unstyled">
                  <li>
                    Contact information: <strong>{readMutation.data?.contact}</strong>
                  </li>
                  <li>
                    Organization: <strong>{readMutation.data?.organization}</strong>
                  </li>
                  <li>
                    Creation Date: <strong>{dayjs(readMutation.data?.createdAt).format("MMMM DD YYYY")}</strong>
                  </li>
                </ul>
              </Col>
              <Col>
                <ul className="list-unstyled">
                  <li>
                    Assigned user: <strong>{readMutation.data?.assignedUser}</strong>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default View



