import { redirect } from 'next/navigation';

const RedirectByAuth = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  redirect('workbook');
};

export default RedirectByAuth;
