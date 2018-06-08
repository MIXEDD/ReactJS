import React, {Component} from 'react';
import axios from "../../../axios";
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from "../FullPost/FullPost";
import {Route} from 'react-router-dom';

class Posts extends Component {

    state = {
        posts:[]
    };

    componentDidMount(){
        console.log(this.props);
        const posts = axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return{
                        ...post,
                        author:'Max'
                    }
                });
                this.setState({posts:updatedPosts});
                console.log(response);
            }).catch(error => {
                console.log(error);
                //this.setState({error:true});
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname:'/posts/' + id});
        //this.props.history.push('/' + id);
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>;
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return (
                        <Post
                            title={post.title}
                            key={post.id}
                            author={post.author}
                            {...this.props}
                            clicked={() => this.postSelectedHandler(post.id)}
                        />

                );
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "import {Route,BrowserRouter} from 'react-router-dom';/:id"} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;