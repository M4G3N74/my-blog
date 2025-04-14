import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)

  // Format the date differently based on where it's used
  // For the card badge, we want a shorter format
  return (
    <time dateTime={dateString} className="whitespace-nowrap">
      {format(date, 'MMM d, yyyy')}
    </time>
  )
}