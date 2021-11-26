import React, { useState } from 'react';
import styles from "../styles/User.module.css"
function Test({ list }) {
  // Render posts...
  const [i] = useState(0);
  const [isListLike,isListPass,isShow] = useState(false)
  const [arrLiked,arrPass] = useState([]);
  const user = list.data[i];
  function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return (
      <div className={styles.row}>
        {
          !isShow ?
              (
                  <div>
                    <div className={styles.user_image}>
                      <img src={user.picture}/>
                    </div>
                    <div >
                      <h3>
                        <span>{user.firstName} {user.lastName}, {getAge(user.dateOfBirth)}</span>
                      </h3>
                    </div>
                    <div className={styles.group_btn}>
                      <a className="label"
                         onClick={(e) => this._handleSkip(i, limit, currentPage, user)}>
                        <img src="https://cdn-icons-png.flaticon.com/512/458/458594.png"/>
                      </a>
                      <a className="label"
                         onClick={(e) => this._handleLike(i, limit, currentPage, user)}>
                        <img src="https://findicons.com/files/icons/734/phuzion/128/fav_heart.png"/>
                      </a>
                    </div>
                  </div>
              )
              :(
                  <div className={styles.list_like}>
                    {
                      isListLike ? (

                          arrLiked.map((item, index) => {
                            return (
                                <div key={index}>
                                  <img src={item.picture}/>
                                  <span>
														{item.firstName} {item.lastName}, {this.getAge(user.dateOfBirth)}
														</span>

                                </div>
                            )
                          })
                      ):(
                          arrPass.map((item, index) => {
                            return (
                                <div key={index}>
                                  <img src={item.picture}/>
                                  <span>
														{item.firstName} {item.lastName}, {this.getAge(user.dateOfBirth)}
														</span>
                                </div>
                            )
                          })
                      )

                    }
                  </div>
              )
        }
        <div className={styles.group_action}>
          <div>
            <a >
              Like
            </a>

          </div>
          <div>
            <a>
              Discover
            </a>
          </div>
          <div>
            <a>
              Pass
            </a>
          </div>
        </div>

      </div>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'app-id': '61866d3f941a77c3945a76ce'
    }
  };
  const res = await fetch('https://dummyapi.io/data/v1/user?page=1&limit=10',requestOptions)
  const list = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      list,
    },
  }
}

export default Test