interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-4xl font-bold text-center mb-12 text-white relative">
      {title}
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></span>
    </h2>
  );
}
