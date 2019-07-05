import React, {Component} from 'react';
import * as axios from "axios";
import {connect, setStore} from "trim-redux";
import {Helmet} from "react-helmet";
import {matchPath} from "react-router-dom";
// config
import {IS_BROWSER} from "../../../root/config/constant";
import {api} from "../../../root/config/api";
import {route} from "../../../root/config/route";




class Post extends Component {

    static fetchData({req, storeState, postId}) {
        if (!IS_BROWSER) {
            postId = matchPath(req.url, route.post()).params.postId;
            postId = postId.split('?')[0];
        }

        return axios({
            url: api.post(postId)
        })
            .then((response) => {
                if (IS_BROWSER)
                    setStore({post: response.data})
                else
                    storeState.post = response.data;
            })
    }

    componentDidMount() {
        // fetch if home have default state
        if (this.props.post === null)
            Post.fetchData({postId: this.props.match.params.postId});
    }


    componentWillUnmount() {
        // clear store
        setStore({post: null})
    }


    render() {
        const {post} = this.props;

        if (post === null)
            return "در حال بارگذاری...";

        return (
            <div className="container-fluid">
                <Helmet title={post.title}/>
                <div className="jumbotron mt-3" id="abc">
                    <h1>{post.title}</h1>
                    <p className="lead">{post.body}</p>
                </div>
            </div>
        );
    }
}

export default connect(s => ({post: s.post}))(Post);