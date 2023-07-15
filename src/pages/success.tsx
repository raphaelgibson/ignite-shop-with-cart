import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Stripe from 'stripe'
import Image from 'next/image'
import Head from 'next/head'
import { ImageContainer, ImagesContainer, SuccessContainer } from '../styles/pages/success'
import { stripe } from '../lib/stripe'

interface SuccessProps {
  customerName: string
  products: {
    name: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesContainer>
          {products.map((product, index) => (
            <ImageContainer key={index}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length}
          {products.length > 1 ? ' camisetas' : ' camiseta'} já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const products = session.line_items.data.map(lineItem => lineItem.price.product as Stripe.Product)

  return {
    props: {
      customerName,
      products: products.map(product => {
        return {
          name: product.name,
          imageUrl: product.images[0],
        }
      })
    }
  }
}
