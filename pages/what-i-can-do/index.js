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
    <section>
      <h1>What I can do</h1>
      {servicesCollection && (
        <ul id="services">
          {servicesCollection.map((item, i) => (
            <li key={i}>
              <h3>{item.title}</h3>
              <div>{documentToReactComponents(item.body.json)}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
