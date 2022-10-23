import React from 'react';
import Link from 'next/link';
import {Avatar, Button, IconButton, List, ListItem, Paper} from '@material-ui/core';
import {
    AccountCircleOutlined,
    Menu as MenuIcon,
    NotificationsNoneOutlined as NotificationIcon,
    SearchOutlined as SearchIcon,
    SmsOutlined as MessageIcon,
} from '@material-ui/icons';
import styles from './Header.module.scss';
import {AuthDialog} from "../AuthDialog";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {PostItem} from "../utils/api/types";
import {Api} from "../utils/api";

export const Header: React.FC = () => {
    const userData = useAppSelector(selectUserData);
    const [authVisible, setAuthVisible] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('')
    const [posts, setPosts] = React.useState<PostItem[]>([])
    const handleClickOpen = () => {
        setAuthVisible(true);
    };

    const handleClose = () => {
        setAuthVisible(false);
    }

    React.useEffect(() => {
        if (authVisible && userData) {
            setAuthVisible(false)
        }
    }, [authVisible, userData])

    const handleChangeInput = async (e) => {
        setSearchValue(e.target.value)
        try {
            if(e.target.value) {
                const {items} = await Api().post.search({title: e.target.value})
                setPosts(items)
            } else {
                setPosts([])
            }
        } catch (e) {
            console.warn(e)
        }
    }

    return (
        <Paper classes={{root: styles.root}} elevation={0}>
            <div className="d-flex align-center">
                <IconButton>
                    <MenuIcon/>
                </IconButton>
                <Link href="/">
                    <a>
                        <img height={35} className="mr-20" src="/static/img/logo.svg" alt="Logo"/>
                    </a>
                </Link>

                <div className={styles.searchBlock}>
                    <SearchIcon/>
                    <input value={searchValue} onChange={handleChangeInput} placeholder="Поиск"/>
                    {posts.length > 0 &&
                        <Paper className={styles.searchBlockPopup}>
                            <List>
                                {
                                    posts.map(obj =>
                                        <Link key={obj.id} href={`/news/${obj.id}`}>
                                            <a>
                                                <ListItem button>
                                                    {obj.title}
                                                </ListItem>
                                            </a>
                                        </Link>)
                                }
                            </List>
                        </Paper>
                    }
                </div>

                <Link href={'/write'}>
                    <Button variant="contained" className={styles.penButton}>
                        Новая запись
                    </Button>
                </Link>
            </div>
            <div className="d-flex align-center">
                <IconButton>
                    <MessageIcon/>
                </IconButton>
                <IconButton>
                    <NotificationIcon/>
                </IconButton>
                {
                    userData ? <Link href={`/profile/${userData.id}`}>
                        <a className="d-flex align-center">
                            <Avatar
                                className={styles.avatar}
                                alt="Remy Sharp"
                            >{userData.fullName[0]}</Avatar>
                        </a>
                    </Link> : <div className={styles.loginButton} onClick={handleClickOpen}>
                        <AccountCircleOutlined/>
                        Войти
                    </div>
                }

            </div>
            <AuthDialog onClose={handleClose} visible={authVisible}/>
        </Paper>
    );
};
