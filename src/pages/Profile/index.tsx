import UserIcon from '@/assets/UserIcon'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { api } from '@/lib/axios'
import Header from '@/components/Header'
import * as S from './styles'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAxiosError } from 'axios';

type UserData = {
  name: string
  company: string
  number: string
  email: string
}

const Profile = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const message = error.response?.data?.message

          if (message === 'Unauthorized.') {
            navigate('/', { replace: true })
          }
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get<UserData>('/me')
      return response.data
    }
  })

  const handleSignOut = () => {
    navigate('/')
  }

  return (
    <>
      <Header background={'#2199c4'} />
      <S.Background>
        <S.ProfileContainer>
          <UserIcon width={70} height={70} color="#949494" />
          <S.ProfileName>{user?.name}</S.ProfileName>
          <S.ProfileInfo>
            <div>
              <S.ProfileLabel>Empresa:</S.ProfileLabel>
              <S.ProfileValue>{user?.company}</S.ProfileValue>
            </div>
            <div>
              <S.ProfileLabel>Telefone:</S.ProfileLabel>
              <S.ProfileValue>{user?.number}</S.ProfileValue>
            </div>
            <div>
              <S.ProfileLabel>E-mail:</S.ProfileLabel>
              <S.ProfileValue>{user?.email}</S.ProfileValue>
            </div>
          </S.ProfileInfo>
          <S.ExitButton onClick={handleSignOut}>SAIR</S.ExitButton>
        </S.ProfileContainer>
      </S.Background>
    </>
  )
}

export default Profile
