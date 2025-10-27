import Image from 'next/image'
interface Props {
  children?: React.ReactNode
}
export function LogoRZD({ children }: Props) {
  return (
    <div className="flex items-center justify-center relative w-90 h-30 -mb-6">
      <Image
        src={'/images/logo-rzd.png'}
        priority
        fill
        alt="Logo RZD"
        className="object-cover"
      />
      <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-[128px] -translate-y-[14px]">
        {children}
      </div>
    </div>
  )
}
