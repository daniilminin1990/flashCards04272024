import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import CardMemoLogoGolden from '@/assets/icons/svg/CardMemo/CardMemoLogoGolden'
import LogOut from '@/assets/icons/svg/LogOut'
import PersonOutline from '@/assets/icons/svg/PersonOutline'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Typography from '@/components/ui/Typography/Typography'
import ChangeTheme from '@/components/ui/changeTheme/ChangeTheme'
import LocaleSwitcherDrop from '@/components/ui/localeSwitcher/localeSwitcherDrop'
import { path } from '@/router/path'
import { useLogoutMutation } from '@/services/auth/auth.service'
import { MeResponse } from '@/services/auth/auth.types'
import clsx from 'clsx'

import style from './Header.module.scss'

type HeaderProps = {
  data?: MeResponse
}
const Header = ({ data }: HeaderProps) => {
  const [logout] = useLogoutMutation()
  const { t } = useTranslation()
  const logoutHandler = () => {
    localStorage.removeItem('deckQuery')
    logout()
  }
  const location = useLocation()
  const setDeckQueryHandler = () => {
    localStorage.setItem('deckQuery', location.search)
  }
  const theme = localStorage.getItem('theme')

  return (
    <div className={clsx(style.box, theme === 'sun' ? style.sun : '')}>
      <div className={style.wrapper}>
        <div className={style.boxImg}>
          <Typography as={'a'} className={style.logo} href={`${path.decks}`} variant={'body2'}>
            <div className={'my-first-step'}>
              <CardMemoLogoGolden className={style.img} />
            </div>
          </Typography>
          <div className={'my-two-step'}>
            <LocaleSwitcherDrop />
          </div>

          <div className={'my-three-step'}>
            <ChangeTheme />
          </div>
        </div>
        {data && (
          <div className={style.profile}>
            <Typography as={Link} className={style.name} to={`${path.profile}`} variant={'h2'}>
              {data.name}
            </Typography>
            <div className={'my-four-step'}>
              <DropdownMenuDemo className={style.dropDown} data={data} type={'head'}>
                <DropDownItem
                  handleOnClick={setDeckQueryHandler}
                  href={`${path.profile}`}
                  icon={<PersonOutline />}
                  text={t('header.myProfile')}
                />
                <DropDownItem
                  handleOnClick={logoutHandler}
                  href={`${path.login}`}
                  icon={<LogOut />}
                  text={t('header.signOut')}
                />
              </DropdownMenuDemo>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
