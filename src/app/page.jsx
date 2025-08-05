import Footer from "@/components/footer";
import Landing from "./(pages)/landing/page";
import Head from "next/head";

///// Homepage
export default function Home() {
  return (
    <div>
      <Head>
        <title>Wild Odysseys</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet/dist/leaflet.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css"
        />
      </Head>
      <main className="">
        <Landing />

        <Footer />
      </main>
    </div>
  );
}
