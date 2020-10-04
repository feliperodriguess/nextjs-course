import { GetStaticProps } from 'next';
import * as S from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface Top10Props {
  products: IProduct[];
}

const Top10 = ({ products }: Top10Props) => {
  return (
    <div>
      <section>
        <S.Title>Products</S.Title>

        <ul>
          {products.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Top10;

export const getStaticProps: GetStaticProps<Top10Props> = async ctx => {
  const response = await fetch('http://localhost:3333/products');
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 20,
  };
};
