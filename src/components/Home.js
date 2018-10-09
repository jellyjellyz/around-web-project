import React from 'react';
import $ from 'jquery';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS, POS_KEY, API_ROOT, AUTH_PREFIX, TOKEN_KEY} from '../constants';
import { Gallery } from './Gallery';


const TabPane = Tabs.TabPane;
const operations = <Button>Create New Post</Button>;

export class Home extends React.Component {
    state = {
        error: '',
        posts: [],
        loadingPosts: false,
        loadingGeoLocation: false,  //正在拿geoloacation的时候设为true
    }


    componentDidMount() {
        this.setState({ loadingGeoLocation: true, error: '' });
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) { //browser 提供的 API
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            /* geolocation IS NOT available */
            this.setState({ error: 'Your browser does not support geolocation!' });
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState({ loadingGeoLocation: false, error: '' }); //用state记录还在拿geolocation的状态
        const { latitude, longitude } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({latitude, longitude}));

        // uploaded pictures
        this.loadNearbyPosts();
    }

    onFailLoadGeoLocation = (error) => {
        console.log(error);
        this.setState({ loadingGeoLocation: false, error: error.message });
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip={"Loading geo location ..."}/>;
        } else if (this.state.loadingPosts) {
            return <Spin tip={"Loading posts ..."}/>;
        } else {
            return <Gallery images={imageList}/>;

        }
    }

    loadNearbyPosts = () => {
        this.setState({ loadingPosts: true });
        const { latitude, longitude } = JSON.parse(localStorage.getItem(POS_KEY));
        const token = localStorage.getItem(TOKEN_KEY);
        $.ajax({
            url: `${API_ROOT}/search?lat=${latitude}&lon=${longitude}&range=20`,
            headers: {
                Authorization: `${AUTH_PREFIX} ${token}`
            }
        })
        // `${API_ROOT}/search?lat=??&lon=??&range=20`
    }

    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Post" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
            </Tabs>
        );
    }
}

const imageList = [];
//
// const imageList = [
//     {
//         user: 'jelly',
//         src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
//         thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
//         thumbnailWidth: 271,
//         thumbnailHeight: 320,
//         caption: "Orange Macro (Tom Eversley - isorepublic.com)"
//     },
//     {
//         user: 'jelly1',
//         src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
//         thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 190,
//         caption: "286H (gratisography.com)"
//     },
//     {
//         user: 'jelly2',
//         src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
//         thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 148,
//         caption: "315H (gratisography.com)"
//     },
//     {
//         src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
//         thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 213,
//         caption: "201H (gratisography.com)"
//     },
//     {
//         src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
//         thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
//         thumbnailWidth: 248,
//         thumbnailHeight: 320,
//         caption: "Big Ben (Tom Eversley - isorepublic.com)"
//     },
//     {
//         src: "https://c1.staticflickr.com/9/8785/28687743710_870813dfde_h.jpg",
//         thumbnail: "https://c1.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 113,
//         caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
//     },
//     {
//         src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
//         thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
//         thumbnailWidth: 313,
//         thumbnailHeight: 320,
//         caption: "Wood Glass (Tom Eversley - isorepublic.com)"
//     },
//     {
//         src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
//         thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 213,
//         caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
//     }
// ];
//
