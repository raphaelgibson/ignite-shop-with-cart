import { useRef } from 'react'
import { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { CartProvider } from 'use-shopping-cart'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../assets/logo.svg'
import { globalStyles } from '../styles/global'
import { Container, Header, OpenCartButton } from '../styles/pages/app'
import { CartModal } from '../components/cartModal'
import { CartButton } from '../components/cartButton'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const openCartButtonRef = useRef(null)
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = process.env.NEXT_URL

  const handleOpenCart = () => {
    openCartButtonRef.current.click()
  }

  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.STRIPE_PUBLIC_KEY}
      successUrl={successUrl}
      cancelUrl={cancelUrl}
      currency="BRL"
      shouldPersist
    >
      <Container>
        <Header>
          <Link href="/" title="Página inicial">
            <Image src={logoImg} alt="" />
          </Link>

          <Dialog.Root>
              <Dialog.Trigger asChild>
                  <OpenCartButton title="Carrinho" ref={openCartButtonRef}>
                    <CartButton />
                  </OpenCartButton>
              </Dialog.Trigger>

              <CartModal />
          </Dialog.Root>
        </Header>

        <Component {...pageProps} handleOpenCart={handleOpenCart} />
      </Container>
    </CartProvider>
  )
}