import Image from "next/image";
import ReactMarkdown from 'react-markdown'

export default function BlockTwoColumn({ image, body, imageFirst }) {
  return (
    <div
      className={
        imageFirst ? "section two-column" : "section two-column__reversed"
      }
      data-aos="fade-in"
      data-aos-delay="300"
      data-aos-once="true"
    >
      <Image
        src={`${image.url}`}
        alt={image.fileName}
        width={image.width}
        height={image.height}
        lazy="lazy"
        blurDataURL placeholder="blur"
      />
      <div><ReactMarkdown>{body}</ReactMarkdown></div>

      <style jsx>{`
        .two-column {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 30px;
        }
      `}</style>

    </div>
  );
}
