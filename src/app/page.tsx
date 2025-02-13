import { Button } from '@/components/ui/button';
import { Typewriter } from '@/components/ui/header/Typewriter';
import { Link } from '@/components/ui/link/link';
import { paths } from '@/config/paths';
import { GitHubLogoIcon, RocketIcon } from '@radix-ui/react-icons';

const HomePage = () => {
  // const isLoggedIn = checkLoggedIn(); // TODO: implement
  const isLoggedIn = true;

  return (
    <div className="flex h-screen items-center bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Stalk</span>
        </h2>
        <Typewriter text="An investment simulator" delay={100} infinite />
        <img src="/logo.svg" alt="stock chart" />
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link
              href={
                isLoggedIn
                  ? paths.app.root.getHref()
                  : paths.auth.login.getHref()
              }
            >
              <Button icon={<RocketIcon />}>Get started</Button>
            </Link>
          </div>
          <div className="ml-3 inline-flex">
            <a
              href="https://github.com/zcestkc/stalk"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" icon={<GitHubLogoIcon />}>
                Github Repo
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
