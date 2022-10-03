import ReactLoading from "react-loading";
import { Body } from "./styles";

const LoadingComponent = () => {
  return (
    <Body>
      <ReactLoading color="#003caa" type="spin" />
    </Body>
  );
};

export default LoadingComponent;
