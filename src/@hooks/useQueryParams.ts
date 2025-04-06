import { useMemo } from "react";

/**
 * A custom hook to parse and return the URL query parameters.
 *
 * This hook uses the `useMemo` hook to memoize the `URLSearchParams` object
 * created from the current window location's search string. It ensures that
 * the `URLSearchParams` object is only recalculated when the `window.location.search`
 * value changes.
 *
 * Usage:
 * const queryParams = useQueryParams();
 *
 * # To get a specific query parameter:
 * const value = queryParams.get('paramName');
 *
 * This is useful for reading query parameters in a React component.
 */

const useQueryParams = () => {
  return useMemo(
    () => new URLSearchParams(window.location.search),
    [window.location.search]
  );
};

export default useQueryParams;
