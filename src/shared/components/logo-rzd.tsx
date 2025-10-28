import Image from 'next/image'
interface Props {
  children?: React.ReactNode
}
export function LogoRZD({ children }: Props) {
  return (
    <div className="relative  h-40 -mb-12 -mx-32">
      <Image
        src={'/images/logo-rzd.png'}
        priority
        fill
        alt="Logo RZD"
        className=""
      />
      <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-[24vw] -translate-y-1/2">
        {children}
      </div>
    </div>
  )
}
