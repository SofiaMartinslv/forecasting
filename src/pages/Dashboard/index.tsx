import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as Popover from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { api } from '@/lib/axios'

import ArrowIcon from '@/assets/ArrowIcon'
import CalendarIcon from '@/assets/CalendarIcon'
import theme from '@/styles/theme'
import Header from '@/components/Header'
import * as S from './styles'
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface Flow {
  value: number
  date: Date
  confidenceInterval: number[]
  isForecasting: boolean
}

function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const message = error.response?.data?.message

          if (message === 'Unauthorized.') {
            navigate('/', { replace: true })
          }
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  const month = new Date()

  const [forecastingOn, setForecastingOn] = useState<boolean>(false)
  const [confidenceIntervalOn, setConfidenceIntervalOn] = useState<boolean>(false)
  const [range, setRange] = useState<DateRange | undefined>(undefined)

  const { data: flowSeriesResult } = useQuery({
    queryKey: ['flow', range],
    queryFn: async () => {
      const response = await api.get('/flow', {
        params: {
          range
        }
      })

      const data = response.data
      
      const realFlow = data['flow'].filter(((item: Flow) => item.isForecasting === false))
      const forecastData = data['flow'].filter((item: Flow) => item.isForecasting === true)
      
      const series = [
        {
          name: 'vazão real',
          data: realFlow
        },
        {
          name: 'vazão prevista',
          data: forecastData
        }
      ]

      return series
    }
  })

  console.log(flowSeriesResult)


  // if (flowResult) {
  //   setForecastData(flowResult.flow.filter((item: Flow) => item.isForecasting))
  // }

  const handleSetFilter = () => {
    console.log(range?.from, range?.to)
  }

  useEffect(() => {
    console.log('selected', range)
  }, [range])

  return (
    <>
      <Header />
      <S.Container>
        <S.Title>Dashboard</S.Title>
        <hr />
        <S.Filters>
          <div>
            <S.Toggle
              active={forecastingOn}
              onClick={() => setForecastingOn(!forecastingOn)}
            >
              Forecasting
            </S.Toggle>
            <S.Toggle
              active={confidenceIntervalOn}
              onClick={() => setConfidenceIntervalOn(!confidenceIntervalOn)}
            >
              Intervalo de confiança
            </S.Toggle>
          </div>
          <div>
            <Popover.Root>
              <S.CalendarPopoverTrigger>
                {!range?.from ? (
                  <p>Escolha uma data</p>
                ) : (
                  <>
                    <div>{`${format(range.from, 'dd/MM/yyyy')}`}</div>{' '}
                    <ArrowIcon
                      fill={!!range?.from ? theme.colors.black : 'currentColor'}
                    />
                  </>
                )}
                {range?.to && <div>{format(range.to, 'dd/MM/yyyy')}</div>}
                <CalendarIcon
                  fill={!!range?.from ? theme.colors.black : 'currentColor'}
                />
              </S.CalendarPopoverTrigger>
              <Popover.Portal>
                <S.CalendarPopoverContent>
                  <S.DatePicker
                    mode="range"
                    defaultMonth={month}
                    numberOfMonths={2}
                    selected={range}
                    showOutsideDays
                    onSelect={setRange}
                  />
                </S.CalendarPopoverContent>
              </Popover.Portal>
            </Popover.Root>
            <S.FilterButton
              disabled={!range?.to || !range?.from}
              onClick={handleSetFilter}
            >
              Aplicar intervalo
            </S.FilterButton>
          </div>
        </S.Filters>
        <S.ChartContainer>
          <S.ResponsiveContainer>
            <ComposedChart
              width={500}
              height={300}
              data={flowSeriesResult}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                name="Name"
                type="monotone"
                dataKey="pressure"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              {forecastingOn && (
                <Line
                  name="Forecasting"
                  type="monotone"
                  dataKey="forecast"
                  stroke="#82ca9d"
                  strokeDasharray="5 5"
                />
              )}
              {confidenceIntervalOn && (
                <Area
                  dataKey="confidenceInterval"
                  stroke="#5377b94b"
                  fill="#5377b94b"
                />
              )}
            </ComposedChart>
          </S.ResponsiveContainer>
        </S.ChartContainer>
      </S.Container>
    </>
  )
}

export default Dashboard
