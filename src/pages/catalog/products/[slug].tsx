import { useRouter } from 'next/router';

const Product = () => {
  const router = useRouter();

  return <h1>{router.query.slug}</h1>;
};

export default Product;
