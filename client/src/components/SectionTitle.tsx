
interface Props {
  title: string
  subtitle: string
}

const SectionTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="pb-30">
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">{title}</h2>
      <p className="text-lg font-normal text-gray-500 lg:text-xl lg:px-64">{subtitle}</p>
    </div>
  )
}

export default SectionTitle