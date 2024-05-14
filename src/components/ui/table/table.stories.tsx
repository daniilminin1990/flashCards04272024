import { MemoryRouter } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { Decks } from '@/components/ui/table/decks/Decks'

import s from '@/components/ui/table/decks/decks.module.scss'

import { Table } from './table'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
}

export default meta

export const WithContent = () => {
  return (
    <MemoryRouter>
      <Decks />
    </MemoryRouter>
  )
}
export const WithoutContent = () => {
  return (
    <Typography as={'div'} className={s.empty} variant={'body1'}>
      No content with these terms...
    </Typography>
  )
}

export const VisibleWithoutContent = () => {

  const headersName = [
    { key: 'name', title: 'Name' },
    { key: 'cardsCount', title: 'Cards' },
    { key: 'updated', title: 'Last Updated' },
    { key: 'created', title: 'Created by' },
  ]


  return (
    <MemoryRouter initialEntries={['/']}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            {headersName.map(name => (

              <Table.HeadCell key={name.key}>
                <Typography as={'span'} variant={'subtitle2'}>
                  {name.title}
                </Typography>

              </Table.HeadCell>
            ))}
            <Table.HeadCell></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell className={`empty`} colSpan={100}>
              No content with these terms...
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </MemoryRouter>
  )
}
