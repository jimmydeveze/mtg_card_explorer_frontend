import { useEffect } from "react";

export function useInfiniteScroll(callback, deps = []) {
  useEffect(() => {
    function handleScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (nearBottom) callback();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, deps);
}
