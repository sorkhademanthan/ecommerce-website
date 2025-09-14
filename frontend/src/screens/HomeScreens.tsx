import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import Paginate from '../components/Paginate'; // Import Paginate
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber: Number(pageNumber) || 1,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {'data' in error && (error.data as { message: string }).message}
        </Message>
      ) : data ? (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default HomeScreen;