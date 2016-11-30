// @flow

import React from 'react';

import Face from '../Face';

import styles from './Home.css';

const Home = () =>
   (
     <div className={styles.container}>
       <Face
         linked
       />
     </div>
    );

export default Home;
