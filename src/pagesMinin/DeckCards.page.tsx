import { ChangeEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ArrowBackOutline from '@/assets/icons/svg/ArrowBackOutline'
import Input from '@/components/ui/Input/Input'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { ModalEditCard } from '@/pagesMinin/ModalsForTable/ModalEditCard/ModalEditCard'
import { DeckCardsTableMinin } from '@/pagesMinin/TablesMinin/DeckCardsTableMinin/DeckCardsTableMinin'
import { PageMinin } from '@/pagesMinin/componentsMinin/PageMinin/PageMinin'
import { useQueryParams } from '@/pagesMinin/utls/useQueryParams'
import { initCurrentPage, selectOptionPagination } from '@/pagesMinin/utls/variablesMinin'
import { clsx } from 'clsx'

import s from './deckCardsPage.module.scss'

import { useGetCardsQuery } from '../../services/cards/cards.service'
import { useGetDeckByIdQuery } from '../../services/decks/decks.service'

export const DeckCardsPage = () => {
  const {
    currentOrderBy,
    currentPage,
    itemsPerPage,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
    setSortByQuery,
  } = useQueryParams()

  const [open, setOpen] = useState(false)

  // Когда переходим на эту страницу, то переходим по Deck ID,
  // то есть ID можем взять из URL, значит можно использовать хук useParams

  // А как мы попадем на эту страницу??? -- по Id Deck. Значит id Deck нужно передать в URL при переходе.
  const deckId = useParams().deckId

  const { data: deck, isLoading } = useGetDeckByIdQuery({ id: deckId ?? '' })

  const { data } = useGetCardsQuery({
    args: { currentPage, itemsPerPage, orderBy: currentOrderBy, question: search },
    id: deckId ?? '',
  })

  const handleItemsPerPageChange = (value: number) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setItemsPerPageQuery(value)
  }
  const handleCurrentPageChange = (value: number) => {
    setCurrentPageQuery(value)
  }

  const handleSort = (key: string) => {
    setSortByQuery(key)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }

  if (isLoading) {
    return <h1>...Loading</h1>
  }

  return (
    <PageMinin className={s.common} mt={'24px'}>
      {/*<ModalOnAddDeckMinin open={open} setOpen={setOpen} />*/}
      <ModalEditCard open={open} setOpen={setOpen} />
      <div className={s.heading}>
        <div className={s.headingFirstRow}>
          <Typography as={Link} style={{ textDecoration: 'none' }} to={'/'} variant={'body2'}>
            <ArrowBackOutline />
            Back to Deck List
          </Typography>
        </div>
        <div className={s.headingSecondRow}>
          <div className={clsx(deck?.cover && s.isWithImage)}>
            <Typography as={'h1'} variant={'h1'}>
              ОНА ЧУЖАЯ, БРО {deck?.name}
              {/*  Тут нужно будет добавить проверку на МОИ cards или не мои  И МОИ -- ДОБАВИТЬ DropDown*/}
            </Typography>
            {deck?.cardsCount !== 0 && <img alt={'img'} src={deck?.cover} width={'200px'} />}
          </div>
          {deck?.cardsCount !== 0 && (
            <div className={s.switchButton}>
              <Button className={s.addCard} onClick={() => setOpen(true)} type={'button'}>
                <Typography variant={'subtitle2'}>Add New Card</Typography>
              </Button>
            </div>
          )}
        </div>
        {deck?.cardsCount !== 0 && (
          <Input
            callback={setSearchQuery}
            className={s.input}
            onChange={handleSearch}
            // querySearch={search}
            type={'search'}
            value={search}
          />
        )}
      </div>
      {deck?.cardsCount === 0 ? (
        <div className={s.emptyContent}>
          <Typography variant={'body1'}>
            This deck is empty. Click add new card to fill this pack
          </Typography>
          <Button className={s.addCard} onClick={() => setOpen(true)} type={'button'}>
            <Typography variant={'subtitle2'}>Add New Card</Typography>
          </Button>
        </div>
      ) : (
        <>
          <DeckCardsTableMinin
            data={data}
            handleSort={handleSort}
            searchParamsOrderBy={currentOrderBy}
          />
          <div className={s.footer}>
            <PaginationWithSelect
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              selectOptions={selectOptionPagination}
              setCurrentPage={handleCurrentPageChange}
              setItemsPerPage={handleItemsPerPageChange}
              totalItems={data?.pagination.totalItems || 0}
            />
          </div>
        </>
      )}
    </PageMinin>
  )
}