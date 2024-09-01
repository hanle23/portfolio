import { NextResponse } from 'next/server'
import { ignoreList } from '@/constants/githubIgnoreList'
import type { Project } from '@/app/types/github/project'

export async function GET(): Promise<NextResponse<{ data: Project[] }>> {
  const res = await fetch(
    'https://api.github.com/user/repos?affiliation=owner,collaborator&sort=updated',
    {
      headers: {
        accept: 'application/vnd.github+json',
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
      },
    },
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data: Project[] = await res.json()
  const filteredResult: Project[] = data.flatMap((item: Project) => {
    if (ignoreList.includes(item.name)) {
      return []
    }
    return {
      name: item.name,
      updated_at: item.updated_at,
      pushed_at: item.pushed_at,
      description: item.description,
      html_url: item.private ? '' : item.html_url,
      private: item.private,
    }
  })
  return NextResponse.json({ data: filteredResult })
}
