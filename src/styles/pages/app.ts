import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh'
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto'
})

export const OpenCartButton = styled('button', {
  position: 'relative',
  color: '$gray300',
  backgroundColor: '$gray800',
  border: 0,
  borderRadius: 6,
  padding: '0.75rem',

  '&:hover': {
    cursor: 'pointer',
  }
})

export const TotalCartItems = styled('div', {
  position: 'absolute',
  width: '1.5rem',
  height: '1.5rem',
  right: '-0.5rem',
  top: '-0.5rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '50%',
  backgroundColor: '$green500',

  color: '$white',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  letterSpacing: '-0.06em',
})
