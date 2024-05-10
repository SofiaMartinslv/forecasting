import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '@/lib/axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import * as Form from '@radix-ui/react-form'
import * as Toast from '@radix-ui/react-toast'
import * as S from './styles'

const loginFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string()
  })
  .strict()

type SignInForm = z.infer<typeof loginFormSchema>

function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SignInForm>()
  const [toast, setToast] = useState(false)

  const login = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => {
      return api.post('/sessions', credentials)
    },
    onSuccess: () => {
      navigate('/dashboard')
    },
    onError: () => {
      setToast(true)
    }
  })

  const handleLogin = (data: SignInForm) => {
    login.mutate({ email: data.email, password: data.password })
  }

  return (
    <S.Container>
      <S.LoginContainer>
        <h1>Login</h1>
        <Form.Root onSubmit={handleSubmit(handleLogin)}>
          <S.FormField name="email">
            <Form.Control asChild>
              <input
                type="email"
                placeholder="Email"
                {...register('email')}
                required
              />
            </Form.Control>
            <div>
              <Form.Message match="valueMissing">
                Preencha seu email
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Email inválido
              </Form.Message>
            </div>
          </S.FormField>
          <S.FormField name="password">
            <Form.Control asChild>
              <input
                type="password"
                placeholder="Senha"
                {...register('password')}
                required
              />
            </Form.Control>
            <div>
              <Form.Message match="valueMissing">
                Preencha sua senha
              </Form.Message>
            </div>
          </S.FormField>
          <Form.Submit asChild>
            <S.Button type="submit">Login</S.Button>
          </Form.Submit>
        </Form.Root>
        <S.CreateUser>
          Não tem uma conta? <a onClick={() => navigate('/signup')}>criar</a>
        </S.CreateUser>
      </S.LoginContainer>

      <S.ToastRoot
        className="ToastRoot"
        duration={3000}
        open={toast}
        onOpenChange={setToast}
      >
        <Toast.Title>Ops!</Toast.Title>
        <Toast.Description>Usuário ou senha incorretos</Toast.Description>
      </S.ToastRoot>

      <Toast.Viewport className="ToastViewport" />
    </S.Container>
  )
}

export default Login
