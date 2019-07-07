import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect, setStore} from "trim-redux";
import {Helmet} from "react-helmet";
import axios from "axios";
// config
import {api} from "../../../root/config/api";
import {IS_BROWSER} from "../../../root/config/constant";
import {route} from "../../../root/config/route";
// style
import "./home.scss";
import {fecher} from "../../../root/utility/fetcher";





class Home extends Component {

    static fetchData({storeState}) {
        return axios({
            url: api.posts
        })
            .then((response) => {
                // var x = '';
                // x = x.map(() => '');
                // console.log(x);

                if (IS_BROWSER)
                    setStore({home: response.data})
                else
                    storeState.home = response.data;
            })
            .catch(function (error) {
                throw error;
            });
    }


    render() {
        const {home} = this.props;

        if (home === null)
            return "در حال بارگذاری...";

        return (
            <div className="container-fluid">
                <Helmet title="صفحه ‌اصلی"/>
                <div className="jumbotron mt-3" id="abc">
                    <h1>RSSR</h1>
                    <p className="lead">پروژه تنظیمات باز با قابلیت پردازش سمت سرور ری‌اکت</p>
                </div>

                <div className="row">
                    {
                        home.map((item) => (
                            <div className="col-md-6 mb-3" key={item.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.body}</p>
                                        <Link to={route.post(item.id)} className="btn btn-primary">مشاهده</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

// HOC
Home = connect(s => ({home: s.home}))(Home);
Home = fecher(Home, 'home');

export default Home;
