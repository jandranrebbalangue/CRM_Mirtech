import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router";

const Back = (): JSX.Element => {
  const router = useRouter();
  return (
    <Button
      type="button"
      id="back"
      size="sm"
      variant="outline-primary"
      onClick={() => { void router.back(); }}
      title="Back"
    >
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </Button>
  );
};

export default Back;


