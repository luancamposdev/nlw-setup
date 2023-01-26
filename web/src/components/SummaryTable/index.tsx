import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { api } from "../../lib/axios";
import { GenerateDatesFromYearsBeginning } from "../../utils/generate-dates-from-years-beginning";
import { HabitDay } from "../HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = GenerateDatesFromYearsBeginning();

const minimunSummaryDaysSize = 18 * 7;
const amountOfDaysToFill = minimunSummaryDaysSize - summaryDates.length;

type SummaryProps = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>

export const SummaryTable: React.FC = () => {
  const [summary, setSummary] = useState<SummaryProps>([]);

  useEffect(() => {
    api.get('summary').then((response) => {
      setSummary(response.data);
    })
  }, [])

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-2 items-center">
        {weekDays.map((day, i) => (
          <div
            key={`${day}-${i}`}
            className="text-zinc-400 text-xl w-10 h-10 font-bold flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col">
        {summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day');
          })
          return (
            <HabitDay
              key={`${date}`}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
          return (
            <div className="w-10 h-10 rounded m-2 flex items-center justify-center">
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
