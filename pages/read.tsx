import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import styles from '../styles/Home.module.css';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, DivPx } from '@moai/core';
import { HiOutlineArrowLeft as LeftArrow } from 'react-icons/hi';
import { HiOutlineExternalLink as externalLink } from 'react-icons/hi';
import { RoundedPanel } from '../components/RoundedPane';

const fetchHtml = async (url) => {
  const res = await fetch(url);
  return await res.text();
};

export const getServerSideProps = async (context) => {
  const { url } = context.query;
  const htmlContent = await fetchHtml(url);
  const doc = new JSDOM(htmlContent, { url });
  const reader = new Readability(doc.window.document);
  const article = reader.parse();
  return {
    props: { article }
  };
};

const ReadPage = ({ article }) => {
  const router = useRouter();
  const { url } = router.query;
  return (
    <div className={styles.container}>
      <Head>
        <title>WeBuild Community Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="flex-with-space-between">
          <Link href="/">
            <Button icon={LeftArrow}>Quay về trang chủ</Button>
          </Link>
          <Button
            iconRight
            highlight
            icon={externalLink}
            href={url as string}
            target="_blank"
          >
            Đọc trên blog của tác giả
          </Button>
        </div>
        <DivPx size={16} />
        <RoundedPanel>
          <h1>{article.title}</h1>
          <div
            className="justify"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </RoundedPanel>
        <DivPx size={16} />
        <Link href="/">
          <Button icon={LeftArrow}>Quay về trang chủ</Button>
        </Link>
      </main>
    </div>
  );
};

export default ReadPage;
