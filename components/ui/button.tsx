import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-purple-500/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-600/25 hover:from-purple-500 hover:to-violet-500 hover:shadow-purple-500/35",
        outline:
          "border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-purple-700 aria-expanded:bg-slate-100 aria-expanded:text-slate-900 dark:border-purple-900/40 dark:bg-purple-950/20 dark:text-purple-200 dark:hover:bg-purple-900/40 dark:hover:text-white",
        secondary:
          "bg-purple-100 text-purple-900 hover:bg-purple-200 aria-expanded:bg-purple-200 dark:bg-purple-950/50 dark:text-purple-100 dark:hover:bg-purple-900/50",
        ghost:
          "text-slate-700 hover:bg-slate-100 hover:text-purple-700 aria-expanded:bg-slate-100 dark:text-purple-200 dark:hover:bg-purple-900/40 dark:hover:text-white",
        destructive:
          "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 focus-visible:border-rose-500/40 focus-visible:ring-rose-500/20 dark:bg-rose-500/20 dark:text-rose-300 dark:hover:bg-rose-500/30",
        link: "text-purple-600 underline-offset-4 hover:underline dark:text-purple-400",
      },
      size: {
        default:
          "h-9 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 rounded-lg px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-lg px-3 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-9 rounded-xl",
        "icon-xs": "size-7 rounded-lg",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  render,
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      render={render}
      nativeButton={nativeButton ?? !render}
      {...props}
    />
  )
}

export { Button, buttonVariants }