import { ContentLayout } from '@/components/layouts/content-layout';
import Counter from './counter';

export const Home = async () => {
  // const response = await api.get('/stock-items');
  // console.log(response);
  // console.log((await cookies()).get('refreshToken')?.value);
  return (
    <ContentLayout title="Home">
      <h1 className="text-xl">Welcome</h1>
      {/* {response.map(({ name, amount }, i) => (
        <p key={i}>
          {name} {amount}
        </p>
      ))} */}
      <Counter />
    </ContentLayout>
  );
};
