import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


interface SaveProps {
  isDirty?: boolean,
  isSubmitting: boolean,
  isRetrieving?: boolean,
  className?: string,
  title?: string,
  isSubmittingTitle?: string,
}
const Save: React.FC<SaveProps> = ({
  isSubmitting,
  isRetrieving = false,
  className = "text-light",
  title = "Save",
  isSubmittingTitle = "Saving...",
}) => {
  let btnTitle = title;
  if (isRetrieving) {
    btnTitle = "Retrieving...";
  } else if (isSubmitting) {
    btnTitle = isSubmittingTitle;
  }

  return (
    <Button
      type="submit"
      id="save"
      size="sm"
      color="primary"
      className={className}
      /* disabled={!isDirty || isSubmitting || isRetrieving} */
      title={title}
    >
      <FontAwesomeIcon icon={faSave} className="me-2" />
      {btnTitle}
    </Button>
  );
};

export default Save;


