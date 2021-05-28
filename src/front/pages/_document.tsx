import { AppType, RenderPageResult } from 'next/dist/next-server/lib/utils';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import Helmet, { HelmetData } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { consoleError } from '../utils/log';

interface Props {
  styles: JSX.Element;
  helmet: HelmetData;
  html: string;
  head?: (JSX.Element | null)[] | undefined;
}

type getInitialPropsRuturnType = RenderPageResult | Props;

export default class CustomDocument extends Document<Props> {
  static async getInitialProps(
    context: DocumentContext,
  ): Promise<getInitialPropsRuturnType> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;
    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: AppType) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(context);
      const page = context.renderPage((App) => (props) =>
        sheet.collectStyles(<App {...props} />),
      );
      const styles = (
        <>
          <link href="/reset.css" rel="stylesheet" />
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      );
      return {
        ...initialProps,
        ...page,
        styles,
        helmet: Helmet.renderStatic(),
      };
    } catch (error) {
      consoleError('CustomDocument Error', error);
      throw new Error('CustomDocument Error');
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <Html lang="en" dir="ltr" {...htmlAttrs}>
        <Head>
          {this.props.styles}
          {/* <title>MOTI</title> */}
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content="yuni-q" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://localhost:8000/" />
          <meta property="og:title" content="yuni-q" />
          <meta property="og:image" content="/favicon.png" />
          <meta property="og:description" content="yuni-q" />
          <meta property="og:site_name" content="yuni-q" />
          <meta property="og:locale" content="ko-KO" />
          {Object.values(helmet).map((el) => el.toComponent())}
          <link rel="manifest" href="/manifest.json" />
          <link rel="shorcut icon" href="/favicon.png" />
          <meta name="theme-color" content="black" />

          {/* CODELAB: Add iOS meta tags and icons */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="MOTI" />
          <link rel="apple-touch-icon" href="/favicon.png" />
        </Head>
        <body {...bodyAttrs}>
          <Main />
          {process.env.NODE_ENV === 'production' && (
            <>
              <script src="/regist.js" />
              <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />
            </>
          )}
          <NextScript />
        </body>
      </Html>
    );
  }
}
