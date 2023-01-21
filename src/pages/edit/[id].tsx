import Card from "react-bootstrap/Card";
import Back from "./../components/Back";
import Form from "./../Form/index";
const Edit = () => {

  return (
    <div className=" w-100">
      <div className="mb-4">
        <Back />
      </div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1 className="mb-0">Edit Client</h1>
      </div>
      <Card>
        <Card.Body>
          <Form />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Edit
