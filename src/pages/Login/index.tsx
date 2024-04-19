import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as S from './styles'

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log(
      'Logging in with username:',
      username,
      'and password:',
      password
    )
    navigate("/dashboard")
  }

  return (
    <S.Container>
      <S.LoginContainer>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <S.Button onClick={handleLogin}>Login</S.Button>
        <p>Não tem uma conta? <a>criar</a></p>
      </S.LoginContainer>
    </S.Container>
  )
}

export default Login
