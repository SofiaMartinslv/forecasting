import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@/assets/CloseIcon'

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
  const [confidenceIntervalOn, setConfidenceIntervalOn] =
    useState<boolean>(false)
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

      const realFlow = data['flow'].filter(
        (item: Flow) => item.isForecasting === false
      )
      const forecastData = data['flow'].filter(
        (item: Flow) => item.isForecasting === true
      )

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

  useEffect(() => {
    console.log('selected', range)
  }, [range])

  return (
    <>
      <Header />
      <S.Container>
        <S.Title>Análise de Vazão com Previsão (Forecasting)</S.Title>
        <hr />
        <S.Indicators>
          <div>
            <b>Indicador 1</b>
            <S.CardContent>2342</S.CardContent>
            <S.CardFooter>abc</S.CardFooter>
          </div>
          <div>
            <b>Indicador 2</b>
            <S.CardContent>1243</S.CardContent>
            <S.CardFooter>abc</S.CardFooter>
          </div>
          <div>
            <b>Indicador 3</b>
            <S.CardContent>423</S.CardContent>
            <S.CardFooter>abc</S.CardFooter>
          </div>
        </S.Indicators>
        <S.ChartContainer>
        <S.Filters>
          {/* <div>
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
          </div> */}
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
                {!range?.to || !range?.from ? (
                  <CalendarIcon />
                ) : (
                  <S.FilterButton onClick={() => setRange()}>
                    <CloseIcon />
                  </S.FilterButton>
                )}
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
          </div>
        </S.Filters>
          <S.ResponsiveContainer>
            <LineChart width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="date"
                type="category"
                allowDuplicatedCategory={false}
                tickFormatter={(value: string) => format(value, 'dd/MM hh:mm')}
              />
              <YAxis dataKey="value" />

              <Tooltip />
              <Legend />

              {flowSeriesResult &&
                flowSeriesResult.map((s) => (
                  <Line
                    dot={false}
                    dataKey="value"
                    data={s.data}
                    name={s.name}
                    key={s.name}
                    stroke={s.name === 'vazão prevista' ? '#29BF12' : '#3E92CC'}
                    strokeDasharray={
                      s.name === 'vazão prevista' ? '3 4 5 2' : ''
                    }
                  />
                ))}
            </LineChart>
          </S.ResponsiveContainer>
        </S.ChartContainer>
      </S.Container>
    </>
  )
}

export default Dashboard
