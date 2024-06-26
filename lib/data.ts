interface Experience {
  title: string
  company: string
  location: string
  description: string
  startDate: Date
  endDate: Date
}
export const experiencesData: Experience[] = [
  {
    title: 'Desktop Support Assistant',
    company: 'York University School of Continuing Studies',
    location: 'Toronto, ON',
    description:
      'During my time on the IT team, I designed and developed scripts to streamline our system. Since we often relied on the main campus IT team and wanted to avoid constant permissions, we got creative with our solutions. We would find ways to intercept the main website and inject new features using jQuery and JavaScript. The job was far from standard, but it gave me countless opportunities to experiment with different technologies and programming languages, which was a real eye-opener',
    startDate: new Date('2021-05-09'),
    endDate: new Date('2023-04-28'),
  },
  {
    title: 'Software Technical Support',
    company: 'York University School of Continuing Studies',
    location: 'Toronto, ON',
    description:
      'After working here as an intern, I returned to the same department for my first real job out of university. This time, I got to explore different roles within our department, including Business Analysis and Project Management. Although these tasks were only a small part of my responsibilities, I also developed a full application that deployed virtual machines to students in the Big Data program. The application ran successfully for four semesters before we decided to retire it',
    startDate: new Date('2023-07-28'),
    endDate: new Date(),
  },
  {
    title: 'Full Stack Engineer',
    company: 'Tesoract Inc',
    location: 'Toronto, ON',
    description:
      'With the opportunity of being the first developer in Tesoract, I have had the chance to do things that I never thought I will have the chance to, from nuking and remaking multiple database, to create a whole new invitation system, RBAC system, and many other things. This experience has solidify my interest in software developer even further knowing the possibility of over-engineering things is endless',
    startDate: new Date('2023-04-09'),
    endDate: new Date(),
  },
] as const
