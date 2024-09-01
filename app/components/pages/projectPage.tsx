'use client'
import React, { useCallback, useEffect, useState } from 'react'
import BlockContainer from '../specialComponent/BlockContainer'

interface Project {
  name: string
  description: string
  updated_at: string
  pushed_at: string
  html_url: string
}
interface RES {
  data: Project[]
}

export default function ProjectPage(): React.JSX.Element {
  const [data, setData] = useState<Project[] | null>(null)
  const [displaySmallData, setDisplaySmallData] = useState(true)

  const toggleDisplay = useCallback(() => {
    setDisplaySmallData((prevDisplay) => !prevDisplay)
  }, [])
  useEffect(() => {
    const fetchData = (): void => {
      fetch('/api/projects', { cache: 'no-store' })
        .then(async (response) => await response.json())
        .then((result: RES) => {
          setData(result.data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }

    fetchData()
  }, [])

  const smallData =
    data?.length !== undefined && data?.length > 6 ? data?.slice(0, 6) : data
  const currentDisplay = displaySmallData ? smallData : data

  return (
    <div
      id="projects-section"
      className="h-screen w-fit flex flex-col  m-auto z-[0]"
    >
      <div className="text-center text-text-light font-extrabold text-3xl md:text-5xl mt-8">
        Project List
      </div>
      {currentDisplay != null && (
        <div className="grid grid-cols-2  gap-y-4 justify-items-center mt-4 w-full h-fit">
          {currentDisplay?.map((project: Project) => {
            const recentActivity =
              new Date(project.updated_at) > new Date(project.pushed_at)
                ? 'updated_at'
                : 'pushed_at'
            const currentDate = new Date().getTime()
            const maxDate = new Date(project[recentActivity])
            maxDate.setMonth(maxDate.getMonth() + 1)
            return (
              <BlockContainer
                key={project.name}
                className="flex h-full w-9/12 text-text-light"
              >
                <a
                  target="_blank"
                  href={project.html_url}
                  rel="noopener noreferrer"
                  className="border border-text-light inline-block rounded-md p-2.5  transition duration-150 w-full relative"
                >
                  <div className="flex flex-col h-full overflow-hidden">
                    <div className=" font-bold text-lg md:text-xl">
                      {project.name
                        .replace(/-/gi, ' ')
                        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase())}
                    </div>
                    <p className="line-clamp-2 hover:line-clamp-none">
                      {project.description ?? ''}
                    </p>
                    <div className="text-sm  flex items-center space-x-1 mt-auto">
                      <div
                        className={`border border-transparent ${
                          maxDate.getTime() <= currentDate
                            ? 'bg-sky-100'
                            : 'bg-green-600'
                        } h-[10px] w-[10px] rounded-full`}
                      />
                      <div>
                        {maxDate.getTime() <= currentDate
                          ? 'Stale'
                          : 'New update available!'}
                      </div>
                    </div>
                  </div>
                </a>
              </BlockContainer>
            )
          })}
        </div>
      )}
      {currentDisplay != null &&
        data?.length !== undefined &&
        data?.length > 6 && (
          <div className="flex justify-center mt-10">
            <BlockContainer>
              <button
                className="justify-center text-text-light items-center border-text-light p-2.5 border rounded-lg  hover:mix-blend-screen text-lg font-bold"
                onClick={toggleDisplay}
              >
                Show {displaySmallData ? 'More' : 'Less'}
              </button>
            </BlockContainer>
          </div>
        )}
    </div>
  )
}
