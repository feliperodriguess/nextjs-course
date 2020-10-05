import { GetServerSideProps } from 'next';
import Link from 'next/link';
import * as S from '_/styles/pages/Home';
import SEO from '_components/seo';
import { client } from '_lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <SEO
        title="The nicest e-commerce ever!"
        image="sons.png"
        shouldExcludeTitleSuffix
      />
      <section>
        <S.Title>Products</S.Title>

        <ul>
          {recommendedProducts.map(product => (
            <li key={product.id}>
              <Link href={`/catalog/products/${product.uid}`}>
                <S.Link>
                  {PrismicDOM.RichText.asText(product.data.title)}
                </S.Link>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
