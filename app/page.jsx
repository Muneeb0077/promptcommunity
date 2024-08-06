import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share 
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center"> AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            PromptCommunity is an open-source platform for discovering and sharing AI-powered prompts. 
            Get inspired by the latest AI-generated prompts or share your own.
        </p>

        <Feed />
    </section>
  )
}

export default Home