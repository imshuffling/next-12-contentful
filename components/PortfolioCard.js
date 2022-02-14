import Link from "next/link";
import Image from "next/image";

export default function RecipeCard({ item }) {
  const { title, slug, media, image, agency } = item;

  return (
    <div className="card">
      <Link href={"/portfolio/" + slug}>
        <a>
          <div className="featured">
            {media && (
              <video loop muted autoPlay playsInline>
                <source src={media.url} type="video/mp4" />
              </video>
            )}
            <Image src={image.url} objectFit="cover" layout="fill" />
          </div>
          <div className="content">
            <p className="agency">{agency}</p>
            <div className="info">
              <h3>{title}</h3>
            </div>
            <p className="actions">View Project</p>
          </div>
        </a>
      </Link>

      <style jsx>{`
        .card {
          aspect-ratio: 1/1;
          background: #fff;
          border: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          text-decoration: none;
          transition-delay: 0.15s;
          transition-property: color;
          position: relative;
        }

        video {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          z-index: 1;
        }

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .content {
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 2rem;
          z-index: 2;
          color: white;
        }
      `}</style>
    </div>
  );
}
