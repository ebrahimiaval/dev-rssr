import React, {Component, Fragment} from 'react';
import * as axios from "axios";
import {connect, setStore} from "trim-redux";
import {Helmet} from "react-helmet";
// config
import {IS_BROWSER, IS_SERVER} from "../../../root/config/constant";
import {api} from "../../../root/config/api";
import {route} from "../../../root/config/route";
import Link from "react-router-dom/es/Link";
import {fecher} from "../../../root/utility/fetcher";




class Post extends Component {

    constructor(props, context) {
        super(props, context);

        this.props.setFtechParams({postId: this.props.match.params.postId});
    }

    static fetchData({req, storeState, match, postId}) {
        if (IS_SERVER)
            postId = match.params.postId;

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

    componentDidUpdate() {
        this.props.setFtechParams({postId: this.props.match.params.postId});
    }

    render() {
        const
            postId = Number(this.props.match.params.postId),
            {post} = this.props;

        return (
            <div className="container">
                <Helmet title={post !== null ? post.title : 'باگذاری ...'}/>
                <div className="jumbotron mt-3" id="abc">
                    {
                        (post !== null) ? (
                                <Fragment>
                                    <h1>{post.title}</h1>
                                    <p className="lead">{post.body}</p>
                                </Fragment>
                            )
                            :
                            'در حال بار گذاری مطلب ...'
                    }
                </div>
                <div className="d-flex justify-content-between pb-5">
                    <Link to={route.post(postId - 1)} className="btn btn-secondary">last post</Link>
                    <Link to={route.post(postId + 1)} className="btn btn-secondary">next post</Link>
                </div>
            </div>
        );
    }
}

// HOC
Post = connect(s => ({post: s.post}))(Post)
Post = fecher(Post, 'post');

export default Post;