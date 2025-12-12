import { debounce } from "lodash";
import { useMemo } from "react";

export function useDebouncedField(setValue, field, delay = 500) {
  return useMemo(
    () =>
      debounce((value) => {
        setValue(field, value, { shouldValidate: true });
      }, delay),
    [delay, field, setValue],
  );
}
