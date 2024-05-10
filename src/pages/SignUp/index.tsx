import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import * as Toast from '@radix-ui/react-toast'
import * as Form from '@radix-ui/react-form'
import { api } from '@/lib/axios'
import { useState } from 'react'
import * as S from './styles'

const signUpFormSchema = z.object({
  name: z.string(),
  company: z.string(),
  number: z.number(),
  email: z.string(),
  password: z.string()
})

type SignUpForm = z.infer<typeof signUpFormSchema>

function SignUp() {
  const [successToast, setSuccessToast] = useState(false)
  const [errorToast, setErrorToast] = useState(false)

  const { register, handleSubmit } = useForm<SignUpForm>()

  const signup = useMutation({
    mutationFn: (credentials: SignUpForm) => {
      return api.post('/users', credentials)
    },
    onSuccess: () => {
      setSuccessToast(true)
    },
    onError: () => {
      setErrorToast(true)
    }
  })

  const handleSignUp = (data: SignUpForm) => {
    console.log(data)
    signup.mutate({
      name: data.name,
      company: data.company,
      email: data.email,
      password: data.password,
      number: data.number
    })
  }

  return (
    <S.Background>
      <S.SignUpContainer>
        <h1>Cadastro</h1>
        <Form.Root onSubmit={handleSubmit(handleSignUp)}>
          <S.FormField name="user">
            <Form.Label>Nome*</Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                placeholder="Nome"
                {...register('name')}
                required
              />
            </Form.Control>
            <div>
              <Form.Message match="valueMissing">
                * Campo obrigatório
              </Form.Message>
            </div>
          </S.FormField>

          <S.FlexGroup>
            <S.FormField name="company">
              <Form.Label>Empresa*</Form.Label>
              <Form.Control asChild>
                <input
                  type="text"
                  placeholder="Empresa"
                  {...register('company')}
                  required
                />
              </Form.Control>
              <div>
                <Form.Message match="valueMissing">
                  * Campo obrigatório
                </Form.Message>
              </div>
            </S.FormField>

            <S.FormField name="number">
              <Form.Label>Número*</Form.Label>
              <Form.Control asChild>
                <input
                  type="number"
                  placeholder="(XX) XXXXX-XXXX"
                  {...register('number')}
                  required
                />
              </Form.Control>
              <div>
                <Form.Message match="valueMissing">
                  * Campo obrigatório
                </Form.Message>
              </div>
            </S.FormField>
          </S.FlexGroup>

          <S.FormField name="email">
            <Form.Label>Email*</Form.Label>
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
                * Campo obrigatório
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Email inválido
              </Form.Message>
            </div>
          </S.FormField>

          <S.FormField name="password">
            <Form.Label>Senha*</Form.Label>
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
                * Campo obrigatório
              </Form.Message>
            </div>
          </S.FormField>
          <Form.Submit asChild>
            <S.Button type="submit">Cadastrar</S.Button>
          </Form.Submit>
        </Form.Root>
      </S.SignUpContainer>

      <S.SuccessToastRoot
        className="ToastRoot"
        duration={3000}
        open={successToast}
        onOpenChange={setSuccessToast}
      >
        <Toast.Title>{':)'}</Toast.Title>
        <Toast.Description>Usuário cadastrado com sucesso</Toast.Description>
      </S.SuccessToastRoot>

      <S.ErrorToastRoot
        className="ToastRoot"
        duration={3000}
        open={errorToast}
        onOpenChange={setErrorToast}
      >
        <Toast.Title>Ops!</Toast.Title>
        <Toast.Description>Erro ao cadastrar usuário</Toast.Description>
      </S.ErrorToastRoot>

      <Toast.Viewport className="ToastViewport" />
    </S.Background>
  )
}

export default SignUp
