import { useRouter } from 'next/router';

const useRoutes = () => {
  const router = useRouter();
  const goTo = (url: string) => router.push(url);

  return { goTo };
};

export default useRoutes;
