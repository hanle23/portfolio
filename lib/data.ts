import type { Experience } from '@/app/types/generic'
export const experiencesData: Experience[] = [
  {
    title: 'Information Technology Assistant (Work/Study)',
    company: 'York University School of Continuing Studies',
    location: 'Toronto, ON',
    description:
      'Design and developed scripts that assist with the current system within the IT team. Due to dependency with the main campus IT team, our IT team would always try to find a way through script to achieve many things without having to asking for permission, such as intercepting main website and inject new features using JQuery and JavaScript. The job was no where near standard but it gives me many chances to try out technologies and languages which was an eyes opener',
    startDate: new Date('2021-05-09'),
    endDate: new Date('2023-04-28'),
  },
  {
    title: 'Information Technology Assistant',
    company: 'York University School of Continuing Studies',
    location: 'Toronto, ON',
    description:
      'After working here as an intern, I came back to the same department as a first real job out of university. This time I was given the opportunity to try out other roles within our department, including Business Analysis, Project Management. Although since it was only a small part of my tasks, I have developed a full application that deploy Virtual Machine to students in the Big Data program. The application has been running for 4 semesters till we decided to retired it.',
    startDate: new Date('2023-07-28'),
    endDate: new Date('2024-03-28'),
  },
  {
    title: 'Full Stack Engineer',
    company: 'Tesoract Inc',
    location: 'Toronto, ON',
    description:
      'Working as one of the first Full Stack Engineer at Tesoract Inc and building everything from ground up. We have an extreme flexibility in voicing our wants in using a new library, or technology if it helps to build the app in a short amount of time. This experience has helped me many in realizing how much of an important to have a good system design prior to writing any line of code.',
    startDate: new Date('2023-04-09'),
    endDate: new Date(),
  },
] as const
