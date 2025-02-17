import { styled } from "styled-components";
import { fontSize, fontWeight } from "@/utils/constant/style-const";
import Link from "next/link";

const LogoStyle = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: unset;

  svg {
    width: 25px;
  }
`;

export const BrandName = styled.div`
  font-size: ${fontSize.titleLarge};
  font-weight: ${fontWeight.semiBold};
`;

export default LogoStyle;
