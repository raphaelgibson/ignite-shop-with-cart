import { styled } from '..'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.75)'
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray300'
})

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  padding: '4.5rem 3rem 3rem',
  minWidth: '30rem',
  height: '100vh',
  backgroundColor: '$gray800',
})

export const CartContainer = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const Title = styled(Dialog.Title, {
  marginBottom: '0.5rem',
})

export const CartProductsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const CartProductContainer = styled('div', {
  display: 'flex',
  gap: '1.25rem',
})

export const CartProductImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,

  display: 'flex',

  img: {
    objectFit: 'cover',
  }
})

export const CartProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  lineHeight: 1.6,
  fontSize: '$md',

  p: {
    marginBottom: '0.125rem',
  },

  span: {
    fontWeight: 'bold',
  },

  button: {
    textAlign: 'left',
    backgroundColor: 'transparent',
    border: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '$green500',

    '&:hover': {
      cursor: 'pointer',
      color: '$green300',
    }
  }
})

export const BuyControl = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '3.5rem',
  lineHeight: '1.6',
})

export const CartPriceDetails = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

export const BuyButton = styled('button', {
  width: '100%',
  backgroundColor: '$green500',
  border: 0,
  color: '$white',
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  }
})
