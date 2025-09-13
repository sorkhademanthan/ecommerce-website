import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // 1. Import useParams
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice'; // 2. Use the correct RTK Query hook

const HomeScreen = () => {
  // 3. Get the keyword from the URL parameters
  const { keyword } = useParams();

  // 4. Call the hook with the keyword. RTK Query handles the rest.
  const { data: products, isLoading, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {'data' in error && (error.data as { message: string }).message}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;