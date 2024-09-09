export default function FormatDate({
  className,
  experience,
  months,
}: {
  className: string
  experience: { startDate: Date; endDate: Date }
  months: string[]
}): JSX.Element {
  const startDate = `${
    months[experience.startDate.getMonth()]
  } ${experience.startDate.getFullYear()}`
  const endDate =
    experience.endDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
      ? 'Present'
      : `${
          months[experience.endDate.getMonth()]
        } ${experience.endDate.getFullYear()}`
  return <div className={className}>{`${startDate} — ${endDate}`}</div>
}
