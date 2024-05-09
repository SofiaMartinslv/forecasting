import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import * as S from './styles'

type Credentials = {
  name: string
  email: string
  password: string
}

const signUpFormSchema = z.object({
  name: z.string(),
  company: z.string(),
  number: z.number(),
  email: z.string(),
  password: z.string()
})

type SignUpForm = z.infer<typeof signUpFormSchema>

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpForm>()

  const signup = useMutation({
    mutationFn: (credentials: Credentials) => {
      return axios.post('/users', credentials)
    },
    onSuccess: () => {
      console.log('success :)')
    }
  })

  const handleSignUp = (data: SignUpForm) => {
    console.log(data)
    signup.mutate({
      name: data.name,
      email: data.email,
      password: data.password
    })
  }

  return (
    <S.Background>
      <S.SignUpContainer>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <S.InputGroup>
            <div>
              <label htmlFor="user">Usuário</label>
              <input
                id="user"
                type="text"
                placeholder="Usuário"
                {...register('name')}
              />
            </div>
            <S.FlexGroup>
              <div>
                <label htmlFor="company">Empresa</label>
                <input
                  type="text"
                  id="company"
                  placeholder="Empresa"
                  {...register('company')}
                />
              </div>
              <div>
                <label htmlFor="number">Telefone</label>
                <input
                  type="number"
                  id="number"
                  placeholder="(XX) XXXX-XXXX"
                  {...register('number')}
                />
              </div>
            </S.FlexGroup>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                {...register('email')}
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="Senha"
                {...register('password')}
              />
            </div>
            <S.Button type="submit">Cadastrar</S.Button>
          </S.InputGroup>
        </form>
      </S.SignUpContainer>
    </S.Background>
  )
}

export default SignUp
