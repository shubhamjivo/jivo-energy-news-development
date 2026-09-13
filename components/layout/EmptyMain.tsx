type EmptyMainProps = {
  title: string;
};

export function EmptyMain({ title }: EmptyMainProps) {
  return (
    <main className="flex-1">
      <h1 className="sr-only">{title}</h1>
    </main>
  );
}
