import { useMemo } from "react";

const useQueryParams = () => {
  return useMemo(
    () => new URLSearchParams(window.location.search),
    [window.location.search]
  );
};

export default useQueryParams;
