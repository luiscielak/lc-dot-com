type CaseFigureProps = {
  src: string
  alt: string
  caption: string
  phone?: boolean
}

export function CaseFigure({ src, alt, caption, phone = true }: CaseFigureProps) {
  return (
    <figure className={phone ? 'cs-figure phone' : 'cs-figure'}>
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
