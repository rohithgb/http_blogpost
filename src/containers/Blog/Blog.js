import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';

import axios from 'axios';

import './Blog.css';

class Blog extends Component {
    state = {
        posts:[],
        seletedPostId: null
    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response=>{
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post=>{
                    return {
                        ...post,
                        author:'Rohith'
                    }
                })
                this.setState({
                    posts:updatedPosts,
                })

            })
    }

    selectecPost = (id) => {
        this.setState({
            seletedPostId:id,
        })
    }

    render () {
        const posts = this.state.posts.map(post=>{
            return <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={()=>this.selectecPost(post.id)}/>;
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.seletedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;