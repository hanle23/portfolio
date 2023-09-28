'use client'
import React, { useEffect, useState } from 'react'
import BlockContainer from '../components/specialComponent/NavLink'

export default function Page(): React.JSX.Element {
  const [data, setData] = useState<{ data: JSON[] } | null>(null)
  useEffect(() => {
    const fetchData = (): void => {
      fetch('/api/projects')
        .then(async (response) => await response.json())
        .then((result) => {
          setData(result)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-center text-sky-100 font-extrabold text-lg lg:text-3xl mt-8">{`Project List`}</h1>
      <div className="grid grid-cols-2">
        {data?.data.map((project: any) => {
          return (
            <BlockContainer key={project.name}>
              <a
                target="_blank"
                href={project.html_url}
                rel="noopener noreferrer"
                className="transition duration-150"
              >
                <p>{project.name}</p>
              </a>
            </BlockContainer>
          )
        })}
      </div>
    </div>
  )
}
