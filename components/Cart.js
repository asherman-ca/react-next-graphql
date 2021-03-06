import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// solves render prop mess, this was initially a nested mess of queries and mutations. see bottom of page
import { adopt } from 'react-adopt';
import User from './User';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import TakeMyMoney from './TakeMyMoney';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;
/* eslint-disable */
const Composed = adopt({
  // render function placed as child used as workaround for false error in console, generally sytax is just user: <User />
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});
/* eslint-enable */

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const me = user.data.me;
      if (!me) return null;
      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <CloseButton onClick={toggleCart} title="close">
              &times;
            </CloseButton>
            <Supreme>{me.name}'s Cart</Supreme>
            <p>
              You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your cart.
            </p>
          </header>
          <ul>{me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}</ul>
          <footer>
            <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            {me.cart.length && (
              <TakeMyMoney>
                <SickButton>Checkout</SickButton>
              </TakeMyMoney>
            )}
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };



// BEFORE REFACTOR WITH ADOPT PACKAGE
// 
// 
// const Cart = () => (
//   <User>
//     {({ data: { me } }) => {
//       if (!me) return null;
//       console.log(me);
//       return (
//         <Mutation mutation={TOGGLE_CART_MUTATION}>
//           {toggleCart => (
//             <Query query={LOCAL_STATE_QUERY}>
//               {({ data }) => (
//                 <CartStyles open={data.cartOpen}>
//                   <header>
//                     <CloseButton onClick={toggleCart} title="close">
//                       &times;
//                     </CloseButton>
//                     <Supreme>{me.name}'s Cart</Supreme>
//                     <p>
//                       You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your cart.
//                     </p>
//                   </header>
//                   <ul>
//                     {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
//                   </ul>
//                   <footer>
//                     <p>{formatMoney(calcTotalPrice(me.cart))}</p>
//                     <SickButton>Checkout</SickButton>
//                   </footer>
//                 </CartStyles>
//               )}
//             </Query>
//           )}
//         </Mutation>
//       );
//     }}
//   </User>
// );