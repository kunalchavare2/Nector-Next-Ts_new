
import InfoStyle, { InfoImg, InfoMessage } from "./Info.styled";
import Image from "next/image";

type InfoProps = {
  img: any;
  message: string;
};

const Info = ({ img, message }: InfoProps) => {
  return (
    <InfoStyle>
      <InfoImg>
        <Image src={img} alt={message} width={300} height={300} />
      </InfoImg>
      <InfoMessage>{message}</InfoMessage>
    </InfoStyle>
  );
};

export default Info;
