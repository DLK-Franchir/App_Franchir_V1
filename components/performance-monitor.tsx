
'use client';

import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

export function usePerformanceMonitor(componentName: string) {
  const renderStartTime = useRef<number>(Date.now());
  const metricsRef = useRef<PerformanceMetrics[]>([]);

  useEffect(() => {
    const renderTime = Date.now() - renderStartTime.current;
    
    const metrics: PerformanceMetrics = {
      renderTime,
      componentName,
      timestamp: Date.now()
    };

    metricsRef.current.push(metrics);

    // Log des métriques en mode développement
    if (process.env.NODE_ENV === 'development') {
      console.group(`📊 Performance Metrics - ${componentName}`);
      console.log(`⏱️ Render Time: ${renderTime}ms`);
      console.log(`📈 Total Renders: ${metricsRef.current.length}`);
      console.groupEnd();
    }

    // Nettoyer les métriques anciennes (garder seulement les 10 dernières)
    if (metricsRef.current.length > 10) {
      metricsRef.current = metricsRef.current.slice(-10);
    }
  });

  return {
    metrics: metricsRef.current,
    averageRenderTime: metricsRef.current.reduce((sum, metric) => sum + metric.renderTime, 0) / metricsRef.current.length || 0
  };
}

// Hook pour surveiller la taille des composants
export function useComponentSize() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && process.env.NODE_ENV === 'development') {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          console.log(`📐 Component Size Change:`, {
            width: entry.contentRect.width,
            height: entry.contentRect.height,
            element: entry.target.className
          });
        }
      });

      resizeObserver.observe(ref.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  return ref;
}

// Hook pour surveiller les re-renders inutiles
export function useRenderCount(componentName: string) {
  const renderCount = useRef(0);
  const prevProps = useRef<any>();

  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 ${componentName} rendered ${renderCount.current} times`);
      
      if (renderCount.current > 5) {
        console.warn(`⚠️ ${componentName} has rendered ${renderCount.current} times - consider optimization`);
      }
    }
  });

  return {
    renderCount: renderCount.current,
    logProps: (props: any) => {
      if (process.env.NODE_ENV === 'development' && prevProps.current) {
        const changedProps = Object.keys(props).filter(
          key => props[key] !== prevProps.current[key]
        );
        
        if (changedProps.length > 0) {
          console.log(`📝 ${componentName} props changed:`, changedProps);
        }
      }
      prevProps.current = props;
    }
  };
}
