import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Link, useLoaderData, type MetaFunction} from '@remix-run/react';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import hooks from '../css-hooks';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Blogs`}];
};

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 10,
  });

  const {blogs} = await storefront.query(BLOGS_QUERY, {
    variables: {
      ...paginationVariables,
    },
  });

  return json({blogs});
};

export default function Blogs() {
  const {blogs} = useLoaderData<typeof loader>();

  return (
    <section>
      <h1>Blogs</h1>
      <div
        style={hooks({
          display: 'grid',
          gridGap: '1.5rem',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(var(--grid-item-width), 1fr))',
          marginBottom: '2rem',
        })}
      >
        <Pagination connection={blogs}>
          {({nodes, isLoading, PreviousLink, NextLink}) => {
            return (
              <>
                <PreviousLink>
                  {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                </PreviousLink>
                {nodes.map((blog) => {
                  return (
                    <Link
                      key={blog.handle}
                      prefetch="intent"
                      to={`/blogs/${blog.handle}`}
                    >
                      <h2>{blog.title}</h2>
                    </Link>
                  );
                })}
                <NextLink>
                  {isLoading ? 'Loading...' : <span>Load more ↓</span>}
                </NextLink>
              </>
            );
          }}
        </Pagination>
      </div>
    </section>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blogs(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    blogs(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        handle
        seo {
          title
          description
        }
      }
    }
  }
` as const;
