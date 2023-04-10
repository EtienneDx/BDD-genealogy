import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './add-person.module.scss';
export function Login(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <div className={styles.container}>
        <Link to='/' className={styles.familytree}>Family Tree</Link>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={styles.formAddPerson}>
          <div className={styles.formGroup}>
            <input
              type='email'
              id='email-input'
              className={styles.input}
              placeholder='Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type='password'
              id='password-input'
              className={styles.input}
              placeholder='Password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type='submit' id='submit-btn' className={styles.submit}>
              Login
            </button>
            <Link to='/register'>Register</Link>
          </div>
        </form>
      </div>
    );
  }

  export default Login;
  