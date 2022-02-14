import PortfolioCard from "../components/PortfolioCard";
import fetchContent from "../utils/fetchContent.ts";

export async function getStaticProps() {
  //   const res = await fetchContent(`
  //   {
  //     featuredProjectsCollection {
  //       total

  // `);
  //   return {
  //     props: {
  //       portfolioCollection: "hello",
  //     },
  //   };

  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query {
          featuredProjectsCollection(limit: 10) {
            items {
              itemCollection {
                items {
                  title
                  slug
                  client
                  agency
                  otherProjects
                  media {
                    url
                  }
                  image {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      `,
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const portfolioData =
    data.featuredProjectsCollection.items[0].itemCollection.items;

  return {
    props: { portfolioCollection: portfolioData },
  };
}

export default function Recipes({ portfolioCollection }) {
  return (
    <div>
      <div className="strapline">
        <h1>
          Hello I'm David.{" "}
          <span role="img" aria-label="Waving hand">
            👋
          </span>
        </h1>
        <h2>
          <span className="intro">
            A Front-end developer &amp; part-time hockey player{" "}
            <span role="img" aria-label="Hockey stick">
              🏑
            </span>{" "}
            from London.
          </span>
          I like making things on the web,{" "}
          <a data-scroll="true" href="#cards">
            view my portfolio
          </a>{" "}
          or{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.github.com/imshuffling"
          >
            follow me on Github.
          </a>
        </h2>
        <h3>
          This site is built with{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.gatsbyjs.org/"
          >
            Next.js
          </a>{" "}
          and powered by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.contentful.com/"
          >
            Contentful.
          </a>
        </h3>
      </div>

      <div className="featured-works">
        {portfolioCollection.map((item) => (
          <PortfolioCard key={item.slug} item={item} />
        ))}
      </div>

      <style jsx>{`
        .featured-works {
          display: grid;
          grid-gap: 30px;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 1fr;
          margin: 80px 0;
        }
      `}</style>
    </div>
  );
}
