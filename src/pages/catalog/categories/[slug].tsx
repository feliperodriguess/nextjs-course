import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '_lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import * as S from '_/styles/pages/Home';
import Link from 'next/link';
import { Document } from 'prismic-javascript/types/documents';

interface CategoryProps {
  category: Document;
  products: Document[];
}

export default function Category({ products, category }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(category.data.title)}</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/catalog/products/${product.uid}`}>
              <S.Link>{PrismicDOM.RichText.asText(product.data.title)}</S.Link>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category'),
  ]);

  const paths = categories.results.map(category => {
    return {
      params: { slug: category.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async ctx => {
  const { slug } = ctx.params;
  const category = await client().getByUID('category', String(slug), {});
  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id),
  ]);

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  };
};
