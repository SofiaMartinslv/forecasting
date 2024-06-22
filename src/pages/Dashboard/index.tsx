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

  const [range, setRange] = useState<DateRange | undefined>(undefined)

  const { data: flowSeriesResult } = useQuery({
    queryKey: ['flow', range],
    queryFn: async () => {
      const rangeFrom = range && range.from ? range.from.getTime() / 1000 : undefined
      const rangeTo = range && range.to ? range.to.getTime() / 1000 : undefined
      
      const response = await api.get('/flow', {
        params: {
          rangeFrom,
          rangeTo
        }
      })

      const responseForecasting = await api.get('/forecasting', {
        params: {
          rangeFrom,
          rangeTo
        }
      })

      const data = response.data
      const dataForecasting = responseForecasting.data

      const realFlow = data['flow'].sort((a: { timestamp: number }, b: { timestamp: number }) => a.timestamp - b.timestamp)
      const forecastData = dataForecasting['forecasting'].sort((a: { timestamp: number }, b: { timestamp: number }) => a.timestamp - b.timestamp)

      const formattedSeries: any[] | PromiseLike<any[]> = [];

      // Match by timestamp the two arrays and join the values by timestamp proximity, merge them with the closest timestamp
      for (let i = 0; i < forecastData.length; i++) {
        const forecastItem = forecastData[i];
        const forecastTimestamp = forecastItem.timestamp;
        const closestRealFlowItem = realFlow.find((item: { timestamp: number }) => {
          const timeDiff = Math.abs(item.timestamp - forecastTimestamp);
          const hoursDiff = timeDiff / (60 * 60);
          return hoursDiff < 0.5; 
        });

        const forecastDate = new Date(forecastTimestamp * 1000);
        const formattedForecastDate = format(forecastDate, 'yyyy-MM-dd');

        const mergedItemIndex = formattedSeries.findIndex((item: { timestamp: string }) => {
          const itemDate = new Date(item.timestamp);
          const formattedItemDate = format(itemDate, 'yyyy-MM-dd');
          return formattedItemDate === formattedForecastDate;
        });

        if (mergedItemIndex !== -1) {
          formattedSeries[mergedItemIndex] = {
            ...formattedSeries[mergedItemIndex],
            real: closestRealFlowItem ? closestRealFlowItem.value : null,
            forecasted: forecastItem.value
          };
        } else {
          formattedSeries.push({
            timestamp: formattedForecastDate,
            real: closestRealFlowItem ? closestRealFlowItem.value : null,
            forecasted: forecastItem.value
          });
        }
      }

      // Ensure all real flow values are included even if they don't have a close forecast value
      for (let i = 0; i < realFlow.length; i++) {
        const realItem = realFlow[i];
        const realDate = new Date(realItem.timestamp * 1000);
        const formattedRealDate = format(realDate, 'yyyy-MM-dd');

        const existingItemIndex = formattedSeries.findIndex((item: { timestamp: string }) => {
          const itemDate = new Date(item.timestamp);
          const formattedItemDate = format(itemDate, 'yyyy-MM-dd');
          return formattedItemDate === formattedRealDate;
        });

        if (existingItemIndex === -1) {
          formattedSeries.push({
            timestamp: formattedRealDate,
            real: realItem.value,
            forecasted: null
          });
        }
      }

            return formattedSeries;
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
                  <S.FilterButton onClick={() => setRange(range)}>
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
  <LineChart width={500} height={300} data={flowSeriesResult}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis 
      dataKey="timestamp" 

    />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line
        dot={false}
        dataKey="forecasted"
        name="previsão de vazão"
        stroke="#29BF12"
        strokeDasharray="3 4 5 2"
      />
    <Line
        dot={false}
        dataKey="real"
        name="vazão real"
        stroke="#3E92CC" 
      />
  </LineChart>
</S.ResponsiveContainer>


          
        </S.ChartContainer>
      </S.Container>
    </>
  )
}

export default Dashboard
