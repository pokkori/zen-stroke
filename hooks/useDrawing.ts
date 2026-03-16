"use client";

import { useRef, useCallback, useState, useEffect } from "react";

interface Point {
  x: number;
  y: number;
  pressure: number; // 0-1
}

interface Stroke {
  points: Point[];
}

interface UseDrawingOptions {
  canvasSize?: number;
  minLineWidth?: number;
  maxLineWidth?: number;
  color?: string;
}

export function useDrawing(options: UseDrawingOptions = {}) {
  const {
    canvasSize = 320,
    minLineWidth = 2,
    maxLineWidth = 18,
    color = "#1a1a1a",
  } = options;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const currentStroke = useRef<Point[]>([]);
  const allStrokes = useRef<Stroke[]>([]);
  const lastPoint = useRef<Point | null>(null);
  const lastTimestamp = useRef<number>(0);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Canvasの実際のサイズとCSSサイズの比率（Retina対応）
  const getScale = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 1;
    return canvas.width / canvas.clientWidth;
  }, []);

  const getPos = useCallback(
    (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): Point => {
      const rect = canvas.getBoundingClientRect();
      const scale = getScale();
      let clientX: number, clientY: number;

      if ("touches" in e) {
        const touch = e.touches[0] || e.changedTouches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: (clientX - rect.left) * scale,
        y: (clientY - rect.top) * scale,
        pressure: 1,
      };
    },
    [getScale]
  );

  // 速度から線幅を計算（遅い=太い、速い=細い）
  const getLineWidth = useCallback(
    (current: Point, last: Point | null, timestamp: number): number => {
      if (!last) return maxLineWidth * 0.8;

      const dt = timestamp - lastTimestamp.current;
      if (dt <= 0) return maxLineWidth * 0.8;

      const dx = current.x - last.x;
      const dy = current.y - last.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = distance / dt; // pixels per ms

      // 速度が高い→細い線、遅い→太い線
      const speedFactor = Math.max(0, Math.min(1, speed / 2));
      const width = maxLineWidth - (maxLineWidth - minLineWidth) * speedFactor;
      return width;
    },
    [minLineWidth, maxLineWidth]
  );

  const drawSegment = useCallback(
    (ctx: CanvasRenderingContext2D, from: Point, to: Point, lineWidth: number) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // ベジェ曲線で滑らかに
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    },
    [color]
  );

  const startDrawing = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      isDrawing.current = true;
      const point = getPos(e, canvas);
      currentStroke.current = [point];
      lastPoint.current = point;
      lastTimestamp.current = Date.now();

      // 点を打つ（タッチしただけで印が出る）
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(point.x, point.y, maxLineWidth * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      setHasDrawn(true);
    },
    [getPos, color, maxLineWidth]
  );

  const draw = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const now = Date.now();
      const point = getPos(e, canvas);
      const lineWidth = getLineWidth(point, lastPoint.current, now);

      if (lastPoint.current) {
        drawSegment(ctx, lastPoint.current, point, lineWidth);
      }

      currentStroke.current.push(point);
      lastPoint.current = point;
      lastTimestamp.current = now;
    },
    [getPos, getLineWidth, drawSegment]
  );

  const stopDrawing = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      isDrawing.current = false;

      if (currentStroke.current.length > 0) {
        allStrokes.current.push({ points: [...currentStroke.current] });
      }
      currentStroke.current = [];
      lastPoint.current = null;
    },
    []
  );

  // ストローク単位でUndo
  const undo = useCallback(() => {
    if (allStrokes.current.length === 0) return;
    allStrokes.current.pop();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvasをクリアして再描画
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    allStrokes.current.forEach((stroke) => {
      if (stroke.points.length === 0) return;
      if (stroke.points.length === 1) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(stroke.points[0].x, stroke.points[0].y, maxLineWidth * 0.5, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      for (let i = 1; i < stroke.points.length; i++) {
        const lineWidth = maxLineWidth * 0.7; // undo後は均等な太さで再描画
        drawSegment(ctx, stroke.points[i - 1], stroke.points[i], lineWidth);
      }
    });

    if (allStrokes.current.length === 0) {
      setHasDrawn(false);
    }
  }, [color, maxLineWidth, drawSegment]);

  // 全クリア
  const clear = useCallback(() => {
    allStrokes.current = [];
    currentStroke.current = [];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }, []);

  // イベントリスナー登録
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // タッチイベント
    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDrawing, { passive: false });
    canvas.addEventListener("touchcancel", stopDrawing, { passive: false });

    // マウスイベント
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
      canvas.removeEventListener("touchcancel", stopDrawing);
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, [startDrawing, draw, stopDrawing]);

  return { canvasRef, undo, clear, hasDrawn, strokeCount: allStrokes.current.length };
}
