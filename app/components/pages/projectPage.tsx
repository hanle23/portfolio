'use client'
import React, { useCallback, useEffect, useState } from 'react'
import BlockContainer from '../specialComponent/BlockContainer'
import ProjectPageContent from './projectPage/projectPageContent'
import type { Project } from '@/app/types/github/project'

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
      {currentDisplay !== null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 justify-items-center mt-4 w-full h-fit">
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
                className="flex h-full w-80 sm:w-96 text-text-light"
              >
                <ProjectPageContent
                  project={project}
                  currentDate={currentDate}
                  maxDate={maxDate}
                />
              </BlockContainer>
            )
          })}
        </div>
      )}
      {currentDisplay !== null &&
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
