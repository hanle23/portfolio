import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

export default function SelectMode({
  className,
  allRoutes,
  setCurrentRoute,
  currentRoute,
}: {
  className: string
  allRoutes: Array<{ node: React.ReactNode; value: string; label: string }>
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
  currentRoute: string
}): React.JSX.Element {
  return (
    <FormControl className="bg-container rounded-md" sx={{ color: '#fff' }}>
      <InputLabel sx={{ color: '#fff', '&.Mui-focused': { color: '#1DB954' } }}>
        Mode
      </InputLabel>
      <Select
        value={currentRoute}
        sx={{
          color: '#fff',
          overflow: 'hidden',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1DB954',
          },
          '.MuiSvgIcon-root ': {
            fill: '#fff',
          },
        }}
        MenuProps={{
          PaperProps: { style: { backgroundColor: '#121212', color: '#fff' } },
        }}
        onChange={(e: SelectChangeEvent<string>) => {
          console.log(e.target.value)
          setCurrentRoute(e.target.value)
        }}
        label="Mode"
        defaultValue="playlists"
        variant="outlined"
      >
        {allRoutes.map((route) => (
          <MenuItem key={route.value} value={route.value}>
            {route.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
