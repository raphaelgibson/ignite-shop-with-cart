import { Handbag } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import { TotalCartItems } from '../styles/pages/app'

export function CartButton() {
  const { cartDetails } = useShoppingCart()
  const totalCartItems = Object.values(cartDetails).length
  return (
    <>
      <Handbag size={24} weight="bold" />
      {totalCartItems > 0 && (
        <TotalCartItems>{totalCartItems}</TotalCartItems>
      )}
    </>
  )
}
