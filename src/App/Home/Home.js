import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect, setStore} from "trim-redux";
import * as axios from "axios";
// config
import {api} from "../../config/api";
import {IS_BROWSER} from "../../config/constant";
import {route} from "../../config/route";
// style
import "./home.scss";





class Home extends Component {

    static fetchData({storeState}) {
        return new Promise(function (resolve) {
            axios({
                url: api.posts
            })
                .then((response) => {
                    if (IS_BROWSER)
                        setStore({home: response.data})
                    else
                        storeState.home = response.data;

                    resolve();
                })
        })
    }

    componentDidMount() {
        $('#exampleModal').modal('show')
    }



    render() {
        const {home} = this.props;
        return (
            <div className="container-fluid">
                <div className="jumbotron mt-3" id="abc">
                    <h1>RSSR</h1>
                    <p className="lead">پروژه تنظیمات باز با قابلیت پردازش سمت سرور ری‌اکت</p>
                </div>
                
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
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

export default connect(s => ({home: s.home}))(Home);
