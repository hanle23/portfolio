import React from 'react'
interface props {
  open: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ResumeModal({
  open,
  onClose,
}: props): React.JSX.Element {
  return <>{open && <div role="dialog">Test</div>}</>
}
