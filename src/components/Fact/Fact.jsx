import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useSelector } from 'react-redux';

import Info from '../Info/Info';
import InputSub from '../InputSub/InputSub';

import r from '../../config/data';

const Fact = () => {
  const [post, setPost] = useState('');
  const stateObj = useSelector(state => state);
  const [isLoaded, setIsLoaded] = useState(stateObj.isLoaded);
  let subReddit = stateObj.subReddit.newSub;

  useEffect(() => {
    async function fetchPost() {
      let limit;
      limit = 20;

      let posts = [];
      let post;
      posts = await r.getSubreddit(subReddit).getHot({ limit: limit });
      post = posts[Math.floor(Math.random() * limit - 1) + 1];
      setPost(post);
      setIsLoaded(true);
    }
    fetchPost();
  }, [subReddit]);

  async function randomFact() {
    setIsLoaded(false);
    let limit, num;
    limit = 100;
    subReddit = stateObj.subReddit.newSub;

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

    setPost(post);
    setIsLoaded(true);
  }

  if (!isLoaded) {
    return (
      <div>
        <div className="max-w-sm mx-auto flex p-4 bg-white rounded-lg shadow-lg mt-48 mb-16">
          <div className="mx-auto pt-1">
            <ClipLoader
              sizeUnit={'px'}
              size={30}
              color={'#0076FF'}
              loading={!isLoaded}
            />
          </div>
        </div>
        <Info />
      </div>
    );
  } else {
    return (
      <div>
        <InputSub />
        <div className="max-w-md mx-auto flex p-4 bg-white rounded-lg shadow-lg mt-8 mb-16">
          <div className="ml-6 pt-1">
            <h4 className="text-xl text-gray-900 leading-tight">
              {post.title}
            </h4>
            <button
              style={{ backgroundColor: '#0076FF' }}
              className="hover:shadow-lg text-white font-medium py-2 px-4 border border-gray-400 rounded-lg shadow mt-8"
              onClick={randomFact}
            >
              Random Submission
            </button>
            <button className="bg-transparent hover:bg-blue-100 hover:border-transparent hover:shadow-lg text-blue-600 font-medium py-2 px-4 border border-blue-400 rounded-lg shadow mt-8 ml-6">
              <a href={post.url} target="blank">
                View Submission
              </a>
            </button>
          </div>
        </div>
        <Info />
      </div>
    );
  }
};

export default Fact;
