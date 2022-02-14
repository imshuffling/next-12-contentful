import fetchContent from "../../utils/fetchContent.ts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export async function getStaticProps() {
  const response = await fetchContent(`
  {
    servicesCollection {
        items {
          title
          body {
            json
          }
        }
      }
    }
  `);
  return {
    props: {
      servicesCollection: response.servicesCollection.items,
    },
  };
}

export default function services({ servicesCollection }) {
  return (
    <div>
      {servicesCollection && (
        <div className="services">
          {servicesCollection.map((item) => (
            <div>
              <h3>{item.title}</h3>
              <div>{documentToReactComponents(item.body.json)}</div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .services {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 80px;
          max-width: 70%;
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}
