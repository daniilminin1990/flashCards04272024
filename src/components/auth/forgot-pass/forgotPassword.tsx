import { useState } from 'react'
import { useForm } from 'react-hook-form'

import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { useNavigation } from '@/components/utils/hooks/useNavigate'
import { useRecoverPasswordMutation } from '@/services/auth/auth.services'

import s from './forgotPassword.module.scss'
type Props = {}

export const ForgotPassword = ({}: Props) => {
  const { control, handleSubmit, reset } = useForm()
  const { goTo } = useNavigation()
  const [recoverPassword] = useRecoverPasswordMutation()
  const onSubmit = async (data: any) => {
    console.log(data)
    recoverPassword(data)
      .unwrap()
      .then(() => {
        reset()
        goTo('/checkEmail')
      })
      .catch(error => {
        console.error('Error', error)
      })
  }

  const onInvalidSubmit = async (data: any) => {
    console.log(data)
  }

  return (
    <Card className={s.card}>
      <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
        <div className={s.container}>
          <Typography as={'h1'} className={s.title} variant={'h1'}>
            Forgot your password?
          </Typography>
          <FormTextfield
            className={s.input}
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Email'}
            type={'email'}
          />
          <Typography as={'h2'} className={s.subtitle} variant={'body2'}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button className={s.submitBtn} fullWidth>
            <Typography as={'span'} variant={'subtitle2'}>
              Send Instructions
            </Typography>
          </Button>
          <Typography as={'h2'} className={s.passQuest} variant={'body2'}>
            Did you remember your password?
          </Typography>
          <Button as={'a'} className={s.loginLink} href={'/'} onClick={() => goTo(`/signIn`)}>
            <Typography as={'span'}>Try logging in</Typography>
          </Button>
        </div>
      </form>
    </Card>
  )
}
