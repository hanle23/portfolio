'use client'
import React, { useEffect, useState } from 'react'
import BlockContainer from '../specialComponent/BlockContainer'

export default function ProjectPage(): React.JSX.Element {
  const [data, setData] = useState<JSON[] | null>(null)
  const smallData = data?.slice(0, 6)

  const [displaySmallData, setDisplaySmallData] = useState(true)

  const toggleDisplay = (): void => {
    setDisplaySmallData((prevDisplay) => !prevDisplay)
  }

  const currentDisplay = displaySmallData ? smallData : data

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
    <div id="projects-section" className="h-screen w-fit grid">
      <div className="text-center text-sky-100 font-extrabold text-3xl md:text-5xl mt-8">{`Project List`}</div>
      {currentDisplay != null && (
        <div className="grid grid-cols-2  gap-y-4 justify-items-center mt-4 w-full h-fit">
          {currentDisplay?.map((project: any) => {
            const recentActivity =
              new Date(project.updated_at) > new Date(project.pushed_at)
                ? `updated_at`
                : `pushed_at`
            const currentDate = new Date().getTime()
            const maxDate = new Date(project[recentActivity])
            maxDate.setMonth(maxDate.getMonth() + 1)
            return (
              <BlockContainer key={project.name} className="flex h-full w-9/12">
                <a
                  target="_blank"
                  href={project.html_url}
                  rel="noopener noreferrer"
                  className="border inline-block rounded-md p-2.5  transition duration-150  w-full relative"
                >
                  <div className="flex flex-col h-full overflow-hidden">
                    <div className="text-sky-100 font-bold text-lg md:text-xl">
                      {project.name
                        .replace(/-/gi, ' ')
                        .replace(/(^\w|\s\w)/g, (m: any) => m.toUpperCase())}
                    </div>
                    <p className="text-sky-100 line-clamp-2">
                      {project.description === null
                        ? 'Description coming soon!'
                        : project.description}
                    </p>
                    <div className="text-sm text-sky-100 flex items-center space-x-1 mt-auto">
                      <div
                        className={`border border-transparent ${
                          maxDate.getTime() <= currentDate
                            ? 'bg-sky-100'
                            : 'bg-green-600'
                        } h-[10px] w-[10px] rounded-full`}
                      />
                      <div>
                        {maxDate.getTime() <= currentDate
                          ? `Stale`
                          : `Recently updated`}
                      </div>
                    </div>
                  </div>
                </a>
              </BlockContainer>
            )
          })}
        </div>
      )}
      <div className="flex justify-center">
        {currentDisplay != null && (
          <div className="">
            <BlockContainer>
              <button
                className="justify-center items-center border-sky-100 p-2.5 border rounded-lg hover:text-black hover:mix-blend-screen text-lg font-bold text-sky-100"
                onClick={toggleDisplay}
              >
                Show {displaySmallData ? 'More' : 'Less'}
              </button>
            </BlockContainer>
          </div>
        )}
      </div>
    </div>
  )
}
