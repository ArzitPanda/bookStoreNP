import { Button } from "@mui/material";
import Image from "next/image";
 
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <div className="card flex justify-content-center">
            <Button type="button" color="primary">hello</Button>
        </div>
    </main>
  );
}
