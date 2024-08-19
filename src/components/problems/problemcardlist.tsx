import ProblemCard from "./problemcard";

export function ProblemList(){
    return ( <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <h1 className="mx-auto max-w-5xl my-2 text-lg">Problems</h1>
          <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProblemCard/>
          </div>
        </div>
      </section>)
}