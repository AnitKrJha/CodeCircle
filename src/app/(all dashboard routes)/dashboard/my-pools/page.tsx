import PoolCardList from "@/components/pools/poolcardlist";
import PoolHeader from "@/components/pools/poolheader";

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
    }
  ];
  

export default function MypoolsPage() {



    return <><PoolHeader /><PoolCardList pools={poolCards}/></>
}
