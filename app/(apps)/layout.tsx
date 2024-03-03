import '@/app/(apps)/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full w-full">{children}</body>
    </html>
  )
}
