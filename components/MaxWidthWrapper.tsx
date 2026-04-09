import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-7xl px-2.5 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
