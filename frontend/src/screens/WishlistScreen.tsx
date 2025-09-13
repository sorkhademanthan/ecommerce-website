import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetWishlistQuery } from '../slices/usersApiSlice';

const WishlistScreen = () => {
  const { data: wishlist, isLoading, error } = useGetWishlistQuery();

  return (
    <>
      <h1>My Wishlist</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {'data' in error && (error.data as { message: string }).message}
        </Message>
      ) : wishlist && wishlist.length > 0 ? (
        <Row>
          {wishlist.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Message>
          Your wishlist is empty. <Link to="/">Go Back</Link>
        </Message>
      )}
    </>
  );
};

export default WishlistScreen;