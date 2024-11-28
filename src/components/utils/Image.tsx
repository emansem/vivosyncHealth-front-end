import Image from "next/image";
const imageStyles = `relative cursor-pointer rounded-full overflow-hidden`;
interface ImageProps {
  imageStyle: string;
  altAttribute: string;
  imageUrl?: string;
}

function ImageComponent({ imageStyle, imageUrl, altAttribute }: ImageProps) {
  return (
    <div className={`${imageStyles} ${imageStyle}`}>
      <Image
        src={`${imageUrl || "https://i.postimg.cc/026P6nxK/image.jpg"}`}
        alt={altAttribute}
        fill
        sizes="100px"
        className="object-cover"
      />
    </div>
  );
}

export default ImageComponent;
