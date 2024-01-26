import parse from 'html-react-parser';
import { cookies } from 'next/headers';

export const Embed = async () => {
  const html = cookies().get('embedHtml')?.value as string

  return (
    <>
      {html && <div key={html}>{parse(html)}</div>}
    </>
  )
}