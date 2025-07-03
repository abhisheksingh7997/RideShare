import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function DateTimeSelectors({ date, setDate, time, setTime }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <div className="flex items-center bg-gray-100 p-3 rounded-md w-full sm:w-1/2">
        <CalendarDaysIcon className="h-5 w-5 mr-2 text-gray-700" />
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-transparent w-full outline-none text-black"
        >
          <option>Today</option>
          <option>Tomorrow</option>

        </select>
      </div>

      <div className="flex items-center bg-gray-100 p-3 rounded-md w-full sm:w-1/2">
        <ClockIcon className="h-5 w-5 mr-2 text-gray-700" />
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-transparent w-full outline-none text-black"
        >
          <option>Now</option>
          <option>In 15 minutes</option>
          <option>In 30 minutes</option>
          <option>In 1 hour</option>
        </select>
      </div>
    </div>
  );
}
