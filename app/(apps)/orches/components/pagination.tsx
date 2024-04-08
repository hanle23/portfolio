import React, { useState } from 'react'

interface PaginationProps {
  total: number
  initialPage: number
  onChange: (page: number) => void
  className?: string
}

export default function Pagination({
  total,
  initialPage,
  onChange,
  className,
}: PaginationProps): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
    onChange(page)
  }
  return (
    <div className={className ?? 'flex justify-center overflow-hidden'}>
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`w-9 h-9 rounded-full data-[active]:bg-spotify-color ${
            page === currentPage ? 'bg-spotify-color' : ''
          }`}
          onClick={() => {
            handlePageChange(page)
          }}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
