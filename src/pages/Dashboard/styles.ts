import styled from 'styled-components'
import { ResponsiveContainer as rechartsContainer } from 'recharts'
import { DayPicker } from 'react-day-picker'
import * as Popover from '@radix-ui/react-popover'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  height: 100vh;
  padding: 4rem;

  hr {
    width: 100%;
    margin-bottom: 32px;
  }
`

export const Header = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.blue400};
`

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
`

export const Filters = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;

  div {
    display: flex;
    gap: 16px;
  }
`

export const CalendarPopoverTrigger = styled(Popover.Trigger)`
  transition: background-color .5s;
  width: 210px;
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
    p, svg {
      color:  ${({ theme }) => theme.colors.black};
    }
  }
  p, svg {
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
    padding: .4em .6em;
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
    color:  ${({ theme }) => theme.colors.gray500};
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
    transition: background-color .5s;
    color: white;
    padding: 6px 16px;
    border: none;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.blue400};
    &:hover {
      background: ${({ theme }) => theme.colors.blue300};
      cursor: pointer;
    }
    &:disabled {
      background: ${({ theme }) => theme.colors.gray300};
      cursor: default;
    }
`

export const Toggle = styled.button<{ active: boolean }>`
  transition: background-color .5s;
  background: ${button => (button.active ? ({ theme }) => theme.colors.blue300 : ({ theme }) => theme.colors.gray100)};
  color: ${button => (button.active ? 'white' : ({ theme }) => theme.colors.blue300)};
  border: 1px solid ${({ theme }) => theme.colors.blue300};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

export const ChartContainer = styled.div`
  box-shadow: 0 0 4px rgb(0 0 0 / 16%);
  width: 100%;
  height: 650px;
  padding: 32px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray100};
`

export const ResponsiveContainer = styled(rechartsContainer)`
  padding: 32px 32px 32px 0;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray100};
`
