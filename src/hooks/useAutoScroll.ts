import { useEffect, useRef, useCallback } from "react";

interface UseAutoScrollOptions {
  edgeThreshold?: number; // Distância da borda para ativar scroll (px)
  scrollSpeed?: number; // Velocidade do scroll (px por frame)
}

export function useAutoScroll(
  containerRef: React.RefObject<HTMLElement>,
  isDragging: boolean,
  options: UseAutoScrollOptions = {}
) {
  const { edgeThreshold = 100, scrollSpeed = 8 } = options;
  const animationRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;

    const scroll = () => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const { x, y } = mousePositionRef.current;

      // Scroll horizontal
      if (x < rect.left + edgeThreshold) {
        const intensity = 1 - (x - rect.left) / edgeThreshold;
        container.scrollLeft -= scrollSpeed * Math.max(0, intensity);
      } else if (x > rect.right - edgeThreshold) {
        const intensity = 1 - (rect.right - x) / edgeThreshold;
        container.scrollLeft += scrollSpeed * Math.max(0, intensity);
      }

      // Scroll vertical
      if (y < rect.top + edgeThreshold) {
        const intensity = 1 - (y - rect.top) / edgeThreshold;
        container.scrollTop -= scrollSpeed * Math.max(0, intensity);
      } else if (y > rect.bottom - edgeThreshold) {
        const intensity = 1 - (rect.bottom - y) / edgeThreshold;
        container.scrollTop += scrollSpeed * Math.max(0, intensity);
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, containerRef, edgeThreshold, scrollSpeed, handleMouseMove]);
}
