import Head from 'next/head';

import {Header} from '../components/Header';

import {MuiThemeProvider, CssBaseline} from '@material-ui/core';
import {theme} from '../theme';
import {Api} from './../components/utils/api'
import '../styles/globals.scss';
import 'macro-css';
import {Provider} from "react-redux";
import {store, wrapper} from "../redux/store";
import {AppProps} from "next/app";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import {UserApi} from "../components/utils/api/user";
import {setUserData} from "../redux/slices/user";


function MyApp({Component, ...rest}: AppProps) {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <>
            <Head>
                <title>RJournal</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet"/>
            </Head>
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <Provider store={store}>
                    <Header/>
                    <Component {...props} />
                </Provider>
            </MuiThemeProvider>
        </>
    );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) =>
    async ({ctx, Component}) => {
        try {
            const userData = await Api(ctx).user.getMe()

            store.dispatch(setUserData(userData))
        } catch (e) {
            if (ctx.asPath === '/write') {
                ctx.res.writeHead(302, {
                    Location: '/403',
                })
                ctx.res.end()
            }
            console.log(e)
        }

        return {
            pageProps: {
                ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {})
            }
        }
    })


export default MyApp;
