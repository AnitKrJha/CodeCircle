export default function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Elevate Your Coding Experience
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Peercode offers a collaborative environment where you can share
              coding challenges, explore diverse solutions, and discuss insights
              with friends. Enhance your skills through interactive peer
              learning and real-time feedback.
            </p>
          </div>
        </div>
        <FeatureList />
      </div>
    </section>
  );
}

function FeatureList() {
  return (
    <div className="mx-auto flex flex-col md:flex-row max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
      <div className=" w-full  sm:w-full lg:h-auto">
        <div className="w-full aspect-square bg-gradient-to-r from-teal-400 via-green-400 to-lime-400 rounded-xl"></div>
      </div>
      <ul className="flex flex-col gap-6">
        <FeatureItem
          title="Collaborative Coding"
          description="Share coding problems and solutions with friends, and collaborate to find the best approaches."
        />
        <FeatureItem
          title="Diverse Problem-Solving"
          description="Explore multiple solutions to coding challenges and learn different techniques from your peers."
        />
        <FeatureItem
          title="Real-Time Discussions"
          description="Engage in discussions, provide feedback, and enhance your understanding through interactive conversations."
        />
      </ul>
    </div>
  );
}

function FeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </li>
  );
}
