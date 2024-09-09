import ContactButtons from './contactPage/contactButtons'

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="justify-items-center flex flex-col h-full w-full m-auto px-4 py-2">
      <div className="text-center font-extrabold text-3xl md:text-5xl my-10 h-fit">
        Contact Me
      </div>
      <div className="grid auto-rows-max h-full w-full">
        <div className="flex h-fit w-full">
          <p className="text-center">
            {
              "Hi there! I'm very excited to know that you have traveled all the way here to find my contact information! Here are some of the way we can connect (please don't sign me up to magazine subscriptions). I hope you can find a convenient way to reach out to me from the list below!"
            }
          </p>
        </div>

        <ContactButtons />
      </div>
    </div>
  )
}
