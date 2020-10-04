import { GetServerSideProps } from 'next';
import * as S from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

const Home = ({ recommendedProducts }: HomeProps) => {
  return (
    <div>
      <section>
        <S.Title>Products</S.Title>

        <ul>
          {recommendedProducts.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
