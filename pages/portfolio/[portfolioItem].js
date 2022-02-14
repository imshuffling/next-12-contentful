//import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
//import Image from "next/image";
//import Skeleton from "../../components/Skeleton";
import PortfolioCard from "../../components/PortfolioCard";
import ContentModules from "../../content-modules";
//import fetchContent from "../../utils/fetchContent.ts";

export default function PortfolioItem({ portfolioItem }) {
  // if (!portfolioItem) return <Skeleton />;

  const {
    title,
    link,
    completed,
    agency,
    client,
    timeframe,
    body,
    footerCollection,
    blocksCollection,
  } = portfolioItem;

  console.log("footerCollection", footerCollection);

  return (
    <div>
      <h1>{title}</h1>
      {link}
      {/* {completed}
      {agency}
      {client}
      {timeframe} */}


        <div className="portfolio-info">
          <div>
            <span>Client</span>
            <span>
              <strong>{client}</strong>
            </span>
          </div>
          <div>
            <span>Completed</span>
            <span>
              <strong>{completed}</strong>
            </span>
          </div>
          <div>
            <span>Timeframe</span>
            <span>
              <strong>{timeframe}</strong>
            </span>
          </div>
        </div>

      <div>{documentToReactComponents(body.json)}</div>
      {blocksCollection && (
        <ContentModules blocksCollection={blocksCollection} />
      )}
      {footerCollection && (
        <div className="footer-collections">
          {footerCollection.items.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>
      )}

      <style jsx>{`
        .footer-collections {
          margin-bottom: 6rem;
          margin-top: 12rem;
          display: grid;
          grid-gap: 30px;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 1fr;
        }
      `}</style>
    </div>
  );

  // return (
  //   <div>
  //     <div className="banner">
  //       <Image
  //         src={'https:' + featuredImage.fields.file.url}
  //         width={featuredImage.fields.file.details.image.width}
  //         height={featuredImage.fields.file.details.image.height}
  //       />
  //       <h2>{ title }</h2>
  //     </div>

  //     <div className="info">
  //       <p>Takes about { cookingTime } mins to cook.</p>
  //       <h3>Ingredients:</h3>

  //       {ingredients.map(ing => (
  //         <span key={ing}>{ ing }</span>
  //       ))}
  //     </div>

  //     <div className="method">
  //       <h3>Method:</h3>
  //       <div>{documentToReactComponents(method)}</div>
  //     </div>

  //     <style jsx>{`
  //       h2,h3 {
  //         text-transform: uppercase;
  //       }
  //       .banner h2 {
  //         margin: 0;
  //         background: #fff;
  //         display: inline-block;
  //         padding: 20px;
  //         position: relative;
  //         top: -60px;
  //         left: -10px;
  //         transform: rotateZ(-1deg);
  //         box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
  //       }
  //       .info p {
  //         margin: 0;
  //       }
  //       .info span::after {
  //         content: ", ";
  //       }
  //       .info span:last-child::after {
  //         content: ".";
  //       }
  //     `}</style>
  //   </div>
  // )
}

export async function getStaticProps({ params }) {
  const { portfolioItem } = params;

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
          query GetPortfolioItem($slug: String!) {
            portfolioCollection(
              where: {
                slug: $slug
              },
              limit: 1
            ) {
              items {
                title
                body {
                  json
                }
                slug
                link
                completed
                agency
                client
                timeframe
                blocksCollection {
                  items {
                    __typename
                    ... on Image {
                      __typename
                      image {
                        url
                        fileName
                        width
                        height
                      }
                    }
                    ... on Video {
                      __typename
                      image {
                        url
                        fileName
                        width
                        height
                      }
                      video {
                        fileName
                        url
                      }
                    }
                    ... on TextLeft {
                      __typename
                      title
                      body
                    }
                    ... on TextArea {
                      __typename
                      centerText
                      title
                      body
                    }
                    ... on TwoColumn {
                      __typename
                      image {
                        url
                        fileName
                        width
                        height
                      }
                      imageFirst
                      body
                    }
                  }
                }
                footerCollection {
                  items {
                    title
                    slug
                    link
                    agency
                    image {
                      url
                      width
                      height
                    }
                    media {
                      url
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          slug: portfolioItem,
        },
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();

  const [portfolioData] = data.portfolioCollection.items;

  return {
    props: { portfolioItem: portfolioData },
  };

  // const response = await fetchContent(`
  //   query GetPortfolioItem($slug: String!) {
  //     portfolioCollection(
  //       where: {
  //         slug: $slug
  //       },
  //       limit: 1
  //     ) {
  //       items {
  //         title
  //       }
  //     }
  //   },
  //   variables: {
  //     slug: portfolioItem,
  //   }
  // `);

  // return {
  //   props: {
  //     portfolioItem: response.portfolioCollection.items,
  //   },
  // };
}

export const getStaticPaths = async () => {
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
            portfolioCollection {
              items {
                slug
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
  const portfolioSlugs = data.portfolioCollection.items;

  console.log("portfolioSlugs", portfolioSlugs);

  const paths = portfolioSlugs.map(({ slug }) => {
    return {
      params: { portfolioItem: slug },
    };
  });

  console.log("paths", paths);

  return {
    paths,
    fallback: false,
  };
};
