import React, { ReactNode } from 'react'

import MoreVerticalOutline from '@/assets/icons/svg/MoreVerticalOutline'
import defaultAvatar from '@/assets/img/defaultAvatar.png'
import Typography from '@/components/ui/Typography/Typography'
import { MeResponse } from '@/features/auth/services/auth.types'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

// ! Изменил стили на module scss
import s from './DropDown.module.scss'

type DropdownMenuDemoProps = {
  children: ReactNode
  className?: string
  data?: MeResponse
  icon?: string
  type: 'head' | 'menu'
}

const DropdownMenuDemo = (props: DropdownMenuDemoProps) => {
  const { children, className, data, icon, type } = props

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Customise options'} className={s.IconButton}>
          {type === 'head' ? (
            <img
              alt={''}
              className={clsx(s.dropdownHeaderImg, className)}
              src={icon ? icon : data?.avatar || defaultAvatar}
            />
          ) : (
            <MoreVerticalOutline
              className={s.dropdownHeaderImg}
              style={{ height: '25px', width: '25px' }}
            />
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={type === 'menu' ? s.DropdownMenuContentForMenu : s.DropdownMenuContent}
          sideOffset={5}
        >
          {type === 'head' && (
            <div className={s.header}>
              <img alt={''} src={data?.avatar ?? defaultAvatar} />
              <div>
                <Typography className={s.dropdownTextHeader} variant={'subtitle1'}>
                  {data?.name ?? 'JohnDoe'}
                </Typography>
                <Typography className={s.dropdownTextHeader} variant={'caption'}>
                  {data?.email ?? 'john_doe@mail.ru'}
                </Typography>
              </div>
            </div>
          )}

          {React.Children.toArray(children).map((child, index) => (
            <React.Fragment key={index}>
              {type === 'menu' && index !== 0 && (
                <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
              )}
              {type === 'head' && <DropdownMenu.Separator className={s.DropdownMenuSeparator} />}
              {child}
            </React.Fragment>
          ))}

          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default DropdownMenuDemo
