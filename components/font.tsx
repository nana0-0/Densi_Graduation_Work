"use client";
import React, { useEffect, useState, useRef, FC, useCallback } from "react";

/**
 * スクリーンにエレメントが表示されているか確認
 *
 * 参考: https://stackoverflow.com/a/65008608/13855413
 */
export const useOnScreen = (element: Element | null) => {
  // 表示されているか
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    // クライアント側で実行されていることの確認（SSR時点ではwindowはない）
    if (typeof window !== "undefined" && element) {
      /** 表示されているか状態を確認するツール */
      const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      );

      // 監視の開始
      observer.observe(element);

      // 監視の解除
      return () => {
        observer.disconnect();
      };
    }
  }, [element]);

  return isIntersecting;
};
/**
 * テキストのglitchを行うHook
 *
 * @param finalText 最終的に表示されるテキスト
 * @param possibleChars 途中で表示されるランダムな文字のサンプル
 * @returns 出力テキスト、テキストの表示進捗(0~1)、Glitchのアップデート
 */
export const useGlitchText = (
  finalText: string,
  possibleChars: string = "ｊファィエｊカニｘジャン；ｌニジｖｘ↓ｃｒ→ｊンエｓｃ"
) => {
  /** ランダムな文字の生成 */
  const randomChar = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * possibleChars.length);
    return possibleChars[randomIndex];
  }, [possibleChars]);

  const [outputStr, setOutputStr] = useState<string>(finalText);
  const [progress, setProgress] = useState<number>(0);

  const updateGlitch = useCallback(() => {
    const outputStr = (progress: number) => {
      let s = "";
      const numchars = Math.min(
        Math.floor(finalText.length * progress),
        finalText.length
      );
      for (let i = 0; i < numchars; i++) {
        s += finalText[i];
      }
      for (let i = numchars; i < finalText.length; i++) {
        s += randomChar();
      }
      return s;
    };
    setOutputStr(outputStr(progress));
  }, [progress, finalText, randomChar]);

  useEffect(() => {
    updateGlitch();
  }, [updateGlitch]);

  return [outputStr, setProgress, updateGlitch] as const;
};
/**
 * グリッチを起こしたテキストを表示するコンポーネント
 */
export const GlitchText: FC<{
  /** 最終的に表示するテキスト */
  text: string;
  /** 表示完了までの時間(ms) */
  duration?: number;
  /** グリッチの間隔(ms) */
  glitchInterval?: number;
  /** はじめの文字が確定するまでの時間(ms) */
  firstCharWaitDuration?: number;
  /** ランダムなテキストとして使用される文字 */
  possibleChars?: string;
}> = ({
  text,
  duration = 1000,
  glitchInterval = 100,
  firstCharWaitDuration = 1000,
  possibleChars,
}) => {
  // 一つ目の文字表示する
  const [firstOk, setfirstOk] = useState(false);
  // 表示されるテキスト
  const [glitchText, setProgress, updateGlitch] = useGlitchText(
    text,
    possibleChars
  );
  const textRef = useRef<HTMLSpanElement>(null);
  const isVisible = useOnScreen(textRef.current);

  // Timerを使ったEffect
  useEffect(() => {
    if (isVisible) {
      // 100ms秒ごとにアップデート
      const interval = setInterval(() => {
        if (firstOk) {
          setProgress((p) => (p < 1 ? p + glitchInterval / duration : p));
        }
        updateGlitch();
      }, glitchInterval);
      // はじめの文字が確定するまでのタイムアウト
      const firstDoneTimeout = setTimeout(() => {
        setfirstOk(true);
      }, firstCharWaitDuration);
      // タイマーの削除処理
      return () => {
        clearTimeout(firstDoneTimeout);
        clearInterval(interval);
      };
    } else {
      setProgress(0);
      setfirstOk(false);
      updateGlitch();
    }
  }, [
    duration,
    firstCharWaitDuration,
    firstOk,
    glitchInterval,
    isVisible,
    setProgress,
    text,
    updateGlitch,
  ]);

  return <span ref={textRef}>{glitchText}</span>;
};
