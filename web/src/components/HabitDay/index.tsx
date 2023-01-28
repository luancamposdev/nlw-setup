import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx'
import dayjs from 'dayjs';

import { ProgressBar } from '../ProgressBar';
import '../../lib/dayjs'
import { HabitsList } from '../HabitsList';

interface HabitDayProps {
  date: Date
  completed?: number
  amount?: number
}

export const HabitDay = ({ completed = 0, amount = 0, date }: HabitDayProps) => {
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  return (
    <div className="bg-zinc-900 w-10 h-10 text-white rounded m-2 flex items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          className={clsx('w-10 h-10  border-2  rounded-lg', {
            'bg-zinc-900 border-zinc-800': completedPercentage === 0,
            'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-700 border-violet-500 ': completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
            'bg-violet-500 border-violet-400': completedPercentage >= 80,

          })}
        />

        <Popover.Portal>
          <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
            <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
            <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

            <ProgressBar progress={completedPercentage} />

            <HabitsList date={date} />

            <Popover.Arrow className="fill-zinc-900" height={8} width={16} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
