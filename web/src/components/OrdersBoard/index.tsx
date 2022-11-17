import { useState } from 'react';
import { Order } from '../../@types/Order';
import { OrderModal } from '../OrderModal';
import { Board,OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }
  return(
    <>
      <Board>
        <OrderModal
          order={selectedOrder}
          visible={isModalVisible}
          onClose={handleCloseModal}
        />
        <header>
          <span>{icon}</span>
          <strong>{title}</strong>
          <span>({orders.length})</span>
        </header>
        { orders.length > 0 && (
          <OrdersContainer>
            {orders.map((order) => (
              <button type="button" onClick={() => handleOpenModal(order)} key={order._id}>
                <strong>{order.table}</strong>
                <span>{order.products.length} itens</span>
              </button>
            ))}
          </OrdersContainer>
        )}
      </Board>
    </>
  );
}
