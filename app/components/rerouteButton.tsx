import React from 'react'
import { Button } from '@mui/material'

interface AppProps {
  text: string
}

const RerouteButton = ({ text }: AppProps): React.JSX.Element => {
  return (
    <Button
      variant="contained"
      className="flex bg-gradient-to-tr from-[#1D976C] from-59% to-[#93F9B9] to-100%"
    >
      {text}
    </Button>
  )
}

export default RerouteButton
