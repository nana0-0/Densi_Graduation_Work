import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import PDFstyles from "../styles/PDFIntro.module.scss";
import QAstyles from "../styles/CollapseQA.module.scss";
import React, { useCallback, useState, Suspense, useEffect } from "react";
import { GlitchText } from "../components/font";
import { getWindowSize } from "../components/screensize.js";
import { TwitterTweetEmbed, TwitterShareButton } from "react-twitter-embed";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const inter = Inter({ subsets: ["latin"] });

const CollapseQA = (props) => {
  const [open, setOpen] = useState(false);
  const styles = QAstyles;
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

const QASection = () => {
  const styles = QAstyles;
  return (
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
  );
};

const ResizeSpline = ({ scene, threshhold, loadtype }) => {
  const { height, width } = getWindowSize();
  const onLoad = useCallback(
    (spline) => {
      spline.setZoom(width < threshhold ? 0.5 : 1);
    },
    [width]
  );

  const loadingComponent_top = (
    // <div className={styles.lds}>
    //   <div className={styles.lds_spinner}><div></div><div></div></div>
    // </div>
    <div></div>
  );

  return (
    <Suspense fallback={<>{loadingComponent_top}</>}>
      {width === 0 ? (
        <>{loadingComponent_top}</>
      ) : (
        <Spline onLoad={onLoad} scene={scene} />
      )}
    </Suspense>
  );
};

function PDFIntro() {
  const { height, width } = getWindowSize();
  const [pdfimage, setPdfImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPdfImage((i) => (i + 1) % 6);
    }, 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className={PDFstyles.pdf}>
      <span className={PDFstyles.h2_span}>ゲームの説明書</span>
      <h2>
        <GlitchText text="GAME RULES" />
      </h2>
      <Image
        src={"/pdf_" + pdfimage + ".svg"}
        alt="ルール説明1"
        width={width < 700 ? 335 : 629}
        height={width < 700 ? 213 : 400}
        className={PDFstyles.pdf_img}
      />
      <div className={PDFstyles.pdf_carousel_wrap}>
        <ul className={PDFstyles.pdf_carousel}>
          {[...Array(6).keys()].map((_, i) => (
            <li className={pdfimage == i ? PDFstyles.circle : ""} key={i}>
              {pdfimage == i ? (
                <>
                  <span className={PDFstyles.cover1}></span>
                  <span className={PDFstyles.cover2}></span>
                </>
              ) : (
                <></>
              )}
              <button
                onClick={() => setPdfImage(i)}
                className={
                  pdfimage == i
                    ? PDFstyles.pdfimg_c_true
                    : PDFstyles.pdfimg_c_false
                }
              >
                {pdfimage == i ? (i + 1).toString() : "・"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p>詳しいルールは説明書(PDF)をダウンロード！!</p>
      <a
        href="https://drive.google.com/file/d/1y2R4mcj1_mLnwDGiks66NWxIvrEUT3nn/view?usp=sharing"
        target="_blank"
      >
        説明書
      </a>
    </section>
  );
}

export default function Home() {
  const { height, width } = getWindowSize();

  return (
    <>
      <Head>
        <title>ボードゲーム『宇宙人はダレ？』公式サイト</title>
        <meta
          name="description"
          content="ボードゲーム『宇宙人はダレ？』遊びで中１ギャップを未然に防ぐ卒業制作プロジェクト。日本電子専門学校 Webデザイン科 卒業・進級制作展2022にて展示します。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/mdl4cir.css"
        ></link>

        <meta
          property="og:url"
          content="https://utyujinhadare.yonayonaramens.com/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="ボードゲーム『宇宙人はダレ？』公式サイト"
        />
        <meta
          property="og:description"
          content="ボードゲーム『宇宙人はダレ？』遊びで中１ギャップを未然に防ぐ卒業制作プロジェクト。日本電子専門学校 Webデザイン科 卒業・進級制作展2022にて展示します。"
        />
        <meta property="og:site_name" content="宇宙人はダレ？" />
        <meta
          property="og:image"
          content="https://utyujinhadare.yonayonaramens.com/thumbnail.jpg"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d) {
                var config = {
                  kitId: 'gqb2syj',
                  scriptTimeout: 3000,
                  async: true
                },
                h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
              })(document);
        `,
          }}
        />
        <script src="https://fobi.io/embed.js"></script>
        <div
          id="embed-fobi"
          data-fobi-id="PtQLFQ4"
          data-bot-title="お問い合せ"
          data-hd-bg="#000000"
          data-hd-ti-clr="#FFF"
          data-ct-pm="#000000"
          data-ct-sc="#FFF"
          data-ct-bot-img="https://utyujinhadare.yonayonaramens.com/twitter.png"
          data-btn-offset="Right: 30px"
          data-cb-offset="Right: 30px"
          data-btn-img="https://fobi.io/icon.png"
          data-btn-bg="#000000"
          data-cb-height="400px"
          data-cb-width="330px"
        ></div>
      </Head>
      <h1 className={styles.fv_h1}>宇宙人はダレ？</h1>
      <a href="#" target="_blank" className={styles.fv_parchese}>
        購入する
      </a>
      <div className={styles.fv}>
        <div className={styles.spline}>
          <ResizeSpline
            scene="https://prod.spline.design/9ylSx0Y1eq4DTNo1/scene.splinecode"
            threshhold={700}
            loadtype="top"
          />
        </div>
        <div className={styles.topmove}>
          <p>
            {width < 1000
              ? "パッケージを２本指で触ると動かすことが出来ます"
              : "パッケージをドラックして動かすことが出来ます"}
          </p>
        </div>
        <p className={styles.scroll}>SCROLL</p>
      </div>
      <main className={styles.main}>
        <section className={styles.section_game}>
          <p className={styles.h1_p}>”遊び”で子供が抱えている問題に寄り添う</p>
          <h1 className={styles.h1}>
            <GlitchText text="宇宙人はダレ？" />
          </h1>
          <div className={styles.h1_bkfont_wrap}>
            <div className={styles.h1_bkfont_flex}>
              <Image
                src="/section_game_bkfont.svg"
                alt="Game Logo"
                width={width < 700 ? `${1704}` : `${2556}`}
                height={width < 700 ? `${208}` : `${311}`}
                className={styles.h1_bkfont}
              />
              <Image
                src="/section_game_bkfont.svg"
                alt="Game Logo"
                width={width < 700 ? `${1704}` : `${2556}`}
                height={width < 700 ? `${208}` : `${311}`}
                className={styles.h1_bkfont}
              />
            </div>
            <div className={styles.h1_bkfont_flex}>
              <Image
                src="/section_game_bkfont.svg"
                alt="Game Logo"
                width={width < 700 ? `${1704}` : `${2556}`}
                height={width < 700 ? `${208}` : `${311}`}
                className={styles.h1_bkfont}
              />
              <Image
                src="/section_game_bkfont.svg"
                alt="Game Logo"
                width={width < 700 ? `${1704}` : `${2556}`}
                height={width < 700 ? `${208}` : `${311}`}
                className={styles.h1_bkfont}
              />
            </div>
          </div>
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
            <GlitchText text="潜んでいる宇宙人を見つけ出して無事に惑星に辿り着けるのか!?" />
          </p>
          <Image
            src="/game_menu.png"
            alt="Game Logo"
            width={width < 700 ? 366 : 607}
            height={width < 700 ? 25 : 42}
            style={width < 700 ? { marginTop: 40 } : { marginTop: 70 }}
          />
        </section>
        <section className={styles.set}>
          <span className={styles.h2_span}>セット内容</span>
          <h2>
            <GlitchText text="SET CONTENTS" />
          </h2>
          <div className={styles.spline_set}>
            {width < 700 ? (
              <ResizeSpline
                scene="https://prod.spline.design/kij-EKWAzqH2005U/scene.splinecode"
                threshhold={1200}
                loadtype="game"
              />
            ) : (
              <ResizeSpline
                scene="https://prod.spline.design/X3VlyHt4jpTqn6jS/scene.splinecode"
                threshhold={1200}
                loadtype="game"
              />
            )}
          </div>
          <p className={styles.set_p}>
            内容物：コマ4個 / ミッションカード3枚 / トラップカード3枚 /
            星のかけら20枚 / スタート・ゴール各1枚 / 付箋1冊 /
            エネルギーカード6枚 / 宇宙人カード4枚 / 説明書
          </p>
        </section>
        <PDFIntro />
        <section className={styles.section_purchase}>
          <div className={styles.flex}>
            <div className={styles.spline_game}>
              <ResizeSpline
                scene="https://prod.spline.design/02til1DwlqIF5m0O/scene.splinecode"
                threshhold={1200}
                loadtype="game"
              />
            </div>
            <div className={styles.game_detail}>
              <dl className={styles.section_purchase_gametitle}>
                <dt className={styles.font_VDL}>宇宙人はダレ？</dt>
                <dd>
                  内容物：コマ4個 / ミッションカード3枚 / トラップカード3枚 /
                  星のかけら20枚 / スタート・ゴール各1枚 / 付箋1冊 /
                  エネルギーカード6枚 / 宇宙人カード4枚 / 説明書
                </dd>
              </dl>
              <p className={styles.purchase_price}>
                3,500<em className={styles.purchase_price_en}>円</em>
                <em className={styles.purchase_price_kakko}>
                  ( 税込・送料別 )
                </em>
              </p>
              <dl className={styles.section_purchase_author}>
                <div>
                  <dt>企画/制作</dt>
                  <dd>田中楠乃 ・野中杏莉</dd>
                </div>
                <div>
                  <dt>制作年 {"　"}</dt>
                  <dd>2022年</dd>
                </div>
              </dl>
              <a
                href="#"
                className={styles.game_a_purchase}
                target="_blank"
                rel="noopener noreferrer"
              >
                宇宙人はダレ？の購入はこちらから
              </a>
            </div>
          </div>
        </section>
        {/* <section className={styles.section_twitter}>
          <TwitterTweetEmbed tweetId={"1610189188338679808"} className={styles.twitter_embed}/>
          <TwitterShareButton
            url={"https://utyujinhadare.yonayonaramens.com/"}
            options={{
              text: "#宇宙人はダレ？ をシェアしよう！！",
              via: "YonayonaRamens",
            }}
          />
        </section> */}
        <QASection />
      </main>
      <footer className={styles.footer}>
        {/* <div className={styles.h1_bkfont_wrap}>
            <div className={styles.h1_bkfont_flex}>
              <Image
                src="/footer_bkimage.svg"
                alt="Game Logo"
                width={width < 700 ? `${630}` : `${1088}`}
                height={width < 700 ? `${90}` : `${41}`}
                className={styles.h1_bkfont}
              />
              <Image
                src="/footer_bkimage.svg"
                alt="Game Logo"
                width={width < 700 ? `${630}` : `${1088}`}
                height={width < 700 ? `${90}` : `${41}`}
                className={styles.h1_bkfont}
              />
            </div>
            <div className={styles.h1_bkfont_flex}>
              <Image
                src="/footer_bkimage.svg"
                alt="Game Logo"
                width={width < 700 ? `${630}` : `${1088}`}
                height={width < 700 ? `${90}` : `${41}`}
                className={styles.h1_bkfont}
              />
              <Image
                src="/footer_bkimage.svg"
                alt="Game Logo"
                width={width < 700 ? `${630}` : `${1088}`}
                height={width < 700 ? `${90}` : `${41}`}
                className={styles.h1_bkfont}
              />
            </div>
          </div> */}
        <p className={styles.footer_logo}>宇宙人はダレ？</p>
        <p className={styles.footer_text}>最新情報や制作裏話を発信中！</p>
        <div className={styles.footer_flex}>
          <a href="https://twitter.com/YonayonaRamens" target="_blank">
            <Image
              src="/footer_twitter.png"
              alt="宇宙人はダレ？Twitterアカウント"
              width={25.08}
              height={20.38}
              className={styles.footer_twitter}
            />
          </a>
          <a href="https://note.com/yonayonaramens/" target="_blank">
            <Image
              src="/footer_note.png"
              alt="宇宙人はダレ？noteサイト"
              width={100.4}
              height={37.1}
              className={styles.footer_note}
            />
          </a>
        </div>
        <p className={styles.copyright}>
          <small>&copy; 2022 YonayonaRamens. ALL RIGHTS RESERVED.</small>
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
