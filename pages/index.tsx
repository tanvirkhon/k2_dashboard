import Head from "next/head";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>TradingBot Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </Layout>
  );
}
