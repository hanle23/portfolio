'use client'
import React, { useEffect, useState } from 'react'
import BlockContainer from '../components/specialComponent/NavLink'

export default function Page(): React.JSX.Element {
  const [data, setData] = useState<JSON[] | null>(null)
  useEffect(() => {
    const fetchData = (): void => {
      fetch('/api/projects')
        .then(async (response) => await response.json())
        .then((result) => {
          setData(result.data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }

    fetchData()
  }, [])
  return (
    <div className="flex flex-nowrap flex-col place-content-center">
      <h1 className="text-center text-sky-100 font-extrabold text-lg lg:text-3xl mt-8">{`Project List`}</h1>
      <div className="grid grid-cols-2 gap-2 mt-5 w-full h-full  place-content-center">
        {data?.map((project: any) => {
          const recentActivity =
            new Date(project.updated_at) > new Date(project.pushed_at)
              ? `updated_at`
              : `pushed_at`
          const currentDate = new Date().getTime()
          const maxDate = new Date(project[recentActivity])
          maxDate.setMonth(maxDate.getMonth() + 1)
          return (
            <BlockContainer key={project.name} className="flex h-fit w-7/12">
              <a
                target="_blank"
                href={project.html_url}
                rel="noopener noreferrer"
                className="border inline-block rounded-md p-2.5 transition duration-150 hover:bg-stone-500 w-full  relative"
              >
                <h3 className="text-sky-100 font-bold text-lg">
                  {project.name
                    .replace(/-/gi, ' ')
                    .replace(/(^\w|\s\w)/g, (m: any) => m.toUpperCase())}
                </h3>
                <p className="line-clamp-2">
                  {project.description === null
                    ? 'Coming soon!'
                    : project.description}
                </p>
                <p className="text-sm text-sky-100 flex items-center space-x-1">
                  <div
                    className={`border border-transparent ${
                      maxDate.getTime() <= currentDate
                        ? 'bg-sky-100'
                        : 'bg-green-500'
                    } h-[10px] w-[10px] rounded-full`}
                  />
                  <p>
                    {maxDate.getTime() <= currentDate
                      ? `Stale`
                      : `Recently updated`}
                  </p>
                </p>
              </a>
            </BlockContainer>
          )
        })}
      </div>
      <div className="flex justify-center mt-3">
        <BlockContainer>
          <button className="justify-center items-center border-sky-100 p-2.5 border rounded-lg hover:text-black hover:mix-blend-screen text-lg font-bold text-sky-100">
            Show more
          </button>
        </BlockContainer>
      </div>
    </div>
  )
}
