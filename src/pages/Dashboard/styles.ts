import styled from 'styled-components'
import { ResponsiveContainer as rechartsContainer } from 'recharts'
import { DayPicker } from 'react-day-picker'
import * as Popover from '@radix-ui/react-popover'

export const Container = styled.div`
  height: calc(100vh - 113.51px);
  padding: 2rem 4rem;
`

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
`

export const Indicators = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;

  div {
    box-shadow: 0 0 2px rgb(0 0 0 / 16%);
    flex: 1;
    height: 112px;
    padding: 16px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:hover {
      box-shadow: 0 0 4px rgb(0 0 0 / 16%);
      cursor: pointer;
    }
  }
`

export const CardContent = styled.p`
  text-align: center;
  color:  ${({ theme }) => theme.colors.blue400};
  font-size: 30px;
  font-weight: bold;
`

export const CardFooter = styled.p`
  font-size: 12px;
  text-align: right;
  color: ${({ theme }) => theme.colors.gray500};
`

export const Filters = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
  }
`

export const CalendarPopoverTrigger = styled(Popover.Trigger)`
  transition: background-color 0.5s;
  height: 33px;
  width: 223px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 8px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray500};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
    p,
    svg {
      color: ${({ theme }) => theme.colors.black};
    }
  }
  p,
  svg {
    color: ${({ theme }) => theme.colors.gray500};
  }
`

export const CalendarPopoverContent = styled(Popover.Content)`
  background: white;
  padding: 8px;
  margin-top: 8px;
  border-radius: 8px;
`

export const DatePicker = styled(DayPicker)`
  .rdp-months {
    display: flex;
    padding: 8px;
    gap: 16px;
  }

  .rdp-caption_start .rdp-caption {
    flex-direction: row-reverse;
  }

  .rdp-head {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray500};
    height: 20px;
  }

  table {
    border-spacing: 0 4px;
    border-collapse: separate;
  }

  .rdp-caption {
    display: flex;
    font-weight: 600;
    font-size: 14px;
    padding: 8px;
    align-items: center;
    justify-content: flex-end;
    gap: 64px;

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${({ theme }) => theme.colors.gray500};
      height: 26px;
      width: 26px;
      padding: 4px;
      cursor: pointer;
      svg {
        color: ${({ theme }) => theme.colors.gray500};
        width: 10px;
      }

      &:hover {
        box-shadow: 0 0 4px rgb(0 0 0 / 16%);
      }
    }
  }

  button {
    padding: 0.4em 0.6em;
    background-color: white;
    border-radius: 4px;
  }

  .rdp-cell {
    button {
      width: 100%;
      border: none;
      padding: 8px;
      &:hover :not(.rdp-day_selected) {
        background-color: ${({ theme }) => theme.colors.gray200};
      }
    }
  }

  .rdp-day_outside {
    color: ${({ theme }) => theme.colors.gray500};
  }

  .rdp-day_selected {
    background-color: ${({ theme }) => theme.colors.blue300};
    color: white;
  }

  .rdp-cell:has([aria-selected]) {
    background-color: ${({ theme }) => theme.colors.gray300}!important;
    &:last-child {
      border-radius: 0 8px 8px 0;
    }
    &:first-child {
      border-radius: 8px 0 0 8px;
    }
  }
  .rdp-cell:has(.rdp-day_range_end) {
    border-radius: 0 8px 8px 0;
  }
  .rdp-cell:has(.rdp-day_range_start) {
    border-radius: 8px 0 0 8px;
  }
  .rdp-day_range_middle {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`

export const FilterButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  fill: ${({ theme }) => theme.colors.black};
  margin-right: -8px;
  &:hover {
    cursor: pointer;
    fill: ${({ theme }) => theme.colors.blue400};
  }
`

export const Toggle = styled.button<{ active: boolean }>`
  transition: background-color 0.5s;
  background: ${(button) =>
    button.active
      ? ({ theme }) => theme.colors.blue300
      : ({ theme }) => theme.colors.gray100};
  color: ${(button) =>
    button.active ? 'white' : ({ theme }) => theme.colors.blue300};
  border: 1px solid ${({ theme }) => theme.colors.blue300};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

export const ChartContainer = styled.div`
  box-shadow: 0 0 4px rgb(0 0 0 / 16%);
  display: flex;
  flex-direction: column;
  gap: 16px;

  height: 69%;
  padding: 24px 32px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
`

export const ResponsiveContainer = styled(rechartsContainer)`
  padding: 32px 32px 32px 0;
  box-sizing: border-box;
`
