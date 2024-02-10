import { NextResponse } from 'next/server'

interface RepoItem {
  updated_at: string
  pushed_at: string
  visibility: string
  fork: boolean
  name: string
}

export async function GET(): Promise<NextResponse<{ data: RepoItem[] }>> {
  const res = await fetch('https://api.github.com/users/hanle23/repos')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data: RepoItem[] = await res.json()
  const filteredResult: RepoItem[] = data.flatMap((item: RepoItem) => {
    if (item.visibility !== 'public' || item.fork || item.name === 'hanle23') {
      return []
    }
    return item
  })
  filteredResult.sort(function (a: RepoItem, b: RepoItem) {
    const recentActivityA =
      new Date(a.updated_at) > new Date(a.pushed_at)
        ? a.updated_at
        : a.pushed_at
    const recentActivityB =
      new Date(b.updated_at) > new Date(b.pushed_at)
        ? b.updated_at
        : b.pushed_at
    return (
      new Date(recentActivityB).valueOf() - new Date(recentActivityA).valueOf()
    )
  })
  return NextResponse.json({ data: filteredResult })
}
