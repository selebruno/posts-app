/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider/Slider';
import styles from './login.module.css';

type IFormValues = {
  email: string;
  password: string;
};

const Login: FunctionComponent = () => {
  const form = useForm<IFormValues>();
  const navigate = useNavigate();

  const onSubmit = () => {
    localStorage.setItem('email', form.getValues('email'));
    navigate('/home');
  };

  return (
    <div className={styles.pageContainer}>
      <Slider />
      <div className={styles.titleContainer}>
        <img className={styles.logo} src="/images/logo.png" alt="logo" />
        <a
          href="https://github.com/selebruno/posts-app"
          target="_blank"
          rel="noreferrer"
          className={styles.title}>
          Postagram
        </a>
        <p className={styles.slogan}>
          <i>Start creating moments.</i>
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              {...form.register('email', {
                required: 'An email is required.'
              })}
              placeholder="Email"
              className={styles.loginInput}
              type="email"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              {...form.register('password', {
                required: 'A password is required.'
              })}
              placeholder="Password"
              className={styles.loginInput}
              type="password"
            />
          </div>
          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
