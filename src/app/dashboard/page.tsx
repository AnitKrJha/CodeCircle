import DashboardComponent from "@/components/dashboard";

export default async function DashboardPage(){
    await new Promise<void>((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, 2000);
    });
    return <DashboardComponent/>
}