import {Post} from '../components/Post';
import {MainLayout} from '../layouts/MainLayout';
import {Api} from "../components/utils/api";
import {NextPage} from "next";
import {PostItem} from "../components/utils/api/types";

interface HomeProps {
   pageProps: {
       posts: PostItem[]
   }
}

const Home: NextPage<HomeProps> = ({pageProps}) => {
    return (
        <MainLayout>
            {
                pageProps.posts.map((obj) =>(
                    <Post key={obj.id} id={obj.id} title={obj.title} description={obj.description}/>
                ))
            }
        </MainLayout>
    );
}

export const getServerSideProps = async (ctx) => {
    try {
        const posts = await Api().post.getAll();
        return {
            props: {
                posts,
            }
        }
    } catch (e) {
        console.log(e)
    }
    return {
        props: {
            posts: null
        }
    }
}

export default Home