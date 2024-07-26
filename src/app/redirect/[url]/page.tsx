import { redirect, RedirectType } from 'next/navigation';

const Page = ({ params }: { params: { url: string } }) => {
  redirect(`/${params.url}`, RedirectType.replace);
};

export default Page;
