import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { ExternalHref, InternalHref } from "@/types/content";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-space-2 whitespace-nowrap rounded-md border border-transparent font-medium text-label outline-none transition-[color,background-color,border-color,box-shadow,translate] duration-[var(--motion-fast)] ease-[var(--ease-standard)] active:duration-[var(--motion-micro)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:text-text-muted disabled:opacity-100 aria-disabled:pointer-events-none aria-disabled:translate-y-0 aria-disabled:cursor-not-allowed aria-disabled:text-text-muted aria-disabled:opacity-100 [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg]:stroke-[1.75] motion-reduce:translate-none motion-reduce:transition-[color,background-color,border-color]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-canvas hover:bg-accent-hover disabled:bg-surface-raised aria-disabled:bg-surface-raised motion-safe:hover:translate-y-[var(--lift-button)] active:translate-y-0",
        secondary:
          "border-border-strong bg-surface-raised text-text hover:bg-surface-hover hover:border-text-muted active:bg-surface",
        ghost:
          "bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text active:bg-surface-raised",
        danger:
          "border-danger/40 bg-danger text-canvas hover:border-danger hover:shadow-sm disabled:border-border aria-disabled:border-border disabled:bg-surface-raised aria-disabled:bg-surface-raised motion-safe:hover:translate-y-[var(--lift-button)] active:translate-y-0 active:shadow-none",
      },
      size: {
        sm: "h-9 px-[0.875rem] [&>svg]:size-4 [&_[data-button-icon]]:size-4",
        md: "h-11 px-[1.125rem] [&>svg]:size-[1.125rem] [&_[data-button-icon]]:size-[1.125rem]",
        lg: "h-[3.25rem] px-space-6 text-body-md [&>svg]:size-5 [&_[data-button-icon]]:size-5",
        icon: "size-11 p-0 [&>svg]:size-5 [&_[data-button-icon]]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type ButtonSize = NonNullable<ButtonVariantProps["size"]>;

interface SharedButtonProps extends ButtonVariantProps {
  readonly leadingIcon?: ReactNode;
  readonly trailingIcon?: ReactNode;
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
}

type ButtonContentProps =
  | {
      readonly size: "icon";
      readonly "aria-label": string;
      readonly children?: ReactNode;
    }
  | {
      readonly size?: Exclude<ButtonSize, "icon">;
      readonly "aria-label"?: string;
      readonly children: ReactNode;
    };

type NativeElementProps = Omit<
  ComponentPropsWithRef<"button">,
  keyof SharedButtonProps | keyof ButtonContentProps | "href"
>;

type LinkElementProps = Omit<
  ComponentPropsWithRef<"a">,
  keyof SharedButtonProps | keyof ButtonContentProps | "href"
> & {
  readonly href: InternalHref | ExternalHref;
};

type NativeButtonProps = SharedButtonProps &
  ButtonContentProps &
  NativeElementProps & {
    readonly href?: never;
  };

type LinkButtonProps = SharedButtonProps &
  ButtonContentProps &
  LinkElementProps;

export type ButtonProps = NativeButtonProps | LinkButtonProps;

function ButtonContents({
  children,
  leadingIcon,
  trailingIcon,
  loading,
}: Pick<SharedButtonProps, "leadingIcon" | "trailingIcon" | "loading"> & {
  readonly children?: ReactNode;
}) {
  return (
    <>
      {loading ? (
        <LoaderCircle data-button-icon aria-hidden="true" strokeWidth={1.75} />
      ) : leadingIcon ? (
        <span
          data-button-icon
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center [&>svg]:size-full [&>svg]:stroke-[1.75]"
        >
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {trailingIcon ? (
        <span
          data-button-icon
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center [&>svg]:size-full [&>svg]:stroke-[1.75]"
        >
          {trailingIcon}
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    disabled = false,
    leadingIcon,
    loading = false,
    size = "md",
    trailingIcon,
    variant = "primary",
    ...elementProps
  } = props;
  const isDisabled = disabled || loading;
  const classes = cn(buttonVariants({ variant, size }), className);
  const contents = (
    <ButtonContents
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
      loading={loading}
    >
      {children}
    </ButtonContents>
  );

  if ("href" in elementProps && elementProps.href !== undefined) {
    const { href, onClick, rel, target, ...anchorProps } =
      elementProps as LinkElementProps;
    const safeRel =
      target === "_blank"
        ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
        : rel;

    if (isDisabled) {
      return (
        <a
          {...anchorProps}
          className={classes}
          role="link"
          aria-busy={loading || undefined}
          aria-disabled="true"
          tabIndex={-1}
          data-slot="button"
          data-size={size}
          data-variant={variant}
        >
          {contents}
        </a>
      );
    }

    const sharedLinkProps = {
      ...anchorProps,
      className: classes,
      onClick,
      rel: safeRel,
      target,
      "aria-busy": loading || undefined,
      "data-slot": "button",
      "data-size": size,
      "data-variant": variant,
    } as const;

    return href.startsWith("/") ? (
      <Link href={href} prefetch={false} {...sharedLinkProps}>
        {contents}
      </Link>
    ) : (
      <a href={href} {...sharedLinkProps}>
        {contents}
      </a>
    );
  }

  const { type, ...buttonProps } = elementProps as NativeElementProps;

  return (
    <button
      {...buttonProps}
      type={type ?? "button"}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-slot="button"
      data-size={size}
      data-variant={variant}
    >
      {contents}
    </button>
  );
}
