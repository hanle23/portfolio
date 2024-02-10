export default function CheckMarks({
  color = 'none',
  viewBox = '0 0 24 24',
  width = 24,
  height = 24,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-chevron-up"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}
