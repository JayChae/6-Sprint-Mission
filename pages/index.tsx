import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("sprint10");
  }, []);

  return <div>홈페이지</div>;
}
