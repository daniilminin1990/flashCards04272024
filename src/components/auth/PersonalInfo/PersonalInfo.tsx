import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Edit2 from '@/assets/icons/svg/Edit2'
import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import LogOut from '@/assets/icons/svg/LogOut'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './personalInfo.module.scss'

import ellipseIcon from '../../../assets/icons/WhiteSVG/Ellipse 1.svg'

const createNewPassScheme = z.object({
  nickname: z.string().min(1, 'Type new nickname'),
})

type FormValue = z.infer<typeof createNewPassScheme>

type Props = {
  isEdit?: boolean
}
export const PersonalInfo = ({ isEdit }: Props) => {
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      nickname: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(createNewPassScheme),
  })

  const onSubmit: SubmitHandler<FormValue> = data => console.log(data)

  // const [isEdit, setIsEdit] = useState<boolean>(true)

  return (
    <>
      {import.meta.env.DEV && <DevTool control={control} />}
      <Card className={s.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.header}>
            <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
              Personal Information
            </Typography>
          </div>
          <div className={s.box}>
            <div className={s.imgGroup}>
              <img alt={''} className={s.img} src={ellipseIcon} />
              {isEdit && (
                <Button className={s.editIconButton} variant={'secondary'}>
                  <Edit2Outline />
                </Button>
              )}
            </div>
            {isEdit ? (
              <div className={s.profileEdit}>
                <Typography variant={'h1'}>
                  Ivan <Edit2Outline className={s.editIcon} />
                </Typography>
                <Typography className={s.email} variant={'body2'}>
                  j&johnson@gmail.com
                </Typography>
              </div>
            ) : (
              <FormTextfield
                className={s.inputStyle}
                control={control}
                label={'Nickname'}
                name={'nickname'}
                placeholder={'Type new nickname'}
                type={'text'}
              />
            )}
          </div>
          <div className={clsx(s.buttonWrapper, isEdit && s.buttonWrapperEdit)}>
            <Button fullWidth={!isEdit} variant={isEdit ? 'secondary' : 'primary'}>
              {isEdit ? (
                <Typography variant={'body2'}>
                  <LogOut className={s.logoutIcon} />
                  Logout
                </Typography>
              ) : (
                <Typography variant={'body2'}>Save changes</Typography>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
}
