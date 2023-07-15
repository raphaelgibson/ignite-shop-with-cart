import { useState } from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import axios from 'axios'
import {
  Content,
  Overlay,
  CloseButton,
  BuyButton,
  BuyControl,
  CartContainer,
  CartProductsContainer,
  CartProductContainer,
  CartProductImageContainer,
  CartProductDetails,
  CartPriceDetails,
  Title,
} from '../styles/components/cart'
import { useShoppingCart } from 'use-shopping-cart'

export function CartModal() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { cartDetails, clearCart, removeItem } = useShoppingCart()
  const cartItems = Object.values(cartDetails)
  const cartItemsLength = cartItems.length

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceIds: cartItems.map(item => item.price_id),
      })

      const { checkoutUrl } = response.data
      clearCart()

      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <CartContainer>
          <CartProductsContainer>
            <Title>Sacola de compras</Title>
            {cartItems.map((cartItem, index) => (
              <CartProductContainer key={index}>
                <CartProductImageContainer>
                  <Image src={cartItem.image} width={102} height={93} alt="" />
                </CartProductImageContainer>
                <CartProductDetails>
                  <div>
                    <p>{cartItem.name}</p>
                    <span>{cartItem.formattedPrice}</span>
                  </div>

                  <div>
                    <button onClick={() => removeItem(cartItem.id)}>Remover</button>
                  </div>
                </CartProductDetails>
              </CartProductContainer>
            ))}
          </CartProductsContainer>

          <BuyControl>
            <CartPriceDetails>
              <div>
                <p>Quantidade</p>
                <span>Valor total</span>
              </div>
              <div>
                <p>{cartItemsLength} {cartItemsLength > 1 ? ' itens' : ' item'}</p>
                <span>{
                  new Intl.NumberFormat('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(cartItems.reduce((acc, item) => acc + item.price, 0) / 100)
                }</span>
              </div>
            </CartPriceDetails>

            <BuyButton disabled={isCreatingCheckoutSession || cartItemsLength === 0} onClick={handleBuyProduct}>
              Finalizar compra
            </BuyButton>
          </BuyControl>
        </CartContainer>
      </Content>
    </Dialog.Portal>
  )
}
