import Image from "next/image";
import Col from "react-bootstrap/Col";

const Avatar = (): JSX.Element => {

  return (
    <div className="avatar">
      <Image src="/assets/member.png" alt="client" width={144} height={144} priority={true} />
      <Col>
        <ul className="list-unstyled " style={{ paddingTop: "10px" }}>
          <li>
          </li>
        </ul>
      </Col>
    </div>
  );
};

export default Avatar;



