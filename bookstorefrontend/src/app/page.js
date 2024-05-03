import { Button } from "@mui/material";
import Image from "next/image";
 
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
   <div className="container mx-auto text-center">
        <h1 className="text-6xl font-bold mb-6">Btech Bookstore</h1>
        <p className="text-2xl mb-8">Book Store Management App</p>
        <div className="card flex justify-content-center">
            <Button type="button" color="primary">hello</Button>
        </div>
    </div>
    </main>
  );
}
