import styled from 'styled-components';
import background from '../../assets/background.jpg';

export const Background = styled.div`
  background: ${({ theme }) => theme.colors.blue300};
  background-image: url(${background});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const ProfileContainer = styled.div`
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.26);
  padding: 64px 45px;
  display: flex;
  flex-direction: column;

  gap: 16px;

  h1 {
    margin: 10px 0;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.black};
    font-weight: bold;
  }

  input {
    padding: 16px;
    width: 300px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray500};
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.gray100};
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray300};
    }
  }

  a,
  p {
    color: ${({ theme }) => theme.colors.black};
  }

  a {
    font-weight: bold;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ProfileTag = styled.div`
  background-color: ${({ theme }) => theme.colors.blue400};
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
export const ProfileLabel = styled.span`
  font-weight: bold;
  margin-right: 10px; /* Added margin-right */
  color: ${({ theme }) => theme.colors.gray500}; /* Changed color to light gray */
`;


export const ProfileValue = styled.span`
  color: ${({ theme }) => theme.colors.gray300}; 
  border-radius: 8px; 
  padding: 5px 10px; 
 
`;

export const ProfileName = styled.h1`
  color: ${({ theme }) => theme.colors.black}; 
  margin-top: 40px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;
