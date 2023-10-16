export default function scrollToSection(elementId: string): void {
  const element = document.getElementById(elementId)
  if (element === null) return
  element.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  })
}
