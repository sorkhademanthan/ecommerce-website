import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../slices/categoriesApiSlice';
import { useState } from 'react';

const CategoryListScreen = () => {
  const { data: categories, isLoading, error, refetch } = useGetCategoriesQuery();
  const [createCategory, { isLoading: loadingCreate }] = useCreateCategoryMutation();
  const [deleteCategory, { isLoading: loadingDelete }] = useDeleteCategoryMutation();

  const [name, setName] = useState('');

  const createCategoryHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCategory({ name }).unwrap();
      refetch();
      setName('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteCategory(id);
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2>Categories</h2>
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
                <th>ID</th>
                <th>NAME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(category._id)}
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
        <h2>Create Category</h2>
        {loadingCreate && <Loader />}
        <Form onSubmit={createCategoryHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-2">
            Create
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default CategoryListScreen;