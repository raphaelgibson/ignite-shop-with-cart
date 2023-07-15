import { styled } from '..'
import Link from 'next/link'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '1.5rem 2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
    },

    span: {
      lineHeight: 1.4,
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },

    strong: {
      lineHeight: 1.6,
      fontSize: '$lg',
      color: '$gray100',
    },

    button: {
      color: '$white',
      backgroundColor: '$green500',
      border: 0,
      borderRadius: 6,
      padding: '0.75rem',

      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '$green300',
      }
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})