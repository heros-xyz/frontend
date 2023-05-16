import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDevice } from "@/hooks/useDevice";

interface ImageResponsive {
  base?: string;
  lg?: string;
  xl?: string;
}

interface HerosImageProps {
  src: string;
  widthSize?: number;
  heightSize?: number;
  borderRadius?: string;
  loading?: "eager" | "lazy";
  width?: string | ImageResponsive;
  height?: string | ImageResponsive;
  alt?: string;
  fallbackSrc?: string;
  onClick?: () => void;
}

const HerosImage: React.FC<HerosImageProps> = ({
  src,
  widthSize = 400,
  heightSize = 400,
  borderRadius = "100%",
  loading,
  alt = "user-avatar",
  width = "60px",
  height = "60px",
  fallbackSrc = "/images/DefaultAvaCircle.png",
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const { isDesktop } = useDevice();

  const widthMemo = useMemo(() => {
    if (typeof width === "string") return width;
    if (!isDesktop) return width?.base;
    if (isDesktop) return width?.lg || width?.xl;
  }, [width, isDesktop]);

  const heightMemo = useMemo(() => {
    if (typeof height === "string") return height;
    if (!isDesktop) return height?.base;
    if (isDesktop) return height?.lg || height?.xl;
  }, [height, isDesktop]);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc ? imgSrc : "/images/DefaultAvaCircle.png"}
      alt={alt}
      width={widthSize}
      height={heightSize}
      loading={loading}
      style={{
        objectFit: "cover",
        borderRadius,
        width: widthMemo,
        height: heightMemo,
      }}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      onClick={onClick}
    />
  );
};

export default HerosImage;