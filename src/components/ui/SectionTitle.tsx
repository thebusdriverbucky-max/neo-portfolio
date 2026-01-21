interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white relative inline-block mb-4">
        {title}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="text-slate-400 mt-2 text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
