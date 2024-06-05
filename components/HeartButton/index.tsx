import Image from "next/image";
import ic_heart from "@/images/ic_heart.svg";

interface HeartButtonProp {
  width: number;
  height: number;
}

const HeartButton = ({ width, height }: HeartButtonProp) => {
  return <Image src={ic_heart} alt="하트 버튼" width={width} height={height} />;
};

export default HeartButton;
