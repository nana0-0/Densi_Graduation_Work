import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Spline from "@splinetool/react-spline";
import React, { useState } from "react";
import { GlitchText } from "../components/font.js";
import { getWindowSize } from "../components/screensize.js";

const inter = Inter({ subsets: ["latin"] });

const CollapseQA = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <dl className={!open ? styles.qa_dl_close : styles.qa_dl_open}>
      <dt>
        <button
          onClick={() => setOpen(!open)}
          className={!open ? styles.qa_button_close : styles.qa_button_open}
        >
          Q.　{props.question}
        </button>
      </dt>
      <dd className={!open ? styles.qa_dd_close : styles.qa_dd_open}>
        {props.answer}
      </dd>
    </dl>
  );
};

export default function Home() {
  const { height, width } = getWindowSize();

  return (
    <>
      <Head>
        <title>ボードゲーム『宇宙人はダレ？』公式サイト</title>
        <meta name="description" content="ボードゲーム『宇宙人はダレ？』遊びで中１ギャップを未然に防ぐ卒業制作プロジェクト。日本電子専門学校 Webデザイン科 卒業・進級制作展2022にて展示します。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.spline}>
        <Spline scene="https://prod.spline.design/YnP5BZFjlDgJPj7r/scene.splinecode" />
      </div>
      <main className={styles.main}>
        <section className={styles.section_game}>
          <h1 className={styles.h1}>
            <GlitchText text="宇宙人はダレ？" />
          </h1>
          <Image
            src="/section_game_bkfont.png"
            alt="Game Logo"
            width={1841}
            height={125}
            className={styles.h1_bkfont}
          />
          <p className={styles.title}>
            <GlitchText text="ある日、地球は" />
            <em className={styles.title_em}>宇宙人</em>
            <GlitchText text="に侵略されてしまう。" />
            <br />
            <GlitchText text="ロケットで地球を脱出して惑星まで逃げようとするが　" />
            <br />
            <GlitchText text="逃げ込んだロケットの中に" />
            <em className={styles.title_em}>宇宙人</em>
            <GlitchText text="が潜んでいる !?" />
            <br />
            <GlitchText text="潜んでいる宇宙人を見つけ出して無事に惑星に辿り着けるのか。 !?" />
          </p>
          <Image
            src="/game_menu.png"
            alt="Game Logo"
            width={width < 700 ? 366 : 531}
            height={width < 700 ? 25 : 36}
            style={width < 700 ? { marginTop: 40 } : { marginTop: 70 }}
          />
        </section>
        <section className={styles.section_qa}>
          <h2 className={styles.h2}>
            {" "}
            <GlitchText text="Q&A" />
          </h2>
          <p className={styles.qa_p}>
            <GlitchText text="発送/返品・支払いについて" />
          </p>
          <CollapseQA
            question="発送・送料について"
            answer={
              <>
                商品の発送はヤマト運輸にてお送りいたします。送料は全国一律730円です。
              </>
            }
          />
          <CollapseQA
            question="注文のキャンセル・返品について"
            answer={
              <>
                商品に欠陥がある場合を除き、注文のキャンセル・返品は承っておりません。
              </>
            }
          />
          <CollapseQA
            question="お支払い方法は何がありますか？"
            answer="お支払いには、コンビニ決済・銀行振込・クレジットカード決済・（VISA / MASTER / JCB / AMEX / Diners）のご利用が可能です。"
          />
          <CollapseQA
            question="請求書や領収書を送付してもらうことは可能ですか？"
            answer={
              <>
                大変恐れ入りますが、BASEでは請求書や領収書の発行を行っておりませんので、基本的には、以下の内容でご対応をいただく必要がございます。
                <br />
                <br />
                請求書：
                <br />
                購入時に届く「ご購入いただきありがとうございました」メールを請求書の代わりとしてご利用ください。
                <br />
                後払い決済の場合のみ、請求書ハガキが商品発送後に郵送で届きます。
                <br />
                <br />
                領収書：
                <br />
                クレジットカード会社・キャリアより届く利用明細・コンビニや銀行より発行される受領書・後払い決済での
                お支払い時の受領書と、購入時に届く「ご購入いただきありがとうございました」
                <br />
                メールをあわせて、領収書の代わりとしてご利用ください。
              </>
            }
          />
          <CollapseQA
            question="商品はいつ届きますか？"
            answer="代金のお支払い確定後、5日以内に発送いたします。"
          />
          <CollapseQA
            question="受け取れなかった商品はどうなりますか？"
            answer={
              <>
                配送センターへ返送されます。不在伝票から再配達依頼をしてください。
              </>
            }
          />
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.gameLogo}>
          <Image
            src="/footer_font.png"
            alt="Game Logo"
            width={210}
            height={30}
          />
        </div>
        <p className={styles.footer_text}>最新情報や制作裏話を発信中！</p>
        <div className={styles.footer_flex}>
          <a href="https://twitter.com/YonayonaRamens" target="_blank">
            <Image
              src="/footer_twitter.png"
              alt="Game Logo"
              width={25.08}
              height={20.38}
              className={styles.footer_twitter}
            />
          </a>
          <a href="#" target="_blank">
            <Image
              src="/footer_note.png"
              alt="Game Logo"
              width={100.4}
              height={37.1}
              className={styles.footer_note}
            />
          </a>
        </div>
        <p className={styles.copyright}>
          <small>
            COPYRIGHT &copy; 2022 YonayonaRamens. ALL RIGHTS RESERVED.
          </small>
        </p>
      </footer>
      {/* <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
               <Image
                src="/footer_img.svg"
                alt="Game Logo"
                className={styles.vercelLogo}
                width={150}
                height={30}
                priority
              />
              『宇宙人はダレ？』を購入する
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main> */}
    </>
  );
}
