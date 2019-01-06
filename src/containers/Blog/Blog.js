import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';

//import axios from 'axios';
import axios from '../../axios';

import './Blog.css';

class Blog extends Component {
    state = {
        posts:[],
        seletedPostId: null,
        error:false,
    }
    componentDidMount(){
        axios.get('/posts')
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
            .catch((err)=>{
                this.setState({
                    error:true
                })
            })
    }

    selectecPost = (id) => {
       
        this.setState({
            seletedPostId:id,
        })
    }

    render () {
        let posts = <p style={{textAlign:'center'}}>Something went wrong, try again later.</p>;
        if(!this.state.error){
             posts = this.state.posts.map(post=>{
                return <Post 
                            key={post.id} 
                            title={post.title} 
                            author={post.author}
                            clicked={()=>this.selectecPost(post.id)}/>;
            });
        }

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