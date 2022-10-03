import { Alert, Body } from "./styles";

const AlertComponent = ({ variant, message }) => {
  return (
    <Body>
      <Alert className={`alert ${variant}`} role="alert">
        {message}
      </Alert>
    </Body>
  );
};

export default AlertComponent;
