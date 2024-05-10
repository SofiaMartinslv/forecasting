import styled from 'styled-components'
import background from '../../assets/background.jpg'
import * as Toast from '@radix-ui/react-toast'
import * as Form from '@radix-ui/react-form'

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.blue300};
  background-image: url(${background});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const LoginContainer = styled.div`
  background: rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgb(0 0 0 / 26%);
  backdrop-filter: blur(9.3px);
  -webkit-backdrop-filter: blur(9.3px);
  padding: 64px 45px;
  color: white;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  h1 {
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: bold;
  }

  input {
    padding: 16px;
    width: 300px;
    border-radius: 8px;
    border: 1px solid white;
    color: white;
    background-color: transparent;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  a,
  p {
    color: white;
  }

  a {
    font-weight: bold;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`

export const FormField = styled(Form.Field)`
  div {
    margin-top: 8px;
    text-align: right;
    font-size: 14px;
  }
`
export const CreateUser = styled.p`
  text-align: center;
  margin-top: 16px;
`

export const Button = styled.button`
  font-size: 16px;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.blue400};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue300};
  }
`

export const ToastRoot = styled(Toast.Root)`
  div:first-child {
    color: red;
    font-weight: bold;
  }
`
