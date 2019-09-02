import React, {Component, Fragment} from 'react';
import {Helmet} from "react-helmet";
import Link from "react-router-dom/es/Link";
// config
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {axios} from "../../setup/utility/axios";
import {fecher} from "../CC/fetcher/fetcher";




class Post extends Component {

    // constructor(props) {
    //     super(props);
    //
    //     this.props.setFtechParams({postId: this.props.match.params.postId});
    // }
    static redux = 'post';
    static fetch({match}) {
        return axios({
            url: api.post(match.params.postId)
            // url: api.s200_post
        });
    }

    // componentDidUpdate() {
    //     this.props.setFtechParams({postId: this.props.match.params.postId});
    // }

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
                            (
                                <div className="col-12 text-center">
                                    <img src="/asset/img/loading.gif" alt="loading"/>
                                    <div> در حال بار گذاری مطلب</div>
                                </div>
                            )
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
Post = fecher(Post);

export default Post;