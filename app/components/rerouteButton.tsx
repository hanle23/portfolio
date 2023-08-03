import { Button } from '@mui/material'

type AppProps = {
  text: string
}

const RerouteButton = ({ text }: AppProps) => {
  return <Button variant="contained">{text}</Button>
}

export default RerouteButton
