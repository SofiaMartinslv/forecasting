import styled from 'styled-components'
import background from '../../assets/background.jpg'
import * as Form from '@radix-ui/react-form'
import * as Toast from '@radix-ui/react-toast'

export const Background = styled.div`
  background: ${({ theme }) => theme.colors.blue300};
  background-image: url(${background});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const SignUpContainer = styled.div`
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgb(0 0 0 / 26%);
  border-radius: 8px;
  padding: 64px 45px;

  h1 {
    margin: 10px 0;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.black};
    font-weight: bold;
    text-align: center;
  }

  div {
    width: 100%;
  }

  input {
    box-sizing: border-box;
    padding: 16px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
    background-color: transparent;
    &:focus {
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray500};
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
  label {
    font-size: 14px;
    line-height: 28px;
  }
  div {
    font-size: 12px;
    margin: 8px 0;
    text-align: right;
  }
`

export const FlexGroup = styled.div`
  display: flex;
  gap: 8px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Button = styled.button`
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

export const ErrorToastRoot = styled(Toast.Root)`
  border-left: 6px solid red;
  div:first-child {
    color: red;
    font-weight: bold;
  }
`

export const SuccessToastRoot = styled(Toast.Root)`
  border-left: 6px solid green;
  div:first-child {
    color: green;
    font-weight: bold;
  }
`