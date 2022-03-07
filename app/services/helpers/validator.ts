import { iUser } from 'services/@types';
import { validateEmail } from 'services/utils/functions';

export const regValidator = ({ name, email, password }: iUser) => {
  if (!name || !email || !password) return 'Please fill all inputs';

  if (password.length < 6) return 'Password must be min 6 character';

  if (!validateEmail(email)) return 'Please write correct email';
};

export const loginValidator = ({ email, password }: iUser) => {
  if (!email || !password) return 'Please fill all inputs';

  if (password.length < 6) return 'Password must be min 6 character';

  if (!validateEmail(email)) return 'Please write correct email';
};
