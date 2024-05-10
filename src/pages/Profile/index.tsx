import UserIcon from '@/components/UserIcon/UserIcon';
import * as S from './styles';

const Profile = () => {
  // Mock user data
  const userData = {
    username: 'ZezinhoGameplays',
    company: 'ABC Inc.',
    number: '48 9-9999-9999',
    email: 'ZezinhoGameplays@example.com'
  };

  return (
    <S.Background>
      <S.ProfileContainer>
        <UserIcon width={50} height={50} color="#2181c4" /> 
        <S.ProfileName>{userData.username}</S.ProfileName>
        <S.ProfileInfo>
          <S.ProfileLabel>Empresa:</S.ProfileLabel>
          <S.ProfileValue>{userData.company}</S.ProfileValue>
        </S.ProfileInfo>
        <S.ProfileInfo>
          <S.ProfileLabel>Telefone:</S.ProfileLabel>
          <S.ProfileValue>{userData.number}</S.ProfileValue>
        </S.ProfileInfo>
        <S.ProfileInfo>
          <S.ProfileLabel>E-mail:</S.ProfileLabel>
          <S.ProfileValue>{userData.email}</S.ProfileValue>
        </S.ProfileInfo>
      </S.ProfileContainer>
    </S.Background>
  );
}

export default Profile;
