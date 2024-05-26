import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email').trim(),
  password: z.string().nonempty('Enter password').trim(),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof signInSchema>

export const SignIn = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = data => console.log(data)

  return (
    <>
      {import.meta.env.DEV && <DevTool control={control} />}
      <Card className={s.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.header}>
            <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
              Sign In
            </Typography>
          </div>
          <div className={s.box}>
            <FormTextfield
              className={s.inputStyle}
              control={control}
              label={'Email'}
              name={'email'}
              placeholder={'Email'}
              type={'text'}
            />
            <FormTextfield
              className={s.inputStyle}
              control={control}
              label={'Password'}
              name={'password'}
              placeholder={'Password'}
              type={'password'}
            />
            <Controller
              control={control}
              defaultValue={false}
              name={'rememberMe'}
              render={({ field: { onChange, value } }) => (
                <Checkbox checked={value} label={'RememberMe'} onCheckedChange={onChange} />
              )}
            />
            <Button as={'a'} style={{ all: 'unset' }} type={'button'}>
              Forgot Password?
              <Typography className={s.typographyForgotTitle} variant={'body2'}>
                Forgot Password?
              </Typography>
            </Button>
          </div>
          <Button fullWidth type={'submit'}>
            Sign In
          </Button>
          <div className={s.footer}>
            <Typography as={'button'} className={s.typographyFooterTitle} variant={'body2'}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Don't have an account?
            </Typography>
            <Typography as={'button'} className={s.typographyFooterSubtitle} variant={'link1'}>
              Sign Up
            </Typography>
          </div>
        </form>
      </Card>
    </>
  )
}
