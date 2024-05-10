import styled from 'styled-components'
import background from '../../assets/background.jpg'

export const Background = styled.div`
  background: ${({ theme }) => theme.colors.blue300};
  background-image: url(${background});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
`

export const ProfileContainer = styled.div`
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.gray100};
  width: 500px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.26);
  padding: 64px 45px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  svg {
    margin: auto;
  }
`

export const ExitButton = styled.button`
  padding: 8px 0;
  font-weight: 700;
  color: red;
  border: 2px solid red;
  border-radius: 4px;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray100};
    background-color: red;
  }
`

export const ProfileInfo = styled.div`
  div {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.gray200};
    }
  }
`
export const ProfileLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.gray500};
`

export const ProfileValue = styled.span`
  color: ${({ theme }) => theme.colors.gray500};
  border-radius: 8px;
  padding: 5px 10px;
`

export const ProfileName = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`
