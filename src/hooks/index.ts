import { useEffect, useRef } from "react";
import { useTabs } from "hooks/useTabs";
import { useDefaultPath } from "hooks/useDefaultPath";

export const usePrevious = <T>(state: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return ref.current;
};

export { useTabs, useDefaultPath };