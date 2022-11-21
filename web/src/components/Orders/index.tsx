import { useEffect, useState } from 'react';
import { Order } from '../../@types/Order';
import { api } from '../../utils/api';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';
import socketIo from 'socket.io-client';



export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);


  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders(prevState => prevState.concat(order));
    });
  },[]);

  useEffect(() => {
    api.get('/orders')
      .then(( { data } ) => {
        setOrders(data);
      });
  },[]);

  const waiting = orders.filter((orders) => orders.status === 'WAITING');
  const inProduction = orders.filter((orders) => orders.status === 'IN_PRODUCTION');
  const done = orders.filter((orders) => orders.status === 'DONE');

  function handleCancelOrders(orderId: string) {
    setOrders((prevState) => prevState.filter((orders) => orders._id !== orderId ));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
        ? { ...order, status }
        : order
    )));
  }

  return(
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrders}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrders}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrders}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}


