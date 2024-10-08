import { NextResponse } from 'next/server'
import { ignoreList } from '@/constants/githubIgnoreList'
import type { Project } from '@/app/types/github/project'

export async function GET(): Promise<NextResponse<{ data: Project[] }>> {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN
  if (ACCESS_TOKEN === undefined || ACCESS_TOKEN === '') {
    throw new Error('ACCESS_TOKEN is not defined')
  }
  const res = await fetch(
    'https://api.github.com/user/repos?affiliation=owner,collaborator&sort=update',
    {
      headers: {
        accept: 'application/vnd.github+json',
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
      },
    },
  )
  if (res.status !== 200) {
    throw new Error(`Failed to fetch data: ${res.statusText}`)
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
