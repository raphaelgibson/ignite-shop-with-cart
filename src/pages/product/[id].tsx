import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import { useEffect, useState } from 'react'

interface ProductProps {
  handleOpenCart: () => void,
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    formattedPrice: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product, handleOpenCart }: ProductProps) {
  const [buttonText, setButtonText] = useState('Colocar na sacola')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const { addItem, cartDetails } = useShoppingCart()
  const cartItems = Object.values(cartDetails)

  useEffect(() => {
    if (cartItems.find(item => item.id === product.id)) {
      setButtonText('Este produto já está na sacola')
      setIsButtonDisabled(true)
    } else {
      setButtonText('Colocar na sacola')
      setIsButtonDisabled(false)
    }
  }, [cartItems, product.id])

  async function handleAddProductToCart() {
    addItem({
      currency: 'BRL',
      price: Number(product.price),
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.imageUrl,
      quantity: 1,
      price_id: product.defaultPriceId,
    })
    handleOpenCart()
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>
          <p>{product.description}</p>

          <button disabled={isButtonDisabled} onClick={handleAddProductToCart}>
            {buttonText}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NoQPXzkHgRDMeT' } },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        formattedPrice: new Intl.NumberFormat('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}
