import { Row, Col, Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrderSummaryQuery } from '../../slices/ordersApiSlice';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardScreen = () => {
  const { data: summary, isLoading, error } = useGetOrderSummaryQuery();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales Over Time',
      },
    },
  };

  const chartData = {
    labels: summary?.salesData.map((d) => d._id),
    datasets: [
      {
        label: 'Sales',
        data: summary?.salesData.map((d) => d.totalSales),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {'data' in error && (error.data as { message: string }).message}
        </Message>
      ) : (
        <>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Total Orders</Card.Title>
                  <Card.Text>{summary?.totalOrders}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* ... Other stat cards for Products and Users ... */}
          </Row>
          <Row className="mt-4">
            <Col>
              <Line options={chartOptions} data={chartData} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default DashboardScreen;