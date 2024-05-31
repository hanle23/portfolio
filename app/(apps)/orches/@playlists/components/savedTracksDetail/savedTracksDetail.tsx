'use client'
import { useContext, useEffect } from 'react'
import { OrchesContext } from '../../../components/appWrapper'
export default function SavedTracksDetail(): JSX.Element {
  const context = useContext(OrchesContext)

  useEffect(() => {
    if (
      context?.savedTracksFunc?.savedTracksIsLoading !== false &&
      context?.savedTracksFunc?.isValidating !== false
    )
      context?.savedTracksFunc?.setNextPage().catch((e) => {
        console.log(e)
      })
  }, [
    context?.savedTracksFunc,
    context?.savedTracksFunc?.setNextPage,
    context?.savedTracksFunc?.isValidating,
  ])
  return <></>
}
