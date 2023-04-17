import { Button, NoSsr } from '@mui/material';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import Logo from '@/components/shared/Logo';
import { FLAG_DISABLE_SIGNUPS } from '@/constants/flags';
import { logout } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import styles from '@/styles/pages/Home.module.scss';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'modals', 'landing'])),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.build.theme);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const handleLogin = () => dispatch(setModalState({ modal: 'auth.login', state: { open: true } }));
  const handleRegister = () => dispatch(setModalState({ modal: 'auth.register', state: { open: true } }));
  // const handleToggle = () => dispatch(setTheme({ theme: theme === 'light' ? 'dark' : 'light' }));
  const handleLogout = () => dispatch(logout());

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Logo size={256} />
          </div>
        </div>
        <div className={styles.main}>
          <h1>{t<string>('common.title')}</h1>
          <h2>{t<string>('common.subtitle')}</h2>
        </div>
        <NoSsr>
          <div className={styles.buttonWrapper}>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" passHref>
                  <Button size="large" style={{ width: '200px', height: '100%' }}>
                    {t<string>('landing.actions.app')}
                  </Button>
                </Link>

                <Button size="large" style={{ width: '200px' }} variant="outlined" onClick={handleLogout}>
                  {t<string>('landing.actions.logout')}
                </Button>
              </>
            ) : (
              <>
                <Button size="large" style={{ width: '200px' }} onClick={handleLogin}>
                  {t<string>('landing.actions.login')}
                </Button>

                <Button
                  size="large"
                  style={{ width: '200px' }}
                  variant="outlined"
                  onClick={handleRegister}
                  disabled={FLAG_DISABLE_SIGNUPS}
                >
                  {t<string>('landing.actions.register')}
                </Button>
              </>
            )}
          </div>
        </NoSsr>
      </section>

      <footer>
        <div className={styles.actions} style={{ marginLeft: 'auto', marginRight: 0 }}>
          <div className={styles.version}>
            <div>v{process.env.appVersion}</div>
          </div>
          <div>
            <LanguageSwitcher />
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
