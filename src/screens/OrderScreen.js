import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, deliverOrder} from '../actions/orderActions'
import { ORDER_DELIVER_RESET} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {

  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (!order ||  successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
 
  }, [dispatch, orderId, successDeliver, order])
  
 
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Porudzbina broj {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Dostava</h2>
              <p>
                <strong>Ime: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Adresa:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Dostavljeno {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='success'>Nije Dostavljeno</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Metoda placanja</h2>
              <p>
                <strong>Metoda: </strong>
                {order.paymentMethod}
                </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Proizvodi</h2>
              {order.orderItems.length === 0 ? (
                <Message>Porudzbina prazna</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Racun</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Cena proizvoda</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Dostava</Col>
                  <Col>$2</Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <Row>
                  <Col>Ukupno</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            
                  {userInfo &&
                userInfo.isAdmin &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                      style={{backgroundColor: 'green'}}
                    >
                      Oznaci kao dostavljeno
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default OrderScreen