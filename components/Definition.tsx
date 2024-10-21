interface DefinitionProps {
  term: string;
  description: string | number;
  className?: string; // Optional className prop
}

export default function Definition({ term, description, className }: DefinitionProps) {
  return (
    <div className={className}>
      <dt className="font-bold">{term}</dt>
      <dd>{description}</dd>
    </div>
  );
}
