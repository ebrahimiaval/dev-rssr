import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "trim-redux";
import {Helmet} from "react-helmet";
import axios from "axios";
// config
import {api} from "../../../root/config/api";
import {route} from "../../../root/config/route";
// style
import "./home.scss";
import {fecher} from "../../../root/utility/fetcher";





class Home extends Component {

    // static fetchData = () => axios({url: api.posts});

    static fetchData() {
        return axios({
            url: api.posts
        })
            .then((response) => {
                // var x = '';
                // x = x.map(() => '');
                // console.log(x);

                return response;

                // storeState.home = response.data;
            })
            .catch(function (error) {
                throw error;
            });
    }


    render() {
        const {fetchedData} = this.props;

        return (
            <div id="hme" className="container">
                <Helmet title="صفحه ‌اصلی"/>
                <div className="jumbotron mt-3" id="abc">
                    <h1>موفقیت اتفاقی نیست!</h1>
                    <p className="lead">
                        برای خلق بهترین‌ها باید بیشتر تلاش کرد، چیزی که ساده به دست بیاد، می‌تونه خیلی ساده هم از دست بره.
                    </p>
                </div>

                <div className="row">
                    {
                        (fetchedData) ? (
                                fetchedData.map((item) => (
                                    <div className="col-md-4 my-2 px-3 animated fadeIn" key={item.id}>
                                        <Link to={route.post(item.id)} className="card">
                                            <div className="card-body">
                                                <h3 className="card-title text-truncate h6">{item.title}</h3>
                                                <p className="card-text text-truncate">{item.body}</p>
                                                <span>مشاهده مطلب</span>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )
                            :
                            (
                                <div className="col-12 text-center">
                                    در حال بار گذاری مطالب . . .
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }
}


// HOC
Home = connect(s => ({home: s.home}))(Home);
Home = fecher(Home);

export default Home;
