import styled from 'styled-components'

export const Header = styled.header<{ background?: string }>`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 64px;
  justify-content: space-between;
  padding-left: 4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray100};
  background-color: ${({ background }) =>
    background ? background : ({ theme }) => theme.colors.blue400};

  button,
  a {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
`
