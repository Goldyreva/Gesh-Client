import React, {useEffect, useRef} from 'react';
import Banner from "../../components/home/banner/Banner";
import About from "../../components/home/about/About";
import s from "./Home.module.sass";
import Locate from "../../components/home/locate/Locate";
import Catalog from "../../components/home/catalog/Catalog";
import Tourist from "../../components/home/tourist/Tourist";
import Map from "../../components/home/map/Map";
import Footer from "../../components/footer/Footer";
import {useParams} from "react-router-dom";
import BottomMenu from "../../components/bottomMenu/BottomMenu";

const Home = () => {
    let params = useParams()
    const blocks = {
        banner: useRef(null),
        about: useRef(null),
        catalog: useRef(null),
        locate: useRef(null),
        map: useRef(null)
    }
    const executeScroll = (block = "") => {
        if (block in blocks) {
            block === 'banner'
            ? blocks[block].current.scrollIntoView({block: "end", inline: "nearest"})
            : blocks[block].current.scrollIntoView()
        }
    }

    useEffect(() => {
        executeScroll(params.block)
    }, [params])

    return (
        <div className={s.root}>
            <Banner ref={blocks.banner}/>
            <div className={s.root__main}>
                {/*<About ref={blocks.about}/>*/}
                <Catalog ref={blocks.catalog}/>
                {/*<Locate ref={blocks.locate}/>*/}
                {/*<Tourist/>*/}
                <Map ref={blocks.map}/>
                <Footer/>
                <BottomMenu/>
            </div>
        </div>
    );
};

export default Home;