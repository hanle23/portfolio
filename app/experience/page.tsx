import React from 'react'
import { experiencesData } from '@/lib/data'
export default function Page(): React.JSX.Element {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const experiences = [...experiencesData]
  experiences.sort(function (a: any, b: any) {
    return new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf()
  })
  return (
    <div className="items-center flex flex-col text-sky-100">
      <h2 className="text-center  font-extrabold text-lg md:text-5xl mt-8 mb-10">{`Experiences`}</h2>
      {experiences?.map((experience) => {
        return (
          <article className="flex flex-row w-7/12" key={experience.title}>
            <div className=" items-center w-2/12 shrink-0">
              <div className="sticky top-10">
                {`${
                  months[experience.startDate.getMonth()]
                } ${experience.startDate.getFullYear()} | ${
                  months[experience.endDate.getMonth()]
                } ${experience.endDate.getFullYear()}`}
              </div>
              <div className="sticky -z-[1] bottom-[100px]" />
            </div>
            <div>
              <h2>{experience.title}</h2>
              <h3>{experience.location}</h3>
              <p>{experience.description}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
  // return (
  //   <div className="flex flex-col space-y-12 text-sky-100 items-center mt-24">
  //     <section className="flex flex-col space-y-6 items-center font-bold">
  //       <h1 className="text-xl">Under Maintenance</h1>
  //       <p>You can try to refresh the page to see if the issue is resolved.</p>
  //       <BlockContainer className="h-fit w-fit">
  //         <button
  //           type="button"
  //           className="justify-center items-center border-sky-100 p-2.5 border rounded-lg hover:text-black text-xl font-bold text-sky-100 transition duration-150"
  //           onClick={() => {
  //             router.refresh()
  //           }}
  //         >
  //           Refresh
  //         </button>
  //       </BlockContainer>
  //     </section>
  //   </div>
  // )
}
