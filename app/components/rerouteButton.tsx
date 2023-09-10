import React from 'react'
import { Button } from '@mui/material'

interface AppProps {
  text: string
}

const RerouteButton = ({ text }: AppProps): React.JSX.Element => {
  return <Button variant="contained">{text}</Button>
}

export default RerouteButton
