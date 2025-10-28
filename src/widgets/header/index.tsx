
interface Props {
  className?: string
  title: string
}
export  function  Header({className, title}:Props){

  return (
    <header className={className}>
      <h1 className="text-3xl font-bold text-background shrink-0 ">
        {title}
      </h1>
    </header>
  )
}