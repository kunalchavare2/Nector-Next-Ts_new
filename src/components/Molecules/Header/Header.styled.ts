import styled, { css } from "styled-components";
import { device, fontSize } from "@/utils/constant/style-const";

const HeaderStyle = styled.header`
  /* position: fixed; */
  top: 0;
  width: 100%;
  padding: 1rem 0;
  display: none;
  align-items: center;
  z-index: 200;
  justify-content: center;
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  @media ${device.tablet} {
    display: flex;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 80%;
`;

export const HeaderItemWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const HeaderNavStyle = styled.div`
  ${HeaderItemWrapperStyle}
  gap: 1.5rem;
  & p {
    font-size: ${fontSize.captionRegular};
  }
`;

export const HeaderNavBtnStyle = styled.div`
  ${HeaderItemWrapperStyle}
`;

export const SearchBtnStyle = styled.button`
  background-color: transparent;
  outline: transparent;
  border: transparent;
  width: 24px;
  height: 24px;
  color: ${(props) => props.theme.primary};

  font-size: ${fontSize.titleLarge};
  cursor: pointer;
`;
export default HeaderStyle;
