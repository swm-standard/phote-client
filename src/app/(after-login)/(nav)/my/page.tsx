'use client';

import Container from '@/components/container';
import BarButton from '@/components/bar-button';
import { useMutation } from '@tanstack/react-query';
import Loading from '@/components/ui/loading';
import { useRouter } from 'next/navigation';
import { logout, unregister } from '@/api/auth-api';

const Page = () => {
  const logoutMutation = useMutation({ mutationFn: logout });
  const unregisterMutation = useMutation({ mutationFn: unregister });

  const router = useRouter();
  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push('/');
  };

  const handleUnregister = async () => {
    await unregisterMutation.mutateAsync();
    await logoutMutation.mutateAsync();
    router.push('/');
  };

  if (logoutMutation.isPending) return <Loading />;
  return (
    <Container className="flex flex-col gap-4 p-4">
      <BarButton onClick={handleLogout}>로그아웃</BarButton>
      <BarButton onClick={handleUnregister}>회원탈퇴</BarButton>
    </Container>
  );
};

export default Page;
