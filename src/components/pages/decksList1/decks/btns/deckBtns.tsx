import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { DeckProps } from '@/components/pages/decksList1/decks/decks.types'
import { Button } from '@/components/ui/button'
import { useMeQuery } from '@/services/auth/auth.services'

import s from './deckBtns.module.scss'

type Props = {
  disabled: boolean
  goTo: (path: string) => void
  item: DeckProps
  showDeleteModal?: () => void
  showUpdateModal?: () => void
}

export const DeckBtns = ({ disabled, goTo, item, showDeleteModal, showUpdateModal }: Props) => {
  const { data } = useMeQuery()
  const showUpdateModalHandler = () => {
    showUpdateModal && showUpdateModal()
  }
  const showDeleteModalHandler = () => {
    showDeleteModal && showDeleteModal()
  }
  const goToLearnHandler = () => {
    goTo(`/cards/${item.id}/learn`)
  }

  return data?.id === item.userId ? (
    <div className={s.iconBtns}>
      <Button className={s.btn} onClick={showUpdateModalHandler}>
        <Edit2Outline className={s.Edit2Outline} />
      </Button>

      <Button className={s.btn} disabled={disabled} onClick={goToLearnHandler}>
        <PlayCircleOutline className={`${s.playCircleOutline} ${disabled && s.disabled}`} />
      </Button>

      <Button className={s.btn} onClick={showDeleteModalHandler}>
        <TrashOutline className={s.TrashOutline} />
      </Button>
    </div>
  ) : (
    <div className={s.iconBtns}>
      <Button className={s.btn} disabled={disabled} onClick={goToLearnHandler}>
        <PlayCircleOutline className={`${s.playCircleOutline} ${disabled && s.disabled}`} />
      </Button>
    </div>
  )
}
