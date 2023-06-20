/**
 * Please, improve this component and fix all problems.
 *
 * What is important:
 * - design (extensibility, testability)
 * - code cleanliness, following best practices
 * - bugs
 * - consistency
 * - naming
 * - formatting
 *
 * Write your perfect code!
 */

// *** Changes are denoted from point a to j (10 x changes made to the code)

import React, { useEffect, useState } from 'react';

function Card({
  title,
  text,
  target,
  linkTitle,
  href,
  rel,
  onClick,
  linkClassName,
}) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>

      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        target={target}
        rel={rel}
        href={href}
        onClick={onClick}
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  // a. Set a data type for initial state
  const [cards, setCards] = useState([]);

  // b. Define URL seperately for re-usability - Best to put in a seperate file or define in env file
  const BASE_URL = 'https://my-json-server.typicode.com/savayer/demo/posts';

  // c. Create a helper function to map the data to the intended structure
  const mapPosts = (data) => {
    // d. use map to loop the data to create new object
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      link_title: item.link_title,
      link: item.link,
      // e. if body is null, to render empty string instead of undefined
      text: item.body !== null ? item.body?.en.substr(0, 50) + '...' : '',
    }));
  };

  // f. Create a function for GET posts request seperately and implement try/catch in async to catch error
  const getPosts = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setCards(() => mapPosts(data));
    } catch (err) {
      console.error('Error in fetching data: ' + err);
    }
  };

  // g. Simplifying useEffect, alternatively, can consider to implement ReactQuery for better persistent and cache of state
  useEffect(() => {
    getPosts();
  }, []);

  function analyticsTrackClick(url) {
    // sending clicked link url to analytics
    console.log(url);
  }

  return (
    <div>
      {/* h. added index into inner function of map */}
      {cards.map(function (item, index) {
        return (
          <Card
            // i. need to have unique key when performing mapping in jsx
            key={index}
            title={item.title.en}
            linkTitle={item.link_title}
            href={item.link}
            text={item.text}
            linkClassName={item.id == 1 ? 'card__link--red' : ''}
            target={item.id === 1 ? '_blank' : ''}
            // j. function for onClick needs to be within an anonymous function to avoid being instantiated immediately
            onClick={() => analyticsTrackClick(item.link)}
          />
        );
      })}
    </div>
  );
}
