import Image from "next/image";

export default function BlockImage({ image, lazyLoad }) {
  return (
    <div className="section image">
      <Image
        src={`${image.url}`}
        alt={image.fileName}
        height={image.height}
        width={image.width}
        layout="intrinsic"
        blurDataURL placeholder="blur"
        lazy={lazyLoad ? "lazy" : "eager"}
      />
    </div>
  );
}
