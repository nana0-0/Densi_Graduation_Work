import { useEffect, useState, useRef } from "react";

/**
 * スクリーンにエレメントが表示されているか確認
 *
 * 参考: https://stackoverflow.com/a/65008608/13855413
 * @param {Element} ref 表示されているか確認するエレメント
 * @returns {Boolean} 表示されている
 */
export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer =
      typeof window !== "undefined"
        ? new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting)
          )
        : null;
    if (observer) observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      if (observer) observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

/**
 * グリッチ表示のテキスト
 * @param {Object} props
 * @param {string} props.text 最終的に表示したいテキスト
 * @returns グリッチ表示のテキスト
 */
export const GlitchText = ({ text }) => {
  /** ランダムに使う文字の種類 */
  const possible = "ｊファィエｊカニｘジャン；ｌニジｖｘ↓ｃｒ→ｊンエｓｃ";
  /** ランダムな文字の生成 */
  const randomChar = () => {
    const randomIndex = Math.floor(Math.random() * possible.length);
    return possible[randomIndex];
  };
  // 一つ目の文字表示する
  const [firstOk, setfirstOk] = useState(false);
  // ここまで表示するというインデックス
  const [doneIndex, setDoneIndex] = useState(0);
  // 表示されるテキスト
  const [str, setStr] = useState("");
  const textRef = useRef(null);
  const isVisible = useOnScreen(textRef);

  useEffect(() => {
    setfirstOk((f) => (!isVisible && f ? false : f));
    setDoneIndex((n) => (!isVisible ? 0 : n));
  }, [isVisible]);

  // Timerを使ったEffect
  useEffect(() => {
    /** はじめのn文字を表示したいテキストにしたランダムなテキスト
     * @param {number} n 最初から表示したい文字数
     */
    const outputStr = (n) => {
      let s = "";
      for (let i = 0; i < n; i++) {
        s += text[i];
      }
      for (let i = n; i < text.length; i++) {
        s += randomChar();
      }
      return s;
    };
    setStr(outputStr(doneIndex));
    // 100ms秒ごとにアップデート
    const interval = setInterval(() => {
      if (firstOk && doneIndex < text.length) {
        setDoneIndex((d) => d + 1);
      }
      if (doneIndex >= text.length) {
        clearInterval(interval);
      }
      setStr(outputStr(doneIndex));
    }, 100);
    // はじめの文字が確定するまでのタイムアウト
    const firstDoneTimeout = setTimeout(() => {
      setfirstOk(true);
      clearTimeout(firstDoneTimeout);
    }, 1000);
    // タイマーの削除処理
    return () => {
      clearTimeout(firstDoneTimeout);
      clearInterval(interval);
    };
  }, [doneIndex, firstOk, text]);

  return <span ref={textRef}>{str}</span>;
};