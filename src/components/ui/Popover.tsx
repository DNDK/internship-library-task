import {
  useState,
  createContext,
  useContext,
  useRef,
  type ReactNode,
  useEffect,
} from "react";

import "../../css/Popover.css";

interface PopoverProps {
  open?: boolean;
  onOpenChange?: (val: boolean) => void;
  children?: ReactNode;
}

interface PopoverContextValue {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}

const PopoverCtx = createContext<PopoverContextValue | null>(null);
const usePopoverCtx = () => {
  const ctx = useContext(PopoverCtx);
  return ctx;
};

export function PopoverTrigger(props: React.ComponentProps<"button">) {
  const ctx = usePopoverCtx();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ctx) return;
    ctx.onOpenChange(!ctx.open);
  };
  return (
    <button
      className={props.className}
      onClick={handleClick}
      data-popover-trigger
    >
      {props.children}
    </button>
  );
}

export function PopoverContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = usePopoverCtx();

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState<boolean>(!!ctx?.open);
  const [animationClass, setAnimationClass] = useState<string>("");
  const handleAnimationEnd = () => {
    if (!ctx?.open) {
      setShouldRender(false);
    }
    setAnimationClass("");
  };

  useEffect(() => {
    if (!ctx) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!popoverRef.current) return;
      if ((e.target as HTMLElement).closest("[data-popover-trigger]")) return;
      if (!popoverRef.current.contains(e.target as Node)) {
        ctx.onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ctx]);

  useEffect(() => {
    if (ctx?.open) {
      console.log("OPEN TRUE");
      setShouldRender(true);
      setAnimationClass("popover__animation-appear");
    } else {
      setAnimationClass("popover__animation-disappear");
    }
  }, [ctx?.open]);

  useEffect(() => {
    if (shouldRender) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [shouldRender]);

  return (
    <>
      {shouldRender ? (
        <div
          className={`${className ? `${className} ` : ""} popover__content ${animationClass}`}
          {...props}
          ref={popoverRef}
          onAnimationEnd={handleAnimationEnd}
        >
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export function PopoverOverlay() {}

export function Popover(props: PopoverProps) {
  const [_open, _setOpen] = useState<boolean>(false);
  return (
    <PopoverCtx.Provider
      value={{
        open: _open,
        onOpenChange: _setOpen,
      }}
    >
      <div className="popover__root" role="dialog" aria-modal="false">
        {props.children}
      </div>
    </PopoverCtx.Provider>
  );
}
