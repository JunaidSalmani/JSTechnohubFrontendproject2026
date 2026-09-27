import { useEffect } from "react";
import "./ElasticOverscroll.css";

/**
 * ElasticOverscroll - Disabled per user request (rubber band effect removed).
 */
export default function ElasticOverscroll() {
  useEffect(() => {
    const targetEl =
      document.querySelector(".page-main") || document.querySelector("main");
    if (targetEl) {
      targetEl.style.transform = "";
      targetEl.style.transformOrigin = "";
      targetEl.style.transition = "";
    }
  }, []);

  return null;
}
