import { Order } from '../../@types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

const orders: Order[] = [
  {
    '_id': '63737ee53354da647b95529d',
    'table': '123',
    'status': 'DONE',
    'products': [
      {
        'product': {
          'name': 'Pizza quatro queijos',
          'imagePath': '1668477516808-quatro-queijos.png',
          'price': 40,
        },
        'quantity': 1,
        '_id':  '63737ee53354da647b95529e',
      },
      {
        'product': {
          'name': 'Coca cola',
          'imagePath': '1668512633029-coca-cola.png',
          'price': 7,
        },
        'quantity': 1,
        '_id': '63737ee53354da647b95529f'
      }
    ],
  }
];

export function Orders() {
  return(
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em preparação"
        orders={[]}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={[]}
      />
    </Container>
  );
}


