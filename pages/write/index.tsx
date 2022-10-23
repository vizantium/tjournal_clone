import React from 'react';
import {GetServerSideProps, NextPage} from "next";
import {MainLayout} from '../../layouts/MainLayout';
import WriteForm from "../../components/WriteForm";
import {Api} from "../../components/utils/api";


const Write: NextPage = () => {
    return (
        <MainLayout className='main-layout-white' hideComments hideMenu>
            <WriteForm/>
        </MainLayout>
    );
};


export default Write;