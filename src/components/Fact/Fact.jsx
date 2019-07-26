import React, { Component } from 'react';

import r from '../../config/data';

class Fact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      isLoaded: false
    };

    this.randomFact = this.randomFact.bind(this);
  }

  async componentDidMount() {
    let limit;
    limit = 100;
    const subReddit = 'facts';

    let posts = [];
    let post;
    posts = await r.getSubreddit(subReddit).getHot({ limit: limit });
    post = posts[Math.floor(Math.random() * limit - 1) + 1];
    this.setState({
      post,
      isLoaded: true
    });
  }

  async randomFact() {
    this.setState({
      isLoaded: false
    });
    let limit, num;
    limit = 100;
    const subReddit = 'facts';

    num = Math.floor(Math.random() * 3) + 1;

    let post, posts;
    switch (num) {
      case 1:
        posts = await r.getSubreddit(subReddit).getHot({ limit: limit });
        post = posts[Math.floor(Math.random() * limit - 1) + 1];
        break;
      case 2:
        posts = await r.getSubreddit(subReddit).getNew({ limit: limit });
        post = posts[Math.floor(Math.random() * limit - 1) + 1];
        break;
      case 3:
        num = Math.floor(Math.random() * 3) + 1;

        switch (num) {
          case 1:
            posts = await r
              .getSubreddit(subReddit)
              .getTop({ limit: limit, time: 'all' });
            post = posts[Math.floor(Math.random() * limit - 1) + 1];
            break;
          case 2:
            posts = await r
              .getSubreddit(subReddit)
              .getTop({ limit: limit, time: 'year' });
            post = posts[Math.floor(Math.random() * limit - 1) + 1];
            break;
          case 3:
            posts = await r
              .getSubreddit(subReddit)
              .getTop({ limit: limit, time: 'month' });
            post = posts[Math.floor(Math.random() * limit - 1) + 1];
            break;
          default:
            return;
        }
        break;
      default:
        return;
    }

    this.setState({
      post,
      isLoaded: true
    });
  }

  render() {
    const { post, isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-lg my-48">
          <div className="mx-auto pt-1">
            <h4 className="text-xl text-gray-900 leading-tight">Loading</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-lg my-48">
          <div className="ml-6 pt-1">
            <h4 className="text-xl text-gray-900 leading-tight">
              {post.title}
            </h4>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-8"
              onClick={this.randomFact}
            >
              Random Fact
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Fact;
