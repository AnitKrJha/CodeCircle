import EmptyComponent from "@/components/empty";
import ErrorComponent from "@/components/errordisplay";
import ForbiddenComponent from "@/components/forbidden";
import { PoolCardProps } from "@/components/pools/poolcard";
import PoolCardList from "@/components/pools/poolcardlist";
import PoolHeader from "@/components/pools/poolheader";
import ProblemCard, {
  ProblemWithPoolNameInterface,
} from "@/components/problems/problemcard";
import ProblemList from "@/components/problems/problemcardlist";
import { createSClient } from "@/lib/supabase/server";

const poolCards = [
  {
    id: "1",
    name: "Array Manipulation",
    desc: "Challenges focused on array operations like filtering, mapping, and reducing.",
    author: true,
  },
  {
    id: "2",
    name: "String Parsing",
    desc: "Problems that require string manipulation techniques such as splitting, joining, and regular expressions.",
    author: false,
  },
  {
    id: "3",
    name: "Graph Traversal",
    desc: "Explore depth-first search, breadth-first search, and other graph-related algorithms.",
    author: true,
  },
  {
    id: "4",
    name: "Dynamic Programming",
    desc: "Practice problems that involve breaking down complex problems into simpler subproblems.",
    author: false,
  },
  {
    id: "5",
    name: "Sorting Algorithms",
    desc: "Work on implementing and optimizing various sorting techniques.",
    author: true,
  },
  {
    id: "6",
    name: "API Integration",
    desc: "Solve challenges related to making API calls and handling responses.",
    author: false,
  },
];

async function getAllMyPools() {
  const supabase = createSClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("Authentication failed. Please try again.");
    }

    const { data, error } = await supabase
      .from("Problems")
      .select("*,users(*),ProblemPools(pool_name)")
      .eq("created_by", user.id);
    console.log(data);
    console.log(data?.at(0)?.users);

    if (error) {
      throw new Error("Failed to fetch problem pools. Please try again later.");
    }

    if (!data || data.length === 0) {
      return [];
    }

    let problemList: ProblemWithPoolNameInterface[] = [];
    for (let x of data) {
      let oneProblem: ProblemWithPoolNameInterface = {
        created_at: x.created_at,
        created_by: x.created_by,
        title: x.title,
        description: x.description,
        pool_id: x.pool_id,
        problem_id: x.problem_id,
        pool_name: x.ProblemPools?.pool_name,
        users: x.users,
      };
      problemList.push(oneProblem);
    }
    return problemList;
  } catch (error: any) {
    console.error("Error in getAllMyPools:", error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

export default async function MyProblemsPage() {
  try {
    const problemPools = await getAllMyPools();

    if (problemPools.length === 0) {
      return (
        <EmptyComponent
          message="You did not create a Problem Yet"
          type="problem"
        />
      );
    }

    return (
      <>
        <PoolHeader type="Problems" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {problemPools.map((problem) => {
            return <ProblemCard problem={problem} />;
          })}
        </div>
      </>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}
