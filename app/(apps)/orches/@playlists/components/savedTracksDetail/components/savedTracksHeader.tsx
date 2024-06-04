import AppBar from '@mui/material/AppBar'
import useScrollTrigger from '@mui/material/useScrollTrigger'

export default function SavedTracksHeader({
  scrollableElementRef,
  total,
}: {
  scrollableElementRef: React.RefObject<HTMLDivElement>
  total: number | undefined
}): JSX.Element {
  const trigger = useScrollTrigger({
    target: scrollableElementRef?.current ?? undefined,
    disableHysteresis: true,
    threshold: 125,
  })
  return (
    <AppBar
      position={trigger ? 'absolute' : 'static'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(80, 56, 160)',
        backdropFilter: 'blur(10px)',
        alignItems: 'right',
        padding: '12px',
      }}
    >
      <h1 className="font-extrabold text-4xl">Liked Song</h1>
      {total !== undefined && (
        <p className="flex justify-start gap-1 items-center font-semibold text-md whitespace-nowrap">
          {`${total} songs`}
        </p>
      )}
    </AppBar>
  )
}
