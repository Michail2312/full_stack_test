import styles from './App.module.scss';
import { ChangeEvent, useState } from 'react';

export type TUser = {
  email: string;
  number?: string;
};

let controller = new AbortController();

const App = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [fetchError, setFetchError] = useState('');

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(e.target.value)) {
      setEmailError('Email некорректный');
    } else {
      setEmailError('');
    }
  };

  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') setEmailFocus(true);
    else setEmailError('Email не может быть пустым');
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchError('');
    setLoading(true);
    getUser({ email, number });
  };

  const getUser = async (params: TUser) => {
    try {
      setUsers([]);
      controller.abort();
      controller = new AbortController();
      const signal = controller.signal;
      const response = await fetch(
        `http://127.0.0.1:3001?email=${params.email}&number=${params.number}`,
        {
          signal,
        }
      );
      setLoading(true);
      if (!response.ok) {
        setUsers([]);
        setLoading(false);
        const error = await response.json();
        setFetchError(error.message);
      } else {
        const data: TUser[] = await response.json();
        setLoading(false);
        setUsers(data);
      }
    } catch (error) {
      if (fetchError) setLoading(false);
      else setLoading(true);
    }
  };
  return (
    <div className={styles.login}>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <input
          onFocus={e => handleBlur(e)}
          type='text'
          name='email'
          value={email}
          placeholder='Enter email'
          required
          onChange={handleEmail}
        />
        <span className={styles.span}>{emailFocus && emailError}</span>
        <input
          type='text'
          name='number'
          value={number}
          placeholder='Enter number'
          onChange={handleNumber}
        />
        <button
          className={[
            styles['btn '],
            styles['btn-primary '],
            styles['btn-block '],
            styles['btn-large'],
          ].join('')}
        >
          Let me in.
        </button>
      </form>
      {!!fetchError && <h1>{fetchError}</h1>}
      {loading && <h1>LOADING....</h1>}
      <ul>
        {users.map(user => (
          <li key={user.email.concat(user.number)}>
            <p>{`User email: ${user.email}`}</p>
            <p>{`User number: ${user.number}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
