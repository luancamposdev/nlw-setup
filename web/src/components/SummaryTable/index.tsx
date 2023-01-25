import { GenerateDatesFromYearsBeginning } from "../../utils/generate-dates-from-years-beginning";
import { HabitDay } from "../HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = GenerateDatesFromYearsBeginning();

const minimunSummaryDaysSize = 18 * 7;
const amountOfDaysToFill = minimunSummaryDaysSize - summaryDates.length;

export const SummaryTable: React.FC = () => {
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
          return <HabitDay amount={5} completed={3} key={date.toString()} />
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
