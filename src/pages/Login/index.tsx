import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import * as S from './styles'

const loginFormSchema = z.object({
  email: z.string({ required_error: 'Name is required' }),
  password: z.string()
})

type SignInForm = z.infer<typeof loginFormSchema>

function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInForm>()

  const login = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => {
      return api.post('/sessions', credentials)
    },
    onSuccess: () => {
      console.log('success :)')
    }
  })

  const handleLogin = (data: SignInForm) => {
    console.log(data)
    login.mutate({ email: data.email, password: data.password })
    // navigate('/dashboard')
  }

  return (
    <S.Container>
      <S.LoginContainer>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <input placeholder="Email" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
          <input
            type="password"
            placeholder="Senha"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <S.Button type="submit">Login</S.Button>
          <p>
            Não tem uma conta? <a onClick={() => navigate('/signup')}>criar</a>
          </p>
        </form>
      </S.LoginContainer>
    </S.Container>
  )
}

export default Login
