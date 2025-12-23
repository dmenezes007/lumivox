import { cn } from "../lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  iconSize?: number;
  showText?: boolean;
}

export function Logo({ className, iconSize = 32, showText = true, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)} {...props}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary shrink-0"
      >
        <rect x="2" y="2" width="13" height="13" rx="4" fill="currentColor" />
        <rect x="17" y="2" width="13" height="13" rx="4" fill="currentColor" fillOpacity="0.6" />
        <rect x="2" y="17" width="13" height="13" rx="4" fill="currentColor" fillOpacity="0.6" />
        <rect x="17" y="17" width="13" height="13" rx="4" fill="currentColor" fillOpacity="0.3" />
      </svg>
      {showText && (
        <span className="font-bold text-xl tracking-tight text-white">
          Ilumina<span className="text-primary">Vox</span>
        </span>
      )}
    </div>
  );
}