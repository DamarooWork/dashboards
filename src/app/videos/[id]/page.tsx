import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { Video } from '@/views'

const resolveLocalVideoSrc = (id: string) => {
  const fileName = id.endsWith('.mp4') ? id : `${id}.mp4`
  const filePath = join(process.cwd(), 'public', 'videos', fileName)
  return existsSync(filePath) ? `/videos/${fileName}` : '/videos/test-video.mp4'
}

export default async function VideoPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  return <Video src={resolveLocalVideoSrc(id)} />
}
