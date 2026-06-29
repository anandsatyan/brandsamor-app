import React from 'react';

type MotionProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
  whileHover?: unknown;
  whileTap?: unknown;
  layout?: unknown;
  variants?: unknown;
};

const stripMotionProps = ({
  initial: _initial,
  animate: _animate,
  exit: _exit,
  transition: _transition,
  whileHover: _whileHover,
  whileTap: _whileTap,
  layout: _layout,
  variants: _variants,
  ...htmlProps
}: MotionProps) => htmlProps;

const createMotionComponent = (tag: string) =>
  React.forwardRef<HTMLElement, MotionProps>(({ children, ...props }, ref) =>
    React.createElement(tag, { ...stripMotionProps(props), ref }, children),
  );

const motionCache = new Map<string, ReturnType<typeof createMotionComponent>>();

export const motion = new Proxy(
  {},
  {
    get: (_target, tag: string) => {
      if (!motionCache.has(tag)) {
        motionCache.set(tag, createMotionComponent(tag));
      }
      return motionCache.get(tag);
    },
  },
) as Record<string, ReturnType<typeof createMotionComponent>>;

export const AnimatePresence = ({ children }: { children?: React.ReactNode }) => (
  <>{children}</>
);
