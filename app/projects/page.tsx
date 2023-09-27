import React from 'react'

async function getData(): Promise<JSON> {
  const res = await fetch('https://api.github.com/users/hanle23/repos')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  const filteredResult = data.flatMap((item: any) => {
    if (
      item.visibility !== 'public' ||
      item.fork === true ||
      item.name === 'hanle23'
    ) {
      return []
    }
    return item
  })
  filteredResult.sort(function (a: any, b: any) {
    return new Date(b.pushed_at).valueOf() - new Date(a.pushed_at).valueOf()
  })
  console.log(Object.keys(filteredResult).length)
  console.log(filteredResult)

  return data
}

export default async function Page(): Promise<React.JSX.Element> {
  const data = await getData()

  return (
    <div>
      <h1>{`Welcome to Project Page`}</h1>
    </div>
  )
}
