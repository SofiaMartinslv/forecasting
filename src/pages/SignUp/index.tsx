import { useState } from 'react'
import * as S from './styles'

function SignUp() {
  const [username, setUsername] = useState('')
  const [company, setCompany] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = () => {
    console.log('cadastrado :)')
  }

  return (
    <S.Background>
      <S.SignUpContainer>
        <h1>Cadastro</h1>
        <S.InputGroup>
          <div>
            <label htmlFor="user">Usuário</label>
            <input
              id="user"
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <S.FlexGroup>
            <div>
              <label htmlFor="company">Empresa</label>
              <input
                type="text"
                id="company"
                placeholder="Empresa"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="number">Telefone</label>
              <input
                type="number"
                id="number"
                placeholder="(XX) XXXX-XXXX"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </S.FlexGroup>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <S.Button onClick={handleSignUp}>Cadastrar</S.Button>
        </S.InputGroup>
      </S.SignUpContainer>
    </S.Background>
  )
}

export default SignUp
