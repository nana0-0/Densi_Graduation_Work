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
import Link from "next/link";

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

// function Loading() {
//   const { height, width } = getWindowSize();
//   const [loading, setLoading] = useState(<></>);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       return (
//        setLoading(<></>)
//       );
//     }, 4000);
//     return () => {
//       clearInterval(interval);
//       setLoading(<section className={styles.loading}>
//         <p className={styles.loading_p}>宇宙人はダレ？</p>
//         <div className={styles.loading_img}>
//         <Image
//               src="/loading.png"
//               alt="Game Logo"
//               width={width < 700 ? `${115}` : `${115}`}
//               height={width < 700 ? `${90}` : `${90}`}
//             />
//             </div>
//       </section>)
//     };
//   }, []);

//   return (
//     loading
//   );
// }

function Loading() {
  const { height, width } = getWindowSize();
  const [loading, setLoading] = useState(true);
  let [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 2000);
    setLoading(true);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return loading ? (
    <section className={styles.loading}>
      <p className={styles.loading_p}>Loading</p>
      <div className={styles.progBar}>
        <p className={styles.bar}></p>
      </div>
    </section>
  ) : (
    <></>
  );
}

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
        width={width < 700 ? 382 : 629}
        height={width < 700 ? 243 : 400}
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
        ダウンロード
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
          content="ボードゲーム『宇宙人はダレ？』遊びで中１ギャップを未然に防ぐ卒業制作プロジェクト。"
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
          content="ボードゲーム『宇宙人はダレ？』遊びで中１ギャップを未然に防ぐ卒業制作プロジェクト。"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JZ93K6Y5M6"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-JZ93K6Y5M6');`,
          }}
        />
      </Head>
      {/* <Loading /> */}
      <h1 className={styles.fv_h1}>宇宙人はダレ？</h1>
      <a
        href="https://yona2ramen.base.shop/"
        target="_blank"
        className={styles.fv_parchese}
      >
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
                width={width < 700 ? `${1278}` : `${2308}`}
                height={width < 700 ? `${156}` : `${273}`}
                className={styles.h1_bkfont}
              />
              <Image
                src="/section_game_bkfont.svg"
                alt="Game Logo"
                width={width < 700 ? `${1278}` : `${2308}`}
                height={width < 700 ? `${156}` : `${273}`}
                className={styles.h1_bkfont}
              />
            </div>
            <div className={styles.h1_bkfont_flex}>
              <Image
                src="/section_game_bkfont.svg"
                alt="Game Logo"
                width={width < 700 ? `${1278}` : `${2308}`}
                height={width < 700 ? `${156}` : `${273}`}
                className={styles.h1_bkfont}
              />
              <Image
                src="/section_game_bkfont.svg"
                alt="Game Logo"
                width={width < 700 ? `${1278}` : `${2308}`}
                height={width < 700 ? `${156}` : `${273}`}
                className={styles.h1_bkfont}
              />
            </div>
          </div>
          <p className={styles.title}>
            <GlitchText text="ある日、地球は宇宙人" />
            <GlitchText text="に侵略されてしまう。" />
            <br />
            <GlitchText text="ロケットで地球を脱出して惑星まで逃げようとするが　" />
            <br />
            <GlitchText text="逃げ込んだロケットの中に宇宙人" />
            <GlitchText text="が潜んでいる !?" />
            <br />
            <GlitchText text="潜んでいる宇宙人を見つけ出して無事に惑星に辿り着けるのか!?" />
          </p>
          <video
            width={width < 700 ? `${120}` : `${200}`}
            height={width < 700 ? `${120}` : `${200}`}
            className={styles.goal}
            src="/goal.webm"
            loop
            autoPlay
            muted
            playsInline
            autoplay
          ></video>
          <video
            width={width < 700 ? `${120}` : `${200}`}
            height={width < 700 ? `${120}` : `${200}`}
            className={styles.start}
            src="/start.webm"
            loop
            autoPlay
            muted
            playsInline
            autoplay
          ></video>
          <video
            width={width < 700 ? `${120}` : `${200}`}
            height={width < 700 ? `${120}` : `${200}`}
            className={styles.hosinokakera}
            src="/hosinokakera.webm"
            loop
            autoPlay
            muted
            playsInline
            autoplay
          ></video>
          <video
            width={width < 700 ? `${120}` : `${200}`}
            height={width < 700 ? `${120}` : `${200}`}
            className={styles.trap}
            src="/trap.webm"
            loop
            autoPlay
            muted
            playsInline
            autoplay
          ></video>
          {width < 700 ? (
            <Image
              src="/game_menu_phone.webp"
              alt="プレイヤー：4人 プレイ時間：20分 対象年齢：10歳以上"
              className={styles.explain}
              width={299}
              height={99}
              style={{ marginTop: 40 }}
            />
          ) : (
            <Image
              src="/game_menu.webp"
              alt="プレイヤー：4人 プレイ時間：20分 対象年齢：10歳以上"
              className={styles.explain}
              width={607}
              height={42}
              style={{ marginTop: 70 }}
            />
          )}
          <div className={styles.slider_img_wrap}>
            <div className={styles.slider_img_flex}>
              <Image
                src="/slider0.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${280}` : `${280}`}
                height={width < 700 ? `${280}` : `${280}`}
                className={styles.slider_img}
              />
              <Image
                src="/slider1.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
              />
              <Image
                src="/slider2.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
              />
              <Image
                src="/slider3.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${200}` : `${200}`}
                height={width < 700 ? `${200}` : `${200}`}
                className={styles.slider_img}
              />
              <Image
                src="/slider4.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
              />
              <Image
                src="/slider5.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${280}` : `${280}`}
                height={width < 700 ? `${280}` : `${280}`}
                className={styles.slider_img}
              />
              {/* <video
                src="/slider0_t.webm"
                width={width < 700 ? `${280}` : `${280}`}
                height={width < 700 ? `${280}` : `${280}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video>
              <video
                src="/slider1_t.webm"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video>
              <video
                src="/slider2_t.webm"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video>
              <video
                src="/slider3_t.webm"
                width={width < 700 ? `${200}` : `${200}`}
                height={width < 700 ? `${200}` : `${200}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video>
              <video
                src="/slider4_t.webm"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video>
              <video
                src="/slider5_t.webm"
                width={width < 700 ? `${280}` : `${280}`}
                height={width < 700 ? `${280}` : `${280}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video> */}
            </div>
            <div className={styles.slider_img_flex}>
              {/* <video
                src="/slider0_t.webm"
                width={width < 700 ? `${280}` : `${280}`}
                height={width < 700 ? `${280}` : `${280}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video>
              <video
                src="/slider1_t.webm"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video>
              <video
                src="/slider2_t.webm"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video>
              <video
                src="/slider3_t.webm"
                width={width < 700 ? `${200}` : `${200}`}
                height={width < 700 ? `${200}` : `${200}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video>
              <video
                src="/slider4_t.webm"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video>
              <video
                src="/slider5_t.webm"
                width={width < 700 ? `${280}` : `${280}`}
                height={width < 700 ? `${280}` : `${280}`}
                className={styles.slider_img}
                loop
                autoPlay
                muted
                playsInline
                autoplay
              ></video> */}
               <Image
                src="/slider0.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${280}` : `${280}`}
                height={width < 700 ? `${280}` : `${280}`}
                className={styles.slider_img}
              />
              <Image
                src="/slider1.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
              />
              <Image
                src="/slider2.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
              />
              <Image
                src="/slider3.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${200}` : `${200}`}
                height={width < 700 ? `${200}` : `${200}`}
                className={styles.slider_img}
              />
              <Image
                src="/slider4.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${150}` : `${150}`}
                height={width < 700 ? `${150}` : `${150}`}
                className={styles.slider_img}
              />
              <Image
                src="/slider5.gif"
                alt="ゲームしている画像"
                width={width < 700 ? `${280}` : `${280}`}
                height={width < 700 ? `${280}` : `${280}`}
                className={styles.slider_img}
              />
            </div>
          </div>
        </section>
        <section className={styles.set}>
          <span className={styles.h2_span}>セット内容</span>
          <h2>
            <GlitchText text="SET CONTENTS" />
          </h2>
          {width < 700 ? (
            <Image
              src="/set_phone.webp"
              alt="セット内容"
              className={styles.set_phone}
              width={339}
              height={716}
            />
          ) : width < 1400 ? (
            <Image
              src="/set_ipad.webp"
              alt="セット内容"
              className={styles.set_phone}
              width={677}
              height={373}
            />
          ) : (
            <div className={styles.spline_set}>
              <ResizeSpline
                scene="https://prod.spline.design/X3VlyHt4jpTqn6jS/scene.splinecode"
                threshhold={1200}
                loadtype="game"
                className={styles.set_pc}
              />
            </div>
          )}
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
                href="https://yona2ramen.base.shop/"
                className={styles.game_a_purchase}
                target="_blank"
                rel="noopener noreferrer"
              >
                宇宙人はダレ？の購入はこちらから
              </a>
            </div>
          </div>
        </section>
        <section className={styles.section_production_background}>
          {width < 700 ? (
            <Image
              src="/section_talk_background_phone.svg"
              alt=""
              width={325}
              height={131}
              className={styles.section_talk_background}
            />
          ) : width < 1100 ? (
            <Image
              src="/section_talk_background.svg"
              alt="share"
              width={1196}
              height={124}
              className={styles.section_talk_background}
            />
          ) : (
            <Image
              src="/section_talk_background.svg"
              alt="share"
              width={1196}
              height={124}
              className={styles.section_talk_background}
            />
          )}
          <div className={styles.section_production_background_flex}>
            <div className={styles.section_production_background_div_l}>
              <h2>制作背景座談会</h2>
              <p>
                中１ギャップという小学校から中学校に上がる際に自意識と客観的事実との違いに悩み、
                周りの学生との人間関係をうまく構築できず集団生活になじめないという問題を未然に防ぐことを目的に、今回ボードゲームを制作しました。そんな私たちの制作背景を座談会形式で紹介します。
              </p>
              <Link
                href="/coming"
                target="_blank"
                className={styles.section_production_background_a}
              >
                座談会を読む
              </Link>
            </div>
            <div className={styles.section_production_background_div_r}>
              <div className={styles.section_production_background_div_c}>
                <Image
                  src="/tanaka.webp"
                  alt="田中楠乃"
                  width={width < 700 ? `${186}` : `${314}`}
                  height={width < 700 ? `${151}` : `${255}`}
                  className={styles.twitter_share}
                />
                <dl>
                  <dt>田中 楠乃（たなか なない）</dt>
                  <dd>2002年 7月生まれ</dd>
                  <dd>ネコが好き</dd>
                </dl>
              </div>
              <div className={styles.section_production_background_div_c}>
                <dl>
                  <dt>野中 杏莉（のなか あんり）</dt>
                  <dd>2002年 7月生まれ</dd>
                  <dd>ギターが好き</dd>
                </dl>
                <Image
                  src="/nonaka.webp"
                  alt="野中杏莉"
                  width={width < 700 ? `${166}` : `${274}`}
                  height={width < 700 ? `${172}` : `${265}`}
                  className={styles.twitter_share}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={styles.section_twitter}>
          <Image
            src="/share.svg"
            alt="share"
            width={69}
            height={16}
            className={styles.twitter_share}
          />
          <h2>
            #宇宙人はダレ？で<br className={styles.twitter_br}></br>
            シェアしよう！
          </h2>
          <p>
            下記のツイートをシェアしてくれた人の中から
            <br className={styles.twitter_br_phone}></br>抽選で1名様に
            <br className={styles.twitter_br_pc}></br>
            ボードゲーム<br className={styles.twitter_br_phone}></br>
            『宇宙人はダレ？』をプレゼント！
          </p>
          <p>期間：2023年2月2日〜2023年3月1日まで</p>
          <TwitterTweetEmbed
            tweetId={"1610189188338679808"}
            className={styles.twitter_embed}
          />
          <a
            href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&text=%23%E5%AE%87%E5%AE%99%E4%BA%BA%E3%81%AF%E3%83%80%E3%83%AC%EF%BC%9F%20%E3%82%92%E3%82%B7%E3%82%A7%E3%82%A2%E3%81%97%E3%82%88%E3%81%86%EF%BC%81%EF%BC%81&url=https%3A%2F%2Futyujinhadare.yonayonaramens.com%2F&via=YonayonaRamens"
            className={styles.twitterbtn}
            target="_blank"
          >
            シェアする
          </a>
        </section>
        <QASection />
      </main>
      <section className={styles.section_aboutas}>
        <h2>ABOUT US</h2>
        <dl className={styles.section_aboutas_dl1}>
          <dt>
            <em>YonayonaRamens</em> とは
          </dt>
          <dd>
            “モノづくり”で驚きと楽しさを提供する二人組のクリエーターです。
            <br></br>
            「妥協しないで、より良いサービスを生み出す」というコンセプトを掲げ、活動を行っています。
          </dd>
        </dl>
        <dl className={styles.section_aboutas_dl2}>
          <dt>制作者</dt>
          <dd>
            <div>
              <Image
                src="/aboutas_tanaka.webp"
                alt="Nanaiの画像"
                width={width < 700 ? `${100}` : `${120}`}
                height={width < 700 ? `${100}` : `${120}`}
              />
              <p style={{ fontWeight: 700 }}>Nanai</p>
              <p style={{ marginTop: 0 }}>ネコが好き</p>
            </div>
            <div>
              <Image
                src="/aboutas_nonaka.webp"
                alt="Anriの画像"
                width={width < 700 ? `${100}` : `${120}`}
                height={width < 700 ? `${100}` : `${120}`}
              />
              <p style={{ fontWeight: 700 }}>Anri</p>
              <p style={{ marginTop: 0 }}>ギターが好き</p>
            </div>
          </dd>
        </dl>
      </section>
      <footer className={styles.footer}>
        <p className={styles.footer_logo}>宇宙人はダレ？</p>
        <p className={styles.footer_text}>最新情報や制作裏話を発信中！</p>
        <div className={styles.footer_flex}>
          <a href="https://twitter.com/YonayonaRamens" target="_blank">
            <Image
              src="/footer_twitter.webp"
              alt="宇宙人はダレ？Twitterアカウント"
              width={25.08}
              height={20.38}
              className={styles.footer_twitter}
            />
          </a>
          <a href="https://note.com/yonayonaramens/" target="_blank">
            <Image
              src="/footer_note.webp"
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
    </>
  );
}
