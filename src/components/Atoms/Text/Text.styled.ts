import styled, { css } from "styled-components";
import { fontSize } from "../../../utils/constant/style-const";

type props = {
  size: string;
  textcolor: string;
};

const TextTypes = styled.div<props>`
  color: ${(props) => props.theme.primary};
  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return fontSize.captionRegular;
      case "medium":
        return fontSize.body;
      case "large":
        return fontSize.titleSmall;
      default:
        return props.size;
    }
  }};
`;
export default TextTypes;
