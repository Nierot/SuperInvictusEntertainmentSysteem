import './style/components/logo.sass'

type LogoProps = {
  color?: string
  backgroundColor?: string
}

export function Logo({ color, backgroundColor }: LogoProps) {
  return <div className="SiesLogo">
    <h1 style={{ color }}>Super Invictus</h1>
    <h2 style={{ color, backgroundColor }}>Entertainment Systeem</h2>
  </div>
}