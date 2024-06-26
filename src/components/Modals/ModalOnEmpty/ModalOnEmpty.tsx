import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { path } from '@/app/router/path'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'

import s from './ModalOnEmpty.module.scss'

type Props = {
  open: boolean
  setIsOpenModal: (value: boolean) => void
}
const ModalOnEmpty = memo((props: Props) => {
  const { open, setIsOpenModal } = props
  const onCloseModalHandler = () => {
    setIsOpenModal(false)
  }
  const { t } = useTranslation()

  return (
    <Modal
      className={s.modal}
      onOpenChange={() => setIsOpenModal(false)}
      open={open}
      title={`${t('modalOnEmpty.areYouSure')}`}
    >
      <div className={s.body}>
        <Typography variant={'body1'}>{t('modalOnEmpty.reallyWant')}</Typography>
      </div>
      <div className={s.footer}>
        <Button className={s.button} onClick={onCloseModalHandler} variant={'secondary'}>
          <Typography variant={'subtitle2'}>{t('modalOnEmpty.no')}</Typography>
        </Button>
        <Button
          as={Link}
          className={s.button}
          onClick={onCloseModalHandler}
          to={`${path.decks}`}
          variant={'primary'}
        >
          <Typography variant={'subtitle2'}>{t('modalOnEmpty.yes')}</Typography>
        </Button>
      </div>
    </Modal>
  )
})

export default ModalOnEmpty
