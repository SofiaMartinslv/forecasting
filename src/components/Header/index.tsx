import UserIcon from '@/assets/UserIcon'
import { useNavigate } from 'react-router-dom'
import * as S from './styles'

function Header({ background }: { background?: string }) {
  const navigate = useNavigate()
  return (
    <S.Header background={background}>
      <a onClick={() => navigate('/dashboard')}>Forecasting :)</a>{' '}
      <button onClick={() => navigate('/profile')}>
        <UserIcon color="white" />
      </button>
    </S.Header>
  )
}

export default Header
