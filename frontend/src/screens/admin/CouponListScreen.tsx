import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} from '../../slices/couponsApiSlice';
import { useState } from 'react';

const CouponListScreen = () => {
  const { data: coupons, isLoading, error, refetch } = useGetCouponsQuery();
  const [createCoupon, { isLoading: loadingCreate }] = useCreateCouponMutation();
  const [deleteCoupon, { isLoading: loadingDelete }] = useDeleteCouponMutation();

  // State for the new coupon form
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [expiry, setExpiry] = useState('');

  const createCouponHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCoupon({ code, discount, expiry: new Date(expiry) }).unwrap();
      refetch();
      // Clear form fields
      setCode('');
      setDiscount(0);
      setExpiry('');
    } catch (err) {
      console.error(err); // We'll add a toast for this later
    }
  };

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteCoupon(id);
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <h2>Coupons</h2>
          {loadingDelete && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {'data' in error && (error.data as { message: string }).message}
            </Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>DISCOUNT</th>
                  <th>EXPIRY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {coupons?.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon.code}</td>
                    <td>{coupon.discount}%</td>
                    <td>{new Date(coupon.expiry).toISOString().substring(0, 10)}</td>
                    <td>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(coupon._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
        <Col md={6}>
          <h2>Create Coupon</h2>
          {loadingCreate && <Loader />}
          <Form onSubmit={createCouponHandler}>
            <Form.Group controlId="code" className="my-2">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="discount" className="my-2">
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter discount"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="expiry" className="my-2">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CouponListScreen;